import React, { useState } from 'react';
import { initialCoverData } from '../../data/dossierData';
import {
  FileText,
  Printer,
  Edit3,
  Save,
  RotateCcw,
  UserCheck,
  CheckCircle,
  Calendar,
  Building2,
  GraduationCap,
  ShieldAlert
} from 'lucide-react';

interface CoverSectionProps {
  onExportPdf: () => void;
}

export const CoverSection: React.FC<CoverSectionProps> = ({ onExportPdf }) => {
  const [coverData, setCoverData] = useState(initialCoverData);
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState(coverData);

  const handleSave = () => {
    setCoverData(tempData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempData(coverData);
    setIsEditing(false);
  };

  return (
    <div className="relative border border-stone-200 dark:border-stone-800 rounded-2xl bg-white dark:bg-stone-900 p-8 sm:p-12 shadow-sm transition-all overflow-hidden print-page-break">
      {/* Decorative subtle background gradient */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-amber-500/5 dark:bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top action bar: Edit & Export PDF */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-stone-200 dark:border-stone-800 no-print">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-700 dark:text-amber-400">
          <FileText className="w-4 h-4" />
          <span>Dossier de Arquitectura de Software · Versión {coverData.version}</span>
        </div>

        <div className="flex items-center gap-2.5">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={handleSave}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-600 text-white hover:bg-amber-700 transition-colors shadow-xs"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Guardar Cambios</span>
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Cancelar</span>
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              title="Editar los metadatos de la portada"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Editar Portada</span>
            </button>
          )}

          <button
            type="button"
            onClick={onExportPdf}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-lg bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors shadow-xs"
            title="Exportar informe técnico a PDF / Imprimir"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Exportar a PDF</span>
          </button>
        </div>
      </div>

      {isEditing ? (
        /* Edit Form */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700 mb-6 text-xs">
          <div>
            <label className="font-semibold block text-stone-700 dark:text-stone-300 mb-1">Título del Proyecto:</label>
            <input
              type="text"
              value={tempData.title}
              onChange={(e) => setTempData({ ...tempData, title: e.target.value })}
              className="w-full p-2 border border-stone-300 dark:border-stone-600 rounded bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
            />
          </div>
          <div>
            <label className="font-semibold block text-stone-700 dark:text-stone-300 mb-1">Subtítulo:</label>
            <input
              type="text"
              value={tempData.subtitle}
              onChange={(e) => setTempData({ ...tempData, subtitle: e.target.value })}
              className="w-full p-2 border border-stone-300 dark:border-stone-600 rounded bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
            />
          </div>
          <div>
            <label className="font-semibold block text-stone-700 dark:text-stone-300 mb-1">Asignatura:</label>
            <input
              type="text"
              value={tempData.subject}
              onChange={(e) => setTempData({ ...tempData, subject: e.target.value })}
              className="w-full p-2 border border-stone-300 dark:border-stone-600 rounded bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
            />
          </div>
          <div>
            <label className="font-semibold block text-stone-700 dark:text-stone-300 mb-1">Institución:</label>
            <input
              type="text"
              value={tempData.institution}
              onChange={(e) => setTempData({ ...tempData, institution: e.target.value })}
              className="w-full p-2 border border-stone-300 dark:border-stone-600 rounded bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
            />
          </div>
          <div>
            <label className="font-semibold block text-stone-700 dark:text-stone-300 mb-1">Docente Asesor:</label>
            <input
              type="text"
              value={tempData.professor}
              onChange={(e) => setTempData({ ...tempData, professor: e.target.value })}
              className="w-full p-2 border border-stone-300 dark:border-stone-600 rounded bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
            />
          </div>
          <div>
            <label className="font-semibold block text-stone-700 dark:text-stone-300 mb-1">Fecha de Entrega:</label>
            <input
              type="text"
              value={tempData.date}
              onChange={(e) => setTempData({ ...tempData, date: e.target.value })}
              className="w-full p-2 border border-stone-300 dark:border-stone-600 rounded bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
            />
          </div>
        </div>
      ) : null}

      {/* Institutional Header */}
      <div className="space-y-3 mb-10">
        <div className="flex items-center gap-2 text-stone-600 dark:text-stone-400 text-xs sm:text-sm font-medium tracking-wide">
          <Building2 className="w-4 h-4 text-amber-600" />
          <span>{coverData.institution}</span>
          <span aria-hidden="true">·</span>
          <span>{coverData.faculty}</span>
        </div>

        <div className="text-xs uppercase tracking-widest text-stone-500 font-semibold">
          {coverData.subject}
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-900 dark:text-stone-100 leading-tight">
          {coverData.title}
        </h1>

        <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed max-w-3xl font-normal">
          {coverData.subtitle}
        </p>
      </div>

      {/* Authors Card - Gustavo Mercado Portela & Ronald Tomas Gutierrez Acuña */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-xl bg-stone-50/80 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-800 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-3">
            Integrantes del Equipo y Administradores del Sistema:
          </span>

          <div className="space-y-4">
            {coverData.authors.map((author, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                  {author.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                    {author.name}
                  </h4>
                  <p className="text-xs text-amber-700 dark:text-amber-400 font-medium">
                    {author.role}
                  </p>
                  <p className="text-[11px] font-mono text-stone-500 dark:text-stone-400 mt-0.5">
                    {author.email} · Rol SGA: ADMINISTRADOR ({author.code})
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Evaluation Metadata */}
        <div className="space-y-4 md:border-l md:border-stone-200 dark:md:border-stone-800 md:pl-6 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-2">
              Docente Asesor y Evaluación:
            </span>
            <div className="text-sm font-semibold text-stone-900 dark:text-stone-100">
              {coverData.professor}
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              Revisión y validación de especificaciones arquitectónicas
            </p>
          </div>

          <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs text-stone-600 dark:text-stone-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-stone-500" />
              <span>Fecha: {coverData.date}</span>
            </span>
            <span className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-400">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>{coverData.status}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Executive Key Architectural Takeaway */}
      <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-100/50 dark:bg-stone-800/30 text-xs text-stone-700 dark:text-stone-300 leading-relaxed flex items-start gap-3">
        <GraduationCap className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="text-stone-900 dark:text-stone-100">Resumen Ejecutivo del Dossier:</strong> Este documento formaliza la arquitectura del Sistema de Gestión Académica (SGA) para instituciones de educación superior, adoptando un Monolito Modular en Capas con base de datos relacional PostgreSQL. Se fundamenta en garantías ACID para matrícula sin sobrecupo, RBAC granular con bitácora inmutable de auditoría y cumplimiento de 12 Requerimientos Funcionales y 12 No Funcionales.
        </div>
      </div>
    </div>
  );
};
