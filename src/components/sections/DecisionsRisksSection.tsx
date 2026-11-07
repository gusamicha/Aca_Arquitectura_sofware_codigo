import React, { useState } from 'react';
import { architectureDecisionsRecords, riskAnalysisItems } from '../../data/dossierData';
import { ShieldAlert, Award, FileCheck2, AlertTriangle, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const DecisionsRisksSection: React.FC = () => {
  const [expandedAdr, setExpandedAdr] = useState<string>('ADR-01');
  const [riskCategoryFilter, setRiskCategoryFilter] = useState<string>('TODOS');

  const filteredRisks = riskAnalysisItems.filter(r => {
    return riskCategoryFilter === 'TODOS' || r.category === riskCategoryFilter;
  });

  const qualityScenarios = [
    {
      attribute: "Rendimiento (RNF-02)",
      stimulus: "300 estudiantes intentan inscribir simultáneamente asignaturas en el inicio de la franja horaria de matrícula.",
      response: "El 95% de las peticiones HTTP de reserva y confirmación de matrícula responden en menos de 3.0 segundos sin errores 500.",
      architecturalTactic: "Monolito modular con llamadas en memoria, transacciones ultracortas (< 50ms) y PgBouncer con pool de conexiones optimizado."
    },
    {
      attribute: "Seguridad y Control de Acceso (RF-02 / RNF-01)",
      stimulus: "Un estudiante autenticado intenta inyectar una llamada HTTP PUT para modificar la nota de un compañero en la tabla de calificaciones.",
      response: "El middleware de RBAC intercepta la petición, verifica la carencia del permiso 'ActualizarNota', retorna HTTP 403 Forbidden y asienta el intento en auditoría.",
      architecturalTactic: "Middleware estricto que valida claims del token JWT y propiedad de recursos en el servidor sin confiar en parámetros del cliente."
    },
    {
      attribute: "Disponibilidad y Tolerancia a Fallos (RNF-03)",
      stimulus: "Fallo abrupto de hardware en uno de los contenedores de aplicación durante la semana de evaluaciones finales.",
      response: "El balanceador de carga redirige el tráfico en menos de 2 segundos hacia las instancias sanas restantes sin pérdida de sesiones.",
      architecturalTactic: "Diseño 100% 'stateless' en los servidores de aplicación con tokens JWT y datos de sesión en Redis."
    },
    {
      attribute: "Integridad de Datos (RNF-07)",
      stimulus: "50 estudiantes intentan matricularse en el último cupo disponible (cupo_ocupado = 29, cupo_maximo = 30) en el mismo milisegundo.",
      response: "Exactamente 1 solicitud tiene éxito (HTTP 201), incrementando el cupo a 30; las restantes 49 reciben respuesta controlada de cupo agotado (HTTP 422).",
      architecturalTactic: "Nivel de aislamiento transaccional con bloqueo pesimista de fila: <code>SELECT ... FOR UPDATE</code> en PostgreSQL."
    }
  ];

  return (
    <div className="space-y-8">
      {/* Subsection: 3 Architectural Decision Records (ADR) */}
      <div className="border border-stone-200 dark:border-stone-800 rounded-xl p-6 sm:p-8 bg-white dark:bg-stone-900 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <FileCheck2 className="w-6 h-6 text-amber-600" />
              <span>10. Decisiones Arquitectónicas (ADR), Atributos de Calidad y Riesgos</span>
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              Registro formal de decisiones técnicas (Architecture Decision Records) conforme al estándar de Michael Nygard.
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-mono">
            3 ADRs Formalizados
          </span>
        </div>

        {/* ADR List Accordion */}
        <div className="space-y-4 mb-8">
          {architectureDecisionsRecords.map(adr => {
            const isExpanded = expandedAdr === adr.id;
            return (
              <div
                key={adr.id}
                className="border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setExpandedAdr(isExpanded ? '' : adr.id)}
                  className="w-full p-4 sm:p-5 text-left bg-stone-50/70 dark:bg-stone-800/40 hover:bg-stone-100/70 dark:hover:bg-stone-800/70 transition-colors flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200">
                      {adr.id}
                    </span>
                    <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                      {adr.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> {adr.status}
                    </span>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-stone-500" /> : <ChevronDown className="w-4 h-4 text-stone-500" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="p-5 sm:p-6 bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 space-y-4 text-xs">
                    <div>
                      <strong className="text-stone-900 dark:text-stone-100 uppercase tracking-wide text-[11px] block mb-1">
                        Contexto del Problema:
                      </strong>
                      <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                        {adr.context}
                      </p>
                    </div>

                    <div>
                      <strong className="text-stone-900 dark:text-stone-100 uppercase tracking-wide text-[11px] block mb-1">
                        Decisión Arquitectónica Adoptada:
                      </strong>
                      <p className="text-stone-700 dark:text-stone-300 leading-relaxed font-medium">
                        {adr.decision}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div className="p-3.5 rounded-lg bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40">
                        <span className="font-bold text-emerald-900 dark:text-emerald-300 block mb-1.5">
                          Consecuencias Positivas:
                        </span>
                        <ul className="space-y-1 list-disc pl-4 text-stone-700 dark:text-stone-300 leading-relaxed">
                          {adr.consequencesPositive.map((c, i) => (
                            <li key={i}>{c}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-3.5 rounded-lg bg-amber-50/40 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40">
                        <span className="font-bold text-amber-900 dark:text-amber-300 block mb-1.5">
                          Compensaciones (Trade-Offs) y Mitigaciones:
                        </span>
                        <ul className="space-y-1 list-disc pl-4 text-stone-700 dark:text-stone-300 leading-relaxed">
                          {adr.mitigations.map((m, i) => (
                            <li key={i}>{m}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quality Scenarios */}
        <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-stone-700 dark:text-stone-300" />
          <span>Escenarios de Atributos de Calidad (SEI / ISO 25010)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {qualityScenarios.map((sc, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-800/30 text-xs space-y-2"
            >
              <span className="font-bold text-amber-700 dark:text-amber-400 block text-[11px] uppercase tracking-wider">
                {sc.attribute}
              </span>
              <p className="text-stone-800 dark:text-stone-200">
                <strong>Estímulo:</strong> {sc.stimulus}
              </p>
              <p className="text-stone-600 dark:text-stone-400">
                <strong>Respuesta Esperada:</strong> {sc.response}
              </p>
              <div className="pt-2 border-t border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300">
                <strong>Táctica Arquitectónica:</strong> <span dangerouslySetInnerHTML={{ __html: sc.architecturalTactic }} />
              </div>
            </div>
          ))}
        </div>

        {/* Risk Analysis Table */}
        <div className="pt-4 border-t border-stone-200 dark:border-stone-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-600" />
                <span>Análisis de Riesgos Arquitectónicos</span>
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Identificación de Puntos Únicos de Falla (SPOF), Riesgos de Seguridad y Límites de Escalabilidad con sus estrategias de contingencia.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-stone-500">Filtrar riesgo:</span>
              <select
                value={riskCategoryFilter}
                onChange={(e) => setRiskCategoryFilter(e.target.value)}
                className="text-xs py-1 px-2.5 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
              >
                <option value="TODOS">Todos los riesgos (6)</option>
                <option value="SPOF">Puntos Únicos de Falla (SPOF)</option>
                <option value="Seguridad">Seguridad de la Información</option>
                <option value="Escalabilidad">Límites de Escalabilidad</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto border border-stone-200 dark:border-stone-800 rounded-lg">
            <table className="w-full text-xs text-left">
              <thead className="bg-stone-100 dark:bg-stone-800/80 text-stone-800 dark:text-stone-200 border-b border-stone-200 dark:border-stone-700">
                <tr>
                  <th className="p-3 font-mono">ID</th>
                  <th className="p-3">Categoría</th>
                  <th className="p-3">Riesgo Identificado</th>
                  <th className="p-3 text-center">Impacto / Probabilidad</th>
                  <th className="p-3">Estrategia Preventiva de Mitigación</th>
                  <th className="p-3">Plan de Contingencia ante Falla</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
                {filteredRisks.map(r => (
                  <tr key={r.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-800/30 transition-colors">
                    <td className="p-3 font-mono font-bold text-stone-700 dark:text-stone-300 whitespace-nowrap">
                      {r.id}
                    </td>
                    <td className="p-3 font-semibold text-stone-900 dark:text-stone-100 whitespace-nowrap">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                        r.category === 'SPOF'
                          ? 'bg-red-100 text-red-900 dark:bg-red-950 dark:text-red-200'
                          : r.category === 'Seguridad'
                          ? 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200'
                          : 'bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-200'
                      }`}>
                        {r.category}
                      </span>
                    </td>
                    <td className="p-3 font-medium text-stone-800 dark:text-stone-200 leading-relaxed max-w-xs">
                      {r.risk}
                    </td>
                    <td className="p-3 text-center whitespace-nowrap font-mono text-[11px]">
                      <span className="text-red-600 dark:text-red-400 font-bold">{r.impact}</span> / <span className="text-stone-500">{r.likelihood}</span>
                    </td>
                    <td className="p-3 text-stone-700 dark:text-stone-300 leading-relaxed max-w-xs">
                      {r.mitigationStrategy}
                    </td>
                    <td className="p-3 text-stone-600 dark:text-stone-400 leading-relaxed max-w-xs">
                      {r.contingencyPlan}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
