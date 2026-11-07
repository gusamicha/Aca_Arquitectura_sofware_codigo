import React from 'react';
import { architectureComparisons } from '../../data/dossierData';
import { Layers, Database, ShieldCheck, CheckCircle2, XCircle, ArrowRight, Sparkles } from 'lucide-react';

export const ArchitectureSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="border border-stone-200 dark:border-stone-800 rounded-xl p-6 sm:p-8 bg-white dark:bg-stone-900 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 mb-6 flex items-center gap-2">
          <Layers className="w-6 h-6 text-amber-600" />
          <span>6. Arquitectura Elegida: Monolito Modular en Capas con Base de Datos Relacional</span>
        </h2>

        {/* Narrative & Justification */}
        <div className="prose dark:prose-invert max-w-none text-sm text-stone-700 dark:text-stone-300 space-y-4 leading-relaxed mb-8">
          <p>
            Tras evaluar exhaustivamente los requisitos funcionales (12 RF) y no funcionales (12 RNF) del Sistema de Gestión Académica (SGA), el equipo de arquitectura —liderado por <strong>Gustavo Mercado Portela</strong> y <strong>Ronald Tomas Gutierrez Acuña</strong>— propone formalmente la adopción de un <strong>Monolito Modular en Capas con Base de Datos Relacional (PostgreSQL)</strong>.
          </p>

          <p>
            Esta decisión se fundamenta en un principio rector de la ingeniería de software moderna: <em>la modularidad arquitectónica no debe confundirse con la distribución física en red</em>. El monolito modular combina lo mejor de dos mundos:
          </p>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-800/40 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block">Pilar 1: Consistencia Transaccional</span>
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
              Garantías ACID Nativas
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              El proceso de matrícula académica con concurrencia de 300 usuarios requiere validación atómica e inmediata de cupos sin riesgo de sobrecupo (phantom reads). Una base de datos relacional única permite transacciones locales atómicas (<code>BEGIN ... COMMIT</code>) sin la fragilidad de protocolos distribuidos como Sagas o 2-Phase Commit.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-800/40 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block">Pilar 2: Bounded Contexts en Código</span>
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
              Aislamiento de Dominios DDD
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              A diferencia del monolito tradicional de "capas puras" donde el código se vuelve espagueti, el monolito modular define fronteras estrictas de dominio (Auth, Estudiantes, Docentes, Programación, Matrícula, Calificaciones, Auditoría). Cada módulo es autónomo, con interfaces públicas y repositorios encapsulados.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-800/40 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block">Pilar 3: Eficiencia Operativa</span>
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
              Cero Latencia Interna y Bajo DevOps
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Las llamadas entre módulos ocurren en memoria (0 ms) en lugar de atravesar interfaces HTTP/gRPC. Un único artefacto compilado se despliega en contenedores Docker estándar, reduciendo dramáticamente el costo de infraestructura en la nube y el tamaño del equipo de soporte necesario.
            </p>
          </div>
        </div>

        {/* Comparative Table: Modular Monolith vs Microservices vs Pure Layers */}
        <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-3 flex items-center gap-2">
          <Database className="w-4 h-4 text-stone-700 dark:text-stone-300" />
          <span>Tabla Comparativa de Alternativas Arquitectónicas</span>
        </h3>

        <div className="overflow-x-auto border border-stone-200 dark:border-stone-800 rounded-lg mb-6">
          <table className="w-full text-xs text-left">
            <thead className="bg-stone-100 dark:bg-stone-800/80 text-stone-800 dark:text-stone-200 border-b border-stone-200 dark:border-stone-700">
              <tr>
                <th className="p-3.5 font-bold">Criterio Arquitectónico</th>
                <th className="p-3.5 font-bold text-amber-900 dark:text-amber-200 bg-amber-500/10">
                  Monolito Modular en Capas (Elegido)
                </th>
                <th className="p-3.5 font-bold text-stone-700 dark:text-stone-300">
                  Microservicios Distribuidos
                </th>
                <th className="p-3.5 font-bold text-stone-700 dark:text-stone-300">
                  Monolito de Capas Tradicionales
                </th>
                <th className="p-3.5 font-bold text-center">Opción Ganadora</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
              {architectureComparisons.map((item, idx) => (
                <tr key={idx} className="hover:bg-stone-50/50 dark:hover:bg-stone-800/30 transition-colors">
                  <td className="p-3.5 font-bold text-stone-900 dark:text-stone-100 whitespace-nowrap">
                    {item.criterion}
                  </td>
                  <td className="p-3.5 bg-amber-500/5 dark:bg-amber-400/5 text-stone-800 dark:text-stone-200 leading-relaxed max-w-xs font-medium">
                    {item.modularMonolith}
                  </td>
                  <td className="p-3.5 text-stone-600 dark:text-stone-400 leading-relaxed max-w-xs">
                    {item.microservices}
                  </td>
                  <td className="p-3.5 text-stone-600 dark:text-stone-400 leading-relaxed max-w-xs">
                    {item.pureLayered}
                  </td>
                  <td className="p-3.5 text-center whitespace-nowrap">
                    <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200">
                      {item.winner}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Conclusion of Architecture choice */}
        <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/20 text-xs text-amber-900 dark:text-amber-300 leading-relaxed">
          <strong>Conclusión Técnica del Análisis:</strong> Para un SGA con 300 usuarios concurrentes, picos de matrícula altamente concentrados y requisitos estrictos de integridad transaccional (RNF-02, RNF-03, RNF-07), el <strong>Monolito Modular</strong> es objetivamente superior a los microservicios: elimina la latencia de red en llamadas internas, garantiza transacciones ACID sin complejidad distribuida y ofrece un tiempo de desarrollo y depuración sustancialmente más ágil.
        </div>
      </div>
    </div>
  );
};
