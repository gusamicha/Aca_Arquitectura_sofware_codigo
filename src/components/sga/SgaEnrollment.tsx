import React, { useState } from 'react';
import {
  AcademicGroup,
  EnrollmentRecord,
  StudentProfile,
  AcademicPeriod
} from '../../data/sgaDatabase';
import { UserAccount, AuditLogEntry } from '../../types';
import {
  CalendarCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Plus,
  Trash2,
  Clock,
  MapPin,
  Users,
  Search,
  BookOpen,
  ShieldCheck
} from 'lucide-react';

interface SgaEnrollmentProps {
  currentUser: UserAccount;
  groups: AcademicGroup[];
  setGroups: React.Dispatch<React.SetStateAction<AcademicGroup[]>>;
  enrollments: EnrollmentRecord[];
  setEnrollments: React.Dispatch<React.SetStateAction<EnrollmentRecord[]>>;
  students: StudentProfile[];
  periods: AcademicPeriod[];
  onAddAuditLog: (action: string, record: string, details: string, status?: 'EXITOSO' | 'DENEGADO') => void;
}

export const SgaEnrollment: React.FC<SgaEnrollmentProps> = ({
  currentUser,
  groups,
  setGroups,
  enrollments,
  setEnrollments,
  students,
  periods,
  onAddAuditLog
}) => {
  const [selectedPeriodId, setSelectedPeriodId] = useState<string>(periods[0]?.id || 'per-01');
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState<{ type: 'success' | 'error' | 'warning'; message: string } | null>(null);

  // Determine current student: if logged in user is student, use their profile, otherwise allow simulating with any student
  const loggedStudent = students.find(s => s.userId === currentUser.id);
  const [simulatedStudentId, setSimulatedStudentId] = useState<string>(loggedStudent?.id || students[0]?.id || 'est-01');

  const activeStudent = students.find(s => s.id === simulatedStudentId) || students[0];

  // Active student's enrolled courses for the selected period
  const studentEnrollments = enrollments.filter(
    e => e.studentId === activeStudent.id && e.periodId === selectedPeriodId && e.status === 'MATRICULADA'
  );

  const totalCreditsEnrolled = studentEnrollments.reduce((acc, curr) => acc + curr.credits, 0);

  // Available groups for the period
  const availableGroups = groups.filter(g => {
    const matchesPeriod = g.periodId === selectedPeriodId;
    const matchesSearch =
      g.subjectCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.subjectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.teacherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.code.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesPeriod && matchesSearch;
  });

  // Handle Enrollment Transaction (RF-07 & RNF-07)
  const handleEnrollGroup = (group: AcademicGroup) => {
    // 1. Check duplicate enrollment in the same subject
    const alreadyEnrolled = studentEnrollments.some(e => e.subjectCode === group.subjectCode);
    if (alreadyEnrolled) {
      setNotification({
        type: 'error',
        message: `Transacción Rechazada (HTTP 409 Conflict): El estudiante ya tiene matriculada la asignatura ${group.subjectCode} - ${group.subjectName} en este periodo.`
      });
      onAddAuditLog(
        "INTENTO_MATRICULA_DUPLICADA",
        `Estudiante: ${activeStudent.name} -> Asignatura: ${group.subjectCode}`,
        "El motor de validación bloqueó la inscripción para evitar duplicidad curricular.",
        "DENEGADO"
      );
      return;
    }

    // 2. Check Cupos Disponibles (Pessimistic lock logic)
    if (group.occupiedCapacity >= group.maxCapacity) {
      setNotification({
        type: 'error',
        message: `Transacción Rechazada (HTTP 422 Unprocessable): El grupo ${group.code} ha agotado todos sus cupos disponibles (${group.maxCapacity}/${group.maxCapacity}). No se permite sobrecupo.`
      });
      onAddAuditLog(
        "INTENTO_MATRICULA_SIN_CUPO",
        `Grupo: ${group.code} (${group.subjectCode})`,
        `Capacidad máxima alcanzada (${group.maxCapacity}/${group.maxCapacity}). Transacción abortada (ROLLBACK).`,
        "DENEGADO"
      );
      return;
    }

    // 3. Credit limit check (e.g. max 20 credits per semester)
    const subjectCredits = 4; // default credits
    if (totalCreditsEnrolled + subjectCredits > 22) {
      setNotification({
        type: 'warning',
        message: `Límite de créditos excedido: No se puede matricular más de 22 créditos en un semestre regular.`
      });
      return;
    }

    // 4. Atomic Execution: Increment cupo & insert enrollment
    const now = new Date();
    const formattedDate = `${now.toISOString().replace('T', ' ').substring(0, 19)}`;

    const newEnrollment: EnrollmentRecord = {
      id: `mat-${Date.now().toString().slice(-4)}`,
      studentId: activeStudent.id,
      studentName: activeStudent.name,
      groupId: group.id,
      subjectCode: group.subjectCode,
      subjectName: group.subjectName,
      credits: subjectCredits,
      periodId: selectedPeriodId,
      enrolledAt: formattedDate,
      status: 'MATRICULADA',
      corte1: undefined,
      corte2: undefined,
      corte3: undefined,
      gradeStatus: 'EN_CURSO'
    };

    // Update group occupied count
    setGroups(prev => prev.map(g => {
      if (g.id === group.id) {
        return { ...g, occupiedCapacity: g.occupiedCapacity + 1 };
      }
      return g;
    }));

    // Add enrollment record
    setEnrollments(prev => [newEnrollment, ...prev]);

    // Success notification
    setNotification({
      type: 'success',
      message: `¡Matrícula Exitosa! Asignatura ${group.subjectCode} (${group.code}) inscrita formalmente. Cupo asignado: ${group.occupiedCapacity + 1}/${group.maxCapacity}.`
    });

    // Write audit log entry
    onAddAuditLog(
      "MATRICULA_TRANSACCIONAL_EXITOSA",
      `Estudiante: ${activeStudent.name} (${activeStudent.code}) -> Grupo: ${group.code}`,
      `Transacción ACID confirmada. Cupo incrementado a ${group.occupiedCapacity + 1}/${group.maxCapacity}.`,
      "EXITOSO"
    );
  };

  // Handle Drop Subject (Retirar Asignatura)
  const handleDropEnrollment = (enrollment: EnrollmentRecord) => {
    if (!window.confirm(`¿Confirma el retiro de la asignatura ${enrollment.subjectName}? Esta acción liberará el cupo asignado.`)) {
      return;
    }

    // Free group capacity
    setGroups(prev => prev.map(g => {
      if (g.id === enrollment.groupId) {
        return { ...g, occupiedCapacity: Math.max(0, g.occupiedCapacity - 1) };
      }
      return g;
    }));

    // Remove from active enrollments
    setEnrollments(prev => prev.filter(e => e.id !== enrollment.id));

    setNotification({
      type: 'warning',
      message: `Asignatura ${enrollment.subjectCode} retirada exitosamente. El cupo ha sido liberado para otros estudiantes.`
    });

    onAddAuditLog(
      "RETIRO_ASIGNATURA_MATRICULADA",
      `Estudiante: ${activeStudent.name} -> Asignatura: ${enrollment.subjectCode}`,
      "Cupo liberado en el grupo. Transacción auditada.",
      "EXITOSO"
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Controls Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
            <CalendarCheck className="w-4 h-4" />
            <span>Módulo de Matrícula Académica (RF-07 Transaccional)</span>
          </div>
          <h2 className="text-xl font-extrabold text-stone-900 dark:text-stone-100 mt-1">
            Inscripción y Control Transaccional de Cupos
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
            Validación en tiempo real de disponibilidad de cupos, prevención de duplicados y transacciones ACID.
          </p>
        </div>

        {/* Student selector & Period selector */}
        <div className="flex flex-wrap items-center gap-3">
          <div>
            <label className="text-[11px] font-semibold block text-stone-600 dark:text-stone-400 mb-0.5">
              Periodo Académico:
            </label>
            <select
              value={selectedPeriodId}
              onChange={(e) => setSelectedPeriodId(e.target.value)}
              className="text-xs py-1.5 px-3 rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-medium"
            >
              {periods.map(p => (
                <option key={p.id} value={p.id}>
                  {p.code} - {p.status}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-semibold block text-stone-600 dark:text-stone-400 mb-0.5">
              Estudiante a Matricular:
            </label>
            <select
              value={simulatedStudentId}
              onChange={(e) => setSimulatedStudentId(e.target.value)}
              className="text-xs py-1.5 px-3 rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-medium"
            >
              {students.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.code})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div
          className={`p-4 rounded-xl border flex items-start justify-between gap-3 text-xs transition-all ${
            notification.type === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
              : notification.type === 'error'
              ? 'bg-red-50 dark:bg-red-950/40 border-red-300 dark:border-red-800 text-red-900 dark:text-red-200'
              : 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200'
          }`}
        >
          <div className="flex items-center gap-2">
            {notification.type === 'success' && <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />}
            {notification.type === 'error' && <XCircle className="w-4 h-4 shrink-0 text-red-600" />}
            {notification.type === 'warning' && <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />}
            <span className="font-medium leading-relaxed">{notification.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setNotification(null)}
            className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Active Student Summary Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-800 text-xs">
        <div>
          <span className="text-stone-500 block">Estudiante Activo:</span>
          <span className="font-bold text-stone-900 dark:text-stone-100 text-sm">{activeStudent.name}</span>
          <span className="text-[11px] font-mono text-stone-500 block">{activeStudent.code} · Semestre {activeStudent.currentSemester}</span>
        </div>
        <div>
          <span className="text-stone-500 block">Programa Académico:</span>
          <span className="font-semibold text-stone-900 dark:text-stone-100">{activeStudent.programName}</span>
        </div>
        <div>
          <span className="text-stone-500 block">Créditos Inscritos:</span>
          <span className="font-bold font-mono text-amber-600 dark:text-amber-400 text-sm">
            {totalCreditsEnrolled} créditos
          </span>
          <span className="text-[10px] text-stone-500 block">(Máximo permitido: 22)</span>
        </div>
        <div>
          <span className="text-stone-500 block">Asignaturas en Periodo:</span>
          <span className="font-bold font-mono text-stone-900 dark:text-stone-100 text-sm">
            {studentEnrollments.length} matriculadas
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Available Groups for Registration */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-600" />
              <span>Oferta de Asignaturas y Grupos Disponibles</span>
            </h3>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Buscar por materia, código..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-xs pl-8 pr-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 placeholder-stone-400"
              />
            </div>
          </div>

          {/* Groups List */}
          <div className="space-y-3">
            {availableGroups.length === 0 ? (
              <div className="p-8 text-center text-stone-500 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 text-xs">
                No hay grupos ofertados que coincidan con la búsqueda.
              </div>
            ) : (
              availableGroups.map(group => {
                const isAlreadyEnrolled = studentEnrollments.some(e => e.subjectCode === group.subjectCode);
                const isFull = group.occupiedCapacity >= group.maxCapacity;
                const availableSeats = group.maxCapacity - group.occupiedCapacity;

                return (
                  <div
                    key={group.id}
                    className={`p-4 rounded-xl border transition-all bg-white dark:bg-stone-900 ${
                      isAlreadyEnrolled
                        ? 'border-emerald-300 dark:border-emerald-800/60 bg-emerald-50/10'
                        : isFull
                        ? 'border-stone-200 dark:border-stone-800 opacity-80'
                        : 'border-stone-200 dark:border-stone-800 hover:border-amber-400'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200">
                            {group.subjectCode}
                          </span>
                          <span className="text-xs font-semibold text-stone-500 font-mono">
                            Grupo {group.code}
                          </span>
                          {isAlreadyEnrolled && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                              Ya Inscrita
                            </span>
                          )}
                          {isFull && !isAlreadyEnrolled && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300">
                              Cupos Agotados
                            </span>
                          )}
                        </div>

                        <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                          {group.subjectName}
                        </h4>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-stone-600 dark:text-stone-400">
                          <span className="flex items-center gap-1">
                            <Users className="w-3.5 h-3.5 text-stone-400" />
                            <span>Docente: {group.teacherName}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-stone-400" />
                            <span>{group.schedule}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-stone-400" />
                            <span>{group.classroom}</span>
                          </span>
                        </div>
                      </div>

                      {/* Capacity and Action */}
                      <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-0 border-stone-100 dark:border-stone-800">
                        {/* Capacity meter */}
                        <div className="text-right">
                          <div className="text-xs font-mono font-bold">
                            <span className={isFull ? 'text-red-600 dark:text-red-400' : 'text-stone-900 dark:text-stone-100'}>
                              {group.occupiedCapacity}
                            </span>
                            <span className="text-stone-400"> / {group.maxCapacity}</span>
                          </div>
                          <span className={`text-[10px] block ${
                            isFull
                              ? 'text-red-600 font-semibold'
                              : availableSeats <= 3
                              ? 'text-amber-600 font-semibold'
                              : 'text-stone-500'
                          }`}>
                            {availableSeats === 0 ? 'Sin cupos disponibles' : `${availableSeats} cupos libres`}
                          </span>
                        </div>

                        {/* Enroll Button */}
                        <button
                          type="button"
                          disabled={isAlreadyEnrolled || isFull}
                          onClick={() => handleEnrollGroup(group)}
                          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1 shadow-xs ${
                            isAlreadyEnrolled
                              ? 'bg-stone-100 dark:bg-stone-800 text-stone-400 cursor-not-allowed border border-stone-200 dark:border-stone-700'
                              : isFull
                              ? 'bg-red-50 text-red-400 dark:bg-red-950/20 dark:text-red-400 cursor-not-allowed border border-red-200 dark:border-red-900'
                              : 'bg-amber-600 text-white hover:bg-amber-700 active:scale-95'
                          }`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>{isAlreadyEnrolled ? 'Matriculada' : isFull ? 'Lleno' : 'Matricular'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right 1 Col: Student's Enrolled Schedule & Actions */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Asignaturas Matriculadas ({studentEnrollments.length})</span>
          </h3>

          <div className="border border-stone-200 dark:border-stone-800 rounded-xl bg-white dark:bg-stone-900 p-4 space-y-3 shadow-xs">
            {studentEnrollments.length === 0 ? (
              <div className="p-6 text-center text-xs text-stone-500">
                No tiene asignaturas matriculadas para el periodo {selectedPeriodId}. Seleccione asignaturas de la oferta a la izquierda.
              </div>
            ) : (
              studentEnrollments.map(item => (
                <div
                  key={item.id}
                  className="p-3 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/40 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-amber-700 dark:text-amber-400">
                      {item.subjectCode}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDropEnrollment(item)}
                      className="text-stone-400 hover:text-red-600 transition-colors p-1"
                      title="Retirar asignatura (liberar cupo)"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h5 className="text-xs font-bold text-stone-900 dark:text-stone-100">
                    {item.subjectName}
                  </h5>

                  <div className="flex items-center justify-between text-[11px] text-stone-500">
                    <span>{item.credits} créditos académicos</span>
                    <span className="font-mono text-[10px] text-emerald-600 font-semibold">CONFIRMADA</span>
                  </div>
                </div>
              ))
            )}

            {studentEnrollments.length > 0 && (
              <div className="pt-3 border-t border-stone-200 dark:border-stone-800 text-xs flex items-center justify-between font-semibold">
                <span>Total Créditos Semestre:</span>
                <span className="font-mono text-amber-600 dark:text-amber-400 font-bold">
                  {totalCreditsEnrolled} / 22
                </span>
              </div>
            )}
          </div>

          {/* Architectural highlight notice */}
          <div className="p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/40 text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong>Garantía de Consistencia (ACID):</strong> Al pulsar 'Matricular', el sistema ejecuta una transacción atómica que adquiere el bloqueo de fila en PostgreSQL (<code>SELECT ... FOR UPDATE</code>), asegurando cero sobrecupo y trazabilidad forense inmediata.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
