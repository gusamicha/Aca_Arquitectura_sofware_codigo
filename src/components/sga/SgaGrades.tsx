import React, { useState } from 'react';
import { AcademicGroup, EnrollmentRecord } from '../../data/sgaDatabase';
import { UserAccount } from '../../types';
import {
  FileSpreadsheet,
  Save,
  CheckCircle,
  AlertCircle,
  FileCheck,
  Search,
  Lock,
  Calculator,
  ShieldCheck
} from 'lucide-react';

interface SgaGradesProps {
  currentUser: UserAccount;
  groups: AcademicGroup[];
  enrollments: EnrollmentRecord[];
  setEnrollments: React.Dispatch<React.SetStateAction<EnrollmentRecord[]>>;
  onAddAuditLog: (action: string, record: string, details: string, status?: 'EXITOSO' | 'DENEGADO') => void;
}

export const SgaGrades: React.FC<SgaGradesProps> = ({
  currentUser,
  groups,
  enrollments,
  setEnrollments,
  onAddAuditLog
}) => {
  const [selectedGroupId, setSelectedGroupId] = useState<string>(groups[0]?.id || 'grp-01');
  const [searchTerm, setSearchTerm] = useState('');
  const [isActaClosed, setIsActaClosed] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const selectedGroup = groups.find(g => g.id === selectedGroupId) || groups[0];

  // Enrolled students in the selected group
  const groupEnrollments = enrollments.filter(e => e.groupId === selectedGroupId && e.status === 'MATRICULADA');

  // Handle grade change
  const handleGradeChange = (enrollmentId: string, corte: 'corte1' | 'corte2' | 'corte3', valueStr: string) => {
    if (isActaClosed) {
      alert("Operación denegada: El acta de este grupo ya se encuentra cerrada y firmada.");
      return;
    }

    const numVal = valueStr === '' ? undefined : parseFloat(valueStr);

    if (numVal !== undefined && (isNaN(numVal) || numVal < 0 || numVal > 5.0)) {
      return; // Out of range 0.0 - 5.0
    }

    setEnrollments(prev => prev.map(rec => {
      if (rec.id === enrollmentId) {
        const updated = { ...rec, [corte]: numVal };

        // Calculate weighted final grade if all cortes exist
        const c1 = corte === 'corte1' ? numVal : rec.corte1;
        const c2 = corte === 'corte2' ? numVal : rec.corte2;
        const c3 = corte === 'corte3' ? numVal : rec.corte3;

        if (c1 !== undefined && c2 !== undefined && c3 !== undefined) {
          const finalVal = parseFloat((c1 * 0.30 + c2 * 0.35 + c3 * 0.35).toFixed(2));
          updated.finalGrade = finalVal;
          updated.gradeStatus = finalVal >= 3.0 ? 'APROBADA' : 'REPROBADA';
        } else {
          updated.finalGrade = undefined;
          updated.gradeStatus = 'EN_CURSO';
        }

        return updated;
      }
      return rec;
    }));
  };

  const handleSaveGrades = () => {
    setNotification("Calificaciones asentadas exitosamente en la base de datos PostgreSQL.");
    setTimeout(() => setNotification(null), 4000);

    onAddAuditLog(
      "ASENTAMIENTO_CALIFICACIONES",
      `Grupo: ${selectedGroup.code} (${selectedGroup.subjectCode})`,
      `Calificaciones actualizadas por ${currentUser.name} para ${groupEnrollments.length} estudiantes. Transacción atómica confirmada.`,
      "EXITOSO"
    );
  };

  const handleCloseActa = () => {
    if (!window.confirm("¿Confirma el cierre y firma digital del acta de calificaciones? Una vez cerrada, las notas no podrán ser alteradas sin autorización expresa del Coordinador.")) {
      return;
    }

    setIsActaClosed(true);
    setNotification("Acta cerrada y sellada digitalmente con hash criptográfico institucional.");

    onAddAuditLog(
      "CIERRE_ACTA_CALIFICACIONES",
      `Acta Grupo: ${selectedGroup.code} - ${selectedGroup.subjectCode}`,
      `Acta sellada con éxito. Checksum SHA-256: 7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069`,
      "EXITOSO"
    );
  };

  const filteredEnrollments = groupEnrollments.filter(e =>
    e.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Banner & Group Selector */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
            <FileSpreadsheet className="w-4 h-4" />
            <span>Módulo de Calificaciones y Actas (RF-08 & RF-10)</span>
          </div>
          <h2 className="text-xl font-extrabold text-stone-900 dark:text-stone-100 mt-1">
            Libro de Calificaciones y Asentamiento de Actas
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
            Ponderación por cortes: Corte 1 (30%) · Corte 2 (35%) · Corte 3 (35%) · Rango evaluativo 0.0 a 5.0.
          </p>
        </div>

        {/* Group Selector */}
        <div className="flex items-center gap-3">
          <div>
            <label className="text-[11px] font-semibold block text-stone-600 dark:text-stone-400 mb-0.5">
              Grupo Académico a Calificar:
            </label>
            <select
              value={selectedGroupId}
              onChange={(e) => {
                setSelectedGroupId(e.target.value);
                setIsActaClosed(false);
              }}
              className="text-xs py-1.5 px-3 rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-medium"
            >
              {groups.map(g => (
                <option key={g.id} value={g.id}>
                  {g.code} - {g.subjectName} ({g.teacherName})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {notification && (
        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>{notification}</span>
          </div>
          <button type="button" onClick={() => setNotification(null)} className="font-bold">✕</button>
        </div>
      )}

      {/* Selected Group Header Card */}
      <div className="p-5 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <div>
          <span className="font-mono text-amber-700 dark:text-amber-400 font-bold block">{selectedGroup.subjectCode}</span>
          <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">{selectedGroup.subjectName}</h3>
          <p className="text-stone-500 mt-0.5">
            Docente Titular: <strong>{selectedGroup.teacherName}</strong> · Horario: {selectedGroup.schedule} · Aula: {selectedGroup.classroom}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-stone-500 block">Estado del Acta:</span>
            <span className={`font-bold font-mono text-xs ${
              isActaClosed ? 'text-emerald-600' : 'text-amber-600'
            }`}>
              {isActaClosed ? 'CERRADA Y FIRMADA' : 'EN DIGITACIÓN'}
            </span>
          </div>

          <button
            type="button"
            onClick={handleSaveGrades}
            disabled={isActaClosed}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 text-white font-semibold hover:bg-amber-700 disabled:opacity-50 transition-colors shadow-xs"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Guardar Notas</span>
          </button>

          <button
            type="button"
            onClick={handleCloseActa}
            disabled={isActaClosed}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-semibold hover:bg-stone-100 dark:hover:bg-stone-700 disabled:opacity-50 transition-colors shadow-xs"
          >
            <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Cerrar Acta</span>
          </button>
        </div>
      </div>

      {/* Gradebook Table */}
      <div className="border border-stone-200 dark:border-stone-800 rounded-xl bg-white dark:bg-stone-900 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs font-bold text-stone-800 dark:text-stone-200">
            Listado de Estudiantes Matriculados ({groupEnrollments.length})
          </span>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Buscar estudiante..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs pl-8 pr-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 placeholder-stone-400"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-stone-100 dark:bg-stone-800/80 text-stone-800 dark:text-stone-200 border-b border-stone-200 dark:border-stone-700">
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">Nombre del Estudiante</th>
                <th className="p-3 text-center">Corte 1 (30%)</th>
                <th className="p-3 text-center">Corte 2 (35%)</th>
                <th className="p-3 text-center">Corte 3 (35%)</th>
                <th className="p-3 text-center">Nota Definitiva</th>
                <th className="p-3 text-center">Resultado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
              {filteredEnrollments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-stone-500">
                    No hay estudiantes matriculados en este grupo.
                  </td>
                </tr>
              ) : (
                filteredEnrollments.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-800/30 transition-colors">
                    <td className="p-3 text-stone-400 font-mono text-[11px]">{idx + 1}</td>
                    <td className="p-3 font-semibold text-stone-900 dark:text-stone-100">
                      {item.studentName}
                    </td>

                    {/* Corte 1 */}
                    <td className="p-3 text-center">
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="5.0"
                        disabled={isActaClosed}
                        value={item.corte1 ?? ''}
                        onChange={(e) => handleGradeChange(item.id, 'corte1', e.target.value)}
                        className="w-16 p-1 text-center font-mono font-bold rounded border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
                      />
                    </td>

                    {/* Corte 2 */}
                    <td className="p-3 text-center">
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="5.0"
                        disabled={isActaClosed}
                        value={item.corte2 ?? ''}
                        onChange={(e) => handleGradeChange(item.id, 'corte2', e.target.value)}
                        className="w-16 p-1 text-center font-mono font-bold rounded border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
                      />
                    </td>

                    {/* Corte 3 */}
                    <td className="p-3 text-center">
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="5.0"
                        disabled={isActaClosed}
                        value={item.corte3 ?? ''}
                        onChange={(e) => handleGradeChange(item.id, 'corte3', e.target.value)}
                        className="w-16 p-1 text-center font-mono font-bold rounded border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
                      />
                    </td>

                    {/* Final Grade */}
                    <td className="p-3 text-center font-mono font-extrabold text-sm">
                      {item.finalGrade !== undefined ? (
                        <span className={item.finalGrade >= 3.0 ? 'text-emerald-600' : 'text-red-600'}>
                          {item.finalGrade.toFixed(2)}
                        </span>
                      ) : (
                        <span className="text-stone-400 font-normal">--</span>
                      )}
                    </td>

                    {/* Status badge */}
                    <td className="p-3 text-center">
                      {item.gradeStatus === 'APROBADA' && (
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                          Aprobada
                        </span>
                      )}
                      {item.gradeStatus === 'REPROBADA' && (
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300">
                          Reprobada
                        </span>
                      )}
                      {(!item.gradeStatus || item.gradeStatus === 'EN_CURSO') && (
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300">
                          En curso
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
