import React, { useState } from 'react';
import { StudentProfile, AcademicProgram } from '../../data/sgaDatabase';
import { UserAccount } from '../../types';
import {
  Users,
  Search,
  Plus,
  Edit2,
  CheckCircle2,
  GraduationCap,
  FileText,
  Mail,
  Phone,
  Filter
} from 'lucide-react';

interface SgaStudentsProps {
  currentUser: UserAccount;
  students: StudentProfile[];
  setStudents: React.Dispatch<React.SetStateAction<StudentProfile[]>>;
  programs: AcademicProgram[];
  onAddAuditLog: (action: string, record: string, details: string) => void;
}

export const SgaStudents: React.FC<SgaStudentsProps> = ({
  currentUser,
  students,
  setStudents,
  programs,
  onAddAuditLog
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('TODOS');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Student Form
  const [newName, setNewName] = useState('');
  const [newDocument, setNewDocument] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newProgramId, setNewProgramId] = useState(programs[0]?.id || 'prog-01');
  const [newSemester, setNewSemester] = useState(1);

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newDocument || !newEmail) return;

    // Check duplicate document
    if (students.some(s => s.documentId === newDocument)) {
      alert("Error de integridad: Ya existe un estudiante registrado con este documento de identidad.");
      return;
    }

    const prog = programs.find(p => p.id === newProgramId) || programs[0];
    const generatedCode = `EST-${Math.floor(1000 + Math.random() * 9000)}`;

    const newStudent: StudentProfile = {
      id: `est-${Date.now().toString().slice(-4)}`,
      userId: `usr-${Date.now().toString().slice(-4)}`,
      code: generatedCode,
      name: newName,
      documentId: newDocument,
      email: newEmail,
      phone: newPhone || '+57 300 000 0000',
      programId: prog.id,
      programName: prog.name,
      currentSemester: newSemester,
      academicStatus: 'REGULAR ACTIVO',
      cumulativeGpa: 0.0,
      creditsApproved: 0
    };

    setStudents(prev => [newStudent, ...prev]);

    onAddAuditLog(
      "CREACION_EXPEDIENTE_ESTUDIANTE",
      `Estudiante: ${newStudent.name} (${newStudent.code})`,
      `Expediente académico creado por ${currentUser.name}. Documento: ${newDocument}.`
    );

    // Reset and close
    setNewName('');
    setNewDocument('');
    setNewEmail('');
    setNewPhone('');
    setShowAddModal(false);
  };

  const filteredStudents = students.filter(s => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.documentId.includes(searchTerm) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'TODOS' || s.academicStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
            <Users className="w-4 h-4" />
            <span>Módulo de Registro Académico (RF-03)</span>
          </div>
          <h2 className="text-xl font-extrabold text-stone-900 dark:text-stone-100 mt-1">
            Gestión Integral de Expedientes Estudiantiles
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
            Registro, actualización, seguimiento curricular y estado de matrícula.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-semibold hover:bg-amber-700 transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo Estudiante</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 p-4 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Buscar por nombre, código estudiantil o documento de identidad..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 placeholder-stone-400"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-stone-500">Estado:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs py-2 px-3 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
          >
            <option value="TODOS">Todos los estados</option>
            <option value="REGULAR ACTIVO">Regular Activo</option>
            <option value="CONDICIONAL">Condicional</option>
            <option value="GRADUADO">Graduado</option>
            <option value="SUSPENDIDO">Suspendido</option>
          </select>
        </div>
      </div>

      {/* Students Table */}
      <div className="border border-stone-200 dark:border-stone-800 rounded-xl bg-white dark:bg-stone-900 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-stone-100 dark:bg-stone-800/80 text-stone-800 dark:text-stone-200 border-b border-stone-200 dark:border-stone-700">
              <tr>
                <th className="p-3.5">Código / Documento</th>
                <th className="p-3.5">Nombre Completo</th>
                <th className="p-3.5">Programa Académico</th>
                <th className="p-3.5">Contacto Institucional</th>
                <th className="p-3.5 text-center">Semestre</th>
                <th className="p-3.5 text-center">Promedio (GPA)</th>
                <th className="p-3.5 text-center">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-stone-500">
                    No se encontraron expedientes de estudiantes con los filtros actuales.
                  </td>
                </tr>
              ) : (
                filteredStudents.map(student => (
                  <tr key={student.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-800/30 transition-colors">
                    <td className="p-3.5">
                      <span className="font-mono font-bold text-amber-700 dark:text-amber-400 block">{student.code}</span>
                      <span className="text-stone-400 font-mono text-[11px]">CC {student.documentId}</span>
                    </td>
                    <td className="p-3.5 font-bold text-stone-900 dark:text-stone-100">
                      {student.name}
                    </td>
                    <td className="p-3.5 text-stone-600 dark:text-stone-400">
                      {student.programName}
                    </td>
                    <td className="p-3.5 font-mono text-stone-500">
                      <div className="flex items-center gap-1">
                        <Mail className="w-3 h-3 text-stone-400" />
                        <span>{student.email}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] mt-0.5">
                        <Phone className="w-3 h-3 text-stone-400" />
                        <span>{student.phone}</span>
                      </div>
                    </td>
                    <td className="p-3.5 text-center font-bold text-stone-800 dark:text-stone-200">
                      Sem. {student.currentSemester}
                    </td>
                    <td className="p-3.5 text-center font-mono font-extrabold text-sm text-stone-900 dark:text-stone-100">
                      {student.cumulativeGpa > 0 ? student.cumulativeGpa.toFixed(2) : '--'}
                    </td>
                    <td className="p-3.5 text-center">
                      <span className={`inline-block px-2.5 py-1 rounded text-[10px] font-bold ${
                        student.academicStatus === 'REGULAR ACTIVO'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : student.academicStatus === 'CONDICIONAL'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                      }`}>
                        {student.academicStatus}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: New Student */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl text-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-amber-600" />
                <span>Registrar Nuevo Expediente Estudiantil</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateStudent} className="space-y-3">
              <div>
                <label className="font-semibold block text-stone-700 dark:text-stone-300 mb-1">Nombre Completo del Estudiante:</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Laura Victoria Gómez Morales"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full p-2 border border-stone-300 dark:border-stone-600 rounded bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block text-stone-700 dark:text-stone-300 mb-1">Documento de Identidad:</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. 1098456789"
                    value={newDocument}
                    onChange={(e) => setNewDocument(e.target.value)}
                    className="w-full p-2 border border-stone-300 dark:border-stone-600 rounded bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold block text-stone-700 dark:text-stone-300 mb-1">Semestre de Ingreso:</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={newSemester}
                    onChange={(e) => setNewSemester(parseInt(e.target.value) || 1)}
                    className="w-full p-2 border border-stone-300 dark:border-stone-600 rounded bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block text-stone-700 dark:text-stone-300 mb-1">Correo Institucional:</label>
                  <input
                    type="email"
                    required
                    placeholder="estudiante@cun.edu.co"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full p-2 border border-stone-300 dark:border-stone-600 rounded bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                  />
                </div>
                <div>
                  <label className="font-semibold block text-stone-700 dark:text-stone-300 mb-1">Teléfono Móvil:</label>
                  <input
                    type="text"
                    placeholder="+57 300 123 4567"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full p-2 border border-stone-300 dark:border-stone-600 rounded bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold block text-stone-700 dark:text-stone-300 mb-1">Programa Académico:</label>
                <select
                  value={newProgramId}
                  onChange={(e) => setNewProgramId(e.target.value)}
                  className="w-full p-2 border border-stone-300 dark:border-stone-600 rounded bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                >
                  {programs.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.code})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-stone-200 dark:border-stone-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 rounded border border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-amber-600 text-white font-semibold hover:bg-amber-700"
                >
                  Guardar Estudiante
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
