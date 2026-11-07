import React, { useState } from 'react';
import { mermaidDiagramsData } from '../../data/dossierData';
import { MermaidChart } from '../MermaidChart';
import { GitBranch, Eye, ListFilter } from 'lucide-react';

interface SystemModelsSectionProps {
  isDarkMode: boolean;
}

export const SystemModelsSection: React.FC<SystemModelsSectionProps> = ({ isDarkMode }) => {
  const [selectedModelKey, setSelectedModelKey] = useState<string>('useCases');
  const [viewMode, setViewMode] = useState<'tabs' | 'all'>('tabs');

  const modelsList = [
    { key: 'useCases', label: '1. Casos de Uso (UML)', data: mermaidDiagramsData.useCases },
    { key: 'components', label: '2. Componentes (Monolito)', data: mermaidDiagramsData.components },
    { key: 'deployment', label: '3. Despliegue e Infraestructura', data: mermaidDiagramsData.deployment },
    { key: 'dataConceptual', label: '4. Datos Conceptual (ERD)', data: mermaidDiagramsData.dataConceptual },
    { key: 'sequenceEnrollment', label: '5. Secuencia: Matrícula', data: mermaidDiagramsData.sequenceEnrollment },
    { key: 'sequenceGrades', label: '6. Secuencia: Calificaciones', data: mermaidDiagramsData.sequenceGrades }
  ];

  const currentModel = modelsList.find(m => m.key === selectedModelKey)?.data || modelsList[0].data;

  return (
    <div className="space-y-6">
      <div className="border border-stone-200 dark:border-stone-800 rounded-xl p-6 sm:p-8 bg-white dark:bg-stone-900 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <GitBranch className="w-6 h-6 text-amber-600" />
              <span>7. Modelos del Sistema (Especificación Formal en Mermaid.js)</span>
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              Vistas arquitectónicas estándar conforme a IEEE Std 1016-2009. Diagramas interactivos vectoriales en SVG con zoom y código fuente.
            </p>
          </div>

          {/* View mode toggle */}
          <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 p-1 rounded-lg no-print">
            <button
              type="button"
              onClick={() => setViewMode('tabs')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                viewMode === 'tabs'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400'
              }`}
            >
              Vista Pestañas
            </button>
            <button
              type="button"
              onClick={() => setViewMode('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                viewMode === 'all'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400'
              }`}
            >
              Ver Todos (6)
            </button>
          </div>
        </div>

        {/* Consistency Rule Notice */}
        <div className="p-3.5 mb-6 rounded-lg bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/80 text-xs text-stone-600 dark:text-stone-400">
          <strong className="text-stone-900 dark:text-stone-200">Consistencia Semántica Transversal:</strong> Todos los diagramas emplean unívocamente la misma nomenclatura de actores (<code>Administrador</code>, <code>Coordinador</code>, <code>Docente</code>, <code>Estudiante</code>), módulos (<code>ModuloAuth</code>, <code>ModuloMatricula</code>, <code>ModuloCalificaciones</code>, <code>ModuloAuditoria</code>) y entidades relacionales (<code>USUARIO</code>, <code>GRUPO</code>, <code>MATRICULA</code>, <code>CALIFICACION</code>, <code>AUDITORIA</code>).
        </div>

        {/* Tab selection buttons */}
        {viewMode === 'tabs' && (
          <div className="flex flex-wrap gap-2 pb-4 mb-6 border-b border-stone-200 dark:border-stone-800 no-print">
            {modelsList.map(m => (
              <button
                key={m.key}
                type="button"
                onClick={() => setSelectedModelKey(m.key)}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg border transition-all ${
                  selectedModelKey === m.key
                    ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                    : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-700/80'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        )}

        {/* Diagrams rendering */}
        {viewMode === 'tabs' ? (
          <div>
            <MermaidChart
              chartId={currentModel.id}
              chartCode={currentModel.code}
              title={currentModel.title}
              legend={currentModel.legend}
              explanation={currentModel.explanation}
              isDarkMode={isDarkMode}
            />
          </div>
        ) : (
          <div className="space-y-10">
            {modelsList.map(m => (
              <div key={m.key} className="space-y-2">
                <MermaidChart
                  chartId={m.data.id}
                  chartCode={m.data.code}
                  title={m.data.title}
                  legend={m.data.legend}
                  explanation={m.data.explanation}
                  isDarkMode={isDarkMode}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
