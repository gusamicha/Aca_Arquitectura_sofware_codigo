import React, { useState } from 'react';
import { TeacherProfile } from '../../data/sgaDatabase';
import { UserAccount } from '../../types';
import { Briefcase, Search, Plus, Mail, Phone, Award, BookOpen } from 'lucide-react';

interface SgaTeachersProps {
  currentUser: UserAccount;
  teachers: TeacherProfile[];
  setTeachers: React.Dispatch<React.SetStateAction<TeacherProfile[]>>;
  onAddAuditLog: (action: string, record: string, details: string) => void;
}

export const SgaTeachers: React.FC<SgaTeachersProps> = ({
  currentUser,
  teachers,
  setTeachers,
  onAddAuditLog
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [contractFilter, setContractFilter] = useState('TODOS');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Teacher
  const [newName, setNewName] = useState('');
  const [newDoc, setNewDoc] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newDept, setNewDept] = useState('Ciencias de la Computación');
  const [newDegree, setNewDegree] = useState('Magíster en Ingeniería');
  const [newContract, setNewContract] = useState<'TIEMPO COMPLETO' | 'MEDIO TIEMPO' | 'CÁTEDRA'>('TIEMPO COMPLETO');

  const handleCreateTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newDoc || !newEmail) return;

    const newTeacher: TeacherProfile = {
      id: `tch-${Date.now().toString().slice(-4)}`,
      userId: `usr-${Date.now().toString().slice(-4)}`,
      code: `DOC-${Math.floor(1000 + Math.random() * 9000)}`,
      name: newName,
      documentId: newDoc,
      email: newEmail,
      phone: newPhone || '+57 300 000 0000',
      department: newDept,
      degreeTitle: newDegree,
      contractType: newContract,
      assignedGroupsCount: 0
    };

    setTeachers(prev => [newTeacher, ...prev]);

    onAddAuditLog(
      "CREACION_PERFIL_DOCENTE",
      `Docente: ${newTeacher.name} (${newTeacher.code})`,
      `Vinculación docente registrada por ${currentUser.name}. Contrato: ${newContract}.`
    );

    setNewName('');
    setNewDoc('');
    setNewEmail('');
    setNewPhone('');
    setShowAddModal(false);
  };

  const filteredTeachers = teachers.filter(t => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesContract = contractFilter === 'TODOS' || t.contractType === contractFilter;

    return matchesSearch && matchesContract;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
            <Briefcase className="w-4 h-4" />
            <span>Módulo de Planta Profesoral (RF-04)</span>
          </div>
          <h2 className="text-xl font-extrabold text-stone-900 dark:text-stone-100 mt-1">
            Gestión de Docentes y Asignación de Carga
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
            Perfiles académicos, vinculación contractual, departamentos y asignación de grupos lectivos.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-semibold hover:bg-amber-700 transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo Docente</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 p-4 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Buscar por nombre, código docente, departamento o correo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 placeholder-stone-400"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-stone-500">Contrato:</span>
          <select
            value={contractFilter}
            onChange={(e) => setContractFilter(e.target.value)}
            className="text-xs py-2 px-3 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
          >
            <option value="TODOS">Todos los tipos</option>
            <option value="TIEMPO COMPLETO">Tiempo Completo</option>
            <option value="MEDIO TIEMPO">Medio Tiempo</option>
            <option value="CÁTEDRA">Cátedra</option>
          </select>
        </div>
      </div>

      {/* Teachers Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTeachers.map(teacher => (
          <div
            key={teacher.id}
            className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-xs flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-amber-700 dark:text-amber-400">
                  {teacher.code}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                  {teacher.contractType}
                </span>
              </div>

              <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                {teacher.name}
              </h3>

              <div className="flex items-center gap-1.5 text-xs text-stone-600 dark:text-stone-400">
                <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span className="truncate">{teacher.degreeTitle}</span>
              </div>

              <p className="text-xs text-stone-500">
                {teacher.department}
              </p>

              <div className="pt-2 border-t border-stone-100 dark:border-stone-800 text-xs text-stone-500 font-mono space-y-1">
                <div className="flex items-center gap-1 truncate">
                  <Mail className="w-3 h-3 text-stone-400" />
                  <span>{teacher.email}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-stone-400" />
                  <span>{teacher.phone}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
              <span className="text-stone-500">Grupos Asignados:</span>
              <span className="font-bold font-mono text-stone-900 dark:text-stone-100">
                {teacher.assignedGroupsCount} grupos
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: New Teacher */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl text-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-amber-600" />
                <span>Registrar Nuevo Docente</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTeacher} className="space-y-3">
              <div>
                <label className="font-semibold block text-stone-700 dark:text-stone-300 mb-1">Nombre Completo:</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Ing. Fernando Silva Restrepo"
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
                    placeholder="Ej. 1045678901"
                    value={newDoc}
                    onChange={(e) => setNewDoc(e.target.value)}
                    className="w-full p-2 border border-stone-300 dark:border-stone-600 rounded bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold block text-stone-700 dark:text-stone-300 mb-1">Tipo de Contrato:</label>
                  <select
                    value={newContract}
                    onChange={(e) => setNewContract(e.target.value as any)}
                    className="w-full p-2 border border-stone-300 dark:border-stone-600 rounded bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                  >
                    <option value="TIEMPO COMPLETO">Tiempo Completo</option>
                    <option value="MEDIO TIEMPO">Medio Tiempo</option>
                    <option value="CÁTEDRA">Cátedra</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block text-stone-700 dark:text-stone-300 mb-1">Correo Institucional:</label>
                  <input
                    type="email"
                    required
                    placeholder="docente@sga.edu.co"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full p-2 border border-stone-300 dark:border-stone-600 rounded bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                  />
                </div>
                <div>
                  <label className="font-semibold block text-stone-700 dark:text-stone-300 mb-1">Teléfono:</label>
                  <input
                    type="text"
                    placeholder="+57 311 000 0000"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full p-2 border border-stone-300 dark:border-stone-600 rounded bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold block text-stone-700 dark:text-stone-300 mb-1">Titulación Académica:</label>
                <input
                  type="text"
                  placeholder="Ej. Doctor en Ciencias de la Computación"
                  value={newDegree}
                  onChange={(e) => setNewDegree(e.target.value)}
                  className="w-full p-2 border border-stone-300 dark:border-stone-600 rounded bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                />
              </div>

              <div>
                <label className="font-semibold block text-stone-700 dark:text-stone-300 mb-1">Departamento:</label>
                <input
                  type="text"
                  value={newDept}
                  onChange={(e) => setNewDept(e.target.value)}
                  className="w-full p-2 border border-stone-300 dark:border-stone-600 rounded bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                />
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
                  Guardar Docente
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
