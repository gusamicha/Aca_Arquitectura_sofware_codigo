import React, { useState, useEffect } from 'react';
import { initialAIEvidenceData, initialAISuggestions } from '../../data/dossierData';
import { AISuggestion } from '../../types';
import { Sparkles, Edit3, Save, RotateCcw, Plus, Trash2, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';

export const AIEvidenceSection: React.FC = () => {
  // Load from localStorage or defaults
  const [evidenceData, setEvidenceData] = useState(() => {
    try {
      const saved = localStorage.getItem('sga_ai_evidence');
      return saved ? JSON.parse(saved) : initialAIEvidenceData;
    } catch {
      return initialAIEvidenceData;
    }
  });

  const [suggestions, setSuggestions] = useState<AISuggestion[]>(() => {
    try {
      const saved = localStorage.getItem('sga_ai_suggestions');
      return saved ? JSON.parse(saved) : initialAISuggestions;
    } catch {
      return initialAISuggestions;
    }
  });

  const [isEditingTexts, setIsEditingTexts] = useState(false);
  const [tempPrompt, setTempPrompt] = useState(evidenceData.initialPrompt);
  const [tempResponse, setTempResponse] = useState(evidenceData.aiResponseSummary);
  const [tempAdjustments, setTempAdjustments] = useState(evidenceData.teamAdjustments);

  // New suggestion modal/form state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTopic, setNewTopic] = useState('');
  const [newSuggestionText, setNewSuggestionText] = useState('');
  const [newStatus, setNewStatus] = useState<'Aceptada' | 'Modificada' | 'Descartada'>('Aceptada');
  const [newRationale, setNewRationale] = useState('');

  const saveTextEdits = () => {
    const updated = {
      initialPrompt: tempPrompt,
      aiResponseSummary: tempResponse,
      teamAdjustments: tempAdjustments
    };
    setEvidenceData(updated);
    try {
      localStorage.setItem('sga_ai_evidence', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    setIsEditingTexts(false);
  };

  const handleResetDefaults = () => {
    setEvidenceData(initialAIEvidenceData);
    setTempPrompt(initialAIEvidenceData.initialPrompt);
    setTempResponse(initialAIEvidenceData.aiResponseSummary);
    setTempAdjustments(initialAIEvidenceData.teamAdjustments);
    setSuggestions(initialAISuggestions);
    try {
      localStorage.removeItem('sga_ai_evidence');
      localStorage.removeItem('sga_ai_suggestions');
    } catch (e) {
      console.error(e);
    }
    setIsEditingTexts(false);
  };

  const handleAddSuggestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopic || !newSuggestionText || !newRationale) return;

    const newItem: AISuggestion = {
      id: `SUG-${Math.floor(10 + Math.random() * 90)}`,
      promptTopic: newTopic,
      suggestion: newSuggestionText,
      status: newStatus,
      teamRationale: newRationale
    };

    const updated = [...suggestions, newItem];
    setSuggestions(updated);
    try {
      localStorage.setItem('sga_ai_suggestions', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }

    setNewTopic('');
    setNewSuggestionText('');
    setNewRationale('');
    setShowAddModal(false);
  };

  const handleDeleteSuggestion = (id: string) => {
    const updated = suggestions.filter(s => s.id !== id);
    setSuggestions(updated);
    try {
      localStorage.setItem('sga_ai_suggestions', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      <div className="border border-stone-200 dark:border-stone-800 rounded-xl p-6 sm:p-8 bg-white dark:bg-stone-900 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-amber-600" />
              <span>11. Evidencias de Uso de la Inteligencia Artificial en el Diseño</span>
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              Registro del proceso de ideación con IA, prompts aplicados, respuestas generadas, ajustes del equipo y tabla de sugerencias aceptadas, modificadas y descartadas.
            </p>
          </div>

          <div className="flex items-center gap-2 no-print">
            {isEditingTexts ? (
              <>
                <button
                  type="button"
                  onClick={saveTextEdits}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-600 text-white hover:bg-amber-700 transition-colors shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Guardar Textos</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingTexts(false)}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                >
                  Cancelar
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditingTexts(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Editar Evidencias</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleResetDefaults}
              className="p-1.5 text-xs rounded-lg border border-stone-300 dark:border-stone-700 text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800"
              title="Restablecer valores predeterminados"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 3 Editable text boxes: Prompt, Response, Adjustments */}
        <div className="space-y-5 mb-8">
          {/* Prompt */}
          <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-800/40 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block">
              1. Prompt Inicial Formulado a la IA por el Equipo:
            </span>
            {isEditingTexts ? (
              <textarea
                value={tempPrompt}
                onChange={(e) => setTempPrompt(e.target.value)}
                rows={4}
                className="w-full text-xs p-3 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-mono leading-relaxed"
              />
            ) : (
              <div className="text-xs font-mono bg-white dark:bg-stone-900 p-3 rounded-lg border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 leading-relaxed whitespace-pre-wrap">
                {evidenceData.initialPrompt}
              </div>
            )}
          </div>

          {/* AI Response Summary */}
          <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-800/40 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400 block">
              2. Respuesta y Propuesta Preliminar Entregada por la IA:
            </span>
            {isEditingTexts ? (
              <textarea
                value={tempResponse}
                onChange={(e) => setTempResponse(e.target.value)}
                rows={4}
                className="w-full text-xs p-3 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 leading-relaxed"
              />
            ) : (
              <div className="text-xs bg-white dark:bg-stone-900 p-3 rounded-lg border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 leading-relaxed whitespace-pre-wrap">
                {evidenceData.aiResponseSummary}
              </div>
            )}
          </div>

          {/* Human Team Adjustments */}
          <div className="p-4 rounded-xl border border-amber-300 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/20 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-200 block">
              3. Ajustes Críticos Realizados por Gustavo Mercado Portela y Ronald Tomas Gutierrez Acuña:
            </span>
            {isEditingTexts ? (
              <textarea
                value={tempAdjustments}
                onChange={(e) => setTempAdjustments(e.target.value)}
                rows={5}
                className="w-full text-xs p-3 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 leading-relaxed"
              />
            ) : (
              <div className="text-xs bg-white/80 dark:bg-stone-900/80 p-3.5 rounded-lg border border-amber-200 dark:border-amber-800/60 text-stone-800 dark:text-stone-200 leading-relaxed whitespace-pre-wrap">
                {evidenceData.teamAdjustments}
              </div>
            )}
          </div>
        </div>

        {/* Suggestions Table */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                Tabla de Sugerencias de la IA: Aceptadas, Modificadas y Descartadas
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                Evaluación técnica de cada propuesta de la IA con el criterio de ingeniería del equipo.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowAddModal(!showAddModal)}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors no-print"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Añadir Sugerencia</span>
            </button>
          </div>

          {/* Add suggestion inline modal */}
          {showAddModal && (
            <form onSubmit={handleAddSuggestion} className="p-4 mb-4 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/60 text-xs space-y-3 no-print">
              <span className="font-bold text-stone-900 dark:text-stone-100 block">Registrar Nueva Sugerencia de la IA</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block text-stone-700 dark:text-stone-300 mb-1">Tópico o Tema:</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Caching con Redis"
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value)}
                    className="w-full p-2 rounded border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
                  />
                </div>
                <div>
                  <label className="font-semibold block text-stone-700 dark:text-stone-300 mb-1">Estado de Decisión:</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as any)}
                    className="w-full p-2 rounded border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
                  >
                    <option value="Aceptada">Aceptada</option>
                    <option value="Modificada">Modificada</option>
                    <option value="Descartada">Descartada</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="font-semibold block text-stone-700 dark:text-stone-300 mb-1">Sugerencia Original de la IA:</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Qué sugirió la IA..."
                  value={newSuggestionText}
                  onChange={(e) => setNewSuggestionText(e.target.value)}
                  className="w-full p-2 rounded border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
                />
              </div>
              <div>
                <label className="font-semibold block text-stone-700 dark:text-stone-300 mb-1">Justificación Técnica del Equipo:</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Por qué Gustavo y Ronald aceptaron, modificaron o descartaron la idea..."
                  value={newRationale}
                  onChange={(e) => setNewRationale(e.target.value)}
                  className="w-full p-2 rounded border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
                />
              </div>
              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 rounded border border-stone-300 dark:border-stone-600 text-stone-600 dark:text-stone-400 hover:bg-stone-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded bg-amber-600 text-white font-semibold hover:bg-amber-700"
                >
                  Guardar en Tabla
                </button>
              </div>
            </form>
          )}

          {/* Suggestions Table */}
          <div className="overflow-x-auto border border-stone-200 dark:border-stone-800 rounded-lg">
            <table className="w-full text-xs text-left">
              <thead className="bg-stone-100 dark:bg-stone-800/80 text-stone-800 dark:text-stone-200 border-b border-stone-200 dark:border-stone-700">
                <tr>
                  <th className="p-3 font-mono">ID</th>
                  <th className="p-3">Tópico de Arquitectura</th>
                  <th className="p-3">Sugerencia Original de la IA</th>
                  <th className="p-3 text-center">Decisión</th>
                  <th className="p-3">Justificación Técnica de los Autores</th>
                  <th className="p-3 text-center no-print">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
                {suggestions.map(s => (
                  <tr key={s.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-800/30 transition-colors">
                    <td className="p-3 font-mono font-bold text-stone-700 dark:text-stone-300 whitespace-nowrap">
                      {s.id}
                    </td>
                    <td className="p-3 font-semibold text-stone-900 dark:text-stone-100 whitespace-nowrap">
                      {s.promptTopic}
                    </td>
                    <td className="p-3 text-stone-700 dark:text-stone-300 leading-relaxed max-w-xs">
                      {s.suggestion}
                    </td>
                    <td className="p-3 text-center whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-bold ${
                        s.status === 'Aceptada'
                          ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200'
                          : s.status === 'Modificada'
                          ? 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200'
                          : 'bg-red-100 text-red-900 dark:bg-red-950 dark:text-red-200'
                      }`}>
                        {s.status === 'Aceptada' && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                        {s.status === 'Modificada' && <AlertCircle className="w-3 h-3 text-amber-600" />}
                        {s.status === 'Descartada' && <XCircle className="w-3 h-3 text-red-600" />}
                        <span>{s.status}</span>
                      </span>
                    </td>
                    <td className="p-3 text-stone-600 dark:text-stone-400 leading-relaxed max-w-sm">
                      {s.teamRationale}
                    </td>
                    <td className="p-3 text-center no-print">
                      <button
                        type="button"
                        onClick={() => handleDeleteSuggestion(s.id)}
                        className="p-1 rounded text-stone-400 hover:text-red-600 transition-colors"
                        title="Eliminar sugerencia"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
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
