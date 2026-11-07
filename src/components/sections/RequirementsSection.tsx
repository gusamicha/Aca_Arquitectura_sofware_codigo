import React, { useState } from 'react';
import { functionalRequirements, nonFunctionalRequirements } from '../../data/dossierData';
import { Search, Filter, CheckCircle2, ShieldCheck, Zap, Database, SlidersHorizontal } from 'lucide-react';

export const RequirementsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ALL' | 'RF' | 'RNF'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('TODOS');

  // Filter Functional Requirements
  const filteredRF = functionalRequirements.filter(rf => {
    const matchesSearch =
      rf.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rf.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rf.module.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPriority = priorityFilter === 'TODOS' || rf.priority === priorityFilter;

    return matchesSearch && matchesPriority;
  });

  // Filter Non-Functional Requirements
  const filteredRNF = nonFunctionalRequirements.filter(rnf => {
    const matchesSearch =
      rnf.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rnf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rnf.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rnf.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rnf.metric.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPriority = priorityFilter === 'TODOS' || rnf.priority === priorityFilter;

    return matchesSearch && matchesPriority;
  });

  return (
    <div className="space-y-6">
      <div className="border border-stone-200 dark:border-stone-800 rounded-xl p-6 sm:p-8 bg-white dark:bg-stone-900 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <SlidersHorizontal className="w-6 h-6 text-amber-600" />
              <span>5. Requerimientos del Sistema (RF y RNF)</span>
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              Catálogo formal de 12 Requisitos Funcionales (RF-01 a RF-12) y 12 Requisitos No Funcionales (RNF-01 a RNF-12)
            </p>
          </div>

          {/* Quick counts */}
          <div className="flex items-center gap-3 text-xs">
            <span className="px-2.5 py-1 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-mono">
              12 RF Registrados
            </span>
            <span className="px-2.5 py-1 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-mono">
              12 RNF Registrados
            </span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row gap-3 p-4 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700 mb-6">
          {/* Search box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Filtrar por código, nombre, módulo o descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 placeholder-stone-400"
            />
          </div>

          {/* Type segmented control */}
          <div className="flex items-center gap-1 bg-stone-200/70 dark:bg-stone-800 p-1 rounded-lg">
            <button
              type="button"
              onClick={() => setActiveTab('ALL')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                activeTab === 'ALL'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              Todos (24)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('RF')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                activeTab === 'RF'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              Funcionales (RF)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('RNF')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                activeTab === 'RNF'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              No Funcionales (RNF)
            </button>
          </div>

          {/* Priority selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-500 whitespace-nowrap">Prioridad:</span>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="text-xs py-2 px-3 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
            >
              <option value="TODOS">Todas las prioridades</option>
              <option value="CRÍTICA">Crítica</option>
              <option value="ALTA">Alta</option>
              <option value="MEDIA">Media</option>
            </select>
          </div>
        </div>

        {/* Section: Functional Requirements */}
        {(activeTab === 'ALL' || activeTab === 'RF') && (
          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Requerimientos Funcionales (RF-01 a RF-12)</span>
              </h3>
              <span className="text-xs text-stone-500">Mostrando {filteredRF.length} de 12</span>
            </div>

            <div className="overflow-x-auto border border-stone-200 dark:border-stone-800 rounded-lg">
              <table className="w-full text-xs text-left">
                <thead className="bg-stone-100 dark:bg-stone-800/80 text-stone-800 dark:text-stone-200 border-b border-stone-200 dark:border-stone-700">
                  <tr>
                    <th className="p-3 font-mono">Código</th>
                    <th className="p-3">Nombre del Requisito</th>
                    <th className="p-3">Módulo Funcional</th>
                    <th className="p-3">Descripción Técnica y Reglas de Negocio</th>
                    <th className="p-3">Actores</th>
                    <th className="p-3 text-center">Prioridad</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
                  {filteredRF.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-6 text-center text-stone-500">
                        No se encontraron requerimientos funcionales con el criterio especificado.
                      </td>
                    </tr>
                  ) : (
                    filteredRF.map(rf => (
                      <tr key={rf.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-800/30 transition-colors">
                        <td className="p-3 font-mono font-bold text-emerald-700 dark:text-emerald-400 whitespace-nowrap">
                          {rf.id}
                        </td>
                        <td className="p-3 font-semibold text-stone-900 dark:text-stone-100">
                          {rf.name}
                        </td>
                        <td className="p-3 text-stone-600 dark:text-stone-400 whitespace-nowrap">
                          {rf.module}
                        </td>
                        <td className="p-3 text-stone-700 dark:text-stone-300 leading-relaxed max-w-md">
                          {rf.description}
                          <div className="text-[10px] text-stone-500 mt-1">
                            <strong>Criterio de verificación:</strong> {rf.verificationCriteria}
                          </div>
                        </td>
                        <td className="p-3 text-stone-600 dark:text-stone-400 whitespace-nowrap">
                          {rf.actors.join(', ')}
                        </td>
                        <td className="p-3 text-center">
                          <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                            rf.priority === 'CRÍTICA'
                              ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                              : rf.priority === 'ALTA'
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                              : 'bg-stone-100 text-stone-800 dark:bg-stone-800 dark:text-stone-300'
                          }`}>
                            {rf.priority}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Section: Non-Functional Requirements */}
        {(activeTab === 'ALL' || activeTab === 'RNF') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <span>Requerimientos No Funcionales (RNF-01 a RNF-12)</span>
              </h3>
              <span className="text-xs text-stone-500">Mostrando {filteredRNF.length} de 12</span>
            </div>

            <div className="overflow-x-auto border border-stone-200 dark:border-stone-800 rounded-lg">
              <table className="w-full text-xs text-left">
                <thead className="bg-stone-100 dark:bg-stone-800/80 text-stone-800 dark:text-stone-200 border-b border-stone-200 dark:border-stone-700">
                  <tr>
                    <th className="p-3 font-mono">Código</th>
                    <th className="p-3">Atributo / Nombre</th>
                    <th className="p-3">Categoría ISO 25010</th>
                    <th className="p-3">Especificación Técnica Cuantitativa</th>
                    <th className="p-3">Métrica y Valor Objetivo</th>
                    <th className="p-3 text-center">Prioridad</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
                  {filteredRNF.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-6 text-center text-stone-500">
                        No se encontraron requerimientos no funcionales con el criterio especificado.
                      </td>
                    </tr>
                  ) : (
                    filteredRNF.map(rnf => (
                      <tr key={rnf.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-800/30 transition-colors">
                        <td className="p-3 font-mono font-bold text-blue-700 dark:text-blue-400 whitespace-nowrap">
                          {rnf.id}
                        </td>
                        <td className="p-3 font-semibold text-stone-900 dark:text-stone-100">
                          {rnf.name}
                        </td>
                        <td className="p-3 text-stone-600 dark:text-stone-400 whitespace-nowrap font-medium">
                          {rnf.category}
                        </td>
                        <td className="p-3 text-stone-700 dark:text-stone-300 leading-relaxed max-w-md">
                          {rnf.description}
                        </td>
                        <td className="p-3 font-mono text-[11px] text-stone-700 dark:text-stone-300">
                          <span className="font-semibold block text-stone-900 dark:text-stone-100">{rnf.targetValue}</span>
                          <span className="text-[10px] text-stone-500">{rnf.metric}</span>
                        </td>
                        <td className="p-3 text-center">
                          <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                            rnf.priority === 'CRÍTICA'
                              ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                              : rnf.priority === 'ALTA'
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                              : 'bg-stone-100 text-stone-800 dark:bg-stone-800 dark:text-stone-300'
                          }`}>
                            {rnf.priority}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
