import React from 'react';
import { Compass, CheckCircle2, XCircle, Users, HelpCircle, ShieldAlert } from 'lucide-react';

export const ScopeActorsSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="border border-stone-200 dark:border-stone-800 rounded-xl p-6 sm:p-8 bg-white dark:bg-stone-900 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 mb-6 flex items-center gap-2">
          <Compass className="w-6 h-6 text-amber-600" />
          <span>4. Alcance, Actores, Supuestos y Restricciones</span>
        </h2>

        {/* In Scope vs Out of Scope */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* In Scope */}
          <div className="p-5 rounded-xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/30 dark:bg-emerald-950/20">
            <h3 className="text-sm font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Alcance Incluido (In-Scope)</span>
            </h3>
            <ul className="text-xs text-stone-700 dark:text-stone-300 space-y-2 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold shrink-0">✓</span>
                <span><strong>Gestión de Identidades:</strong> Autenticación centralizada con JWT, gestión de sesiones y control RBAC.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold shrink-0">✓</span>
                <span><strong>Expediente Estudiantil y Docente:</strong> Administración de datos personales, historial académico y vinculación profesoral.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold shrink-0">✓</span>
                <span><strong>Curricular y Horarios:</strong> Malla de asignaturas, créditos, prerrequisitos, apertura de periodos y programación de grupos con cupos.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold shrink-0">✓</span>
                <span><strong>Matrícula Transaccional:</strong> Inscripción en línea con control estricto de cupos, validación de cruces y anti-duplicados.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold shrink-0">✓</span>
                <span><strong>Calificaciones y Kardex:</strong> Digitación por cortes evaluativos, cálculo de notas definitivas y generación de actas oficiales.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold shrink-0">✓</span>
                <span><strong>Auditoría Forense:</strong> Bitácora inmutable en base de datos para todas las transacciones de escritura críticas.</span>
              </li>
            </ul>
          </div>

          {/* Out of Scope */}
          <div className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-800/30">
            <h3 className="text-sm font-bold text-stone-700 dark:text-stone-300 flex items-center gap-2 mb-3">
              <XCircle className="w-4 h-4 text-stone-400" />
              <span>Alcance Excluido (Out-of-Scope Fase 1)</span>
            </h3>
            <ul className="text-xs text-stone-600 dark:text-stone-400 space-y-2 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-stone-400 font-bold shrink-0">✗</span>
                <span><strong>Pasarela Financiera Bancaria Directa:</strong> El pago de matrículas se valida de forma asíncrona mediante webhooks del ERP financiero.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-stone-400 font-bold shrink-0">✗</span>
                <span><strong>LMS o Aula Virtual:</strong> Plataformas como Moodle o Canvas se integran de manera externa mediante protocolos LTI / API REST.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-stone-400 font-bold shrink-0">✗</span>
                <span><strong>Nómina y Recursos Humanos:</strong> La liquidación salarial de docentes reside en el sistema contable institucional.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-stone-400 font-bold shrink-0">✗</span>
                <span><strong>Aplicación Móvil Nativa iOS/Android:</strong> Se garantiza cobertura total mediante diseño web responsivo (PWA / Mobile Web).</span>
              </li>
            </ul>
          </div>
        </div>

        {/* System Actors Table */}
        <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-3 flex items-center gap-2">
          <Users className="w-4 h-4 text-stone-700 dark:text-stone-300" />
          <span>Matriz de Actores del Sistema</span>
        </h3>

        <div className="overflow-x-auto mb-8 border border-stone-200 dark:border-stone-800 rounded-lg">
          <table className="w-full text-xs text-left">
            <thead className="bg-stone-100 dark:bg-stone-800/80 text-stone-800 dark:text-stone-200">
              <tr>
                <th className="p-3 font-semibold">Actor</th>
                <th className="p-3 font-semibold">Perfil y Responsabilidad Principal</th>
                <th className="p-3 font-semibold">Operaciones Clave en el SGA</th>
                <th className="p-3 font-semibold">Nivel de Confianza</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
              <tr>
                <td className="p-3 font-bold text-stone-900 dark:text-stone-100">
                  Administrador del Sistema
                  <span className="block text-[10px] font-normal text-amber-600 dark:text-amber-400">
                    Gustavo Mercado / Ronald Gutierrez
                  </span>
                </td>
                <td className="p-3 text-stone-600 dark:text-stone-400">
                  Ingenieros de TI responsables de la configuración global, gobernanza de identidades, apertura de periodos y custodia de la auditoría forense.
                </td>
                <td className="p-3 text-stone-700 dark:text-stone-300">
                  CRUD usuarios y roles, configuración de políticas institucionales, monitoreo de salud del sistema, consulta de bitácoras de auditoría.
                </td>
                <td className="p-3">
                  <span className="text-amber-700 dark:text-amber-400 font-semibold">Privilegiado (Full Access)</span>
                </td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-stone-900 dark:text-stone-100">
                  Coordinador Académico
                  <span className="block text-[10px] font-normal text-stone-500">
                    Dra. Elena Ramos y equipo
                  </span>
                </td>
                <td className="p-3 text-stone-600 dark:text-stone-400">
                  Autoridad académica de facultad o programa; programa la oferta semestral, grupos, horarios y asignación de profesores.
                </td>
                <td className="p-3 text-stone-700 dark:text-stone-300">
                  Creación y edición de grupos, parametrización de cupos máximos, resolución de excepciones de matrícula y aprobación de actas de notas.
                </td>
                <td className="p-3">
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">Medio-Alto (Funcional)</span>
                </td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-stone-900 dark:text-stone-100">
                  Docente Titular
                  <span className="block text-[10px] font-normal text-stone-500">
                    Planta y catedráticos
                  </span>
                </td>
                <td className="p-3 text-stone-600 dark:text-stone-400">
                  Profesor responsable del desarrollo pedagógico y evaluativo de las asignaturas asignadas a su carga lectiva.
                </td>
                <td className="p-3 text-stone-700 dark:text-stone-300">
                  Digitación de calificaciones parciales por cortes (Corte 1, 2, 3), consulta de lista de estudiantes y cierre de actas definitivas.
                </td>
                <td className="p-3">
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Medio (Restringido a sus grupos)</span>
                </td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-stone-900 dark:text-stone-100">
                  Estudiante
                  <span className="block text-[10px] font-normal text-stone-500">
                    Alumnos de pregrado y posgrado
                  </span>
                </td>
                <td className="p-3 text-stone-600 dark:text-stone-400">
                  Usuario final beneficiario del servicio formativo; realiza su proceso de matrícula y consulta su historial de progreso.
                </td>
                <td className="p-3 text-stone-700 dark:text-stone-300">
                  Inscripción en línea de asignaturas, selección de grupos, visualización de horarios asignados y consulta de kardex / certificados.
                </td>
                <td className="p-3">
                  <span className="text-purple-600 dark:text-purple-400 font-semibold">Básico (Estrictamente sus datos)</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Assumptions & Restrictions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-stone-200 dark:border-stone-800">
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-stone-600 dark:text-stone-400" />
              <span>Supuestos de la Arquitectura</span>
            </h4>
            <ul className="text-xs text-stone-600 dark:text-stone-400 space-y-1.5 list-disc pl-4 leading-relaxed">
              <li>La institución dispone de un servicio de DNS confiable y conectividad troncal a Internet con ancho de banda mínimo de 100 Mbps.</li>
              <li>Los usuarios acceden mediante navegadores web modernos (Chrome, Firefox, Safari, Edge) con JavaScript habilitado.</li>
              <li>El volumen de usuarios concurrentes en el pico más alto de matrícula ordinaria no excederá los 300 usuarios simultáneos en la fase 1.</li>
              <li>La sincronización de tiempo en todos los nodos de cómputo se garantiza mediante el protocolo NTP con desvío inferior a 10 ms.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>Restricciones Técnicas y Normativas</span>
            </h4>
            <ul className="text-xs text-stone-600 dark:text-stone-400 space-y-1.5 list-disc pl-4 leading-relaxed">
              <li><strong>Normativa Legal:</strong> Cumplimiento estricto de la Ley 1581 de Protección de Datos Personales (Habeas Data) y directrices del Ministerio de Educación.</li>
              <li><strong>Seguridad Obligatoria:</strong> Prohibido el uso de HTTP plano en producción; forzado HTTPS con TLS 1.3 y HSTS habilitado.</li>
              <li><strong>Integridad de Calificaciones:</strong> Ninguna calificación definitiva puede alterarse una vez cerrada el acta sin una solicitud de reapertura aprobada y auditada.</li>
              <li><strong>Presupuesto de Infraestructura:</strong> La solución debe operar dentro de límites de costo razonables para un centro de cómputo universitario estándar o VPS/Nube gestionada.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
