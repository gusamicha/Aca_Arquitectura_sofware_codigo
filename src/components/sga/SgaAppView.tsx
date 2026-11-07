import React, { useState } from 'react';
import {
  AcademicProgram,
  Subject,
  AcademicPeriod,
  AcademicGroup,
  StudentProfile,
  TeacherProfile,
  EnrollmentRecord
} from '../../data/sgaDatabase';
import { UserAccount, AuditLogEntry } from '../../types';

import { SgaDashboard } from './SgaDashboard';
import { SgaEnrollment } from './SgaEnrollment';
import { SgaGrades } from './SgaGrades';
import { SgaStudents } from './SgaStudents';
import { SgaTeachers } from './SgaTeachers';
import { SgaCurriculum } from './SgaCurriculum';
import { SgaGroups } from './SgaGroups';
import { SgaKardex } from './SgaKardex';
import { SgaReports } from './SgaReports';
import { RolesPermissionsDemo } from '../sections/RolesPermissionsDemo';

import {
  LayoutDashboard,
  CalendarCheck,
  FileSpreadsheet,
  Users,
  Briefcase,
  Layers,
  Calendar,
  GraduationCap,
  FileText,
  Shield,
  History,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  PanelLeftClose,
  PanelLeft,
  FolderOpen,
  Folder
} from 'lucide-react';

interface SgaAppViewProps {
  currentUser: UserAccount;
  allUsers: UserAccount[];
  setAllUsers: React.Dispatch<React.SetStateAction<UserAccount[]>>;
  auditLogs: AuditLogEntry[];
  setAuditLogs: React.Dispatch<React.SetStateAction<AuditLogEntry[]>>;
  programs: AcademicProgram[];
  subjects: Subject[];
  setSubjects: React.Dispatch<React.SetStateAction<Subject[]>>;
  periods: AcademicPeriod[];
  groups: AcademicGroup[];
  setGroups: React.Dispatch<React.SetStateAction<AcademicGroup[]>>;
  teachers: TeacherProfile[];
  setTeachers: React.Dispatch<React.SetStateAction<TeacherProfile[]>>;
  students: StudentProfile[];
  setStudents: React.Dispatch<React.SetStateAction<StudentProfile[]>>;
  enrollments: EnrollmentRecord[];
  setEnrollments: React.Dispatch<React.SetStateAction<EnrollmentRecord[]>>;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SgaAppView: React.FC<SgaAppViewProps> = ({
  currentUser,
  allUsers,
  setAllUsers,
  auditLogs,
  setAuditLogs,
  programs,
  subjects,
  setSubjects,
  periods,
  groups,
  setGroups,
  teachers,
  setTeachers,
  students,
  setStudents,
  enrollments,
  setEnrollments,
  isSidebarCollapsed,
  setIsSidebarCollapsed
}) => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState<boolean>(false);

  // Collapsible Sub-menu Groups state
  const [openGroups, setOpenGroups] = useState<{ [key: string]: boolean }>({
    academics: true,
    management: true,
    security: true
  });

  const toggleGroup = (key: string) => {
    setOpenGroups(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Helper to append audit logs
  const handleAddAuditLog = (
    action: string,
    record: string,
    details: string,
    status: 'EXITOSO' | 'DENEGADO' = 'EXITOSO'
  ) => {
    const now = new Date();
    const formattedDate = `${now.toISOString().replace('T', ' ').substring(0, 19)} UTC`;
    const newLog: AuditLogEntry = {
      id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: formattedDate,
      user: currentUser.name,
      role: currentUser.role,
      action,
      affectedRecord: record,
      ipAddress: "192.168.10.45",
      status,
      details
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Grouped Navigation structure
  const academicItems = [
    { id: 'enrollment', label: 'Matrícula Transaccional', code: 'RF-07', icon: CalendarCheck },
    { id: 'grades', label: 'Libro de Calificaciones', code: 'RF-08', icon: FileSpreadsheet },
    { id: 'kardex', label: 'Kardex Estudiantil', code: 'RF-09', icon: GraduationCap }
  ];

  const managementItems = [
    { id: 'students', label: 'Directorio Estudiantes', code: 'RF-03', icon: Users },
    { id: 'teachers', label: 'Planta Profesoral', code: 'RF-04', icon: Briefcase },
    { id: 'curriculum', label: 'Programas y Mallas', code: 'RF-05', icon: Layers },
    { id: 'groups', label: 'Grupos y Horarios', code: 'RF-06', icon: Calendar }
  ];

  const securityItems = [
    { id: 'reports', label: 'Actas y Reportes', code: 'RF-10', icon: FileText },
    { id: 'users', label: 'Usuarios y Roles (RBAC)', code: 'RF-02', icon: Shield },
    { id: 'audit', label: 'Auditoría Forense', code: 'RF-12', icon: History }
  ];

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-stone-100/60 dark:bg-stone-950 relative">
      {/* Mobile Backdrop */}
      {mobileDrawerOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black/50 backdrop-blur-xs"
          onClick={() => setMobileDrawerOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Floating Mobile Toggle Button */}
      <div className="lg:hidden fixed bottom-4 right-4 z-40">
        <button
          type="button"
          onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
          className="p-3.5 bg-amber-600 text-white rounded-2xl shadow-xl hover:bg-amber-700 transition-transform active:scale-95 flex items-center justify-center"
          aria-label="Desplegar menú de navegación SGA"
        >
          {mobileDrawerOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Desplegable / Collapsible Lateral Sidebar */}
      <aside
        className={`bg-white dark:bg-stone-900 border-r border-stone-200 dark:border-stone-800 flex flex-col justify-between shrink-0 fixed lg:sticky top-16 h-[calc(100vh-4rem)] z-30 transition-all duration-200 ${
          /* Desktop Width: w-64 when deployed, w-16 when collapsed */
          isSidebarCollapsed ? 'lg:w-16' : 'lg:w-64'
        } ${
          /* Mobile: slide from left */
          mobileDrawerOpen ? 'translate-x-0 w-72 shadow-2xl' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-3 space-y-3 flex-1 overflow-y-auto">
          {/* Header of Sidebar with Collapse Toggle */}
          <div className="flex items-center justify-between px-1 py-1">
            {!isSidebarCollapsed && (
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 font-bold block">
                  SGA · NAVEGACIÓN
                </span>
                <span className="text-xs font-bold text-stone-900 dark:text-stone-100">
                  Módulos del Sistema
                </span>
              </div>
            )}
            <button
              type="button"
              onClick={() => setIsSidebarCollapsed(prev => !prev)}
              className="hidden lg:flex p-1.5 rounded-lg text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors mx-auto"
              title={isSidebarCollapsed ? "Desplegar menú lateral completo" : "Contraer menú a barra de iconos"}
            >
              {isSidebarCollapsed ? (
                <PanelLeft className="w-4 h-4 text-amber-600" />
              ) : (
                <PanelLeftClose className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Primary Dashboard Link */}
          <button
            type="button"
            onClick={() => {
              setActiveTab('dashboard');
              setMobileDrawerOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'dashboard'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
            title="Inicio / Tablero"
          >
            <LayoutDashboard className="w-4 h-4 shrink-0" />
            {!isSidebarCollapsed && <span className="truncate">Inicio / Tablero</span>}
          </button>

          {/* Group 1: Procesos Académicos (Desplegable) */}
          <div className="pt-2">
            {!isSidebarCollapsed ? (
              <button
                type="button"
                onClick={() => toggleGroup('academics')}
                className="w-full flex items-center justify-between px-2 py-1.5 text-[11px] font-bold text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 transition-colors uppercase tracking-wider"
              >
                <span className="flex items-center gap-1.5">
                  {openGroups.academics ? <FolderOpen className="w-3.5 h-3.5 text-amber-600" /> : <Folder className="w-3.5 h-3.5 text-amber-600" />}
                  <span>Procesos Académicos</span>
                </span>
                {openGroups.academics ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
              </button>
            ) : (
              <div className="h-px bg-stone-200 dark:border-stone-800 my-1" />
            )}

            {(openGroups.academics || isSidebarCollapsed) && (
              <div className="space-y-0.5 mt-1">
                {academicItems.map(item => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileDrawerOpen(false);
                      }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                        isActive
                          ? 'bg-amber-600 text-white font-semibold shadow-xs'
                          : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                      }`}
                      title={`${item.label} (${item.code})`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-stone-400'}`} />
                      {!isSidebarCollapsed && (
                        <div className="flex-1 flex items-center justify-between truncate">
                          <span className="truncate">{item.label}</span>
                          <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                            isActive ? 'bg-amber-700 text-white' : 'bg-stone-100 dark:bg-stone-800 text-stone-500'
                          }`}>
                            {item.code}
                          </span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Group 2: Gestión y Catálogos (Desplegable) */}
          <div className="pt-2">
            {!isSidebarCollapsed ? (
              <button
                type="button"
                onClick={() => toggleGroup('management')}
                className="w-full flex items-center justify-between px-2 py-1.5 text-[11px] font-bold text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 transition-colors uppercase tracking-wider"
              >
                <span className="flex items-center gap-1.5">
                  {openGroups.management ? <FolderOpen className="w-3.5 h-3.5 text-stone-400" /> : <Folder className="w-3.5 h-3.5 text-stone-400" />}
                  <span>Gestión Curricular</span>
                </span>
                {openGroups.management ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
              </button>
            ) : (
              <div className="h-px bg-stone-200 dark:border-stone-800 my-1" />
            )}

            {(openGroups.management || isSidebarCollapsed) && (
              <div className="space-y-0.5 mt-1">
                {managementItems.map(item => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileDrawerOpen(false);
                      }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                        isActive
                          ? 'bg-amber-600 text-white font-semibold shadow-xs'
                          : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                      }`}
                      title={`${item.label} (${item.code})`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-stone-400'}`} />
                      {!isSidebarCollapsed && (
                        <div className="flex-1 flex items-center justify-between truncate">
                          <span className="truncate">{item.label}</span>
                          <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                            isActive ? 'bg-amber-700 text-white' : 'bg-stone-100 dark:bg-stone-800 text-stone-500'
                          }`}>
                            {item.code}
                          </span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Group 3: Seguridad y Auditoría (Desplegable) */}
          <div className="pt-2">
            {!isSidebarCollapsed ? (
              <button
                type="button"
                onClick={() => toggleGroup('security')}
                className="w-full flex items-center justify-between px-2 py-1.5 text-[11px] font-bold text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 transition-colors uppercase tracking-wider"
              >
                <span className="flex items-center gap-1.5">
                  {openGroups.security ? <FolderOpen className="w-3.5 h-3.5 text-stone-400" /> : <Folder className="w-3.5 h-3.5 text-stone-400" />}
                  <span>Control y Auditoría</span>
                </span>
                {openGroups.security ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
              </button>
            ) : (
              <div className="h-px bg-stone-200 dark:border-stone-800 my-1" />
            )}

            {(openGroups.security || isSidebarCollapsed) && (
              <div className="space-y-0.5 mt-1">
                {securityItems.map(item => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileDrawerOpen(false);
                      }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                        isActive
                          ? 'bg-amber-600 text-white font-semibold shadow-xs'
                          : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                      }`}
                      title={`${item.label} (${item.code})`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-stone-400'}`} />
                      {!isSidebarCollapsed && (
                        <div className="flex-1 flex items-center justify-between truncate">
                          <span className="truncate">{item.label}</span>
                          <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                            isActive ? 'bg-amber-700 text-white' : 'bg-stone-100 dark:bg-stone-800 text-stone-500'
                          }`}>
                            {item.code}
                          </span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* User Card in Sidebar Footer */}
        <div className="p-3 border-t border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold flex items-center justify-center text-xs shrink-0">
              {currentUser.avatarInitials}
            </div>
            {!isSidebarCollapsed && (
              <div className="truncate text-xs">
                <span className="font-bold text-stone-900 dark:text-stone-100 block truncate">
                  {currentUser.name}
                </span>
                <span className="text-[10px] text-amber-700 dark:text-amber-400 font-semibold block">
                  {currentUser.role}
                </span>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full min-w-0 transition-all">
        {activeTab === 'dashboard' && (
          <SgaDashboard
            currentUser={currentUser}
            students={students}
            teachers={teachers}
            groups={groups}
            enrollments={enrollments}
            periods={periods}
            auditLogs={auditLogs}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'enrollment' && (
          <SgaEnrollment
            currentUser={currentUser}
            groups={groups}
            setGroups={setGroups}
            enrollments={enrollments}
            setEnrollments={setEnrollments}
            students={students}
            periods={periods}
            onAddAuditLog={handleAddAuditLog}
          />
        )}

        {activeTab === 'grades' && (
          <SgaGrades
            currentUser={currentUser}
            groups={groups}
            enrollments={enrollments}
            setEnrollments={setEnrollments}
            onAddAuditLog={handleAddAuditLog}
          />
        )}

        {activeTab === 'kardex' && (
          <SgaKardex
            currentUser={currentUser}
            students={students}
            enrollments={enrollments}
          />
        )}

        {activeTab === 'students' && (
          <SgaStudents
            currentUser={currentUser}
            students={students}
            setStudents={setStudents}
            programs={programs}
            onAddAuditLog={handleAddAuditLog}
          />
        )}

        {activeTab === 'teachers' && (
          <SgaTeachers
            currentUser={currentUser}
            teachers={teachers}
            setTeachers={setTeachers}
            onAddAuditLog={handleAddAuditLog}
          />
        )}

        {activeTab === 'curriculum' && (
          <SgaCurriculum
            currentUser={currentUser}
            programs={programs}
            subjects={subjects}
            setSubjects={setSubjects}
            onAddAuditLog={handleAddAuditLog}
          />
        )}

        {activeTab === 'groups' && (
          <SgaGroups
            currentUser={currentUser}
            groups={groups}
            setGroups={setGroups}
            subjects={subjects}
            teachers={teachers}
            periods={periods}
            onAddAuditLog={handleAddAuditLog}
          />
        )}

        {activeTab === 'reports' && (
          <SgaReports
            currentUser={currentUser}
            groups={groups}
            enrollments={enrollments}
            programs={programs}
          />
        )}

        {(activeTab === 'users' || activeTab === 'audit') && (
          <div className="border border-stone-200 dark:border-stone-800 rounded-2xl p-6 bg-white dark:bg-stone-900 shadow-xs">
            <h2 className="text-xl font-extrabold text-stone-900 dark:text-stone-100 mb-2">
              Gestión de Usuarios, Permisos RBAC y Auditoría Forense
            </h2>
            <p className="text-xs text-stone-500 mb-6">
              Módulo de seguridad administrado por Gustavo Mercado Portela y Ronald Tomas Gutierrez Acuña.
            </p>
            <RolesPermissionsDemo
              users={allUsers}
              setUsers={setAllUsers}
              auditLogs={auditLogs}
              setAuditLogs={setAuditLogs}
            />
          </div>
        )}
      </main>
    </div>
  );
};
