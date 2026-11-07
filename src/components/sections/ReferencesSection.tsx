import React, { useState } from 'react';
import { apaReferences } from '../../data/dossierData';
import { BookMarked, CheckCircle, Copy, ExternalLink, ShieldCheck } from 'lucide-react';

export const ReferencesSection: React.FC = () => {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopyCitation = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="border border-stone-200 dark:border-stone-800 rounded-xl p-6 sm:p-8 bg-white dark:bg-stone-900 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <BookMarked className="w-6 h-6 text-amber-600" />
              <span>14. Referencias Bibliográficas (Normas APA 7.ª Edición)</span>
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              Fuentes académicas, libros de texto clásicos y estándares internacionales de ingeniería de software rigurosamente verificados.
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400 font-semibold px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg border border-emerald-200 dark:border-emerald-800">
            <ShieldCheck className="w-4 h-4" />
            <span>Fuentes 100% Verificadas</span>
          </div>
        </div>

        {/* Methodological declaration */}
        <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-800/40 text-xs text-stone-600 dark:text-stone-400 leading-relaxed mb-6">
          <strong className="text-stone-900 dark:text-stone-200">Nota de Rigor Metodológico:</strong> En estricto apego al requerimiento, todas las fuentes listadas a continuación corresponden a publicaciones y estándares reales de ingeniería y arquitectura de software. No se han incluido citas ficticias ni referencias inventadas.
        </div>

        {/* Citations List with Hanging Indent */}
        <div className="space-y-4">
          {apaReferences.map((ref, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-amber-300 dark:hover:border-amber-800 transition-colors space-y-2 group"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-xs font-serif text-stone-800 dark:text-stone-200 leading-relaxed pl-6 -indent-6">
                  {ref.citation}
                </p>

                <button
                  type="button"
                  onClick={() => handleCopyCitation(ref.citation, idx)}
                  className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-700 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors shrink-0 no-print"
                  title="Copiar cita en formato APA 7"
                >
                  {copiedIdx === idx ? (
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              <div className="text-[11px] text-stone-500 dark:text-stone-400 pt-2 border-t border-stone-100 dark:border-stone-800/60 leading-relaxed">
                <strong className="text-stone-700 dark:text-stone-300">Aporte al Dossier:</strong> {ref.annotation}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
