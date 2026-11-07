import React, { useState } from 'react';
import { traceabilityMatrix } from '../../data/dossierData';
import { Network, Search, Filter, CheckCircle2, ShieldCheck } from 'lucide-react';

export const TraceabilitySection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'ALL' | 'RF' | 'RNF'>('ALL');

  const filteredItems = traceabilityMatrix.filter(item => {
    const matchesSearch =
      item.reqId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.reqName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.component.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.systemModel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.designDecision.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.verificationMethod.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === 'ALL' || item.type === filterType;

    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="border border-stone-200 dark:border-stone-800 rounded-xl p-6 sm:p-8 bg-white dark:bg-stone-900 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Network className="w-6 h-6 text-amber-600" />
              <span>9. Matriz de Trazabilidad Arquitectónica</span>
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              Mapeo bidireccional entre los 24 Requerimientos (RF-01..12 y RNF-01..12), sus Componentes, Modelos de Diseño, Decisiones y Métodos de Verificación.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="font-mono text-stone-500">Total trazados:</span>
            <span className="font-bold font-mono text-stone-900 dark:text-stone-100">
              {traceabilityMatrix.length} de 24
            </span>
          </div>
        </div>

        {/* Filter controls */}
        <div className="flex flex-col sm:flex-row gap-3 p-4 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700 mb-6">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Buscar por ID, componente, modelo o método de prueba..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 placeholder-stone-400"
            />
          </div>

          <div className="flex items-center gap-1 bg-stone-200/70 dark:bg-stone-800 p-1 rounded-lg">
            <button
              type="button"
              onClick={() => setFilterType('ALL')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                filterType === 'ALL'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400'
              }`}
            >
              Todos ({traceabilityMatrix.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterType('RF')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                filterType === 'RF'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400'
              }`}
            >
              Funcionales (12)
            </button>
            <button
              type="button"
              onClick={() => setFilterType('RNF')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                filterType === 'RNF'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400'
              }`}
            >
              No Funcionales (12)
            </button>
          </div>
        </div>

        {/* Traceability Table */}
        <div className="overflow-x-auto border border-stone-200 dark:border-stone-800 rounded-lg">
          <table className="w-full text-xs text-left">
            <thead className="bg-stone-100 dark:bg-stone-800/80 text-stone-800 dark:text-stone-200 border-b border-stone-200 dark:border-stone-700">
              <tr>
                <th className="p-3 font-mono">ID Requisito</th>
                <th className="p-3">Nombre del Requisito</th>
                <th className="p-3">Componente Arquitectónico</th>
                <th className="p-3">Modelo(s) Asociado(s)</th>
                <th className="p-3">Decisión de Diseño / Patrón</th>
                <th className="p-3">Método de Verificación y Pruebas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-stone-500">
                    No se encontraron filas que coincidan con la búsqueda.
                  </td>
                </tr>
              ) : (
                filteredItems.map(item => (
                  <tr key={item.reqId} className="hover:bg-stone-50/50 dark:hover:bg-stone-800/30 transition-colors">
                    <td className="p-3 font-mono font-bold whitespace-nowrap">
                      <span className={item.type === 'RF' ? 'text-emerald-700 dark:text-emerald-400' : 'text-blue-700 dark:text-blue-400'}>
                        {item.reqId}
                      </span>
                    </td>
                    <td className="p-3 font-semibold text-stone-900 dark:text-stone-100 whitespace-nowrap">
                      {item.reqName}
                    </td>
                    <td className="p-3 font-mono text-[11px] text-stone-800 dark:text-stone-200">
                      {item.component}
                    </td>
                    <td className="p-3 text-stone-600 dark:text-stone-400">
                      {item.systemModel}
                    </td>
                    <td className="p-3 text-stone-700 dark:text-stone-300 font-medium leading-relaxed max-w-xs">
                      {item.designDecision}
                    </td>
                    <td className="p-3 text-stone-600 dark:text-stone-400 leading-relaxed max-w-xs">
                      {item.verificationMethod}
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
