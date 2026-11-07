import React, { useState } from 'react';
import { AcademicProgram, Subject } from '../../data/sgaDatabase';
import { UserAccount } from '../../types';
import { BookOpen, Layers, Plus, Search, CheckCircle2, ArrowRight } from 'lucide-react';

interface SgaCurriculumProps {
  currentUser: UserAccount;
  programs: AcademicProgram[];
  subjects: Subject[];
  setSubjects: React.Dispatch<React.SetStateAction<Subject[]>>;
  onAddAuditLog: (action: string, record: string, details: string) => void;
}

export const SgaCurriculum: React.FC<SgaCurriculumProps> = ({
  currentUser,
  programs,
  subjects,
  setSubjects,
  onAddAuditLog
}) => {
  const [selectedProgramId, setSelectedProgramId] = useState<string>(programs[0]?.id || 'prog-01');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Subject
  const [newCode, setNewCode] = useState('');
  const [newName, setNewName] = useState('');
  const [newCredits, setNewCredits] = useState(3);
  const [newSemester, setNewSemester] = useState(1);
  const [newDesc, setNewDesc] = useState('');

  const currentProgram = programs.find(p => p.id === selectedProgramId) || programs[0];

  const handleCreateSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode || !newName) return;

    if (subjects.some(s => s.code.toUpperCase() === newCode.toUpperCase())) {
      alert("Error: Ya existe una asignatura con este código.");
      return;
    }

    const newSub: Subject = {
      id: `sub-${Date.now().toString().slice(-4)}`,
      code: newCode.toUpperCase(),
      name: newName,
      programId: selectedProgramId,
      credits: newCredits,
      semester: newSemester,
      prerequisites: [],
      description: newDesc || "Descripción curricular pendiente de estructuración por el comité de programa."
    };

    setSubjects(prev => [newSub, ...prev]);

    onAddAuditLog(
      "CREACION_ASIGNATURA_CURRICULAR",
      `Asignatura: ${newSub.code} - ${newSub.name}`,
      `Asignatura creada en el programa ${currentProgram.name} con ${newCredits} créditos.`
    );

    setNewCode('');
    setNewName('');
    setNewDesc('');
    setShowAddModal(false);
  };

  const programSubjects = subjects.filter(s => {
    const matchesProgram = s.programId === selectedProgramId;
    const matchesSearch =
      s.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesProgram && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            <span>Módulo de Gestión Curricular (RF-05)</span>
          </div>
          <h2 className="text-xl font-extrabold text-stone-900 dark:text-stone-100 mt-1">
            Programas Académicos y Mallas Curriculares
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
            Planes de estudio, asignaturas, créditos académicos, niveles semestrales y prerrequisitos.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-semibold hover:bg-amber-700 transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Nueva Asignatura</span>
        </button>
      </div>

      {/* Program Selector Tabs */}
      <div className="flex flex-wrap gap-2 pb-2 border-b border-stone-200 dark:border-stone-800">
        {programs.map(prog => (
          <button
            key={prog.id}
            type="button"
            onClick={() => setSelectedProgramId(prog.id)}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              selectedProgramId === prog.id
                ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-xs'
                : 'bg-white dark:bg-stone-800/80 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:bg-stone-100'
            }`}
          >
            {prog.name} ({prog.code})
          </button>
        ))}
      </div>

      {/* Program Overview Banner */}
      <div className="p-5 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <div>
          <span className="font-bold text-stone-900 dark:text-stone-100 text-sm block">{currentProgram.name}</span>
          <span className="text-stone-500">{currentProgram.faculty} · Título: {currentProgram.degreeTitle}</span>
        </div>
        <div className="flex items-center gap-4 font-mono font-bold text-stone-700 dark:text-stone-300">
          <div>Total Créditos: <span className="text-amber-600">{currentProgram.totalCredits}</span></div>
          <div>Duración: <span>{currentProgram.durationSemesters} semestres</span></div>
        </div>
      </div>

      {/* Subjects Search */}
      <div className="relative">
        <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
        <input
          type="text"
          placeholder="Buscar asignatura por código o nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 placeholder-stone-400"
        />
      </div>

      {/* Subjects Table */}
      <div className="border border-stone-200 dark:border-stone-800 rounded-xl bg-white dark:bg-stone-900 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-stone-100 dark:bg-stone-800/80 text-stone-800 dark:text-stone-200 border-b border-stone-200 dark:border-stone-700">
              <tr>
                <th className="p-3.5 font-mono">Código</th>
                <th className="p-3.5">Nombre de la Asignatura</th>
                <th className="p-3.5 text-center">Nivel Semestral</th>
                <th className="p-3.5 text-center">Créditos</th>
                <th className="p-3.5">Prerrequisitos</th>
                <th className="p-3.5">Descripción Temática</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
              {programSubjects.map(sub => (
                <tr key={sub.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-800/30 transition-colors">
                  <td className="p-3.5 font-mono font-bold text-amber-700 dark:text-amber-400 whitespace-nowrap">
                    {sub.code}
                  </td>
                  <td className="p-3.5 font-bold text-stone-900 dark:text-stone-100">
                    {sub.name}
                  </td>
                  <td className="p-3.5 text-center font-bold text-stone-700 dark:text-stone-300">
                    Semestre {sub.semester}
                  </td>
                  <td className="p-3.5 text-center font-mono font-extrabold text-amber-600">
                    {sub.credits} cr.
                  </td>
                  <td className="p-3.5 font-mono text-[11px] text-stone-500">
                    {sub.prerequisites.length > 0 ? sub.prerequisites.join(', ') : 'Ninguno (Básica)'}
                  </td>
                  <td className="p-3.5 text-stone-600 dark:text-stone-400 leading-relaxed max-w-sm">
                    {sub.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: New Subject */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl text-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-600" />
                <span>Crear Nueva Asignatura en {currentProgram.code}</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubject} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block text-stone-700 dark:text-stone-300 mb-1">Código Asignatura:</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. IA-501"
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value)}
                    className="w-full p-2 border border-stone-300 dark:border-stone-600 rounded bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-mono uppercase"
                  />
                </div>
                <div>
                  <label className="font-semibold block text-stone-700 dark:text-stone-300 mb-1">Créditos Académicos:</label>
                  <input
                    type="number"
                    min="1"
                    max="6"
                    value={newCredits}
                    onChange={(e) => setNewCredits(parseInt(e.target.value) || 3)}
                    className="w-full p-2 border border-stone-300 dark:border-stone-600 rounded bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold block text-stone-700 dark:text-stone-300 mb-1">Nombre de la Asignatura:</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Inteligencia Artificial y Redes Neuronales"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full p-2 border border-stone-300 dark:border-stone-600 rounded bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                />
              </div>

              <div>
                <label className="font-semibold block text-stone-700 dark:text-stone-300 mb-1">Semestre en Malla:</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={newSemester}
                  onChange={(e) => setNewSemester(parseInt(e.target.value) || 1)}
                  className="w-full p-2 border border-stone-300 dark:border-stone-600 rounded bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-mono"
                />
              </div>

              <div>
                <label className="font-semibold block text-stone-700 dark:text-stone-300 mb-1">Descripción y Contenidos:</label>
                <textarea
                  rows={2}
                  placeholder="Temas principales y competencias..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
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
                  Guardar Asignatura
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
