import React from 'react';
import { AlertCircle, Database, Lock, Shuffle, CheckCircle2, TrendingUp } from 'lucide-react';

export const IntroProblemSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="border border-stone-200 dark:border-stone-800 rounded-xl p-6 sm:p-8 bg-white dark:bg-stone-900 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4">
          2. Introducción y Planteamiento del Problema
        </h2>

        {/* Narrative Context */}
        <div className="prose dark:prose-invert max-w-none text-sm text-stone-700 dark:text-stone-300 space-y-4 leading-relaxed">
          <p>
            Las instituciones de educación superior enfrentan hoy un escenario de alta exigencia operativa en la gestión de sus procesos misionales: la admisión de estudiantes, la programación de mallas curriculares, la inscripción de asignaturas en periodos de alta concurrencia, el registro ponderado de calificaciones y la expedición confiable de actas y certificados académicos.
          </p>

          <p>
            Históricamente, muchas instituciones operan bajo una infraestructura fragmentada, donde coexisten sistemas heredados (legacy), bases de datos aisladas e incluso hojas de cálculo distribuidas entre facultades y departamentos. Esta dispersión genera fricciones operativas críticas:
          </p>
        </div>

        {/* Diagnosis of Academic Problems */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <div className="p-4 rounded-lg bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 space-y-2">
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-semibold text-xs uppercase tracking-wider">
              <Shuffle className="w-4 h-4" />
              <span>Inconsistencias y Sobrecupo</span>
            </div>
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
              Pérdida de Integridad Transaccional
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Durante las jornadas de matrícula, la concurrencia simultánea sin bloqueos atómicos genera la sobreventa de cupos físicos en aulas, duplicidad en inscripciones de estudiantes y cruces inadvertidos de horarios para docentes y alumnos.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 space-y-2">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold text-xs uppercase tracking-wider">
              <AlertCircle className="w-4 h-4" />
              <span>Opacidad y Vulnerabilidad</span>
            </div>
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
              Carencia de Auditoría Forense
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Las modificaciones de calificaciones extemporáneas o alteraciones de notas en actas oficiales se realizan con frecuencia sin un rastro inmutable que identifique de manera inequívoca qué usuario, en qué fecha/hora y desde qué dirección IP ejecutó el cambio.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 space-y-2">
            <div className="flex items-center gap-2 text-stone-600 dark:text-stone-400 font-semibold text-xs uppercase tracking-wider">
              <Database className="w-4 h-4" />
              <span>Sobrecosto y Complejidad</span>
            </div>
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
              Sobredimensionamiento Tecnológico
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Intentar resolver estos problemas dividiendo prematuramente el sistema en decenas de microservicios distribuidos genera costos desmedidos de infraestructura en la nube, latencia de red y una complejidad de mantenimiento inasumible para el equipo de TI institucional.
            </p>
          </div>
        </div>

        {/* Proposed Solution Justification */}
        <div className="mt-6 pt-6 border-t border-stone-200 dark:border-stone-800">
          <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-2 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            Justificación de la Solución Arquitectónica
          </h3>
          <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
            Frente a este escenario, este dossier formula la arquitectura de un <strong>Sistema de Gestión Académica (SGA)</strong> centralizado, seguro y escalable, fundamentado en el patrón de <strong>Monolito Modular en Capas</strong> con base de datos relacional <strong>PostgreSQL</strong>. Esta combinación garantiza el cumplimiento simultáneo de consistencia estricta (ACID) en matrículas, respuestas por debajo de 3 segundos con 300 usuarios concurrentes, segregación de privilegios basada en roles (RBAC) y trazabilidad inmutable de todas las operaciones académicas críticas.
          </p>
        </div>
      </div>
    </div>
  );
};
