import React, { useState } from 'react';
import { AcademicGroup, Subject, TeacherProfile, AcademicPeriod } from '../../data/sgaDatabase';
import { UserAccount } from '../../types';
import { Calendar, Plus, Users, Clock, MapPin, Search, CheckCircle2 } from 'lucide-react';

interface SgaGroupsProps {
  currentUser: UserAccount;
  groups: AcademicGroup[];
  setGroups: React.Dispatch<React.SetStateAction<AcademicGroup[]>>;
  subjects: Subject[];
  teachers: TeacherProfile[];
  periods: AcademicPeriod[];
  onAddAuditLog: (action: string, record: string, details: string) => void;
}

export const SgaGroups: React.FC<SgaGroupsProps> = ({
  currentUser,
  groups,
  setGroups,
  subjects,
  teachers,
  periods,
  onAddAuditLog
}) => {
  const [selectedPeriodId, setSelectedPeriodId] = useState<string>(periods[0]?.id || 'per-01');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Group Form
  const [newGroupCode, setNewGroupCode] = useState('');
  const [newSubjectId, setNewSubjectId] = useState(subjects[0]?.id || '');
  const [newTeacherId, setNewTeacherId] = useState(teachers[0]?.id || '');
  const [newClassroom, setNewClassroom] = useState('Aula Magistral 101');
  const [newSchedule, setNewSchedule] = useState('Lunes y Miércoles 18:00 - 20:00');
  const [newCapacity, setNewCapacity] = useState(30);

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    const sub = subjects.find(s => s.id === newSubjectId) || subjects[0];
    const tch = teachers.find(t => t.id === newTeacherId) || teachers[0];

    const generatedCode = newGroupCode || `${sub.code}-G${Math.floor(1 + Math.random() * 9)}`;

    const newGroup: AcademicGroup = {
      id: `grp-${Date.now().toString().slice(-4)}`,
      code: generatedCode,
      subjectId: sub.id,
      subjectCode: sub.code,
      subjectName: sub.name,
      periodId: selectedPeriodId,
      teacherId: tch.id,
      teacherName: tch.name,
      classroom: newClassroom,
      schedule: newSchedule,
      maxCapacity: newCapacity,
      occupiedCapacity: 0
    };

    setGroups(prev => [...prev, newGroup]);

    onAddAuditLog(
      "PROGRAMACION_GRUPO_ACADEMICO",
      `Grupo: ${newGroup.code} (${newGroup.subjectCode})`,
      `Grupo ofertado en periodo ${selectedPeriodId} con cupo máximo de ${newCapacity}. Docente: ${tch.name}.`
    );

    setNewGroupCode('');
    setShowAddModal(false);
  };

  const periodGroups = groups.filter(g => {
    const matchesPeriod = g.periodId === selectedPeriodId;
    const matchesSearch =
      g.subjectCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.subjectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.teacherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.code.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesPeriod && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
            <Calendar className="w-4 h-4" />
            <span>Módulo de Programación Académica (RF-06)</span>
          </div>
          <h2 className="text-xl font-extrabold text-stone-900 dark:text-stone-100 mt-1">
            Grupos, Horarios y Parametrización de Cupos
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
            Apertura de grupos lectivos, asignación de aulas físicas, franjas horarias y topes máximos de capacidad.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-semibold hover:bg-amber-700 transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Crear Grupo</span>
        </button>
      </div>

      {/* Period & Search Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 p-4 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Buscar por grupo, asignatura o docente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 placeholder-stone-400"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-stone-500">Periodo:</span>
          <select
            value={selectedPeriodId}
            onChange={(e) => setSelectedPeriodId(e.target.value)}
            className="text-xs py-2 px-3 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
          >
            {periods.map(p => (
              <option key={p.id} value={p.id}>
                {p.code} ({p.status})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {periodGroups.map(group => {
          const availableSeats = group.maxCapacity - group.occupiedCapacity;
          const percentage = Math.round((group.occupiedCapacity / group.maxCapacity) * 100);

          return (
            <div
              key={group.id}
              className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200">
                    {group.code}
                  </span>
                  <span className="text-xs font-mono text-stone-500">{group.subjectCode}</span>
                </div>

                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  availableSeats === 0
                    ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                    : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                }`}>
                  {availableSeats === 0 ? 'Lleno (0 cupos)' : `${availableSeats} disponibles`}
                </span>
              </div>

              <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                {group.subjectName}
              </h3>

              <div className="space-y-1.5 text-xs text-stone-600 dark:text-stone-400">
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-stone-400" />
                  <span>Docente: <strong>{group.teacherName}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  <span>{group.schedule}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" />
                  <span>{group.classroom}</span>
                </div>
              </div>

              {/* Progress bar of capacity */}
              <div className="pt-2 border-t border-stone-100 dark:border-stone-800">
                <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 mb-1">
                  <span>Ocupación de cupo:</span>
                  <span className="font-bold text-stone-800 dark:text-stone-200">
                    {group.occupiedCapacity} / {group.maxCapacity} ({percentage}%)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      percentage >= 100
                        ? 'bg-red-500'
                        : percentage >= 80
                        ? 'bg-amber-500'
                        : 'bg-emerald-500'
                    }`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: New Group */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl text-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-600" />
                <span>Programar Nuevo Grupo Académico</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateGroup} className="space-y-3">
              <div>
                <label className="font-semibold block text-stone-700 dark:text-stone-300 mb-1">Asignatura a Ofertar:</label>
                <select
                  value={newSubjectId}
                  onChange={(e) => setNewSubjectId(e.target.value)}
                  className="w-full p-2 border border-stone-300 dark:border-stone-600 rounded bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                >
                  {subjects.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.code} - {s.name} ({s.credits} créditos)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold block text-stone-700 dark:text-stone-300 mb-1">Docente Asignado:</label>
                <select
                  value={newTeacherId}
                  onChange={(e) => setNewTeacherId(e.target.value)}
                  className="w-full p-2 border border-stone-300 dark:border-stone-600 rounded bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                >
                  {teachers.map(t => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.code} - {t.department})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block text-stone-700 dark:text-stone-300 mb-1">Código del Grupo:</label>
                  <input
                    type="text"
                    placeholder="Ej. G3 o dejar vacío"
                    value={newGroupCode}
                    onChange={(e) => setNewGroupCode(e.target.value)}
                    className="w-full p-2 border border-stone-300 dark:border-stone-600 rounded bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold block text-stone-700 dark:text-stone-300 mb-1">Cupo Máximo:</label>
                  <input
                    type="number"
                    min="5"
                    max="60"
                    value={newCapacity}
                    onChange={(e) => setNewCapacity(parseInt(e.target.value) || 30)}
                    className="w-full p-2 border border-stone-300 dark:border-stone-600 rounded bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold block text-stone-700 dark:text-stone-300 mb-1">Horario Semanal:</label>
                <input
                  type="text"
                  value={newSchedule}
                  onChange={(e) => setNewSchedule(e.target.value)}
                  className="w-full p-2 border border-stone-300 dark:border-stone-600 rounded bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                />
              </div>

              <div>
                <label className="font-semibold block text-stone-700 dark:text-stone-300 mb-1">Aula o Laboratorio:</label>
                <input
                  type="text"
                  value={newClassroom}
                  onChange={(e) => setNewClassroom(e.target.value)}
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
                  Programar Grupo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
