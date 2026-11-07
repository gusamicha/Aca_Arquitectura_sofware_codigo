import React, { useState, useEffect } from 'react';
import { initialUsers, initialAuditLogs } from './data/dossierData';
import {
  seedPrograms,
  seedSubjects,
  seedPeriods,
  seedGroups,
  seedTeachers,
  seedStudents,
  seedEnrollments,
  AcademicProgram,
  Subject,
  AcademicPeriod,
  AcademicGroup,
  TeacherProfile,
  StudentProfile,
  EnrollmentRecord
} from './data/sgaDatabase';
import { UserAccount, AuditLogEntry } from './types';

import { SgaHeader } from './components/sga/SgaHeader';
import { SgaAppView } from './components/sga/SgaAppView';

import { Navigation, sectionsList } from './components/Navigation';
import { CoverSection } from './components/sections/CoverSection';
import { IntroProblemSection } from './components/sections/IntroProblemSection';
import { ObjectivesSection } from './components/sections/ObjectivesSection';
import { ScopeActorsSection } from './components/sections/ScopeActorsSection';
import { RequirementsSection } from './components/sections/RequirementsSection';
import { ArchitectureSection } from './components/sections/ArchitectureSection';
import { SystemModelsSection } from './components/sections/SystemModelsSection';
import { RolesPermissionsDemo } from './components/sections/RolesPermissionsDemo';
import { TraceabilitySection } from './components/sections/TraceabilitySection';
import { DecisionsRisksSection } from './components/sections/DecisionsRisksSection';
import { AIEvidenceSection } from './components/sections/AIEvidenceSection';
import { LinksSection } from './components/sections/LinksSection';
import { ConclusionsSection } from './components/sections/ConclusionsSection';
import { ReferencesSection } from './components/sections/ReferencesSection';

export default function App() {
  // Mode: 'sga' (the operational application) or 'dossier' (the 14-section technical report)
  const [appMode, setAppMode] = useState<'sga' | 'dossier'>('sga');

  // Sidebar Collapsible / Desplegable state (persisted)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('sga_sidebar_collapsed');
      return saved === 'true';
    } catch {
      return false;
    }
  });

  // Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('sga_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  // Global user accounts state (Gustavo Mercado and Ronald Gutierrez as Admins)
  const [users, setUsers] = useState<UserAccount[]>(() => {
    try {
      const saved = localStorage.getItem('sga_users');
      return saved ? JSON.parse(saved) : initialUsers;
    } catch {
      return initialUsers;
    }
  });

  // Current logged in user (defaults to Gustavo Mercado Portela - Admin)
  const [currentUserId, setCurrentUserId] = useState<string>(users[0]?.id || 'usr-01');
  const currentUser = users.find(u => u.id === currentUserId) || users[0];

  // Database State
  const [programs] = useState<AcademicProgram[]>(seedPrograms);
  const [subjects, setSubjects] = useState<Subject[]>(seedSubjects);
  const [periods] = useState<AcademicPeriod[]>(seedPeriods);
  const [groups, setGroups] = useState<AcademicGroup[]>(() => {
    try {
      const saved = localStorage.getItem('sga_groups');
      return saved ? JSON.parse(saved) : seedGroups;
    } catch {
      return seedGroups;
    }
  });
  const [teachers, setTeachers] = useState<TeacherProfile[]>(() => {
    try {
      const saved = localStorage.getItem('sga_teachers');
      return saved ? JSON.parse(saved) : seedTeachers;
    } catch {
      return seedTeachers;
    }
  });
  const [students, setStudents] = useState<StudentProfile[]>(() => {
    try {
      const saved = localStorage.getItem('sga_students');
      return saved ? JSON.parse(saved) : seedStudents;
    } catch {
      return seedStudents;
    }
  });
  const [enrollments, setEnrollments] = useState<EnrollmentRecord[]>(() => {
    try {
      const saved = localStorage.getItem('sga_enrollments');
      return saved ? JSON.parse(saved) : seedEnrollments;
    } catch {
      return seedEnrollments;
    }
  });
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(() => {
    try {
      const saved = localStorage.getItem('sga_audit_logs');
      return saved ? JSON.parse(saved) : initialAuditLogs;
    } catch {
      return initialAuditLogs;
    }
  });

  // Active section for dossier sidebar navigation
  const [activeDossierSection, setActiveDossierSection] = useState<string>('sec-portada');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Sync theme class to documentElement
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('sga_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('sga_theme', 'light');
    }
  }, [isDarkMode]);

  // Sync sidebar state
  useEffect(() => {
    try {
      localStorage.setItem('sga_sidebar_collapsed', isSidebarCollapsed ? 'true' : 'false');
    } catch (e) {
      console.error(e);
    }
  }, [isSidebarCollapsed]);

  // Sync data to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sga_groups', JSON.stringify(groups));
      localStorage.setItem('sga_teachers', JSON.stringify(teachers));
      localStorage.setItem('sga_students', JSON.stringify(students));
      localStorage.setItem('sga_enrollments', JSON.stringify(enrollments));
      localStorage.setItem('sga_audit_logs', JSON.stringify(auditLogs));
      localStorage.setItem('sga_users', JSON.stringify(users));
    } catch (e) {
      console.error(e);
    }
  }, [groups, teachers, students, enrollments, auditLogs, users]);

  // Track active section on scroll when in dossier mode
  useEffect(() => {
    if (appMode !== 'dossier') return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = sectionsList.length - 1; i >= 0; i--) {
        const sec = sectionsList[i];
        const el = document.getElementById(sec.id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveDossierSection(sec.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [appMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  const handleSelectDossierSection = (id: string) => {
    setActiveDossierSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExportPdf = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex flex-col transition-colors">
      {/* Top Universal App Header */}
      <SgaHeader
        currentUser={currentUser}
        allUsers={users}
        onSwitchUser={setCurrentUserId}
        appMode={appMode}
        setAppMode={setAppMode}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        onExportPdf={handleExportPdf}
        isSidebarCollapsed={isSidebarCollapsed}
        setIsSidebarCollapsed={setIsSidebarCollapsed}
      />

      {/* MODE 1: OPERATIONAL SGA APPLICATION */}
      {appMode === 'sga' && (
        <SgaAppView
          currentUser={currentUser}
          allUsers={users}
          setAllUsers={setUsers}
          auditLogs={auditLogs}
          setAuditLogs={setAuditLogs}
          programs={programs}
          subjects={subjects}
          setSubjects={setSubjects}
          periods={periods}
          groups={groups}
          setGroups={setGroups}
          teachers={teachers}
          setTeachers={setTeachers}
          students={students}
          setStudents={setStudents}
          enrollments={enrollments}
          setEnrollments={setEnrollments}
          isSidebarCollapsed={isSidebarCollapsed}
          setIsSidebarCollapsed={setIsSidebarCollapsed}
        />
      )}

      {/* MODE 2: ARCHITECTURE DOSSIER (14 SECTIONS) */}
      {appMode === 'dossier' && (
        <div className="flex-1 flex">
          {/* Dossier Lateral Navigation */}
          <Navigation
            activeSection={activeDossierSection}
            onSelectSection={handleSelectDossierSection}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
            onExportPdf={handleExportPdf}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            isCollapsed={isSidebarCollapsed}
            setIsCollapsed={setIsSidebarCollapsed}
          />

          {/* Dossier Main Content */}
          <main
            id="main-content"
            className={`flex-1 w-full min-w-0 transition-all focus:outline-none ${
              isSidebarCollapsed ? 'lg:pl-16' : 'lg:pl-72'
            }`}
            tabIndex={-1}
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-8 lg:py-12 space-y-16">
              {/* Section 1: Portada */}
              <section id="sec-portada" className="scroll-mt-6">
                <CoverSection onExportPdf={handleExportPdf} />
              </section>

              {/* Section 2: Introducción y Problema */}
              <section id="sec-intro" className="scroll-mt-6">
                <IntroProblemSection />
              </section>

              {/* Section 3: Objetivo General y Específicos */}
              <section id="sec-objetivos" className="scroll-mt-6">
                <ObjectivesSection />
              </section>

              {/* Section 4: Alcance, Actores, Supuestos y Restricciones */}
              <section id="sec-alcance" className="scroll-mt-6">
                <ScopeActorsSection />
              </section>

              {/* Section 5: Requerimientos RF y RNF */}
              <section id="sec-requerimientos" className="scroll-mt-6">
                <RequirementsSection />
              </section>

              {/* Section 6: Arquitectura Elegida (Monolito Modular vs Microservicios) */}
              <section id="sec-arquitectura" className="scroll-mt-6">
                <ArchitectureSection />
              </section>

              {/* Section 7: Modelos Mermaid (Casos de Uso, Componentes, Despliegue, ERD, Secuencia Matrícula, Secuencia Calificaciones) */}
              <section id="sec-modelos" className="scroll-mt-6">
                <SystemModelsSection isDarkMode={isDarkMode} />
              </section>

              {/* Section 8: Demostración Interactiva de Roles y Permisos (RBAC + Auditoría) */}
              <section id="sec-roles-demo" className="scroll-mt-6">
                <div className="border border-stone-200 dark:border-stone-800 rounded-xl p-6 sm:p-8 bg-white dark:bg-stone-900 shadow-xs">
                  <div className="mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                      <span>8. Demostración Interactiva de Roles, Permisos y Auditoría</span>
                    </h2>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                      Inicio de sesión simulado con los administradores (Gustavo Mercado Portela y Ronald Tomas Gutierrez Acuña), alternancia entre roles, matriz de privilegios y bitácora forense en tiempo real.
                    </p>
                  </div>

                  <RolesPermissionsDemo
                    users={users}
                    setUsers={setUsers}
                    auditLogs={auditLogs}
                    setAuditLogs={setAuditLogs}
                  />
                </div>
              </section>

              {/* Section 9: Matriz de Trazabilidad */}
              <section id="sec-trazabilidad" className="scroll-mt-6">
                <TraceabilitySection />
              </section>

              {/* Section 10: Decisiones (ADR), Atributos de Calidad y Riesgos */}
              <section id="sec-decisiones" className="scroll-mt-6">
                <DecisionsRisksSection />
              </section>

              {/* Section 11: Evidencias de Uso de la IA */}
              <section id="sec-evidencias-ia" className="scroll-mt-6">
                <AIEvidenceSection />
              </section>

              {/* Section 12: Enlaces Multimedia y Repositorio */}
              <section id="sec-multimedia" className="scroll-mt-6">
                <LinksSection />
              </section>

              {/* Section 13: Conclusiones y Recomendaciones */}
              <section id="sec-conclusiones" className="scroll-mt-6">
                <ConclusionsSection />
              </section>

              {/* Section 14: Referencias Bibliográficas APA 7 */}
              <section id="sec-referencias" className="scroll-mt-6">
                <ReferencesSection />
              </section>

              {/* Footer */}
              <footer className="pt-8 pb-12 border-t border-stone-200 dark:border-stone-800 text-center text-xs text-stone-500 dark:text-stone-400 space-y-2">
                <div className="font-semibold text-stone-700 dark:text-stone-300">
                  Dossier de Arquitectura de Software · Sistema de Gestión Académica (SGA)
                </div>
                <div>
                  Diseñado e implementado por <strong>Gustavo Mercado Portela</strong> & <strong>Ronald Tomas Gutierrez Acuña</strong>
                </div>
                <div className="text-[11px] font-mono text-stone-400 dark:text-stone-500">
                  Corporación Unificada Nacional de Educación Superior (CUN) · 2026
                </div>
              </footer>
            </div>
          </main>
        </div>
      )}
    </div>
  );
}
