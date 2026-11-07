import React, { useState } from 'react';
import { StudentProfile, EnrollmentRecord } from '../../data/sgaDatabase';
import { UserAccount } from '../../types';
import { GraduationCap, Award, BookOpen, CheckCircle, TrendingUp, Calendar, FileText } from 'lucide-react';

interface SgaKardexProps {
  currentUser: UserAccount;
  students: StudentProfile[];
  enrollments: EnrollmentRecord[];
}

export const SgaKardex: React.FC<SgaKardexProps> = ({
  currentUser,
  students,
  enrollments
}) => {
  // If current user is student, pick their profile, else default to Mariana Silva
  const loggedStudent = students.find(s => s.userId === currentUser.id);
  const [selectedStudentId, setSelectedStudentId] = useState<string>(loggedStudent?.id || students[0]?.id || 'est-01');

  const activeStudent = students.find(s => s.id === selectedStudentId) || students[0];

  // Student's all enrollments
  const studentRecords = enrollments.filter(e => e.studentId === activeStudent.id);

  // Group by periods or semesters
  const approvedRecords = studentRecords.filter(r => r.gradeStatus === 'APROBADA');
  const totalApprovedCredits = approvedRecords.reduce((acc, curr) => acc + curr.credits, 0);

  // Calculate actual weighted average from available final grades
  const gradedRecords = studentRecords.filter(r => r.finalGrade !== undefined);
  const calculatedGpa = gradedRecords.length > 0
    ? (gradedRecords.reduce((acc, curr) => acc + (curr.finalGrade! * curr.credits), 0) /
       gradedRecords.reduce((acc, curr) => acc + curr.credits, 0)).toFixed(2)
    : activeStudent.cumulativeGpa.toFixed(2);

  return (
    <div className="space-y-6">
      {/* Top Banner & Student Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
            <GraduationCap className="w-4 h-4" />
            <span>Módulo de Historial Académico y Kardex (RF-09)</span>
          </div>
          <h2 className="text-xl font-extrabold text-stone-900 dark:text-stone-100 mt-1">
            Kardex Estudiantil y Sabana de Calificaciones
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
            Cálculo matemático de promedios ponderados, estado de avance curricular y registro histórico.
          </p>
        </div>

        <div>
          <label className="text-[11px] font-semibold block text-stone-600 dark:text-stone-400 mb-0.5">
            Consultar Estudiante:
          </label>
          <select
            value={selectedStudentId}
            onChange={(e) => setSelectedStudentId(e.target.value)}
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

      {/* Student Academic Passport Card */}
      <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-xs px-2.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200">
                {activeStudent.code}
              </span>
              <span className="text-xs font-mono text-stone-500">Documento: CC {activeStudent.documentId}</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                {activeStudent.academicStatus}
              </span>
            </div>

            <h3 className="text-xl font-extrabold text-stone-900 dark:text-stone-100">
              {activeStudent.name}
            </h3>

            <p className="text-xs text-stone-600 dark:text-stone-400">
              {activeStudent.programName} · Nivel Actual: Semestre {activeStudent.currentSemester}
            </p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3.5 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 text-center">
              <span className="text-[10px] text-stone-500 uppercase font-semibold block">Promedio Ponderado</span>
              <span className="text-2xl font-mono font-extrabold text-amber-600 dark:text-amber-400">
                {calculatedGpa}
              </span>
              <span className="text-[10px] text-stone-400 block mt-0.5">Escala 0.0 - 5.0</span>
            </div>

            <div className="p-3.5 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 text-center">
              <span className="text-[10px] text-stone-500 uppercase font-semibold block">Créditos Aprobados</span>
              <span className="text-2xl font-mono font-extrabold text-stone-900 dark:text-stone-100">
                {activeStudent.creditsApproved + totalApprovedCredits}
              </span>
              <span className="text-[10px] text-stone-400 block mt-0.5">de 160 totales</span>
            </div>

            <div className="p-3.5 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 text-center col-span-2 sm:col-span-1">
              <span className="text-[10px] text-stone-500 uppercase font-semibold block">Avance de Malla</span>
              <span className="text-2xl font-mono font-extrabold text-emerald-600">
                {Math.round(((activeStudent.creditsApproved + totalApprovedCredits) / 160) * 100)}%
              </span>
              <span className="text-[10px] text-stone-400 block mt-0.5">Curricular</span>
            </div>
          </div>
        </div>
      </div>

      {/* History Table */}
      <div className="border border-stone-200 dark:border-stone-800 rounded-xl bg-white dark:bg-stone-900 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <span className="text-xs font-bold text-stone-800 dark:text-stone-200 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-600" />
            <span>Detalle de Asignaturas Cursadas en el Periodo Activo</span>
          </span>
          <span className="text-xs text-stone-500 font-mono">Periodo 2027-1</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-stone-100 dark:bg-stone-800/80 text-stone-800 dark:text-stone-200 border-b border-stone-200 dark:border-stone-700">
              <tr>
                <th className="p-3.5 font-mono">Código</th>
                <th className="p-3.5">Nombre de la Asignatura</th>
                <th className="p-3.5 text-center">Créditos</th>
                <th className="p-3.5 text-center">Corte 1 (30%)</th>
                <th className="p-3.5 text-center">Corte 2 (35%)</th>
                <th className="p-3.5 text-center">Corte 3 (35%)</th>
                <th className="p-3.5 text-center">Definitiva</th>
                <th className="p-3.5 text-center">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
              {studentRecords.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-stone-500">
                    No registra asignaturas inscritas para este periodo.
                  </td>
                </tr>
              ) : (
                studentRecords.map(item => (
                  <tr key={item.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-800/30 transition-colors">
                    <td className="p-3.5 font-mono font-bold text-amber-700 dark:text-amber-400">
                      {item.subjectCode}
                    </td>
                    <td className="p-3.5 font-semibold text-stone-900 dark:text-stone-100">
                      {item.subjectName}
                    </td>
                    <td className="p-3.5 text-center font-mono font-bold text-stone-700 dark:text-stone-300">
                      {item.credits}
                    </td>
                    <td className="p-3.5 text-center font-mono text-stone-800 dark:text-stone-200">
                      {item.corte1 !== undefined ? item.corte1.toFixed(1) : '--'}
                    </td>
                    <td className="p-3.5 text-center font-mono text-stone-800 dark:text-stone-200">
                      {item.corte2 !== undefined ? item.corte2.toFixed(1) : '--'}
                    </td>
                    <td className="p-3.5 text-center font-mono text-stone-800 dark:text-stone-200">
                      {item.corte3 !== undefined ? item.corte3.toFixed(1) : '--'}
                    </td>
                    <td className="p-3.5 text-center font-mono font-extrabold text-sm">
                      {item.finalGrade !== undefined ? (
                        <span className={item.finalGrade >= 3.0 ? 'text-emerald-600' : 'text-red-600'}>
                          {item.finalGrade.toFixed(2)}
                        </span>
                      ) : (
                        <span className="text-stone-400">En curso</span>
                      )}
                    </td>
                    <td className="p-3.5 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.gradeStatus === 'APROBADA'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : item.gradeStatus === 'REPROBADA'
                          ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                          : 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300'
                      }`}>
                        {item.gradeStatus || 'EN CURSO'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
