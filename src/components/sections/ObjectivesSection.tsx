import React from 'react';
import { Target, CheckCircle2, Shield, Zap, RefreshCw, BarChart2, Layers } from 'lucide-react';

export const ObjectivesSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="border border-stone-200 dark:border-stone-800 rounded-xl p-6 sm:p-8 bg-white dark:bg-stone-900 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 mb-6 flex items-center gap-2">
          <Target className="w-6 h-6 text-amber-600" />
          <span>3. Objetivo General y Objetivos Específicos</span>
        </h2>

        {/* General Objective */}
        <div className="p-5 rounded-xl bg-amber-500/10 dark:bg-amber-400/5 border border-amber-300 dark:border-amber-800/60 mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 block mb-1">
            Objetivo General de la Arquitectura
          </span>
          <p className="text-base sm:text-lg font-medium text-stone-900 dark:text-stone-100 leading-relaxed">
            Diseñar y especificar la arquitectura de software de un Sistema de Gestión Académica (SGA) integral, modular, seguro y de alta disponibilidad para una institución de educación superior, que centralice y garantice la consistencia transaccional y la trazabilidad de los procesos de gestión de estudiantes, docentes, programas, grupos, matrículas y calificaciones.
          </p>
        </div>

        {/* Specific Objectives Grid */}
        <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-4">
          Objetivos Específicos
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700/80 space-y-2">
            <div className="flex items-center gap-2 text-stone-900 dark:text-stone-100 font-semibold text-sm">
              <span className="w-5 h-5 rounded-full bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs flex items-center justify-center font-bold">1</span>
              <span>Estructura Monolítica Modular</span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed pl-7">
              Diseñar una descomposición en módulos desacoplados (Bounded Contexts) bajo principios de Arquitectura Limpia, eliminando la complejidad de los microservicios sin sacrificar la mantenibilidad.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700/80 space-y-2">
            <div className="flex items-center gap-2 text-stone-900 dark:text-stone-100 font-semibold text-sm">
              <span className="w-5 h-5 rounded-full bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs flex items-center justify-center font-bold">2</span>
              <span>Consistencia Transaccional Estricta</span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed pl-7">
              Garantizar propiedades ACID en la inscripción de asignaturas y control de cupos mediante bloqueos a nivel de fila (<code>SELECT FOR UPDATE</code>) en PostgreSQL, erradicando el sobrecupo bajo concurrencia.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700/80 space-y-2">
            <div className="flex items-center gap-2 text-stone-900 dark:text-stone-100 font-semibold text-sm">
              <span className="w-5 h-5 rounded-full bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs flex items-center justify-center font-bold">3</span>
              <span>Control de Acceso y Trazabilidad Forense</span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed pl-7">
              Definir un modelo de seguridad basado en roles (RBAC) con tokens JWT y persistencia inmutable de eventos críticos en una tabla de auditoría con identificación de autor, fecha, IP y cambios.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700/80 space-y-2">
            <div className="flex items-center gap-2 text-stone-900 dark:text-stone-100 font-semibold text-sm">
              <span className="w-5 h-5 rounded-full bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs flex items-center justify-center font-bold">4</span>
              <span>Garantía de Rendimiento y Disponibilidad</span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed pl-7">
              Asegurar que el 95% de las transacciones respondan en menos de 3.0 segundos con 300 usuarios concurrentes (RNF-02) y una disponibilidad del 99.5% mediante réplicas de lectura y balanceo de carga.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
