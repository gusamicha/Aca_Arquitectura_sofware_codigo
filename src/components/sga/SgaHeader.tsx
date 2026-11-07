import React, { useState, useRef, useEffect } from 'react';
import { UserAccount } from '../../types';
import {
  GraduationCap,
  FileText,
  LayoutDashboard,
  Shield,
  UserCheck,
  Moon,
  Sun,
  ChevronDown,
  Menu,
  PanelLeftClose,
  PanelLeft,
  ChevronRight
} from 'lucide-react';

interface SgaHeaderProps {
  currentUser: UserAccount;
  allUsers: UserAccount[];
  onSwitchUser: (userId: string) => void;
  appMode: 'sga' | 'dossier';
  setAppMode: (mode: 'sga' | 'dossier') => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onExportPdf?: () => void;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SgaHeader: React.FC<SgaHeaderProps> = ({
  currentUser,
  allUsers,
  onSwitchUser,
  appMode,
  setAppMode,
  isDarkMode,
  toggleDarkMode,
  isSidebarCollapsed,
  setIsSidebarCollapsed
}) => {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [modeDropdownOpen, setModeDropdownOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const modeMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
      if (modeMenuRef.current && !modeMenuRef.current.contains(event.target as Node)) {
        setModeDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 transition-colors no-print">
      <div className="w-full px-3 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Brand & Sidebar Toggle Button */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsSidebarCollapsed(prev => !prev)}
              className="p-2 rounded-xl text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors flex items-center justify-center border border-stone-200 dark:border-stone-700/80"
              title={isSidebarCollapsed ? "Desplegar menú lateral" : "Contraer menú lateral"}
              aria-label={isSidebarCollapsed ? "Desplegar menú lateral" : "Contraer menú lateral"}
            >
              {isSidebarCollapsed ? (
                <PanelLeft className="w-5 h-5 text-amber-600" />
              ) : (
                <PanelLeftClose className="w-5 h-5 text-stone-600 dark:text-stone-400" />
              )}
            </button>

            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold shadow-xs shrink-0">
              <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>

            <div className="hidden xs:block">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-stone-900 dark:text-stone-100 text-sm sm:text-base tracking-tight truncate">
                  SGA Institucional
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 font-bold hidden sm:inline-block">
                  CUN
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-stone-500 dark:text-stone-400 truncate max-w-xs hidden md:block">
                Corporación Unificada Nacional de Educación Superior
              </p>
            </div>
          </div>

          {/* Mode Desplegable / Dropdown Selector */}
          <div className="relative" ref={modeMenuRef}>
            <button
              type="button"
              onClick={() => setModeDropdownOpen(!modeDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/80 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors text-xs font-semibold"
              aria-expanded={modeDropdownOpen}
              aria-haspopup="true"
            >
              {appMode === 'sga' ? (
                <>
                  <LayoutDashboard className="w-4 h-4 text-amber-600" />
                  <span className="hidden sm:inline">Modo:</span>
                  <span className="text-stone-900 dark:text-stone-100 font-bold">Aplicación SGA</span>
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4 text-amber-600" />
                  <span className="hidden sm:inline">Modo:</span>
                  <span className="text-stone-900 dark:text-stone-100 font-bold">Dossier Técnico (14 Secc.)</span>
                </>
              )}
              <ChevronDown className={`w-3.5 h-3.5 text-stone-400 transition-transform ${modeDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {modeDropdownOpen && (
              <div className="absolute left-0 mt-1.5 w-60 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl shadow-xl p-1.5 z-50 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setAppMode('sga');
                    setModeDropdownOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors ${
                    appMode === 'sga'
                      ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 font-bold'
                      : 'hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4 text-amber-600" />
                  <div>
                    <div className="font-bold">Aplicación Operativa SGA</div>
                    <div className="text-[10px] text-stone-500 font-normal">Matrícula, Calificaciones, Estudiantes, Kardex</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setAppMode('dossier');
                    setModeDropdownOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors mt-1 ${
                    appMode === 'dossier'
                      ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 font-bold'
                      : 'hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300'
                  }`}
                >
                  <FileText className="w-4 h-4 text-amber-600" />
                  <div>
                    <div className="font-bold">Dossier de Arquitectura</div>
                    <div className="text-[10px] text-stone-500 font-normal">14 secciones formales, diagramas Mermaid y ADRs</div>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* User Session & Role Desplegable / Dropdown Switcher */}
          <div className="flex items-center gap-2">
            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/70 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors text-xs"
                aria-expanded={userDropdownOpen}
                aria-haspopup="true"
                title="Desplegar cambio de usuario o rol"
              >
                <div className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold flex items-center justify-center text-[10px] shrink-0">
                  {currentUser.avatarInitials}
                </div>
                <div className="text-left hidden md:block">
                  <span className="font-bold text-stone-900 dark:text-stone-100 block leading-tight truncate max-w-[130px]">
                    {currentUser.name.split(' ')[0]} {currentUser.name.split(' ')[1] || ''}
                  </span>
                  <span className="text-[10px] text-amber-700 dark:text-amber-400 font-semibold block leading-tight">
                    {currentUser.role}
                  </span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-stone-400 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Click-based Dropdown */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-72 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl shadow-2xl p-2 z-50 text-xs animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="px-2.5 py-2 border-b border-stone-100 dark:border-stone-800 mb-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 font-bold block">
                      SESIÓN SIMULADA
                    </span>
                    <span className="font-bold text-stone-900 dark:text-stone-100 block text-xs mt-0.5">
                      {currentUser.name}
                    </span>
                    <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">
                      Rol: {currentUser.role} · {currentUser.department}
                    </span>
                  </div>

                  <div className="px-2 py-1 text-[10px] font-semibold text-stone-500 uppercase">
                    Seleccionar Otro Usuario / Rol:
                  </div>

                  <div className="space-y-0.5 max-h-64 overflow-y-auto">
                    {allUsers.map((u) => {
                      const isSelected = u.id === currentUser.id;
                      return (
                        <button
                          key={u.id}
                          type="button"
                          onClick={() => {
                            onSwitchUser(u.id);
                            setUserDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left transition-colors ${
                            isSelected
                              ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-900 dark:text-amber-200 font-bold border border-amber-200 dark:border-amber-800'
                              : 'hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <span className="w-6 h-6 rounded-full bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300 font-bold flex items-center justify-center text-[10px] shrink-0">
                              {u.avatarInitials}
                            </span>
                            <div className="truncate">
                              <div className="truncate font-semibold">{u.name}</div>
                              <div className="text-[10px] text-stone-400 font-mono">{u.code}</div>
                            </div>
                          </div>

                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 ml-2 ${
                            u.role === 'ADMINISTRADOR'
                              ? 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200'
                              : u.role === 'COORDINADOR'
                              ? 'bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-200'
                              : u.role === 'DOCENTE'
                              ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200'
                              : 'bg-purple-100 text-purple-900 dark:bg-purple-950 dark:text-purple-200'
                          }`}>
                            {u.role.substring(0, 4)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              type="button"
              onClick={toggleDarkMode}
              className="p-2 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              title={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
              aria-label="Modo de color"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
