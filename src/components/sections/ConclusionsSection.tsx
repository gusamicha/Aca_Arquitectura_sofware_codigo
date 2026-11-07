import React from 'react';
import { CheckCircle2, Lightbulb, Compass, Award, ArrowUpRight } from 'lucide-react';

export const ConclusionsSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="border border-stone-200 dark:border-stone-800 rounded-xl p-6 sm:p-8 bg-white dark:bg-stone-900 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 mb-6 flex items-center gap-2">
          <Award className="w-6 h-6 text-amber-600" />
          <span>13. Conclusiones Arquitectónicas y Recomendaciones</span>
        </h2>

        {/* Conclusions */}
        <div className="space-y-4 mb-8">
          <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Conclusiones de Ingeniería</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-800/40 text-xs space-y-1.5 leading-relaxed">
              <span className="font-bold text-stone-900 dark:text-stone-100 block">
                1. Idoneidad del Monolito Modular:
              </span>
              <p className="text-stone-600 dark:text-stone-400">
                La arquitectura de monolito modular en capas demostró ser la alternativa óptima para el SGA institucional. Mitiga los riesgos de fragmentación y latencia de los microservicios sin caer en el acoplamiento desordenado de los monolitos clásicos, garantizando el cumplimiento de RNF-02 (P95 &le; 3.0 s) y RNF-05 (Mantenibilidad).
              </p>
            </div>

            <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-800/40 text-xs space-y-1.5 leading-relaxed">
              <span className="font-bold text-stone-900 dark:text-stone-100 block">
                2. Consistencia e Integridad Transaccional:
              </span>
              <p className="text-stone-600 dark:text-stone-400">
                El control de concurrencia mediante bloqueos a nivel de fila (<code>SELECT FOR UPDATE</code>) en PostgreSQL resuelve de forma definitiva el problema histórico del sobrecupo en matrículas, eliminando condiciones de carrera sin requerir orquestadores de transacciones distribuidas.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-800/40 text-xs space-y-1.5 leading-relaxed">
              <span className="font-bold text-stone-900 dark:text-stone-100 block">
                3. Seguridad y Trazabilidad Inmutable:
              </span>
              <p className="text-stone-600 dark:text-stone-400">
                El desacoplamiento del modelo RBAC y la implementación de una bitácora de auditoría transaccional append-only garantizan que cualquier mutación crítica sobre calificaciones o datos personales quede blindada para peritajes forenses y cumplimiento de la Ley 1581 (Habeas Data).
              </p>
            </div>

            <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-800/40 text-xs space-y-1.5 leading-relaxed">
              <span className="font-bold text-stone-900 dark:text-stone-100 block">
                4. Eficiencia Económica y Sostenibilidad:
              </span>
              <p className="text-stone-600 dark:text-stone-400">
                Al consolidar la infraestructura en contenedores Docker y PostgreSQL gestionado con réplica de lectura, los costos operativos de nube se reducen en más de un 60% en comparación con un despliegue de microservicios sobre clúster Kubernetes.
              </p>
            </div>
          </div>
        </div>

        {/* Practical Recommendations */}
        <div className="pt-6 border-t border-stone-200 dark:border-stone-800 space-y-4">
          <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-600" />
            <span>Recomendaciones para la Fase de Implementación y Despliegue</span>
          </h3>

          <div className="space-y-3 text-xs text-stone-700 dark:text-stone-300">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
              <span className="font-bold text-amber-600 font-mono shrink-0">REC-01</span>
              <div>
                <strong className="text-stone-900 dark:text-stone-100 block">Pruebas de Carga Tempranas con Herramientas As-Code (k6):</strong>
                Antes del periodo oficial de matrículas, ejecutar pruebas de estrés continuas simulando 500 usuarios concurrentes para validar los tiempos de respuesta y afinar los límites del pool de PgBouncer.
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
              <span className="font-bold text-amber-600 font-mono shrink-0">REC-02</span>
              <div>
                <strong className="text-stone-900 dark:text-stone-100 block">Estrategia de Migración Gradual de Datos Legados (ETL Validado):</strong>
                Diseñar un pipeline de extracción, transformación y carga (ETL) con validación estricta de esquemas antes de migrar los expedientes históricos de estudiantes y docentes hacia PostgreSQL.
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
              <span className="font-bold text-amber-600 font-mono shrink-0">REC-03</span>
              <div>
                <strong className="text-stone-900 dark:text-stone-100 block">Monitoreo APM y Alertas Proactivas:</strong>
                Integrar Prometheus y Grafana para supervisar en tiempo real métricas de CPU, memoria, tasa de consultas lentas en PostgreSQL y saturación de conexiones en la base de datos.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
