import React from 'react';
import {
  StudentProfile,
  TeacherProfile,
  AcademicGroup,
  EnrollmentRecord,
  AcademicPeriod
} from '../../data/sgaDatabase';
import { UserAccount, AuditLogEntry } from '../../types';
import {
  Users,
  GraduationCap,
  CalendarCheck,
  BookOpen,
  Briefcase,
  History,
  Activity,
  ArrowRight,
  Shield,
  FileCheck
} from 'lucide-react';

interface SgaDashboardProps {
  currentUser: UserAccount;
  students: StudentProfile[];
  teachers: TeacherProfile[];
  groups: AcademicGroup[];
  enrollments: EnrollmentRecord[];
  periods: AcademicPeriod[];
  auditLogs: AuditLogEntry[];
  onNavigateTab: (tabId: string) => void;
}

export const SgaDashboard: React.FC<SgaDashboardProps> = ({
  currentUser,
  students,
  teachers,
  groups,
  enrollments,
  periods,
  auditLogs,
  onNavigateTab
}) => {
  const activePeriod = periods.find(p => p.status === 'ACTIVO') || periods[0];
  const activeEnrollmentsCount = enrollments.filter(e => e.status === 'MATRICULADA').length;

  return (
    <div className="space-y-6">
      {/* Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-stone-900 to-stone-800 text-white shadow-md">
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
              PERIODO ACADÉMICO {activePeriod.code} · ACTIVO
            </span>
            <span className="text-xs text-stone-300 font-mono">
              Rol en Sesión: <strong className="text-white">{currentUser.role}</strong>
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Bienvenido al SGA, {currentUser.name}
          </h2>

          <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
            Plataforma centralizada de registro, programación, matrícula transaccional y evaluación para la educación superior. Todos los módulos operan bajo garantías ACID y control RBAC.
          </p>

          <div className="pt-2 flex flex-wrap gap-2 text-xs">
            {currentUser.role === 'ADMINISTRADOR' && (
              <button
                type="button"
                onClick={() => onNavigateTab('users')}
                className="px-3.5 py-2 rounded-lg bg-amber-600 text-white font-semibold hover:bg-amber-700 transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <Shield className="w-4 h-4" />
                <span>Gestionar Usuarios & Roles</span>
              </button>
            )}

            {(currentUser.role === 'DOCENTE' || currentUser.role === 'ADMINISTRADOR' || currentUser.role === 'COORDINADOR') && (
              <button
                type="button"
                onClick={() => onNavigateTab('grades')}
                className="px-3.5 py-2 rounded-lg bg-white/10 text-white font-semibold hover:bg-white/20 transition-colors flex items-center gap-1.5 border border-white/20"
              >
                <FileCheck className="w-4 h-4 text-emerald-400" />
                <span>Libro de Calificaciones</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => onNavigateTab('enrollment')}
              className="px-3.5 py-2 rounded-lg bg-white/10 text-white font-semibold hover:bg-white/20 transition-colors flex items-center gap-1.5 border border-white/20"
            >
              <CalendarCheck className="w-4 h-4 text-amber-400" />
              <span>Matrícula en Línea</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => onNavigateTab('students')}
          className="p-5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-xs cursor-pointer hover:border-amber-400 transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500">Estudiantes</span>
            <Users className="w-4 h-4 text-stone-400 group-hover:text-amber-600" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-stone-900 dark:text-stone-100 mt-2">
            {students.length}
          </div>
          <span className="text-[11px] text-emerald-600 font-medium block mt-1">100% Expedientes activos</span>
        </div>

        <div
          onClick={() => onNavigateTab('teachers')}
          className="p-5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-xs cursor-pointer hover:border-amber-400 transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500">Docentes</span>
            <Briefcase className="w-4 h-4 text-stone-400 group-hover:text-amber-600" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-stone-900 dark:text-stone-100 mt-2">
            {teachers.length}
          </div>
          <span className="text-[11px] text-stone-500 block mt-1">Planta y Cátedra</span>
        </div>

        <div
          onClick={() => onNavigateTab('groups')}
          className="p-5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-xs cursor-pointer hover:border-amber-400 transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500">Grupos Programados</span>
            <CalendarCheck className="w-4 h-4 text-stone-400 group-hover:text-amber-600" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-stone-900 dark:text-stone-100 mt-2">
            {groups.length}
          </div>
          <span className="text-[11px] text-stone-500 block mt-1">Periodo {activePeriod.code}</span>
        </div>

        <div
          onClick={() => onNavigateTab('enrollment')}
          className="p-5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-xs cursor-pointer hover:border-amber-400 transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500">Inscripciones Activas</span>
            <BookOpen className="w-4 h-4 text-stone-400 group-hover:text-amber-600" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-amber-600 mt-2">
            {activeEnrollmentsCount}
          </div>
          <span className="text-[11px] text-emerald-600 font-medium block mt-1">Zero Sobrecupos</span>
        </div>
      </div>

      {/* 2-Column Split: Operational Modules + Real Time Audit Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Quick Access to Operational Modules */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
            Módulos Principales del Sistema
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div
              onClick={() => onNavigateTab('enrollment')}
              className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-amber-400 transition-all cursor-pointer space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-stone-900 dark:text-stone-100 group-hover:text-amber-600">
                  Matrícula Transaccional (RF-07)
                </span>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-stone-500 leading-relaxed">
                Inscripción de grupos con validación pesimista de cupos en PostgreSQL y verificación de duplicados.
              </p>
            </div>

            <div
              onClick={() => onNavigateTab('grades')}
              className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-amber-400 transition-all cursor-pointer space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-stone-900 dark:text-stone-100 group-hover:text-amber-600">
                  Libro de Calificaciones (RF-08)
                </span>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-stone-500 leading-relaxed">
                Asentamiento de notas por cortes evaluativos (30%, 35%, 35%) y sellado criptográfico de actas.
              </p>
            </div>

            <div
              onClick={() => onNavigateTab('kardex')}
              className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-amber-400 transition-all cursor-pointer space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-stone-900 dark:text-stone-100 group-hover:text-amber-600">
                  Kardex e Historial (RF-09)
                </span>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-stone-500 leading-relaxed">
                Seguimiento de avance de malla, cálculo exacto de promedio acumulado y asignaturas aprobadas.
              </p>
            </div>

            <div
              onClick={() => onNavigateTab('reports')}
              className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-amber-400 transition-all cursor-pointer space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-stone-900 dark:text-stone-100 group-hover:text-amber-600">
                  Actas Oficiales y Reportes (RF-10)
                </span>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-stone-500 leading-relaxed">
                Generación de actas institucionales imprimibles con hash SHA-256 y estadísticas de aprobación.
              </p>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Live Audit Log Feed */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <History className="w-4 h-4 text-amber-600" />
              <span>Eventos Recientes (Auditoría)</span>
            </h3>
            <button
              type="button"
              onClick={() => onNavigateTab('audit')}
              className="text-xs text-amber-700 dark:text-amber-400 font-semibold hover:underline"
            >
              Ver todos ({auditLogs.length})
            </button>
          </div>

          <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 space-y-3 shadow-xs">
            {auditLogs.slice(0, 5).map(log => (
              <div
                key={log.id}
                className="p-3 rounded-lg bg-stone-50 dark:bg-stone-800/40 border border-stone-100 dark:border-stone-800 text-xs space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-[10px] text-amber-700 dark:text-amber-400">
                    {log.action}
                  </span>
                  <span className="text-[10px] font-mono text-stone-400">
                    {log.timestamp.split(' ')[1]}
                  </span>
                </div>
                <div className="font-medium text-stone-900 dark:text-stone-100 truncate">
                  {log.user}
                </div>
                <div className="text-[11px] text-stone-500 truncate">
                  {log.affectedRecord}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
