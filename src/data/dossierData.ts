import {
  UserAccount,
  AuditLogEntry,
  FunctionalRequirement,
  NonFunctionalRequirement,
  ArchitectureComparisonItem,
  ADR,
  RiskAnalysisItem,
  AISuggestion,
  TraceabilityItem
} from '../types';

export const initialCoverData = {
  subject: "Arquitectura de Software y Sistemas Distribuidos",
  institution: "Corporación Unificada Nacional de Educación Superior (CUN)",
  faculty: "Escuela de Ingeniería de Sistemas y Computación",
  title: "Dossier de Arquitectura de Software: Sistema de Gestión Académica (SGA)",
  subtitle: "Diseño Técnico y Arquitectura de un Monolito Modular en Capas para Instituciones de Educación Superior",
  authors: [
    {
      name: "Gustavo Mercado Portela",
      role: "Líder de Arquitectura / Administrador de Sistemas",
      email: "gustavo.mercadop@cun.edu.co",
      code: "SGA-ADM-01"
    },
    {
      name: "Ronald Tomas Gutierrez Acuña",
      role: "Arquitecto de Software / Administrador de Datos",
      email: "ronald.gutierrez@cun.edu.co",
      code: "SGA-ADM-02"
    }
  ],
  professor: "Ing. Magíster en Ingeniería de Software - Docente Titular",
  date: "Noviembre 2026",
  version: "1.0.0 (Release Definitivo)",
  status: "Aprobado para Implementación"
};

export const initialUsers: UserAccount[] = [
  {
    id: "usr-01",
    name: "Gustavo Mercado Portela",
    email: "gustavo.mercadop@cun.edu.co",
    role: "ADMINISTRADOR",
    department: "Arquitectura & TI Institucional",
    code: "ADM-7011",
    active: true,
    avatarInitials: "GM"
  },
  {
    id: "usr-02",
    name: "Ronald Tomas Gutierrez Acuña",
    email: "ronald.gutierrez@cun.edu.co",
    role: "ADMINISTRADOR",
    department: "Infraestructura & Datos",
    code: "ADM-7012",
    active: true,
    avatarInitials: "RG"
  },
  {
    id: "usr-03",
    name: "Dra. Elena Ramos Castillo",
    email: "elena.ramos@sga-universidad.edu.co",
    role: "COORDINADOR",
    department: "Coordinación Académica - Fac. Ingeniería",
    code: "CRD-4019",
    active: true,
    avatarInitials: "ER"
  },
  {
    id: "usr-04",
    name: "Prof. Carlos Mendoza Vega",
    email: "carlos.mendoza@sga-universidad.edu.co",
    role: "DOCENTE",
    department: "Departamento de Ciencias de la Computación",
    code: "DOC-2088",
    active: true,
    avatarInitials: "CM"
  },
  {
    id: "usr-05",
    name: "Mariana Silva Paredes",
    email: "mariana.silva@estudiantes.sga.edu.co",
    role: "ESTUDIANTE",
    department: "Ingeniería de Sistemas - Semestre VII",
    code: "EST-9934",
    active: true,
    avatarInitials: "MS"
  }
];

export const initialAuditLogs: AuditLogEntry[] = [
  {
    id: "AUD-1049",
    timestamp: "2026-11-07 07:42:15 UTC",
    user: "Gustavo Mercado Portela",
    role: "ADMINISTRADOR",
    action: "APERTURA_PERIODO_ACADEMICO",
    affectedRecord: "PeriodoAcademico: 2027-1",
    ipAddress: "192.168.10.45",
    status: "EXITOSO",
    details: "Configuración de fechas de matrícula ordinaria y cupos máximos por grupo."
  },
  {
    id: "AUD-1048",
    timestamp: "2026-11-07 07:15:30 UTC",
    user: "Ronald Tomas Gutierrez Acuña",
    role: "ADMINISTRADOR",
    action: "ACTUALIZACION_POLITICA_RBAC",
    affectedRecord: "Rol: COORDINADOR (Permiso: AprobarActas)",
    ipAddress: "192.168.10.88",
    status: "EXITOSO",
    details: "Se confirió permiso de cierre extemporáneo de actas previa solicitud motivada."
  },
  {
    id: "AUD-1047",
    timestamp: "2026-11-07 06:50:11 UTC",
    user: "Dra. Elena Ramos Castillo",
    role: "COORDINADOR",
    action: "ASIGNACION_DOCENTE_GRUPO",
    affectedRecord: "Grupo: ARQ-SOFT-G1 (Docente: Prof. Carlos Mendoza)",
    ipAddress: "10.0.4.12",
    status: "EXITOSO",
    details: "Asignación horaria: Martes y Jueves 18:00 - 20:00 Aula Lab-402."
  },
  {
    id: "AUD-1046",
    timestamp: "2026-11-07 05:32:04 UTC",
    user: "Prof. Carlos Mendoza Vega",
    role: "DOCENTE",
    action: "REGISTRO_CALIFICACION_CORTE",
    affectedRecord: "Calificación Corte 2: Grupo ARQ-SOFT-G1 (32 estudiantes)",
    ipAddress: "186.84.112.5",
    status: "EXITOSO",
    details: "Ponderación del 35% guardada en base de datos. Transacción ACID confirmada."
  },
  {
    id: "AUD-1045",
    timestamp: "2026-11-07 04:18:22 UTC",
    user: "Mariana Silva Paredes",
    role: "ESTUDIANTE",
    action: "INTENTO_MODIFICACION_NOTA",
    affectedRecord: "RegistroCalificacion: ID-8842",
    ipAddress: "190.158.20.91",
    status: "DENEGADO",
    details: "Acceso denegado por middleware RBAC. El rol ESTUDIANTE carece de permiso de escritura."
  }
];

export const functionalRequirements: FunctionalRequirement[] = [
  {
    id: "RF-01",
    name: "Autenticación de Usuarios",
    module: "Seguridad y Accesos",
    description: "El sistema debe autenticar de forma unívoca a los usuarios mediante credenciales institucionales, emitiendo tokens criptográficos (JWT) de corta vigencia y renovación segura.",
    priority: "CRÍTICA",
    actors: ["Administrador", "Coordinador", "Docente", "Estudiante"],
    verificationCriteria: "Pruebas de autenticación con credenciales válidas/inválidas, control de intentos fallidos (máx 5) y revocación de tokens."
  },
  {
    id: "RF-02",
    name: "Control de Roles y Permisos (RBAC)",
    module: "Seguridad y Accesos",
    description: "El sistema debe autorizar transacciones basándose estrictamente en el rol asignado (Administrador, Coordinador, Docente, Estudiante), denegando accesos no autorizados a nivel de API y UI.",
    priority: "CRÍTICA",
    actors: ["Administrador"],
    verificationCriteria: "Matriz de pruebas unitarias sobre middlewares de autorización para cada endpoint protegido."
  },
  {
    id: "RF-03",
    name: "Gestión de Estudiantes",
    module: "Registro Académico",
    description: "Permite registrar, actualizar, consultar y suspender el expediente académico y personal de los estudiantes, validando unicidad de documento de identidad y código estudiantil.",
    priority: "ALTA",
    actors: ["Administrador", "Coordinador"],
    verificationCriteria: "CRUD completo con validación de esquemas Zod/Joi y restricciones de unicidad en base de datos."
  },
  {
    id: "RF-04",
    name: "Gestión de Docentes",
    module: "Planta Profesoral",
    description: "Permite administrar el perfil docente, vinculación contractual, titulación académica, áreas de especialidad y asignación departamental.",
    priority: "ALTA",
    actors: ["Administrador", "Coordinador"],
    verificationCriteria: "Verificación de validación de campos obligatorios y asociación a departamentos académicos."
  },
  {
    id: "RF-05",
    name: "Programas y Asignaturas",
    module: "Gestión Curricular",
    description: "Permite estructurar planes de estudio, mallas curriculares, asignaturas con créditos académicos, prerrequisitos, correquisitos y número de horas semanales.",
    priority: "ALTA",
    actors: ["Administrador", "Coordinador"],
    verificationCriteria: "Validación de grafos acíclicos dirigidos para evitar dependencias circulares en prerrequisitos."
  },
  {
    id: "RF-06",
    name: "Grupos, Horarios y Periodos",
    module: "Programación Académica",
    description: "Permite aperturar periodos lectivos (ej. 2027-1), crear grupos por asignatura con cupos máximos, asignar aulas físicas/virtuales y franjas horarias semanales.",
    priority: "ALTA",
    actors: ["Coordinador"],
    verificationCriteria: "Detección y bloqueo automático de cruces de horario para un mismo docente, aula o grupo."
  },
  {
    id: "RF-07",
    name: "Matrícula Académica (Cupos y Duplicados)",
    module: "Matrícula y Registro",
    description: "Permite a los estudiantes matricular asignaturas previa verificación transaccional de cupo disponible en el grupo, cumplimiento de prerrequisitos y ausencia de duplicados.",
    priority: "CRÍTICA",
    actors: ["Estudiante", "Coordinador"],
    verificationCriteria: "Pruebas de estrés concurrente: 50 solicitudes simultáneas para 1 solo cupo disponible; solo 1 debe tener éxito (aislamiento Serializable/SELECT FOR UPDATE)."
  },
  {
    id: "RF-08",
    name: "Registro de Calificaciones",
    module: "Evaluación Académica",
    description: "Permite a los docentes asentar notas parciales y finales conforme a la ponderación del syllabus (Cortes 1, 2 y 3), validando fechas habilitadas para digitación.",
    priority: "CRÍTICA",
    actors: ["Docente", "Coordinador"],
    verificationCriteria: "Rango numérico estricto (0.0 a 5.0), bloqueo automático fuera de fecha del calendario académico y registro de cambios."
  },
  {
    id: "RF-09",
    name: "Consulta de Resultados y Kardex",
    module: "Historial Académico",
    description: "Permite a los estudiantes y tutores consultar notas en tiempo real, promedios ponderados semestrales y acumulados, y estado de avance curricular.",
    priority: "ALTA",
    actors: ["Estudiante", "Docente", "Coordinador"],
    verificationCriteria: "Cálculo matemático exacto de promedios ponderados por créditos con fórmulas auditadas."
  },
  {
    id: "RF-10",
    name: "Generación de Reportes y Actas",
    module: "Reportes Institucionales",
    description: "Permite generar actas de calificación definitivas en formato PDF con firma digital, sábanas de notas, certificados de matrícula y estadísticas de deserción/aprobación.",
    priority: "MEDIA",
    actors: ["Administrador", "Coordinador", "Docente"],
    verificationCriteria: "Generación de documentos PDF fidedignos con marcas de agua criptográficas y checksum de validez."
  },
  {
    id: "RF-11",
    name: "Búsqueda Avanzada y Filtros",
    module: "Servicios Transversales",
    description: "Permite localizar registros mediante múltiples criterios combinados (código, nombre, periodo, estado, programa) con paginación optimizada.",
    priority: "MEDIA",
    actors: ["Administrador", "Coordinador", "Docente", "Estudiante"],
    verificationCriteria: "Tiempos de respuesta menores a 500ms mediante índices B-Tree y consultas paginadas por cursor o offset indexado."
  },
  {
    id: "RF-12",
    name: "Auditoría de Operaciones",
    module: "Seguridad y Auditoría",
    description: "Registra en una bitácora inmutable toda transacción de escritura o modificación crítica (quién, cuándo, qué valor previo, qué valor nuevo, IP de origen).",
    priority: "CRÍTICA",
    actors: ["Administrador"],
    verificationCriteria: "Imposibilidad de eliminar o truncar registros de auditoría mediante permisos restringidos a nivel de base de datos (Append-Only)."
  }
];

export const nonFunctionalRequirements: NonFunctionalRequirement[] = [
  {
    id: "RNF-01",
    name: "Seguridad y Criptografía",
    category: "Seguridad",
    description: "Todo el tráfico debe transitar bajo HTTPS con TLS 1.3 forzado (HSTS). Las contraseñas se almacenan con hashing seguro Argon2id / bcrypt (factor de trabajo >= 12). Mitigación estricta de OWASP Top 10.",
    metric: "Cifrado en tránsito y reposo",
    targetValue: "TLS 1.3, AES-256 en reposo, bcrypt cost=12",
    priority: "CRÍTICA"
  },
  {
    id: "RNF-02",
    name: "Rendimiento y Tiempo de Respuesta",
    category: "Rendimiento",
    description: "El sistema debe responder al 95 % de las consultas de lectura y transacciones de escritura en un tiempo menor o igual a 3.0 segundos bajo una carga nominal de 300 usuarios concurrentes.",
    metric: "Latencia percentil 95 (P95) con 300 usuarios concurrentes",
    targetValue: "P95 <= 3.0 segundos",
    priority: "CRÍTICA"
  },
  {
    id: "RNF-03",
    name: "Disponibilidad del Servicio",
    category: "Disponibilidad",
    description: "El SGA debe garantizar una disponibilidad mínima del 99.5 % durante el periodo lectivo regular y 99.9 % durante las dos semanas críticas de matrícula académica institucional.",
    metric: "Tiempo de actividad mensual (Uptime SLA)",
    targetValue: ">= 99.5 % (downtime máx. 3.6 horas/mes)",
    priority: "ALTA"
  },
  {
    id: "RNF-04",
    name: "Escalabilidad de la Arquitectura",
    category: "Escalabilidad",
    description: "La capa de aplicación debe ser 'stateless', permitiendo el escalado horizontal mediante contenedores detrás de un balanceador de carga, con capacidad de agregar réplicas de lectura en la base de datos.",
    metric: "Capacidad de autoescalado y réplicas",
    targetValue: "Soporte de 1 a 6 instancias de aplicación sin pérdida de sesión",
    priority: "ALTA"
  },
  {
    id: "RNF-05",
    name: "Mantenibilidad y Calidad de Código",
    category: "Mantenibilidad",
    description: "El código debe organizarse siguiendo los principios de Monolito Modular y Arquitectura Limpia (Clean Architecture), con cobertura de pruebas unitarias >= 80% en los módulos de Matrícula y Calificaciones.",
    metric: "Cobertura de código y modularidad de dominios",
    targetValue: ">= 80 % test coverage en dominios core; acoplamiento eferente bajo",
    priority: "ALTA"
  },
  {
    id: "RNF-06",
    name: "Usabilidad y Accesibilidad Web",
    category: "Usabilidad",
    description: "La interfaz de usuario debe cumplir las pautas de accesibilidad WCAG 2.1 nivel AA, garantizando navegación por teclado, contraste cromático >= 4.5:1 y soporte para modos visuales claro/oscuro.",
    metric: "Puntaje de accesibilidad y cumplimiento WCAG",
    targetValue: "WCAG 2.1 AA compliant; soporte de teclado completo",
    priority: "ALTA"
  },
  {
    id: "RNF-07",
    name: "Integridad y Consistencia de Datos",
    category: "Integridad",
    description: "Todas las transacciones de matrícula y calificación deben ejecutarse con garantías ACID plenas en PostgreSQL, empleando bloqueos de fila pesimistas para impedir sobrecupo en inscripciones.",
    metric: "Tasa de inconsistencias o sobrecupos permitidos",
    targetValue: "0 incidencias de sobrecupo bajo concurrencia extrema",
    priority: "CRÍTICA"
  },
  {
    id: "RNF-08",
    name: "Interoperabilidad y APIs",
    category: "Interoperabilidad",
    description: "La plataforma expondrá una API RESTful documentada bajo el estándar OpenAPI 3.0 / Swagger, con respuestas en formato JSON estandarizado y códigos de estado HTTP semánticos.",
    metric: "Conformidad OpenAPI y tiempo de integración",
    targetValue: "Especificación OpenAPI 3.0 al 100% de endpoints",
    priority: "MEDIA"
  },
  {
    id: "RNF-09",
    name: "Respaldo y Recuperación ante Desastres",
    category: "Respaldo",
    description: "Se deben ejecutar copias de seguridad automáticas diarias completas y continuas mediante WAL archiving (Write-Ahead Logging), con un RPO <= 15 minutos y RTO <= 2 horas.",
    metric: "Punto de recuperación (RPO) y Tiempo de recuperación (RTO)",
    targetValue: "RPO <= 15 minutos; RTO <= 2 horas",
    priority: "ALTA"
  },
  {
    id: "RNF-10",
    name: "Trazabilidad Forense",
    category: "Trazabilidad",
    description: "Los eventos transaccionales sensibles deben persistirse con identificador único de correlación (Correlation ID), marca temporal UTC sincronizada por NTP e inmutabilidad de bitácora.",
    metric: "Completitud de eventos auditados",
    targetValue: "100 % de transacciones DML críticas con traza de auditoría",
    priority: "CRÍTICA"
  },
  {
    id: "RNF-11",
    name: "Privacidad y Protección de Datos Personales",
    category: "Privacidad",
    description: "Cumplimiento normativo de la Ley Estatutaria de Protección de Datos Personales (Ley 1581 / Habeas Data). Los datos sensibles de contacto y notas se aíslan y anonimizan para reportes agregados.",
    metric: "Nivel de cumplimiento normativo institucional",
    targetValue: "100 % alineación con políticas de Habeas Data",
    priority: "CRÍTICA"
  },
  {
    id: "RNF-12",
    name: "Compatibilidad Multiplataforma",
    category: "Compatibilidad",
    description: "La interfaz web debe ser plenamente responsiva y funcional en las dos últimas versiones estables de Google Chrome, Mozilla Firefox, Apple Safari y Microsoft Edge, en resoluciones desde 360px hasta 4K.",
    metric: "Matriz de compatibilidad de navegadores",
    targetValue: "100 % paridad visual y funcional en Chrome, Firefox, Safari y Edge",
    priority: "ALTA"
  }
];

export const architectureComparisons: ArchitectureComparisonItem[] = [
  {
    criterion: "Consistencia Transaccional (ACID)",
    modularMonolith: "Excelente: Permite transacciones ACID atómicas nativas en PostgreSQL dentro del mismo proceso sin overhead de 2-Phase Commit ni Sagas complejas.",
    microservices: "Deficiente / Compleja: Requiere consistencia eventual, orquestadores de transacciones distribuidas (Sagas) y compensaciones de errores propensas a fallos en cupos.",
    pureLayered: "Buena: Permite ACID pero carece de fronteras claras entre módulos de negocio, permitiendo acoplamientos espagueti en consultas directas.",
    winner: "Monolito Modular",
    justification: "El núcleo crítico del SGA radica en la matrícula sin sobrecupo y el cierre de actas, donde la consistencia estricta e inmediata es un requisito innegociable."
  },
  {
    criterion: "Complejidad Operacional y DevOps",
    modularMonolith: "Baja / Moderada: Un único artefacto desplegable en contenedores Docker estándar; menor superficie de fallos en networking interno.",
    microservices: "Muy Alta: Demanda clúster Kubernetes, Service Mesh, múltiples pipelines de CI/CD, trazabilidad distribuida (OpenTelemetry) y mayor personal de guardia.",
    pureLayered: "Baja: Un solo artefacto, pero con riesgo severo de deuda técnica por falta de límites de dominio (Bounded Contexts).",
    winner: "Monolito Modular",
    justification: "Para el equipo de TI de la institución de educación superior, el monolito modular ofrece la mayor eficiencia de mantenimiento sin requerir un equipo masivo de SREs."
  },
  {
    criterion: "Latencia de Red en Llamadas Internas",
    modularMonolith: "Prácticamente nula (0 ms): La comunicación entre submódulos ocurre en memoria mediante llamadas a interfaces tipadas en TypeScript.",
    microservices: "Media / Alta (15-80 ms adicionales): Cada validación entre el servicio de Matrícula y el de Estudiantes/Calificaciones cruza la red vía HTTP/gRPC.",
    pureLayered: "Prácticamente nula (0 ms): Llamadas en memoria, pero con alto riesgo de consultas SQL cruzadas descontroladas.",
    winner: "Monolito Modular",
    justification: "Cumplir RNF-02 (P95 <= 3s bajo 300 concurrentes) es mucho más alcanzable sin el lastre de cascadas de peticiones de red entre microservicios."
  },
  {
    criterion: "Costo de Infraestructura en la Nube",
    modularMonolith: "Económico y Predecible: Puede ejecutarse eficientemente en 2-4 instancias de cómputo medianas detrás de un balanceador y una base de datos relacional gestionada.",
    microservices: "Costoso: Múltiples pods mínimos por servicio para alta disponibilidad, sobrecarga de memoria por runtime, gateway, colas de mensajería (Kafka/RabbitMQ).",
    pureLayered: "Económico: Similar al monolito modular, pero con mayores costos a futuro cuando se requiere refactorizar el código acoplado.",
    winner: "Monolito Modular",
    justification: "Optimiza al máximo el presupuesto institucional de TI, canalizando los recursos hacia la alta disponibilidad de la base de datos principal."
  },
  {
    criterion: "Mantenibilidad y Delimitación de Dominios",
    modularMonolith: "Alta: Aplica Domain-Driven Design (DDD) con Bounded Contexts. Cada módulo (Auth, Matrícula, Calificaciones) tiene su propio código y repositorios aislados.",
    microservices: "Alta: Aislamiento físico de dominios, pero con el costo de duplicación de contratos y serialización continua.",
    pureLayered: "Baja: Tiende a convertirse en el clásico 'monolito de lodo', donde cualquier capa accede indiscriminadamente a datos de cualquier entidad.",
    winner: "Monolito Modular",
    justification: "El Monolito Modular ofrece las ventajas arquitectónicas de diseño limpio de los microservicios sin pagar el costoso peaje de la distribución física."
  },
  {
    criterion: "Facilidad de Depuración y Pruebas",
    modularMonolith: "Excelente: Flujo de depuración lineal con stack traces completos en un único proceso; pruebas de integración rápidas sin necesidad de mocks de red masivos.",
    microservices: "Compleja: Requiere rastreo distribuido, simulación de caídas parciales de servicios y entornos de staging costosos de reproducir.",
    pureLayered: "Buena: Fácil de depurar localmente, pero propensa a efectos colaterales no deseados debido a dependencias no controladas.",
    winner: "Monolito Modular",
    justification: "Permite a los ingenieros de desarrollo reproducir y solucionar incidentes en minutos directamente en sus máquinas locales de desarrollo."
  }
];

export const mermaidDiagramsData = {
  useCases: {
    id: "diagram-use-cases",
    title: "1. Modelo de Casos de Uso del Sistema (UML)",
    legend: "Actores: Administrador, Coordinador Académico, Docente, Estudiante. Relaciones: <<include>> (inclusión obligatoria) y <<extend>> (extensión condicional).",
    explanation: "Este diagrama sintetiza los límites funcionales del SGA. Modela las interacciones principales entre los cuatro actores del sistema y los casos de uso nucleares. Obsérvese cómo el caso de uso central 'Matricular Asignaturas' incluye obligatoriamente la 'Validación de Cupos' y 'Verificación de Prerrequisitos', impidiendo matrículas inválidas antes de que se afecte el estado del sistema. El 'Registro de Calificaciones' incluye el 'Cálculo de Promedios Ponderados' y dispara la 'Auditoría de Eventos Sensibles'.",
    code: `graph LR
    classDef actorNode fill:#f1f5f9,stroke:#0284c7,stroke-width:2px,color:#0f172a,font-weight:bold;
    classDef ucNode fill:#ffffff,stroke:#64748b,stroke-width:1.5px,color:#1e293b;
    classDef coreUc fill:#f0fdf4,stroke:#16a34a,stroke-width:2px,color:#14532d;
    classDef auditUc fill:#fef2f2,stroke:#dc2626,stroke-width:1.5px,color:#991b1b;

    subgraph Actores
        Admin["👤 Administrador"]:::actorNode
        Coord["👤 Coordinador Académico"]:::actorNode
        Docente["👤 Docente Titular"]:::actorNode
        Estudiante["👤 Estudiante"]:::actorNode
    end

    subgraph "Límite del Sistema: SGA"
        UC_Auth("Autenticarse con JWT"):::ucNode
        UC_AdminUsr("Gestionar Usuarios y Roles"):::ucNode
        UC_Audit("Supervisar Auditoría Forense"):::auditUc
        
        UC_Prog("Administrar Programas y Mallas"):::ucNode
        UC_Grupos("Programar Grupos y Periodos"):::ucNode
        UC_AsigDoc("Asignar Docente a Grupo"):::ucNode
        
        UC_Matricula("Matricular Asignaturas"):::coreUc
        UC_ValCupo("Validar Cupos Disponibles"):::coreUc
        UC_ValPrereq("Verificar Prerrequisitos"):::coreUc
        UC_AntiDup("Prevenir Inscripción Duplicada"):::coreUc
        
        UC_Notas("Registrar Calificaciones"):::coreUc
        UC_CierreActas("Cerrar y Firmar Actas"):::ucNode
        UC_Kardex("Consultar Kardex y Promedios"):::ucNode
        UC_Reportes("Generar Reportes Oficiales"):::ucNode
    end

    Admin --> UC_Auth
    Admin --> UC_AdminUsr
    Admin --> UC_Audit
    Admin --> UC_Reportes

    Coord --> UC_Auth
    Coord --> UC_Prog
    Coord --> UC_Grupos
    Coord --> UC_AsigDoc
    Coord --> UC_Reportes

    Docente --> UC_Auth
    Docente --> UC_Notas
    Docente --> UC_CierreActas

    Estudiante --> UC_Auth
    Estudiante --> UC_Matricula
    Estudiante --> UC_Kardex

    UC_Matricula -.->|<<include>>| UC_ValCupo
    UC_Matricula -.->|<<include>>| UC_ValPrereq
    UC_Matricula -.->|<<include>>| UC_AntiDup
    UC_Matricula -.->|<<include>>| UC_Auth
    UC_Notas -.->|<<include>>| UC_Auth
    UC_Notas -.->|<<extend>>| UC_Audit`
  },
  components: {
    id: "diagram-components",
    title: "2. Modelo de Componentes: Arquitectura Monolítica Modular",
    legend: "Capa de Presentación (SPA) -> Capa de Controladores/API -> Bounded Contexts de Dominio Modular -> Repositorios -> Base de Datos Relacional PostgreSQL y Redis.",
    explanation: "Representa la descomposición física y lógica del monolito modular. Aunque toda la lógica se compila y ejecuta en una única unidad de despliegue, el código respeta límites estrictos de módulo (Bounded Contexts inspirados en DDD). Cada submódulo (Auth, Estudiantes, Docentes, Programación, Matrícula, Calificaciones, Auditoría) expone únicamente una interfaz pública (`IModuleService`) y oculta sus detalles internos de almacenamiento, garantizando un bajísimo acoplamiento y previniendo la degradación del código a futuro.",
    code: `graph TB
    classDef client fill:#f8fafc,stroke:#3b82f6,stroke-width:2px;
    classDef gateway fill:#eff6ff,stroke:#1d4ed8,stroke-width:2px;
    classDef domain fill:#f0fdf4,stroke:#15803d,stroke-width:1.5px;
    classDef persistence fill:#fefce8,stroke:#ca8a04,stroke-width:1.5px;
    classDef storage fill:#fdf2f8,stroke:#be185d,stroke-width:2px;

    subgraph "Capa de Presentación (Frontend)"
        SPA["Cliente Web SPA (React + Tailwind + Accessible UI)"]:::client
    end

    subgraph "Capa de Entrada y Seguridad (API Gateway / Middleware)"
        Router["Express API Router / OpenAPI Validation"]:::gateway
        AuthMiddleware["JWT Auth & RBAC Security Filter"]:::gateway
        RateLimiter["Rate Limiting & CORS Shield"]:::gateway
    end

    subgraph "Monolito Modular: Dominios de Negocio (Bounded Contexts)"
        ModAuth["Módulo Auth & Usuarios"]:::domain
        ModEst["Módulo Estudiantes"]:::domain
        ModDoc["Módulo Docentes"]:::domain
        ModProg["Módulo Planes & Asignaturas"]:::domain
        ModMat["Módulo Matrícula Transaccional (ACID)"]:::domain
        ModCal["Módulo Calificaciones & Actas"]:::domain
        ModAud["Módulo Auditoría Forense (Append-Only)"]:::domain
    end

    subgraph "Capa de Persistencia e Integración"
        RepoManager["Capa de Repositorios / Data Access Layer"]:::persistence
        PgPool["PostgreSQL Connection Pool (PgBouncer)"]:::persistence
        CacheLayer["Redis Cache (Sesiones & Catálogos)"]:::persistence
    end

    subgraph "Capa de Almacenamiento de Datos"
        PG_DB[("Base de Datos Relacional PostgreSQL 16")]:::storage
        S3_Storage[("Almacenamiento de Actas PDF / Backups")]:::storage
    end

    SPA -->|HTTPS / JSON REST| RateLimiter
    RateLimiter --> Router
    Router --> AuthMiddleware

    AuthMiddleware --> ModAuth
    AuthMiddleware --> ModEst
    AuthMiddleware --> ModDoc
    AuthMiddleware --> ModProg
    AuthMiddleware --> ModMat
    AuthMiddleware --> ModCal

    ModMat -.->|Valida Expediente| ModEst
    ModMat -.->|Consulta Malla/Prerreq| ModProg
    ModCal -.->|Valida Titularidad| ModDoc
    
    ModMat ==>|Dispara Evento Traza| ModAud
    ModCal ==>|Dispara Evento Traza| ModAud
    ModAuth ==>|Dispara Evento Login| ModAud

    ModAuth --> RepoManager
    ModMat --> RepoManager
    ModCal --> RepoManager
    ModAud --> RepoManager

    RepoManager --> PgPool
    RepoManager --> CacheLayer
    PgPool --> PG_DB
    ModCal -.->|Guarda Actas Selladas| S3_Storage`
  },
  deployment: {
    id: "diagram-deployment",
    title: "3. Modelo de Despliegue de Infraestructura",
    legend: "Nube Institucional de Producción: Reverse Proxy / CDN (Cloudflare/Nginx), Clúster de Contenedores de Aplicación, Base de Datos Gestionada con Replicación y Respaldo Continuo (WAL).",
    explanation: "Ilustra la topología de despliegue en ambiente productivo que garantiza el cumplimiento de RNF-01 (Seguridad HTTPS), RNF-02 (Latencia < 3s para 300 usuarios concurrentes), RNF-03 (Disponibilidad 99.5%) y RNF-09 (RPO < 15min con WAL). Se cuenta con un proxy inverso para terminación TLS y mitigación de ataques DDoS, un clúster de instancias de Node.js sin estado, y una base de datos PostgreSQL con réplica de lectura para desahogar consultas masivas de reportes.",
    code: `graph TB
    classDef ext fill:#f8fafc,stroke:#64748b,stroke-width:1.5px;
    classDef edge fill:#e0f2fe,stroke:#0284c7,stroke-width:2px;
    classDef appNode fill:#f0fdf4,stroke:#16a34a,stroke-width:2px;
    classDef dbNode fill:#fef3c7,stroke:#d97706,stroke-width:2px;
    classDef backupNode fill:#fdf4ff,stroke:#a21caf,stroke-width:1.5px;

    Clients["Dispositivos Clientes (Navegadores Desktop / Móviles)"]:::ext

    subgraph "Capa Perimetral (Edge & Reverse Proxy)"
        CF["Cloudflare / Nginx Reverse Proxy\n- Certificado SSL/TLS 1.3\n- Mitigación DDoS / WAF\n- Cache de Assets Estáticos"]:::edge
    end

    subgraph "VPC Privada Institucional (Cluster de Cómputo)"
        LB["Load Balancer Interno (Round-Robin / Least Connections)"]:::edge
        
        subgraph "Nodos de Aplicación (Docker Stateless)"
            AppInst1["Instancia 1 SGA (Node.js / Express Container)"]:::appNode
            AppInst2["Instancia 2 SGA (Node.js / Express Container)"]:::appNode
            AppInstN["Instancia N SGA (Auto-scaling 300+ usuarios)"]:::appNode
        end

        subgraph "Capa de Caché de Alto Rendimiento"
            RedisCluster[("Redis In-Memory Cluster\n- Tokens Revocados\n- Catálogos Frecuentes")]:::dbNode
        end
    end

    subgraph "VPC de Datos (Alta Disponibilidad)"
        DB_Primary[("PostgreSQL 16 Primary (Read/Write)\n- Transacciones ACID\n- Locks Pesimistas Matrícula")]:::dbNode
        DB_Replica[("PostgreSQL 16 Standby (Read-Only)\n- Reportes & Estadísticas")]:::dbNode
    end

    subgraph "Almacenamiento y Respaldo Externo"
        S3_Backups[("Almacenamiento Objeto Cifrado AES-256\n- Backups Diarios Completos\n- WAL Streaming (RPO < 15 min)")]:::backupNode
    end

    Clients ==>|HTTPS 443| CF
    CF -->|HTTP Interno Seguro| LB
    LB --> AppInst1
    LB --> AppInst2
    LB --> AppInstN

    AppInst1 <--> RedisCluster
    AppInst2 <--> RedisCluster

    AppInst1 ==>|Escrituras / Transacciones| DB_Primary
    AppInst2 ==>|Escrituras / Transacciones| DB_Primary
    AppInst1 -.->|Lecturas Masivas / Kardex| DB_Replica
    AppInst2 -.->|Lecturas Masivas / Kardex| DB_Replica

    DB_Primary ==>|Replicación Streaming Asíncrona| DB_Replica
    DB_Primary -.->|Envío Continuo de WAL| S3_Backups`
  },
  dataConceptual: {
    id: "diagram-data-conceptual",
    title: "4. Modelo de Datos Conceptual y Relacional con Cardinalidades",
    legend: "Modelo Entidad-Relación normalizado (3FN). Muestra las entidades nucleares del SGA, claves primarias, claves foráneas y cardinalidades precisas (1:1, 1:N, N:M).",
    explanation: "Este modelo garantiza la integridad referencial y estructural de todo el dominio académico (RNF-07). Cada estudiante pertenece a un programa y formaliza matrículas por periodo; cada grupo corresponde a una asignatura y tiene un docente asignado; la matrícula registra la inscripción en grupos específicos validando cupos; y las calificaciones se ligan a dicha matrícula con desglose por cortes evaluativos. La tabla inmutable de auditoría almacena cualquier mutación del sistema.",
    code: `erDiagram
    USUARIO ||--o{ AUDITORIA : "ejecuta_transacciones"
    USUARIO ||--|| ROL : "posee"
    ROL ||--o{ PERMISO : "contiene"

    USUARIO ||--o| ESTUDIANTE : "identifica_perfil"
    USUARIO ||--o| DOCENTE : "identifica_perfil"

    PROGRAMA_ACADEMICO ||--o{ ESTUDIANTE : "matricula_en"
    PROGRAMA_ACADEMICO ||--o{ ASIGNATURA : "compone_malla"
    
    ASIGNATURA ||--o{ PRERREQUISITO : "requiere"
    ASIGNATURA ||--o{ GRUPO : "oferta"

    PERIODO_ACADEMICO ||--o{ GRUPO : "habilita_en"
    PERIODO_ACADEMICO ||--o{ MATRICULA : "organiza"

    DOCENTE ||--o{ GRUPO : "dicta"

    ESTUDIANTE ||--o{ MATRICULA : "inscribe"
    MATRICULA ||--o{ DETALLE_MATRICULA : "contiene"
    GRUPO ||--o{ DETALLE_MATRICULA : "admite"

    DETALLE_MATRICULA ||--o{ CALIFICACION : "registra_notas"

    USUARIO {
        uuid id PK
        string email UK
        string password_hash
        string nombre_completo
        boolean activo
        timestamp creado_en
    }

    ROL {
        int id PK
        string codigo_rol UK "ADMIN, COORD, DOC, EST"
        string descripcion
    }

    ESTUDIANTE {
        uuid id PK
        uuid usuario_id FK
        string codigo_estudiantil UK
        uuid programa_id FK
        string estado_academico "ACTIVO, GRADUADO, SUSPENDIDO"
    }

    DOCENTE {
        uuid id PK
        uuid usuario_id FK
        string codigo_docente UK
        string especialidad
        string tipo_contrato
    }

    PROGRAMA_ACADEMICO {
        uuid id PK
        string codigo UK
        string nombre
        int total_creditos
    }

    ASIGNATURA {
        uuid id PK
        uuid programa_id FK
        string codigo UK
        string nombre
        int creditos
        int semestre_nivel
    }

    PERIODO_ACADEMICO {
        uuid id PK
        string codigo UK "2027-1"
        date fecha_inicio
        date fecha_fin
        boolean activo
    }

    GRUPO {
        uuid id PK
        uuid asignatura_id FK
        uuid periodo_id FK
        uuid docente_id FK
        string codigo_grupo "G1, G2"
        int cupo_maximo
        int cupo_ocupado
        string horario_aula
    }

    MATRICULA {
        uuid id PK
        uuid estudiante_id FK
        uuid periodo_id FK
        date fecha_registro
        string estado "CONFIRMADA, ANULADA"
    }

    DETALLE_MATRICULA {
        uuid id PK
        uuid matricula_id FK
        uuid grupo_id FK
        timestamp registrado_en
    }

    CALIFICACION {
        uuid id PK
        uuid detalle_matricula_id FK
        int numero_corte "1, 2, 3"
        decimal valor_nota "0.00 a 5.00"
        decimal porcentaje_corte "30%, 35%"
        timestamp actualizado_en
    }

    AUDITORIA {
        uuid id PK
        uuid usuario_id FK
        string accion
        string entidad_afectada
        string id_registro_afectado
        json datos_anteriores
        json datos_nuevos
        string direccion_ip
        timestamp timestamp_utc
    }`
  },
  sequenceEnrollment: {
    id: "diagram-sequence-enrollment",
    title: "5. Diagrama de Secuencia: Matrícula Académica (Validación de Cupos y Prevención de Duplicados)",
    legend: "Actores y Componentes: Estudiante -> API Gateway -> ModuloMatricula -> PostgreSQL Engine. Destaca el bloqueo pesimista 'SELECT FOR UPDATE' y la garantía ACID.",
    explanation: "Detalla el flujo transaccional de RF-07 (Matrícula) y RNF-07 (Consistencia ACID). Para evitar que dos estudiantes reserven el último cupo simultáneamente (Race Condition), el sistema abre una transacción en PostgreSQL y adquiere un bloqueo pesimista a nivel de fila (`SELECT cupo_ocupado, cupo_maximo FROM grupo WHERE id = ? FOR UPDATE`). Si hay cupo y no hay duplicados de inscripción previa, se incrementa el cupo, se guarda la matrícula y se asienta el evento en auditoría de forma atómica. Si se presenta un fallo, se ejecuta `ROLLBACK` total.",
    code: `sequenceDiagram
    autonumber
    actor Estudiante as 👤 Estudiante
    participant API as 🛡️ API Gateway / Auth
    participant Service as ⚙️ ModuloMatricula
    participant DB as 🗄️ PostgreSQL (ACID)
    participant Audit as 📝 ModuloAuditoria

    Estudiante->>API: POST /api/v1/matriculas/inscribir {grupo_id, periodo_id} (Bearer JWT)
    API->>API: Valida Token JWT & Rol ESTUDIANTE (RBAC)
    
    alt Token Inválido o Rol Incorrecto
        API-->>Estudiante: 401 Unauthorized / 403 Forbidden
    else Token Válido
        API->>Service: procesarInscripcion(estudiante_id, grupo_id, periodo_id)
        
        Service->>DB: BEGIN TRANSACTION (Isolation: READ COMMITTED)
        
        Note over Service,DB: Prevención de Inscripción Duplicada
        Service->>DB: SELECT COUNT(*) FROM matricula m JOIN detalle_matricula d ON m.id=d.matricula_id WHERE m.estudiante_id=? AND d.grupo_id=?
        DB-->>Service: count (0 = no duplicado)
        
        alt Materia Ya Inscrita (count > 0)
            Service->>DB: ROLLBACK
            Service-->>API: Error: Asignatura ya se encuentra matriculada
            API-->>Estudiante: 409 Conflict: Inscripción duplicada detectada
        else No Duplicada
            Note over Service,DB: Bloqueo Pesimista de Fila (Zero Sobrecupo)
            Service->>DB: SELECT cupo_maximo, cupo_ocupado FROM grupo WHERE id=? FOR UPDATE
            DB-->>Service: {cupo_maximo: 30, cupo_ocupado: 29}
            
            alt Sin Cupos Disponibles (cupo_ocupado >= cupo_maximo)
                Service->>DB: ROLLBACK
                Service-->>API: Error: Grupo agotado sin cupos
                API-->>Estudiante: 422 Unprocessable Entity: Cupo no disponible
            else Cupo Disponible
                Service->>DB: INSERT INTO detalle_matricula (matricula_id, grupo_id, fecha) VALUES (...)
                Service->>DB: UPDATE grupo SET cupo_ocupado = cupo_ocupado + 1 WHERE id=?
                Service->>DB: INSERT INTO auditoria (usuario, accion, registro) VALUES (...)
                Service->>DB: COMMIT TRANSACTION
                
                Service->>Audit: registrarEventoAsync("MATRICULA_EXITOSA", estudiante_id, grupo_id)
                Service-->>API: {status: "EXITOSA", cupo_asignado: 30}
                API-->>Estudiante: 201 Created: Asignatura matriculada exitosamente
            end
        end
    end`
  },
  sequenceGrades: {
    id: "diagram-sequence-grades",
    title: "6. Diagrama de Secuencia: Registro y Asignación de Calificaciones",
    legend: "Docente Titular -> Controladores de Calificaciones -> Validación de Fechas de Calendario -> Persistencia en BD y Registro de Auditoría Inmutable.",
    explanation: "Modela el flujo de asentamiento de notas parciales y finales (RF-08 y RF-12). Se valida que el docente que intenta digitar la nota sea efectivamente el titular asignado al grupo lectivo, que el periodo de digitación esté abierto según el calendario institucional, y que la nota esté en el rango 0.0 - 5.0. Una vez persistida, se calcula automáticamente el promedio ponderado del estudiante y se genera una entrada en la bitácora de auditoría forense con el valor previo y el valor nuevo.",
    code: `sequenceDiagram
    autonumber
    actor Docente as 👤 Docente Titular
    participant API as 🛡️ API Gateway / RBAC
    participant GradeService as ⚙️ ModuloCalificaciones
    participant DB as 🗄️ PostgreSQL Relacional
    participant Audit as 📝 ModuloAuditoria

    Docente->>API: PUT /api/v1/calificaciones {detalle_matricula_id, corte: 2, nota: 4.5}
    API->>API: Valida JWT y Rol DOCENTE
    
    API->>GradeService: registrarNota(docente_id, detalle_id, corte, nota)
    
    GradeService->>DB: SELECT docente_id FROM grupo g JOIN detalle_matricula d ON g.id=d.grupo_id WHERE d.id=?
    DB-->>GradeService: grupo_docente_id
    
    alt Docente No es Titular del Grupo
        GradeService-->>API: Error: No autorizado para este grupo
        API-->>Docente: 403 Forbidden: No tiene asignado este grupo académico
    else Docente Autorizado
        GradeService->>DB: SELECT estado, fecha_cierre FROM calendario_evaluacion WHERE periodo_id=? AND corte=?
        DB-->>GradeService: {activo: true, fecha_cierre: "2027-04-15"}
        
        alt Ventana de Digitación Expirada
            GradeService-->>API: Error: Periodo de digitación cerrado
            API-->>Docente: 422 Unprocessable: Cierre de acta extemporáneo
        else Periodo Habilitado
            GradeService->>DB: BEGIN TRANSACTION
            GradeService->>DB: SELECT valor_nota FROM calificacion WHERE detalle_matricula_id=? AND corte=? FOR UPDATE
            DB-->>GradeService: valor_nota_anterior: 3.8
            
            GradeService->>DB: UPDATE calificacion SET valor_nota = 4.5, actualizado_en = NOW() WHERE detalle_id=? AND corte=2
            GradeService->>DB: INSERT INTO auditoria (usuario_id, accion, anterior, nuevo) VALUES (docente_id, "ACTUALIZAR_NOTA", 3.8, 4.5)
            GradeService->>DB: COMMIT TRANSACTION
            
            GradeService-->>API: {status: "OK", nota_definitiva_actualizada: 4.15}
            API-->>Docente: 200 OK: Calificación asentada y auditada
        end
    end`
  }
};

export const architectureDecisionsRecords: ADR[] = [
  {
    id: "ADR-01",
    title: "Selección del Patrón Monolito Modular en Capas frente a Microservicios Distribuidos",
    status: "Aceptado",
    date: "2026-11-07",
    context: "El SGA de la institución requiere alta velocidad de respuesta (P95 <= 3s), estricta consistencia transaccional en matrículas simultáneas y un presupuesto operativo de infraestructura acotado. Un esquema de microservicios introduciría problemas de consistencia eventual, orquestación de transacciones distribuidas (Sagas) y una desproporcionada complejidad de DevOps para el tamaño del equipo de TI.",
    decision: "Adoptar una arquitectura de Monolito Modular en Capas (Modular Monolith) organizado bajo principios de Domain-Driven Design (DDD). Cada submódulo (Auth, Estudiantes, Docentes, Matrícula, Calificaciones, Auditoría) opera con fronteras de dominio bien delimitadas, interfaces públicas explícitas y base de datos relacional única compartida con esquemas lógicos separados.",
    consequencesPositive: [
      "Transacciones ACID atómicas nativas sin necesidad de 2-Phase Commit ni compensaciones complejas.",
      "Latencia de comunicación interna en memoria (0 ms), facilitando el cumplimiento de RNF-02.",
      "Un solo pipeline de integración y despliegue (CI/CD) y menor costo de infraestructura en la nube.",
      "Facilidad para realizar pruebas end-to-end y depuración local en máquinas de desarrollo."
    ],
    consequencesNegative: [
      "Todo el sistema se despliega en conjunto (menor independencia en despliegues aislados).",
      "Riesgo de que desarrolladores poco disciplinados rompan los límites de módulo (mitigado con reglas de linters y arquitectura hexagonal)."
    ],
    mitigations: [
      "Uso de módulos TypeScript con 'barrel exports' estrictos que impiden importaciones directas de archivos internos de otros dominios.",
      "Pruebas de arquitectura automatizadas en CI para validar que ningún módulo invoque repositorios ajenos sin pasar por la interfaz pública de servicio."
    ]
  },
  {
    id: "ADR-02",
    title: "Adopción de Base de Datos Relacional PostgreSQL con Bloqueos de Fila ('SELECT FOR UPDATE') para Cupos",
    status: "Aceptado",
    date: "2026-11-07",
    context: "Durante las semanas de matrícula institucional, cientos de estudiantes compiten simultáneamente por los últimos cupos disponibles en asignaturas de alta demanda. Bases de datos NoSQL con consistencia eventual o transacciones optimistas provocan sobrecupos masivos (phantom reads) o una alta tasa de rechazos molestos para el usuario.",
    decision: "Seleccionar PostgreSQL 16 como motor relacional primario, implementando aislamiento transaccional READ COMMITTED con bloqueos pesimistas explícitos a nivel de fila (`SELECT ... FOR UPDATE`) sobre la tabla 'grupo' durante la reserva de cupo.",
    consequencesPositive: [
      "Garantía matemática de cero sobrecupos bajo cualquier nivel de concurrencia extrema.",
      "Integridad referencial forzada por motor con Foreign Keys, Checks y Triggers.",
      "Soporte nativo para tipos JSONB para bitácora flexible de auditoría sin perder la solidez relacional.",
      "Ecosistema maduro de replicación en caliente (Streaming Replication) y copias continuas (WAL archiving)."
    ],
    consequencesNegative: [
      "Los bloqueos de fila aumentan levemente el tiempo de espera si muchos hilos compiten por el mismísimo grupo.",
      "Requiere un pooler de conexiones (PgBouncer) para administrar eficientemente las conexiones entrantes sin saturar el CPU."
    ],
    mitigations: [
      "Las transacciones de matrícula se mantienen ultracortas (< 50ms): solo verifican y reservan, delegando notificaciones o emails a tareas asíncronas en background.",
      "Configuración de PgBouncer en modo 'transaction pooling' con un pool de 50 conexiones compartidas eficientes."
    ]
  },
  {
    id: "ADR-03",
    title: "Estrategia de Autenticación con JWT Stateless de Corta Duración y Matriz RBAC Desacoplada",
    status: "Aceptado",
    date: "2026-11-07",
    context: "El sistema debe dar soporte a 300 usuarios concurrentes sin sobrecargar la base de datos con consultas de validación de sesión en cada clic. Además, se requiere un esquema de roles y permisos flexible que soporte auditoría forense inmediata.",
    decision: "Implementar autenticación basada en tokens JWT firmados con clave asimétrica RSA-256 o HMAC-SHA256 con tiempo de vida (TTL) de 15 minutos, complementados con Refresh Tokens rotativos almacenados en Redis con bandera de revocación rápida. El control de acceso RBAC valida claims criptográficos en memoria a nivel de middleware.",
    consequencesPositive: [
      "Arquitectura plenamente stateless en la capa de aplicación, facilitando el autoescalado horizontal (RNF-04).",
      "Menor carga sobre la base de datos al no consultar la tabla de sesiones en cada petición de lectura.",
      "Capacidad de revocar tokens anticipadamente consultando la lista de revocaciones en Redis."
    ],
    consequencesNegative: [
      "Un token JWT robado es válido hasta que expire su ventana de 15 minutos (a menos que se consulte la blacklist de Redis).",
      "Aumento en el tamaño de las cabeceras HTTP al transportar los claims del usuario y sus roles."
    ],
    mitigations: [
      "Cookies HTTPOnly, Secure, SameSite=Strict para almacenar el Refresh Token, mitigando ataques XSS.",
      "Los cambios de rol de usuario invalidan de inmediato el Refresh Token en Redis y fuerzan renovación."
    ]
  }
];

export const riskAnalysisItems: RiskAnalysisItem[] = [
  {
    id: "RSK-01",
    category: "SPOF",
    risk: "Punto Único de Falla en el Nodo Primario de la Base de Datos PostgreSQL",
    impact: "Crítico",
    likelihood: "Baja",
    mitigationStrategy: "Configuración de clúster PostgreSQL con réplica síncrona en Standby y failover automático (vía Patroni o servicio gestionado Cloud SQL / RDS Multi-AZ).",
    contingencyPlan: "En caso de falla total del primario, el proxy de base de datos promueve la réplica a primaria en < 45 segundos sin pérdida de datos."
  },
  {
    id: "RSK-02",
    category: "SPOF",
    risk: "Caída del Balanceador de Carga o Reverse Proxy Perimetral",
    impact: "Alto",
    likelihood: "Baja",
    mitigationStrategy: "Uso de DNS anycast con Cloudflare o par redundante activo-pasivo de Nginx con VRRP (Keepalived).",
    contingencyPlan: "Conmutación por DNS con TTL bajo (60 segundos) hacia una IP de respaldo preconfigurada."
  },
  {
    id: "RSK-03",
    category: "Seguridad",
    risk: "Ataques de Inyección SQL y Manipulación Maliciosa de Parámetros",
    impact: "Crítico",
    likelihood: "Media",
    mitigationStrategy: "Uso obligatorio de consultas parametrizadas (Prepared Statements) en todos los módulos a través del ORM/query builder. Análisis estático con linters de seguridad.",
    contingencyPlan: "WAF (Web Application Firewall) en Cloudflare configurado para bloquear payloads maliciosos de SQLi antes de que toquen la API."
  },
  {
    id: "RSK-04",
    category: "Seguridad",
    risk: "Escalamiento Horizontal o Vertical de Privilegios por Manipulación de Tokens",
    impact: "Crítico",
    likelihood: "Baja",
    mitigationStrategy: "Firma criptográfica estricta de JWT en el backend; validación de roles en cada endpoint mediante middleware que no confía en datos enviados por el cliente.",
    contingencyPlan: "Registro en auditoría de cualquier intento de acceso denegado con IP y bloqueo temporal automático de la cuenta afectada."
  },
  {
    id: "RSK-05",
    category: "Escalabilidad",
    risk: "Agotamiento de Conexiones a PostgreSQL en Picos de Matrícula (300+ concurrentes)",
    impact: "Alto",
    likelihood: "Media",
    mitigationStrategy: "Implementación de PgBouncer entre las instancias de aplicación y la base de datos, con límites de conexión por instancia y reutilización ágil de conexiones transaccionales.",
    contingencyPlan: "Mecanismo de cola de espera en la interfaz de usuario con tickets virtuales cuando la carga supera el 90% de capacidad."
  },
  {
    id: "RSK-06",
    category: "Escalabilidad",
    risk: "Degradación en Reportes Masivos y Consultas de Estadísticas Consolidadas",
    impact: "Medio",
    likelihood: "Alta",
    mitigationStrategy: "Enrutamiento de consultas analíticas (RF-10) exclusivamente hacia la réplica de solo lectura (Read Replica), aislando la carga transaccional de matrículas.",
    contingencyPlan: "Generación de reportes diferida en background con entrega por notificación o descarga asíncrona."
  }
];

export const traceabilityMatrix: TraceabilityItem[] = [
  {
    reqId: "RF-01",
    reqName: "Autenticación de Usuarios",
    type: "RF",
    component: "AuthMiddleware / ModuloAuth",
    systemModel: "Diagrama de Componentes & Casos de Uso",
    designDecision: "ADR-03: Tokens JWT stateless + Refresh Tokens rotativos",
    verificationMethod: "Pruebas unitarias de emisión de tokens y suites de seguridad automatizadas."
  },
  {
    reqId: "RF-02",
    reqName: "Roles y Permisos (RBAC)",
    type: "RF",
    component: "RBACGuard / ModuloUsuarios",
    systemModel: "Diagrama de Casos de Uso & Demostración RBAC",
    designDecision: "Matriz Rol-Permiso desacoplada con validación en middleware de Express",
    verificationMethod: "Pruebas de caja negra intentando ejecutar operaciones con roles no autorizados."
  },
  {
    reqId: "RF-03",
    reqName: "Gestión de Estudiantes",
    type: "RF",
    component: "ModuloEstudiantes / EstudianteRepository",
    systemModel: "Diagrama de Componentes & Modelo ER",
    designDecision: "Entidad Estudiante ligada 1:1 a Usuario con clave única de código institucional",
    verificationMethod: "Pruebas de integración sobre API REST con validación de esquemas Zod."
  },
  {
    reqId: "RF-04",
    reqName: "Gestión de Docentes",
    type: "RF",
    component: "ModuloDocentes / DocenteRepository",
    systemModel: "Diagrama de Componentes & Modelo ER",
    designDecision: "Entidad Docente ligada a Usuario con departamento y vinculación",
    verificationMethod: "Pruebas CRUD y verificación de no eliminación en cascada si tiene grupos dictados."
  },
  {
    reqId: "RF-05",
    reqName: "Programas y Asignaturas",
    type: "RF",
    component: "ModuloCurricular / MallaRepository",
    systemModel: "Modelo ER & Diagrama de Componentes",
    designDecision: "Estructura de malla con créditos, semestre y tabla de prerrequisitos acíclica",
    verificationMethod: "Algoritmo de detección de ciclos de dependencias en pruebas unitarias."
  },
  {
    reqId: "RF-06",
    reqName: "Grupos, Horarios y Periodos",
    type: "RF",
    component: "ModuloProgramacion / GrupoRepository",
    systemModel: "Modelo ER & Diagrama de Casos de Uso",
    designDecision: "Asociación N:1 de Grupo con Periodo, Asignatura y Docente, con validación de traslape",
    verificationMethod: "Pruebas de solapamiento de horarios en la misma aula física o docente."
  },
  {
    reqId: "RF-07",
    reqName: "Matrícula (Cupos y Duplicados)",
    type: "RF",
    component: "ModuloMatricula / TransaccionService",
    systemModel: "Diagrama de Secuencia 1 & Modelo ER",
    designDecision: "ADR-02: Transacción PostgreSQL con SELECT FOR UPDATE y verificación de inscripción previa",
    verificationMethod: "Test de concurrencia k6: 50 solicitudes concurrentes sobre 1 solo cupo disponible."
  },
  {
    reqId: "RF-08",
    reqName: "Registro de Calificaciones",
    type: "RF",
    component: "ModuloCalificaciones / GradeService",
    systemModel: "Diagrama de Secuencia 2 & Modelo ER",
    designDecision: "Validación de pertenencia docente del grupo y ventana habilitada del calendario",
    verificationMethod: "Pruebas de límites en notas (0.0 a 5.0) y rechazo de digitación fuera de fecha."
  },
  {
    reqId: "RF-09",
    reqName: "Consulta de Resultados y Kardex",
    type: "RF",
    component: "ModuloHistorial / KardexCalculator",
    systemModel: "Modelo ER & Diagrama de Casos de Uso",
    designDecision: "Cálculo en tiempo de consulta con soporte de vista materializada para históricos cerrados",
    verificationMethod: "Pruebas matemáticas con casos borde de homologaciones y repeticiones de materia."
  },
  {
    reqId: "RF-10",
    reqName: "Reportes y Actas",
    type: "RF",
    component: "ReportService / PDFGenerator",
    systemModel: "Diagrama de Componentes & Despliegue",
    designDecision: "Generación en streaming enviada a réplica de lectura para no degradar el primario",
    verificationMethod: "Generación y validación de hash criptográfico de integridad en PDF generado."
  },
  {
    reqId: "RF-11",
    reqName: "Búsqueda y Filtros",
    type: "RF",
    component: "QueryEngine / Repositorios",
    systemModel: "Modelo ER & Diagrama de Componentes",
    designDecision: "Índices B-Tree compuestos en PostgreSQL para búsquedas multicriterio y paginación",
    verificationMethod: "EXPLAIN ANALYZE en PostgreSQL asegurando Index Scan en < 50ms."
  },
  {
    reqId: "RF-12",
    reqName: "Auditoría de Eventos",
    type: "RF",
    component: "ModuloAuditoria / AuditInterceptor",
    systemModel: "Diagrama de Componentes, Secuencias & Modelo ER",
    designDecision: "Tabla inmutable en PostgreSQL con formato JSONB para datos previos y posteriores",
    verificationMethod: "Verificación de permisos de base de datos denegando comandos UPDATE y DELETE en tabla auditoria."
  },
  {
    reqId: "RNF-01",
    reqName: "Seguridad y HTTPS",
    type: "RNF",
    component: "Edge / Reverse Proxy / Auth",
    systemModel: "Diagrama de Despliegue & Componentes",
    designDecision: "HSTS forzado, TLS 1.3, Argon2id/bcrypt cost=12 para passwords",
    verificationMethod: "Escaneo de vulnerabilidades SSL Labs (calificación A+) y OWASP ZAP."
  },
  {
    reqId: "RNF-02",
    reqName: "Rendimiento (P95 <= 3s / 300 usr)",
    type: "RNF",
    component: "Node.js Cluster / PgBouncer / Redis",
    systemModel: "Diagrama de Despliegue & Comparación Monolito",
    designDecision: "ADR-01: Monolito modular con llamadas en memoria y pool de conexiones optimizado",
    verificationMethod: "Prueba de carga con k6 simulando 300 usuarios concurrentes durante 15 minutos continuos."
  },
  {
    reqId: "RNF-03",
    reqName: "Disponibilidad 99.5%",
    type: "RNF",
    component: "Load Balancer / Multi-Instance",
    systemModel: "Diagrama de Despliegue",
    designDecision: "Despliegue redundante con healthchecks automáticos y base de datos con réplica activa",
    verificationMethod: "Prueba de caos simulando la muerte súbita de una instancia de aplicación sin caída de servicio."
  },
  {
    reqId: "RNF-04",
    reqName: "Escalabilidad Horizontal",
    type: "RNF",
    component: "Docker Stateless / Cluster",
    systemModel: "Diagrama de Despliegue",
    designDecision: "Capa de aplicación 100% sin estado (sesión delegada a JWT y Redis)",
    verificationMethod: "Escalado dinámico de 2 a 5 réplicas bajo inyección de tráfico simulado."
  },
  {
    reqId: "RNF-05",
    reqName: "Mantenibilidad y Clean Code",
    type: "RNF",
    component: "Estructura Monolito Modular",
    systemModel: "Diagrama de Componentes",
    designDecision: "DDD Bounded Contexts con separación estricta de interfaces y repositorios",
    verificationMethod: "Análisis estático SonarQube con deuda técnica < 5% y cobertura de tests >= 80%."
  },
  {
    reqId: "RNF-06",
    reqName: "Usabilidad y Accesibilidad",
    type: "RNF",
    component: "Frontend SPA (React UI)",
    systemModel: "Capa de Presentación",
    designDecision: "Cumplimiento WCAG 2.1 AA, navegación por teclado, contraste alto y modo claro/oscuro",
    verificationMethod: "Auditoría automatizada con Axe DevTools y Google Lighthouse (puntaje >= 95)."
  },
  {
    reqId: "RNF-07",
    reqName: "Integridad y Consistencia",
    type: "RNF",
    component: "PostgreSQL Engine / Transacciones",
    systemModel: "Diagrama de Secuencia 1 & Modelo ER",
    designDecision: "ADR-02: Transacciones ACID con SELECT FOR UPDATE y Foreign Keys estrictas",
    verificationMethod: "Tests de estrés concurrentes verificando cero discordancias de inventario de cupos."
  },
  {
    reqId: "RNF-08",
    reqName: "Interoperabilidad REST",
    type: "RNF",
    component: "API Router / Swagger Documentation",
    systemModel: "Diagrama de Componentes",
    designDecision: "API RESTful normalizada con especificación OpenAPI 3.0 validada por contrato",
    verificationMethod: "Validación de esquemas JSON Schema contra la especificación oficial de Swagger."
  },
  {
    reqId: "RNF-09",
    reqName: "Respaldo y Recuperación",
    type: "RNF",
    component: "WAL Archiving / S3 Backup Engine",
    systemModel: "Diagrama de Despliegue",
    designDecision: "Backups completos diarios + streaming continuo de Write-Ahead Logs a almacenamiento S3",
    verificationMethod: "Simulacro de restauración Point-in-Time Recovery (PITR) comprobando RPO < 15 min."
  },
  {
    reqId: "RNF-10",
    reqName: "Trazabilidad Forense",
    type: "RNF",
    component: "ModuloAuditoria / Database Table",
    systemModel: "Diagrama de Secuencia 2 & Demostración RBAC",
    designDecision: "Tabla inmutable en PostgreSQL con timestamp UTC, IP y payload de cambios",
    verificationMethod: "Intento deliberado de modificar registros de auditoría y confirmación de excepción en BD."
  },
  {
    reqId: "RNF-11",
    reqName: "Privacidad y Habeas Data",
    type: "RNF",
    component: "Data Layer / Cifrado",
    systemModel: "Modelo ER",
    designDecision: "Cifrado en reposo AES-256 para columnas sensibles y aislamiento de datos personales",
    verificationMethod: "Inspección de almacenamiento crudo en disco verificando ininteligibilidad sin llave."
  },
  {
    reqId: "RNF-12",
    reqName: "Compatibilidad Multi-Navegador",
    type: "RNF",
    component: "Frontend SPA",
    systemModel: "Capa de Presentación",
    designDecision: "Transpilación moderna con Vite/PostCSS respetando estándares W3C y polyfills necesarios",
    verificationMethod: "Pruebas de regresión visual en Playwright sobre Chrome, Firefox, Safari (WebKit) y Edge."
  }
];

export const initialAISuggestions: AISuggestion[] = [
  {
    id: "SUG-01",
    promptTopic: "Selección de Arquitectura Base",
    suggestion: "Implementar una arquitectura de Microservicios distribuidos con Apache Kafka como Event Bus para cada entidad académica (Servicio de Estudiantes, Servicio de Notas, Servicio de Matrículas).",
    status: "Descartada",
    teamRationale: "Descartada por Gustavo Mercado y Ronald Gutierrez. Introducía una complejidad operativa desmedida, consistencia eventual inaceptable para cupos de matrícula y altos costos de infraestructura innecesarios para el volumen de 300 usuarios concurrentes."
  },
  {
    id: "SUG-02",
    promptTopic: "Patrón Arquitectónico Alternativo",
    suggestion: "Adoptar un Monolito Modular en Capas con límites de dominio (Bounded Contexts) bien definidos y base de datos relacional PostgreSQL con transacciones ACID nativas.",
    status: "Aceptada",
    teamRationale: "Aceptada en su totalidad. Resuelve la necesidad de consistencia inmediata en matrículas (RNF-07), garantiza baja latencia (RNF-02) y permite un mantenimiento simple y ordenado por el equipo institucional."
  },
  {
    id: "SUG-03",
    promptTopic: "Control de Concurrencia en Matrícula",
    suggestion: "Usar bloqueo optimista con columna de versión (version number) para validar cupos al momento de guardar.",
    status: "Modificada",
    teamRationale: "Modificada por el equipo. En alta concurrencia (1 cupo restante disputado por 50 alumnos simultáneos), el bloqueo optimista genera una tasa del 98% de reintentos fallidos y frustración. Se optó por bloqueo pesimista a nivel de fila (SELECT ... FOR UPDATE) con transacción ultracorta (< 50ms)."
  },
  {
    id: "SUG-04",
    promptTopic: "Estrategia de Auditoría",
    suggestion: "Guardar logs de auditoría únicamente en archivos planos rotativos del servidor (Logstash / Filebeat).",
    status: "Modificada",
    teamRationale: "Modificada. Se decidió almacenar la auditoría transaccional de manera inmutable en una tabla relacional de PostgreSQL con columnas JSONB para garantizar trazabilidad consultable en tiempo real desde la UI administrativa, reservando los logs de servidor para eventos técnicos de infraestructura."
  },
  {
    id: "SUG-05",
    promptTopic: "Almacenamiento de Contraseñas",
    suggestion: "Utilizar hashing con SHA-256 más una semilla fija (salt).",
    status: "Descartada",
    teamRationale: "Descartada por no cumplir estándares modernos de ciberseguridad. Se implementó Argon2id / bcrypt con factor de costo >= 12, resistente a ataques por fuerza bruta con GPUs y tablas rainbow (RNF-01)."
  }
];

export const initialAIEvidenceData = {
  initialPrompt: `Actúa como arquitecto de software senior para educación superior. Diseña la arquitectura técnica de un Sistema de Gestión Académica (SGA) que soporte estudiantes, docentes, programas, asignaturas, grupos, matrículas transaccionales y calificaciones. El sistema debe atender a 300 usuarios concurrentes con tiempos de respuesta menores a 3 segundos (P95), garantizar 99.5% de disponibilidad, estricta consistencia en cupos sin sobreventa, roles RBAC y trazabilidad forense. Compara microservicios vs monolito modular e indica cuál es el más conveniente con justificación técnica.`,
  aiResponseSummary: `La IA sugirió inicialmente un esquema híbrido y luego recomendó el Monolito Modular en Capas con PostgreSQL. Propuso separar los dominios en Bounded Contexts independientes en código (Auth, Estudiantes, Matrícula, Calificaciones, Auditoría), utilizar una base de datos relacional para preservar propiedades ACID, e implementar un control de acceso basado en roles (RBAC) con tokens JWT y Refresh Tokens en Redis. También planteó un modelo de datos con entidades normalizadas y diagramas de secuencia para los flujos críticos.`,
  teamAdjustments: `Gustavo Mercado Portela y Ronald Tomas Gutierrez Acuña refinaron la propuesta de la IA en los siguientes aspectos clave:
1. Se rechazó el uso de bloqueos optimistas para la matrícula, reemplazándolo por bloqueos pesimistas 'SELECT FOR UPDATE' que eliminan la fricción de reintentos masivos ante cupos escasos.
2. Se reestructuró el modelo de datos para separar explícitamente el 'Programa Académico' de las 'Asignaturas' mediante un catálogo curricular reutilizable.
3. Se blindó la bitácora de auditoría para que resida en una tabla relacional inmutable con datos JSONB ('antes' y 'después'), permitiendo su consulta y filtrado instantáneo desde el panel de control.
4. Se incorporó una réplica de lectura (Read Replica) en la arquitectura de despliegue para desviar los reportes pesados y proteger la disponibilidad del nodo transaccional primario.`
};

export const initialMediaLinks = {
  youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Link editable con demo funcional
  repositoryUrl: "https://github.com/gustavo-mercado/sga-arquitectura-dossier",
  demoNotes: "El video de sustentación detalla la justificación del monolito modular, la prueba de estrés de matrículas concurrentes y la demostración en vivo del módulo RBAC."
};

export const apaReferences = [
  {
    citation: "Bass, L., Clements, P., & Kazman, R. (2021). Software architecture in practice (4th ed.). Addison-Wesley Professional.",
    annotation: "Referencia fundamental para la definición de escenarios de atributos de calidad (rendimiento, seguridad, disponibilidad) y el diseño centrado en arquitectura táctica."
  },
  {
    citation: "Evans, E. (2003). Domain-driven design: Tackling complexity in the heart of software. Addison-Wesley Professional.",
    annotation: "Base conceptual para la delimitación de 'Bounded Contexts' y la separación de módulos dentro del monolito modular."
  },
  {
    citation: "Fowler, M. (2002). Patterns of enterprise application architecture. Addison-Wesley Professional.",
    annotation: "Justifica el uso de patrones de arquitectura empresarial, capas de servicio, repositorios de datos y el análisis de trade-offs frente a sistemas distribuidos."
  },
  {
    citation: "IEEE Computer Society. (2009). IEEE standard for information technology—Systems design—Software design descriptions (IEEE Std 1016-2009). IEEE.",
    annotation: "Estándar formal utilizado como guía metodológica para estructurar las vistas de diseño (casos de uso, componentes, despliegue, datos y secuencia)."
  },
  {
    citation: "International Organization for Standardization. (2023). Systems and software engineering — Systems and software Quality Requirements and Evaluation (SQuaRE) — Product quality model (ISO/IEC 25010:2023). ISO.",
    annotation: "Marco normativo internacional para la clasificación y especificación medible de los 12 requerimientos no funcionales (RNF)."
  },
  {
    citation: "Kleppmann, M. (2017). Designing data-intensive applications: The big ideas behind reliable, scalable, and maintainable systems. O'Reilly Media.",
    annotation: "Fundamentación técnica para el control de concurrencia, niveles de aislamiento transaccional (ACID), bloqueos pesimistas vs optimistas y persistencia en PostgreSQL."
  },
  {
    citation: "Martin, R. C. (2018). Clean architecture: A craftsman's guide to software structure and design. Prentice Hall.",
    annotation: "Guía de diseño para la separación de dependencias en capas concéntricas, desacoplando la lógica de negocio de los frameworks y la base de datos."
  },
  {
    citation: "OWASP Foundation. (2021). OWASP Top 10:2021 - The ten most critical web application security risks. Open Web Application Security Project.",
    annotation: "Directrices de ciberseguridad aplicadas en el diseño arquitectónico para mitigar inyecciones, fallas criptográficas y pérdida de control de acceso (A01, A02, A03)."
  },
  {
    citation: "Sommerville, I. (2016). Software engineering (10th ed.). Pearson.",
    annotation: "Texto clásico de ingeniería de software empleado para la especificación formal de requerimientos funcionales y matrices de trazabilidad."
  }
];
