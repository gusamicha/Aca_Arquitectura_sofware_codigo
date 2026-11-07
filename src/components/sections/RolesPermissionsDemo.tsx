import React, { useState } from 'react';
import {
  UserAccount,
  RoleType,
  AuditLogEntry
} from '../../types';
import {
  Shield,
  UserCheck,
  Users,
  Lock,
  KeyRound,
  CheckCircle2,
  XCircle,
  FileSpreadsheet,
  AlertTriangle,
  History,
  Filter,
  ArrowRight,
  Sparkles,
  BookOpen,
  GraduationCap,
  ClipboardList
} from 'lucide-react';

interface RolesPermissionsDemoProps {
  users: UserAccount[];
  setUsers: React.Dispatch<React.SetStateAction<UserAccount[]>>;
  auditLogs: AuditLogEntry[];
  setAuditLogs: React.Dispatch<React.SetStateAction<AuditLogEntry[]>>;
}

export const RolesPermissionsDemo: React.FC<RolesPermissionsDemoProps> = ({
  users,
  setUsers,
  auditLogs,
  setAuditLogs
}) => {
  // Current active logged-in user in simulation
  const [activeUserId, setActiveUserId] = useState<string>(users[0]?.id || 'usr-01');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>('TODOS');
  const [auditSearchTerm, setAuditSearchTerm] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'simulation' | 'matrix' | 'users' | 'audit'>('simulation');

  const currentUser = users.find(u => u.id === activeUserId) || users[0];

  // RBAC Permission Definition for Matrix
  const rbacModules = [
    {
      module: "Gestión de Usuarios y Roles",
      description: "Creación de cuentas, asignación de roles y revocación de accesos.",
      permissions: {
        ADMINISTRADOR: { read: true, create: true, update: true, delete: true, approve: true },
        COORDINADOR: { read: true, create: false, update: false, delete: false, approve: false },
        DOCENTE: { read: false, create: false, update: false, delete: false, approve: false },
        ESTUDIANTE: { read: false, create: false, update: false, delete: false, approve: false }
      }
    },
    {
      module: "Programas y Malla Curricular",
      description: "Diseño curricular, asignaturas, prerrequisitos y créditos.",
      permissions: {
        ADMINISTRADOR: { read: true, create: true, update: true, delete: true, approve: true },
        COORDINADOR: { read: true, create: true, update: true, delete: false, approve: true },
        DOCENTE: { read: true, create: false, update: false, delete: false, approve: false },
        ESTUDIANTE: { read: true, create: false, update: false, delete: false, approve: false }
      }
    },
    {
      module: "Grupos, Horarios y Periodos",
      description: "Apertura de periodos académicos, cupos y asignación docente.",
      permissions: {
        ADMINISTRADOR: { read: true, create: true, update: true, delete: true, approve: true },
        COORDINADOR: { read: true, create: true, update: true, delete: false, approve: true },
        DOCENTE: { read: true, create: false, update: false, delete: false, approve: false },
        ESTUDIANTE: { read: true, create: false, update: false, delete: false, approve: false }
      }
    },
    {
      module: "Matrícula Transaccional",
      description: "Inscripción en grupos con validación de cupos y horarios.",
      permissions: {
        ADMINISTRADOR: { read: true, create: true, update: true, delete: true, approve: true },
        COORDINADOR: { read: true, create: true, update: true, delete: true, approve: true },
        DOCENTE: { read: true, create: false, update: false, delete: false, approve: false },
        ESTUDIANTE: { read: true, create: true, update: false, delete: false, approve: false }
      }
    },
    {
      module: "Registro de Calificaciones",
      description: "Digitación de notas de cortes evaluativos y cálculo de promedios.",
      permissions: {
        ADMINISTRADOR: { read: true, create: true, update: true, delete: true, approve: true },
        COORDINADOR: { read: true, create: false, update: true, delete: false, approve: true },
        DOCENTE: { read: true, create: true, update: true, delete: false, approve: false },
        ESTUDIANTE: { read: true, create: false, update: false, delete: false, approve: false }
      }
    },
    {
      module: "Actas Definitivas y Certificados",
      description: "Cierre formal de actas de notas y expedición de certificados.",
      permissions: {
        ADMINISTRADOR: { read: true, create: true, update: true, delete: true, approve: true },
        COORDINADOR: { read: true, create: true, update: true, delete: false, approve: true },
        DOCENTE: { read: true, create: true, update: false, delete: false, approve: false },
        ESTUDIANTE: { read: true, create: false, update: false, delete: false, approve: false }
      }
    },
    {
      module: "Bitácora de Auditoría Forense",
      description: "Consulta inmutable de registros transaccionales y seguridad.",
      permissions: {
        ADMINISTRADOR: { read: true, create: false, update: false, delete: false, approve: false },
        COORDINADOR: { read: false, create: false, update: false, delete: false, approve: false },
        DOCENTE: { read: false, create: false, update: false, delete: false, approve: false },
        ESTUDIANTE: { read: false, create: false, update: false, delete: false, approve: false }
      }
    }
  ];

  // Handler for role changes by Admin
  const handleRoleChange = (targetUserId: string, newRole: RoleType) => {
    if (currentUser.role !== 'ADMINISTRADOR') {
      alert("Operación denegada: Solo los Administradores (Gustavo Mercado o Ronald Gutierrez) pueden cambiar roles de usuario.");
      return;
    }

    const targetUser = users.find(u => u.id === targetUserId);
    if (!targetUser) return;

    const previousRole = targetUser.role;

    // Update user state
    setUsers(prev => prev.map(u => {
      if (u.id === targetUserId) {
        return { ...u, role: newRole };
      }
      return u;
    }));

    // Record audit event
    const now = new Date();
    const formattedDate = `${now.toISOString().replace('T', ' ').substring(0, 19)} UTC`;
    const newAuditEntry: AuditLogEntry = {
      id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: formattedDate,
      user: currentUser.name,
      role: currentUser.role,
      action: "CAMBIO_ROL_USUARIO",
      affectedRecord: `Usuario: ${targetUser.name} (${targetUser.code}) [${previousRole} -> ${newRole}]`,
      ipAddress: "192.168.10.45",
      status: "EXITOSO",
      details: `Rol reasignado formalmente por ${currentUser.name} desde la consola administrativa.`
    };

    setAuditLogs(prev => [newAuditEntry, ...prev]);
  };

  // Toggle user active status
  const handleToggleActive = (targetUserId: string) => {
    if (currentUser.role !== 'ADMINISTRADOR') {
      alert("Acceso denegado: Se requiere rol de ADMINISTRADOR.");
      return;
    }

    const targetUser = users.find(u => u.id === targetUserId);
    if (!targetUser) return;

    // Prevent deactivating own account
    if (targetUser.id === currentUser.id) {
      alert("Seguridad del sistema: No puede suspender su propia cuenta de administrador.");
      return;
    }

    const nextState = !targetUser.active;
    setUsers(prev => prev.map(u => (u.id === targetUserId ? { ...u, active: nextState } : u)));

    const now = new Date();
    const newAuditEntry: AuditLogEntry = {
      id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: `${now.toISOString().replace('T', ' ').substring(0, 19)} UTC`,
      user: currentUser.name,
      role: currentUser.role,
      action: nextState ? "ACTIVACION_CUENTA" : "SUSPENSION_CUENTA",
      affectedRecord: `Usuario: ${targetUser.name} (${targetUser.code})`,
      ipAddress: "192.168.10.45",
      status: "EXITOSO",
      details: nextState ? "Cuenta reactivada en el directorio." : "Cuenta suspendida temporalmente por seguridad."
    };

    setAuditLogs(prev => [newAuditEntry, ...prev]);
  };

  const filteredAuditLogs = auditLogs.filter(log => {
    const matchesSearch =
      log.user.toLowerCase().includes(auditSearchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(auditSearchTerm.toLowerCase()) ||
      log.affectedRecord.toLowerCase().includes(auditSearchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Simulation Banner & User Selector */}
      <div className="border border-stone-200 dark:border-stone-800 rounded-xl p-5 bg-white dark:bg-stone-900 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 dark:text-amber-400">
              <KeyRound className="w-4 h-4" />
              <span>SIMULADOR DE SESIONES Y MATRIZ RBAC (SIN CREDENCIALES REALES)</span>
            </div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 mt-1">
              Usuario en Sesión Actual: <span className="text-amber-600 dark:text-amber-400">{currentUser.name}</span>
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              Rol Asignado: <span className="font-semibold text-stone-800 dark:text-stone-200">{currentUser.role}</span> · Código: <span className="font-mono">{currentUser.code}</span> · {currentUser.department}
            </p>
          </div>

          {/* Quick User Switcher Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-stone-500 dark:text-stone-400 mr-1 font-medium">Cambiar a:</span>
            {users.map(u => (
              <button
                key={u.id}
                type="button"
                onClick={() => setActiveUserId(u.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                  u.id === currentUser.id
                    ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 border-stone-900 dark:border-stone-100 shadow-xs'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
                title={`Cambiar sesión a ${u.name} (${u.role})`}
              >
                <span className="font-bold mr-1">[{u.role.substring(0, 3)}]</span>
                {u.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Notice highlighting preloaded administrators */}
        <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center gap-2 text-xs text-stone-600 dark:text-stone-400">
          <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            <strong>Administradores del Sistema precargados:</strong> Gustavo Mercado Portela y Ronald Tomas Gutierrez Acuña tienen privilegios plenos para gestionar roles y supervisar la auditoría forense.
          </span>
        </div>
      </div>

      {/* Tabs navigation for section */}
      <div className="flex border-b border-stone-200 dark:border-stone-800 gap-2">
        <button
          type="button"
          onClick={() => setActiveTab('simulation')}
          className={`pb-3 px-4 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'simulation'
              ? 'border-amber-600 text-amber-700 dark:text-amber-400 dark:border-amber-400'
              : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
          }`}
        >
          Vista del Rol ({currentUser.role})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('matrix')}
          className={`pb-3 px-4 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'matrix'
              ? 'border-amber-600 text-amber-700 dark:text-amber-400 dark:border-amber-400'
              : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
          }`}
        >
          Matriz de Roles y Permisos (RBAC)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('users')}
          className={`pb-3 px-4 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'users'
              ? 'border-amber-600 text-amber-700 dark:text-amber-400 dark:border-amber-400'
              : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
          }`}
        >
          Gestión de Usuarios y Roles ({users.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('audit')}
          className={`pb-3 px-4 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'audit'
              ? 'border-amber-600 text-amber-700 dark:text-amber-400 dark:border-amber-400'
              : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
          }`}
        >
          Bitácora de Auditoría Visible ({auditLogs.length})
        </button>
      </div>

      {/* TAB 1: Real-time UI Perspective based on Active Role */}
      {activeTab === 'simulation' && (
        <div className="space-y-6">
          <div className="border border-stone-200 dark:border-stone-800 rounded-xl p-6 bg-white dark:bg-stone-900">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800 mb-6">
              <div>
                <h4 className="text-base font-bold text-stone-900 dark:text-stone-100">
                  Panel Operativo para el Rol: <span className="text-amber-600 dark:text-amber-400">{currentUser.role}</span>
                </h4>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                  Muestra interactiva de los módulos visibles, autorizaciones y restricciones aplicadas en la interfaz.
                </p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-mono">
                RBAC Token Verified
              </span>
            </div>

            {/* Role specific views */}
            {currentUser.role === 'ADMINISTRADOR' && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700">
                    <span className="text-xs text-stone-500 dark:text-stone-400 font-semibold uppercase">Usuarios Registrados</span>
                    <div className="text-2xl font-bold font-mono text-stone-900 dark:text-stone-100 mt-1">{users.length}</div>
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 block">Cuentas activas en directorio</span>
                  </div>
                  <div className="p-4 rounded-lg bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700">
                    <span className="text-xs text-stone-500 dark:text-stone-400 font-semibold uppercase">Eventos en Auditoría</span>
                    <div className="text-2xl font-bold font-mono text-stone-900 dark:text-stone-100 mt-1">{auditLogs.length}</div>
                    <span className="text-xs text-stone-500 dark:text-stone-400 mt-1 block">Inmutabilidad garantizada</span>
                  </div>
                  <div className="p-4 rounded-lg bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700">
                    <span className="text-xs text-stone-500 dark:text-stone-400 font-semibold uppercase">Estado de Infraestructura</span>
                    <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">99.98%</div>
                    <span className="text-xs text-stone-500 dark:text-stone-400 mt-1 block">PostgreSQL Primary OK</span>
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-amber-200 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/20">
                  <h5 className="text-sm font-bold text-amber-900 dark:text-amber-200 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-amber-600" />
                    Privilegios Exclusivos del Administrador
                  </h5>
                  <p className="text-xs text-amber-800 dark:text-amber-300 mt-1 leading-relaxed">
                    Como <strong>{currentUser.name}</strong>, usted tiene facultades para gestionar usuarios, cambiar roles, crear periodos lectivos, revocar tokens y supervisar la bitácora forense completa.
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('users')}
                      className="px-3 py-1.5 text-xs font-semibold rounded-md bg-amber-600 text-white hover:bg-amber-700 transition-colors"
                    >
                      Ir a Gestión de Usuarios
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('audit')}
                      className="px-3 py-1.5 text-xs font-semibold rounded-md border border-amber-400 text-amber-900 dark:text-amber-200 hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors"
                    >
                      Ver Registro de Auditoría
                    </button>
                  </div>
                </div>
              </div>
            )}

            {currentUser.role === 'COORDINADOR' && (
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700">
                  <h5 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                    <ClipboardList className="w-4 h-4 text-stone-700 dark:text-stone-300" />
                    Consola de Coordinación Académica
                  </h5>
                  <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
                    Vista habilitada para programar asignaturas, ofertar grupos para el periodo 2027-1, validar cupos y asignar docentes titulares.
                  </p>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-white dark:bg-stone-900 rounded border border-stone-200 dark:border-stone-800">
                      <span className="font-semibold block text-stone-900 dark:text-stone-100">Grupos Programados: 48</span>
                      <span className="text-stone-500">Cupos totales ofertados: 1,440</span>
                    </div>
                    <div className="p-3 bg-white dark:bg-stone-900 rounded border border-stone-200 dark:border-stone-800">
                      <span className="font-semibold block text-stone-900 dark:text-stone-100">Actas por Aprobar: 3</span>
                      <span className="text-amber-600 dark:text-amber-400">Pendiente cierre de corte final</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-stone-500 italic">
                  Restricción RBAC: El Coordinador no puede eliminar usuarios ni alterar la configuración criptográfica del sistema.
                </p>
              </div>
            )}

            {currentUser.role === 'DOCENTE' && (
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700">
                  <h5 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-stone-700 dark:text-stone-300" />
                    Libro de Calificaciones Docente
                  </h5>
                  <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
                    Grupos asignados a <strong>{currentUser.name}</strong> para el periodo lectivo en curso.
                  </p>

                  <div className="mt-3 overflow-x-auto">
                    <table className="w-full text-xs text-left border border-stone-200 dark:border-stone-700">
                      <thead className="bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                        <tr>
                          <th className="p-2 font-semibold">Grupo</th>
                          <th className="p-2 font-semibold">Asignatura</th>
                          <th className="p-2 font-semibold">Alumnos</th>
                          <th className="p-2 font-semibold">Corte 1 (30%)</th>
                          <th className="p-2 font-semibold">Corte 2 (35%)</th>
                          <th className="p-2 font-semibold">Corte 3 (35%)</th>
                          <th className="p-2 font-semibold">Acción</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-200 dark:divide-stone-700">
                        <tr>
                          <td className="p-2 font-mono">ARQ-SOFT-G1</td>
                          <td className="p-2 font-medium">Arquitectura de Software</td>
                          <td className="p-2">32 matriculados</td>
                          <td className="p-2 text-emerald-600">Cerrado</td>
                          <td className="p-2 text-emerald-600">Cerrado</td>
                          <td className="p-2 text-amber-600 font-semibold">Abierto (Hasta 15-Nov)</td>
                          <td className="p-2">
                            <span className="text-amber-700 dark:text-amber-400 font-semibold cursor-pointer hover:underline">
                              Digitar Notas
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <p className="text-xs text-stone-500 italic">
                  Restricción RBAC: El docente solo puede editar calificaciones de los grupos donde es titular formal. Toda modificación queda registrada en auditoría.
                </p>
              </div>
            )}

            {currentUser.role === 'ESTUDIANTE' && (
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700">
                  <h5 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-stone-700 dark:text-stone-300" />
                    Portal Estudiantil - Kardex y Matrícula
                  </h5>
                  <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
                    Expediente académico de <strong>{currentUser.name}</strong> ({currentUser.code}).
                  </p>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 bg-white dark:bg-stone-900 rounded border border-stone-200 dark:border-stone-800">
                      <span className="text-stone-500 block">Promedio Acumulado</span>
                      <span className="text-xl font-bold font-mono text-stone-900 dark:text-stone-100">4.42 / 5.0</span>
                    </div>
                    <div className="p-3 bg-white dark:bg-stone-900 rounded border border-stone-200 dark:border-stone-800">
                      <span className="text-stone-500 block">Créditos Aprobados</span>
                      <span className="text-xl font-bold font-mono text-stone-900 dark:text-stone-100">118 / 160</span>
                    </div>
                    <div className="p-3 bg-white dark:bg-stone-900 rounded border border-stone-200 dark:border-stone-800">
                      <span className="text-stone-500 block">Estado de Matrícula</span>
                      <span className="text-emerald-600 font-bold block mt-1">REGULAR ACTIVO</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-stone-500 italic">
                  Restricción RBAC: Modo estrictamente de solo lectura sobre calificaciones y actas; permiso de escritura limitado a la selección transaccional de cupos en matrícula ordinaria.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: RBAC Matrix */}
      {activeTab === 'matrix' && (
        <div className="border border-stone-200 dark:border-stone-800 rounded-xl bg-white dark:bg-stone-900 overflow-hidden shadow-xs">
          <div className="p-5 border-b border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-base font-bold text-stone-900 dark:text-stone-100">
                Matriz de Control de Acceso Basado en Roles (RBAC)
              </h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                Mapeo exhaustivo de módulos y operaciones CRUD por rol de usuario
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-500">Filtrar rol:</span>
              <select
                value={selectedRoleFilter}
                onChange={(e) => setSelectedRoleFilter(e.target.value)}
                className="text-xs py-1 px-2.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
              >
                <option value="TODOS">Todos los roles</option>
                <option value="ADMINISTRADOR">Administrador</option>
                <option value="COORDINADOR">Coordinador</option>
                <option value="DOCENTE">Docente</option>
                <option value="ESTUDIANTE">Estudiante</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-stone-100/80 dark:bg-stone-800/80 text-stone-800 dark:text-stone-200 border-b border-stone-200 dark:border-stone-700">
                <tr>
                  <th className="p-3.5 font-bold">Módulo del Sistema</th>
                  {(selectedRoleFilter === 'TODOS' || selectedRoleFilter === 'ADMINISTRADOR') && (
                    <th className="p-3.5 font-bold text-center border-l border-stone-200 dark:border-stone-700">
                      Administrador
                      <span className="block text-[10px] font-normal text-stone-500">Control total</span>
                    </th>
                  )}
                  {(selectedRoleFilter === 'TODOS' || selectedRoleFilter === 'COORDINADOR') && (
                    <th className="p-3.5 font-bold text-center border-l border-stone-200 dark:border-stone-700">
                      Coordinador
                      <span className="block text-[10px] font-normal text-stone-500">Gestión académica</span>
                    </th>
                  )}
                  {(selectedRoleFilter === 'TODOS' || selectedRoleFilter === 'DOCENTE') && (
                    <th className="p-3.5 font-bold text-center border-l border-stone-200 dark:border-stone-700">
                      Docente
                      <span className="block text-[10px] font-normal text-stone-500">Evaluación y actas</span>
                    </th>
                  )}
                  {(selectedRoleFilter === 'TODOS' || selectedRoleFilter === 'ESTUDIANTE') && (
                    <th className="p-3.5 font-bold text-center border-l border-stone-200 dark:border-stone-700">
                      Estudiante
                      <span className="block text-[10px] font-normal text-stone-500">Inscripción y kardex</span>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
                {rbacModules.map((item, idx) => (
                  <tr key={idx} className="hover:bg-stone-50/50 dark:hover:bg-stone-800/30 transition-colors">
                    <td className="p-3.5">
                      <div className="font-semibold text-stone-900 dark:text-stone-100">{item.module}</div>
                      <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">{item.description}</div>
                    </td>

                    {(selectedRoleFilter === 'TODOS' || selectedRoleFilter === 'ADMINISTRADOR') && (
                      <td className="p-3.5 text-center border-l border-stone-200 dark:border-stone-800">
                        <div className="flex items-center justify-center gap-1 font-mono text-[11px]">
                          <span className={item.permissions.ADMINISTRADOR.read ? "text-emerald-600 font-bold" : "text-stone-300"}>R</span>
                          <span className={item.permissions.ADMINISTRADOR.create ? "text-emerald-600 font-bold" : "text-stone-300"}>C</span>
                          <span className={item.permissions.ADMINISTRADOR.update ? "text-emerald-600 font-bold" : "text-stone-300"}>U</span>
                          <span className={item.permissions.ADMINISTRADOR.delete ? "text-emerald-600 font-bold" : "text-stone-300"}>D</span>
                          <span className={item.permissions.ADMINISTRADOR.approve ? "text-emerald-600 font-bold" : "text-stone-300"}>A</span>
                        </div>
                      </td>
                    )}

                    {(selectedRoleFilter === 'TODOS' || selectedRoleFilter === 'COORDINADOR') && (
                      <td className="p-3.5 text-center border-l border-stone-200 dark:border-stone-800">
                        <div className="flex items-center justify-center gap-1 font-mono text-[11px]">
                          <span className={item.permissions.COORDINADOR.read ? "text-emerald-600 font-bold" : "text-stone-300"}>R</span>
                          <span className={item.permissions.COORDINADOR.create ? "text-emerald-600 font-bold" : "text-stone-300"}>C</span>
                          <span className={item.permissions.COORDINADOR.update ? "text-emerald-600 font-bold" : "text-stone-300"}>U</span>
                          <span className={item.permissions.COORDINADOR.delete ? "text-emerald-600 font-bold" : "text-stone-300"}>D</span>
                          <span className={item.permissions.COORDINADOR.approve ? "text-emerald-600 font-bold" : "text-stone-300"}>A</span>
                        </div>
                      </td>
                    )}

                    {(selectedRoleFilter === 'TODOS' || selectedRoleFilter === 'DOCENTE') && (
                      <td className="p-3.5 text-center border-l border-stone-200 dark:border-stone-800">
                        <div className="flex items-center justify-center gap-1 font-mono text-[11px]">
                          <span className={item.permissions.DOCENTE.read ? "text-emerald-600 font-bold" : "text-stone-300"}>R</span>
                          <span className={item.permissions.DOCENTE.create ? "text-emerald-600 font-bold" : "text-stone-300"}>C</span>
                          <span className={item.permissions.DOCENTE.update ? "text-emerald-600 font-bold" : "text-stone-300"}>U</span>
                          <span className={item.permissions.DOCENTE.delete ? "text-emerald-600 font-bold" : "text-stone-300"}>D</span>
                          <span className={item.permissions.DOCENTE.approve ? "text-emerald-600 font-bold" : "text-stone-300"}>A</span>
                        </div>
                      </td>
                    )}

                    {(selectedRoleFilter === 'TODOS' || selectedRoleFilter === 'ESTUDIANTE') && (
                      <td className="p-3.5 text-center border-l border-stone-200 dark:border-stone-800">
                        <div className="flex items-center justify-center gap-1 font-mono text-[11px]">
                          <span className={item.permissions.ESTUDIANTE.read ? "text-emerald-600 font-bold" : "text-stone-300"}>R</span>
                          <span className={item.permissions.ESTUDIANTE.create ? "text-emerald-600 font-bold" : "text-stone-300"}>C</span>
                          <span className={item.permissions.ESTUDIANTE.update ? "text-emerald-600 font-bold" : "text-stone-300"}>U</span>
                          <span className={item.permissions.ESTUDIANTE.delete ? "text-emerald-600 font-bold" : "text-stone-300"}>D</span>
                          <span className={item.permissions.ESTUDIANTE.approve ? "text-emerald-600 font-bold" : "text-stone-300"}>A</span>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-stone-50/70 dark:bg-stone-900/60 border-t border-stone-200 dark:border-stone-800 text-xs text-stone-500 flex flex-wrap items-center gap-4">
            <span className="font-semibold text-stone-700 dark:text-stone-300">Convención de Permisos:</span>
            <span><strong>R:</strong> Leer (Read)</span>
            <span><strong>C:</strong> Crear (Create)</span>
            <span><strong>U:</strong> Modificar (Update)</span>
            <span><strong>D:</strong> Eliminar (Delete)</span>
            <span><strong>A:</strong> Aprobar/Firmar (Approve)</span>
          </div>
        </div>
      )}

      {/* TAB 3: User & Role Management Console (Interactive for Admin) */}
      {activeTab === 'users' && (
        <div className="border border-stone-200 dark:border-stone-800 rounded-xl bg-white dark:bg-stone-900 overflow-hidden shadow-xs">
          <div className="p-5 border-b border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-base font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-600" />
                Directorio y Asignación Dinámica de Roles
              </h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                Los administradores pueden reasignar roles en tiempo real. Cada mutación genera una entrada inmutable en auditoría.
              </p>
            </div>
            {currentUser.role !== 'ADMINISTRADOR' && (
              <span className="text-xs px-2.5 py-1 bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 rounded font-medium flex items-center gap-1">
                <Lock className="w-3.5 h-3.5" /> Modo Lectura (Requiere Administrador)
              </span>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-stone-100/80 dark:bg-stone-800/80 text-stone-800 dark:text-stone-200 border-b border-stone-200 dark:border-stone-700">
                <tr>
                  <th className="p-3.5">Usuario / Código</th>
                  <th className="p-3.5">Correo Institucional</th>
                  <th className="p-3.5">Departamento / Unidad</th>
                  <th className="p-3.5">Rol en el SGA</th>
                  <th className="p-3.5">Estado</th>
                  <th className="p-3.5 text-right">Acción Administrativa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
                {users.map(u => (
                  <tr key={u.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-800/30 transition-colors">
                    <td className="p-3.5">
                      <div className="font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold flex items-center justify-center text-[10px]">
                          {u.avatarInitials}
                        </span>
                        {u.name}
                      </div>
                      <span className="text-[11px] font-mono text-stone-500">{u.code}</span>
                    </td>
                    <td className="p-3.5 font-mono text-stone-600 dark:text-stone-400">{u.email}</td>
                    <td className="p-3.5 text-stone-600 dark:text-stone-400">{u.department || 'General'}</td>
                    <td className="p-3.5">
                      <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold ${
                        u.role === 'ADMINISTRADOR'
                          ? 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200'
                          : u.role === 'COORDINADOR'
                          ? 'bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-200'
                          : u.role === 'DOCENTE'
                          ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200'
                          : 'bg-purple-100 text-purple-900 dark:bg-purple-950 dark:text-purple-200'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span className={`inline-flex items-center gap-1 font-medium ${
                        u.active ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'
                      }`}>
                        {u.active ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                        {u.active ? 'Activo' : 'Suspendido'}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {currentUser.role === 'ADMINISTRADOR' ? (
                          <>
                            <select
                              value={u.role}
                              onChange={(e) => handleRoleChange(u.id, e.target.value as RoleType)}
                              className="text-xs py-1 px-2 rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                              title="Cambiar rol"
                            >
                              <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                              <option value="COORDINADOR">COORDINADOR</option>
                              <option value="DOCENTE">DOCENTE</option>
                              <option value="ESTUDIANTE">ESTUDIANTE</option>
                            </select>

                            <button
                              type="button"
                              onClick={() => handleToggleActive(u.id)}
                              className={`px-2 py-1 text-xs rounded border transition-colors ${
                                u.active
                                  ? 'border-red-300 text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950/40'
                                  : 'border-emerald-300 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400'
                              }`}
                              title={u.active ? "Suspender cuenta" : "Reactivar cuenta"}
                            >
                              {u.active ? "Suspender" : "Activar"}
                            </button>
                          </>
                        ) : (
                          <span className="text-stone-400 text-[11px] italic">Sin permisos de edición</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: Real-time Visible Audit Log */}
      {activeTab === 'audit' && (
        <div className="border border-stone-200 dark:border-stone-800 rounded-xl bg-white dark:bg-stone-900 overflow-hidden shadow-xs">
          <div className="p-5 border-b border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-base font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <History className="w-5 h-5 text-amber-600" />
                Bitácora de Auditoría en Tiempo Real (Append-Only)
              </h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                Cumplimiento RF-12 y RNF-10: Registro estructurado con usuario, fecha/hora UTC, acción, registro afectado e IP.
              </p>
            </div>

            {/* Filter Search Input */}
            <div className="w-full sm:w-64">
              <input
                type="text"
                placeholder="Buscar por usuario, acción..."
                value={auditSearchTerm}
                onChange={(e) => setAuditSearchTerm(e.target.value)}
                className="w-full text-xs px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 placeholder-stone-400"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-stone-100/80 dark:bg-stone-800/80 text-stone-800 dark:text-stone-200 border-b border-stone-200 dark:border-stone-700">
                <tr>
                  <th className="p-3 font-mono">ID Evento</th>
                  <th className="p-3">Fecha y Hora (UTC)</th>
                  <th className="p-3">Usuario Ejecutor</th>
                  <th className="p-3">Acción Registrada</th>
                  <th className="p-3">Registro Afectado</th>
                  <th className="p-3 font-mono">IP Origen</th>
                  <th className="p-3 text-center">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 dark:divide-stone-800 font-sans">
                {filteredAuditLogs.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-stone-500">
                      No se encontraron registros de auditoría que coincidan con la búsqueda.
                    </td>
                  </tr>
                ) : (
                  filteredAuditLogs.map(log => (
                    <tr key={log.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-800/30 transition-colors">
                      <td className="p-3 font-mono font-semibold text-stone-700 dark:text-stone-300">{log.id}</td>
                      <td className="p-3 text-stone-600 dark:text-stone-400 font-mono text-[11px] whitespace-nowrap">{log.timestamp}</td>
                      <td className="p-3">
                        <span className="font-semibold text-stone-900 dark:text-stone-100 block">{log.user}</span>
                        <span className="text-[10px] text-stone-500">Rol: {log.role}</span>
                      </td>
                      <td className="p-3">
                        <span className="font-mono font-semibold text-stone-800 dark:text-stone-200 text-[11px]">{log.action}</span>
                        {log.details && (
                          <span className="text-[10px] text-stone-500 block truncate max-w-xs">{log.details}</span>
                        )}
                      </td>
                      <td className="p-3 text-stone-700 dark:text-stone-300 font-medium">{log.affectedRecord}</td>
                      <td className="p-3 font-mono text-stone-500 text-[11px]">{log.ipAddress}</td>
                      <td className="p-3 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          log.status === 'EXITOSO'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : log.status === 'DENEGADO'
                            ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        }`}>
                          {log.status}
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
  );
};
