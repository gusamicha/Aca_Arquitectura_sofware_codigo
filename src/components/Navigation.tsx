import React, { useState } from 'react';
import {
  FileText,
  HelpCircle,
  Target,
  Compass,
  SlidersHorizontal,
  Layers,
  GitBranch,
  ShieldCheck,
  Network,
  Award,
  Sparkles,
  Youtube,
  CheckCircle2,
  BookMarked,
  Printer,
  Moon,
  Sun,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Folder,
  FolderOpen,
  PanelLeftClose,
  PanelLeft
} from 'lucide-react';

export interface SectionItem {
  id: string;
  number: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const sectionsList: SectionItem[] = [
  { id: 'sec-portada', number: '1', title: 'Portada e Integrantes', icon: FileText },
  { id: 'sec-intro', number: '2', title: 'Introducción y Problema', icon: HelpCircle },
  { id: 'sec-objetivos', number: '3', title: 'Objetivos del Sistema', icon: Target },
  { id: 'sec-alcance', number: '4', title: 'Alcance, Actores y Supuestos', icon: Compass },
  { id: 'sec-requerimientos', number: '5', title: 'Requerimientos RF y RNF', icon: SlidersHorizontal },
  { id: 'sec-arquitectura', number: '6', title: 'Arquitectura Monolito Modular', icon: Layers },
  { id: 'sec-modelos', number: '7', title: 'Modelos Mermaid (6 Vistas)', icon: GitBranch },
  { id: 'sec-roles-demo', number: '8', title: 'Demostración Roles y Auditoría', icon: ShieldCheck },
  { id: 'sec-trazabilidad', number: '9', title: 'Matriz de Trazabilidad', icon: Network },
  { id: 'sec-decisiones', number: '10', title: 'Decisiones (ADR) y Riesgos', icon: Award },
  { id: 'sec-evidencias-ia', number: '11', title: 'Evidencias de Uso de IA', icon: Sparkles },
  { id: 'sec-multimedia', number: '12', title: 'Video y Repositorio', icon: Youtube },
  { id: 'sec-conclusiones', number: '13', title: 'Conclusiones y Recomendaciones', icon: CheckCircle2 },
  { id: 'sec-referencias', number: '14', title: 'Referencias APA 7', icon: BookMarked }
];

interface NavigationProps {
  activeSection: string;
  onSelectSection: (id: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onExportPdf: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  isCollapsed?: boolean;
  setIsCollapsed?: (collapsed: boolean | ((prev: boolean) => boolean)) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  onSelectSection,
  isDarkMode,
  toggleDarkMode,
  onExportPdf,
  mobileMenuOpen,
  setMobileMenuOpen,
  isCollapsed = false,
  setIsCollapsed
}) => {
  // Collapsible Chapter groups
  const [openGroups, setOpenGroups] = useState<{ [key: string]: boolean }>({
    foundation: true,
    design: true,
    verification: true,
    closure: true
  });

  const toggleGroup = (key: string) => {
    setOpenGroups(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const group1 = sectionsList.slice(0, 4); // 1-4
  const group2 = sectionsList.slice(4, 7); // 5-7
  const group3 = sectionsList.slice(7, 10); // 8-10
  const group4 = sectionsList.slice(10, 14); // 11-14

  return (
    <>
      {/* Skip to Content for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-amber-600 text-white font-bold rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
      >
        Saltar al contenido principal
      </a>

      {/* Backdrop for mobile drawer */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black/50 backdrop-blur-xs"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Lateral Sidebar Navigation */}
      <aside
        className={`fixed lg:sticky top-16 bottom-0 left-0 z-30 h-[calc(100vh-4rem)] bg-white dark:bg-stone-900 border-r border-stone-200 dark:border-stone-800 flex flex-col justify-between transition-all duration-200 no-print ${
          isCollapsed ? 'lg:w-16' : 'lg:w-72'
        } ${
          mobileMenuOpen ? 'translate-x-0 w-72 shadow-2xl' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Sidebar Header with Desplegar/Contraer Button */}
        <div className="p-3 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          {!isCollapsed && (
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-amber-700 dark:text-amber-400 uppercase block">
                DOSSIER TÉCNICO
              </span>
              <h2 className="text-xs font-bold text-stone-900 dark:text-stone-100 mt-0.5">
                14 Secciones de Arquitectura
              </h2>
            </div>
          )}

          {setIsCollapsed && (
            <button
              type="button"
              onClick={() => setIsCollapsed(prev => !prev)}
              className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors mx-auto"
              title={isCollapsed ? "Desplegar menú lateral completo" : "Contraer menú"}
            >
              {isCollapsed ? <PanelLeft className="w-4 h-4 text-amber-600" /> : <PanelLeftClose className="w-4 h-4" />}
            </button>
          )}
        </div>

        {/* Section Links Scroll Area */}
        <nav
          className="flex-1 overflow-y-auto p-2 space-y-3 focus:outline-none"
          aria-label="Secciones del dossier"
        >
          {/* Group 1: Fundamentación */}
          <div>
            {!isCollapsed ? (
              <button
                type="button"
                onClick={() => toggleGroup('foundation')}
                className="w-full flex items-center justify-between px-2 py-1 text-[10px] font-bold text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 uppercase tracking-wider"
              >
                <span>01. Fundamentos & Alcance</span>
                {openGroups.foundation ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
              </button>
            ) : (
              <div className="h-px bg-stone-200 dark:bg-stone-800 my-1" />
            )}

            {(openGroups.foundation || isCollapsed) && (
              <div className="space-y-0.5 mt-1">
                {group1.map(sec => {
                  const Icon = sec.icon;
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => {
                        onSelectSection(sec.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-left transition-colors ${
                        isActive
                          ? 'bg-amber-600 text-white font-semibold shadow-xs'
                          : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800/70'
                      }`}
                      title={sec.title}
                    >
                      <span className={`w-5 h-5 rounded flex items-center justify-center font-mono text-[10px] font-bold shrink-0 ${
                        isActive ? 'bg-amber-700 text-white' : 'bg-stone-100 dark:bg-stone-800 text-stone-500'
                      }`}>
                        {sec.number}
                      </span>
                      {!isCollapsed && <span className="truncate">{sec.title}</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Group 2: Arquitectura y Modelos */}
          <div>
            {!isCollapsed ? (
              <button
                type="button"
                onClick={() => toggleGroup('design')}
                className="w-full flex items-center justify-between px-2 py-1 text-[10px] font-bold text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 uppercase tracking-wider"
              >
                <span>02. Arquitectura & Modelos</span>
                {openGroups.design ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
              </button>
            ) : (
              <div className="h-px bg-stone-200 dark:bg-stone-800 my-1" />
            )}

            {(openGroups.design || isCollapsed) && (
              <div className="space-y-0.5 mt-1">
                {group2.map(sec => {
                  const Icon = sec.icon;
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => {
                        onSelectSection(sec.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-left transition-colors ${
                        isActive
                          ? 'bg-amber-600 text-white font-semibold shadow-xs'
                          : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800/70'
                      }`}
                      title={sec.title}
                    >
                      <span className={`w-5 h-5 rounded flex items-center justify-center font-mono text-[10px] font-bold shrink-0 ${
                        isActive ? 'bg-amber-700 text-white' : 'bg-stone-100 dark:bg-stone-800 text-stone-500'
                      }`}>
                        {sec.number}
                      </span>
                      {!isCollapsed && <span className="truncate">{sec.title}</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Group 3: Seguridad, Trazabilidad y Riesgos */}
          <div>
            {!isCollapsed ? (
              <button
                type="button"
                onClick={() => toggleGroup('verification')}
                className="w-full flex items-center justify-between px-2 py-1 text-[10px] font-bold text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 uppercase tracking-wider"
              >
                <span>03. Seguridad & Trazabilidad</span>
                {openGroups.verification ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
              </button>
            ) : (
              <div className="h-px bg-stone-200 dark:bg-stone-800 my-1" />
            )}

            {(openGroups.verification || isCollapsed) && (
              <div className="space-y-0.5 mt-1">
                {group3.map(sec => {
                  const Icon = sec.icon;
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => {
                        onSelectSection(sec.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-left transition-colors ${
                        isActive
                          ? 'bg-amber-600 text-white font-semibold shadow-xs'
                          : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800/70'
                      }`}
                      title={sec.title}
                    >
                      <span className={`w-5 h-5 rounded flex items-center justify-center font-mono text-[10px] font-bold shrink-0 ${
                        isActive ? 'bg-amber-700 text-white' : 'bg-stone-100 dark:bg-stone-800 text-stone-500'
                      }`}>
                        {sec.number}
                      </span>
                      {!isCollapsed && <span className="truncate">{sec.title}</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Group 4: Evidencias y Cierre */}
          <div>
            {!isCollapsed ? (
              <button
                type="button"
                onClick={() => toggleGroup('closure')}
                className="w-full flex items-center justify-between px-2 py-1 text-[10px] font-bold text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 uppercase tracking-wider"
              >
                <span>04. Evidencias & Cierre</span>
                {openGroups.closure ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
              </button>
            ) : (
              <div className="h-px bg-stone-200 dark:bg-stone-800 my-1" />
            )}

            {(openGroups.closure || isCollapsed) && (
              <div className="space-y-0.5 mt-1">
                {group4.map(sec => {
                  const Icon = sec.icon;
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => {
                        onSelectSection(sec.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-left transition-colors ${
                        isActive
                          ? 'bg-amber-600 text-white font-semibold shadow-xs'
                          : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800/70'
                      }`}
                      title={sec.title}
                    >
                      <span className={`w-5 h-5 rounded flex items-center justify-center font-mono text-[10px] font-bold shrink-0 ${
                        isActive ? 'bg-amber-700 text-white' : 'bg-stone-100 dark:bg-stone-800 text-stone-500'
                      }`}>
                        {sec.number}
                      </span>
                      {!isCollapsed && <span className="truncate">{sec.title}</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50">
          {!isCollapsed ? (
            <div className="space-y-2">
              <div className="text-[10px] text-stone-500">
                <strong>Autores / Admins:</strong> Gustavo Mercado Portela & Ronald Tomas Gutierrez Acuña
              </div>
              <button
                type="button"
                onClick={onExportPdf}
                className="w-full flex items-center justify-center gap-2 py-1.5 px-3 text-xs font-semibold rounded-lg bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors shadow-xs"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Exportar PDF</span>
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onExportPdf}
              className="w-full p-2 rounded-lg bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 flex items-center justify-center"
              title="Exportar a PDF"
            >
              <Printer className="w-4 h-4" />
            </button>
          )}
        </div>
      </aside>
    </>
  );
};
