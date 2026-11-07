import { RoleType, UserAccount, AuditLogEntry } from '../types';

export interface AcademicProgram {
  id: string;
  code: string;
  name: string;
  faculty: string;
  totalCredits: number;
  durationSemesters: number;
  degreeTitle: string;
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  programId: string;
  credits: number;
  semester: number;
  prerequisites: string[]; // Subject codes
  description: string;
}

export interface AcademicPeriod {
  id: string;
  code: string; // e.g. "2027-1"
  name: string;
  startDate: string;
  endDate: string;
  status: 'ACTIVO' | 'CERRADO' | 'PLANIFICACION';
  enrollmentActive: boolean;
  gradesEntryActive: boolean;
}

export interface AcademicGroup {
  id: string;
  code: string; // e.g. "ARQ-G1"
  subjectId: string;
  subjectCode: string;
  subjectName: string;
  periodId: string;
  teacherId: string;
  teacherName: string;
  classroom: string;
  schedule: string; // e.g. "Martes y Jueves 18:00 - 20:00"
  maxCapacity: number;
  occupiedCapacity: number;
}

export interface StudentProfile {
  id: string;
  userId: string;
  code: string; // EST-9934
  name: string;
  documentId: string;
  email: string;
  phone: string;
  programId: string;
  programName: string;
  currentSemester: number;
  academicStatus: 'REGULAR ACTIVO' | 'CONDICIONAL' | 'GRADUADO' | 'SUSPENDIDO';
  cumulativeGpa: number;
  creditsApproved: number;
}

export interface TeacherProfile {
  id: string;
  userId: string;
  code: string; // DOC-2088
  name: string;
  documentId: string;
  email: string;
  phone: string;
  department: string;
  degreeTitle: string;
  contractType: 'TIEMPO COMPLETO' | 'MEDIO TIEMPO' | 'CÁTEDRA';
  assignedGroupsCount: number;
}

export interface EnrollmentRecord {
  id: string;
  studentId: string;
  studentName: string;
  groupId: string;
  subjectCode: string;
  subjectName: string;
  credits: number;
  periodId: string;
  enrolledAt: string;
  status: 'MATRICULADA' | 'CANCELADA';
  corte1?: number; // 30%
  corte2?: number; // 35%
  corte3?: number; // 35%
  finalGrade?: number; // Weighted 0.0 - 5.0
  gradeStatus?: 'EN_CURSO' | 'APROBADA' | 'REPROBADA';
}

// Initial Programs
export const seedPrograms: AcademicProgram[] = [
  {
    id: "prog-01",
    code: "ING-SIS",
    name: "Ingeniería de Sistemas y Computación",
    faculty: "Facultad de Ingeniería y Ciencias Aplicadas",
    totalCredits: 160,
    durationSemesters: 10,
    degreeTitle: "Ingeniero de Sistemas"
  },
  {
    id: "prog-02",
    code: "ADM-EMP",
    name: "Administración de Empresas",
    faculty: "Facultad de Ciencias Económicas y Administrativas",
    totalCredits: 145,
    durationSemesters: 9,
    degreeTitle: "Administrador de Empresas"
  },
  {
    id: "prog-03",
    code: "ING-IND",
    name: "Ingeniería Industrial",
    faculty: "Facultad de Ingeniería y Ciencias Aplicadas",
    totalCredits: 155,
    durationSemesters: 10,
    degreeTitle: "Ingeniero Industrial"
  }
];

// Initial Subjects
export const seedSubjects: Subject[] = [
  {
    id: "sub-01",
    code: "ARQ-301",
    name: "Arquitectura de Software y Sistemas Distribuidos",
    programId: "prog-01",
    credits: 4,
    semester: 7,
    prerequisites: ["SIS-204"],
    description: "Patrones de diseño de arquitectura, monolitos modulares, microservicios, consistencia ACID y atributos de calidad ISO 25010."
  },
  {
    id: "sub-02",
    code: "BD-202",
    name: "Bases de Datos Relacionales y Concurrencia",
    programId: "prog-01",
    credits: 3,
    semester: 4,
    prerequisites: ["SIS-101"],
    description: "Modelado relacional, normalización 3FN, niveles de aislamiento ACID y transacciones en PostgreSQL."
  },
  {
    id: "sub-03",
    code: "SEG-401",
    name: "Seguridad Informática y Criptografía Aplicada",
    programId: "prog-01",
    credits: 3,
    semester: 8,
    prerequisites: ["RED-301"],
    description: "Autenticación JWT, protocolos TLS 1.3, hashing seguro con Argon2id, mitigación OWASP Top 10 y auditoría forense."
  },
  {
    id: "sub-04",
    code: "RED-301",
    name: "Redes de Computadores y Protocolos",
    programId: "prog-01",
    credits: 3,
    semester: 6,
    prerequisites: ["SIS-101"],
    description: "Modelo OSI, TCP/IP, arquitecturas cliente-servidor y balanceo de carga en alta disponibilidad."
  },
  {
    id: "sub-05",
    code: "ING-REQ",
    name: "Ingeniería de Requerimientos y Modelado UML",
    programId: "prog-01",
    credits: 3,
    semester: 5,
    prerequisites: ["SIS-101"],
    description: "Especificación formal de requisitos funcionales y no funcionales, casos de uso y matrices de trazabilidad."
  },
  {
    id: "sub-06",
    code: "PROG-WEB",
    name: "Desarrollo Web Moderno y Cloud Native",
    programId: "prog-01",
    credits: 4,
    semester: 6,
    prerequisites: ["BD-202"],
    description: "Desarrollo de SPAs con React, Tailwind CSS, TypeScript, APIs RESTful y orquestación con Docker."
  }
];

// Initial Period
export const seedPeriods: AcademicPeriod[] = [
  {
    id: "per-01",
    code: "2027-1",
    name: "Periodo Académico 2027 - Primer Semestre",
    startDate: "2027-02-01",
    endDate: "2027-06-20",
    status: "ACTIVO",
    enrollmentActive: true,
    gradesEntryActive: true
  },
  {
    id: "per-02",
    code: "2026-2",
    name: "Periodo Académico 2026 - Segundo Semestre",
    startDate: "2026-08-01",
    endDate: "2026-12-15",
    status: "CERRADO",
    enrollmentActive: false,
    gradesEntryActive: false
  }
];

// Initial Groups
export const seedGroups: AcademicGroup[] = [
  {
    id: "grp-01",
    code: "ARQ-301-G1",
    subjectId: "sub-01",
    subjectCode: "ARQ-301",
    subjectName: "Arquitectura de Software y Sistemas Distribuidos",
    periodId: "per-01",
    teacherId: "tch-01",
    teacherName: "Prof. Carlos Mendoza Vega",
    classroom: "Laboratorio Especializado 402",
    schedule: "Martes y Jueves 18:00 - 20:00",
    maxCapacity: 30,
    occupiedCapacity: 28 // 2 cupos restantes disponibles para simular matrícula con cupos escasos!
  },
  {
    id: "grp-02",
    code: "ARQ-301-G2",
    subjectId: "sub-01",
    subjectCode: "ARQ-301",
    subjectName: "Arquitectura de Software y Sistemas Distribuidos",
    periodId: "per-01",
    teacherId: "tch-02",
    teacherName: "Ing. Ronald Tomas Gutierrez Acuña",
    classroom: "Aula Magistral 205",
    schedule: "Sábados 08:00 - 12:00",
    maxCapacity: 35,
    occupiedCapacity: 35 // LLENO (0 cupos) para probar rechazo de sobrecupo!
  },
  {
    id: "grp-03",
    code: "BD-202-G1",
    subjectId: "sub-02",
    subjectCode: "BD-202",
    subjectName: "Bases de Datos Relacionales y Concurrencia",
    periodId: "per-01",
    teacherId: "tch-01",
    teacherName: "Prof. Carlos Mendoza Vega",
    classroom: "Laboratorio de Cómputo 301",
    schedule: "Lunes y Miércoles 16:00 - 18:00",
    maxCapacity: 25,
    occupiedCapacity: 19
  },
  {
    id: "grp-04",
    code: "SEG-401-G1",
    subjectId: "sub-03",
    subjectCode: "SEG-401",
    subjectName: "Seguridad Informática y Criptografía Aplicada",
    periodId: "per-01",
    teacherId: "tch-03",
    teacherName: "Ing. Gustavo Mercado Portela",
    classroom: "Auditorio de Seguridad TI",
    schedule: "Viernes 18:00 - 22:00",
    maxCapacity: 40,
    occupiedCapacity: 31
  },
  {
    id: "grp-05",
    code: "PROG-WEB-G1",
    subjectId: "sub-06",
    subjectCode: "PROG-WEB",
    subjectName: "Desarrollo Web Moderno y Cloud Native",
    periodId: "per-01",
    teacherId: "tch-01",
    teacherName: "Prof. Carlos Mendoza Vega",
    classroom: "Laboratorio Virtual 102",
    schedule: "Miércoles y Viernes 07:00 - 09:00",
    maxCapacity: 30,
    occupiedCapacity: 22
  }
];

// Initial Teachers
export const seedTeachers: TeacherProfile[] = [
  {
    id: "tch-01",
    userId: "usr-04",
    code: "DOC-2088",
    name: "Prof. Carlos Mendoza Vega",
    documentId: "1098452319",
    email: "carlos.mendoza@sga-universidad.edu.co",
    phone: "+57 311 459 2810",
    department: "Departamento de Ciencias de la Computación",
    degreeTitle: "Magíster en Ingeniería de Software",
    contractType: "TIEMPO COMPLETO",
    assignedGroupsCount: 3
  },
  {
    id: "tch-02",
    userId: "usr-02",
    code: "DOC-7012",
    name: "Ronald Tomas Gutierrez Acuña",
    documentId: "1045892301",
    email: "ronald.gutierrez@cun.edu.co",
    phone: "+57 300 892 4112",
    department: "Infraestructura & Arquitectura de Datos",
    degreeTitle: "Especialista en Bases de Datos y Cloud Computing",
    contractType: "TIEMPO COMPLETO",
    assignedGroupsCount: 1
  },
  {
    id: "tch-03",
    userId: "usr-01",
    code: "DOC-7011",
    name: "Gustavo Mercado Portela",
    documentId: "1072938450",
    email: "gustavo.mercadop@cun.edu.co",
    phone: "+57 320 618 9034",
    department: "Seguridad de la Información & Redes",
    degreeTitle: "Magíster en Ciberseguridad y Telecomunicaciones",
    contractType: "TIEMPO COMPLETO",
    assignedGroupsCount: 1
  }
];

// Initial Students
export const seedStudents: StudentProfile[] = [
  {
    id: "est-01",
    userId: "usr-05",
    code: "EST-9934",
    name: "Mariana Silva Paredes",
    documentId: "1024567890",
    email: "mariana.silva@estudiantes.sga.edu.co",
    phone: "+57 315 789 4521",
    programId: "prog-01",
    programName: "Ingeniería de Sistemas y Computación",
    currentSemester: 7,
    academicStatus: "REGULAR ACTIVO",
    cumulativeGpa: 4.42,
    creditsApproved: 118
  },
  {
    id: "est-02",
    userId: "usr-06",
    code: "EST-9935",
    name: "Alejandro Gómez Restrepo",
    documentId: "1032489123",
    email: "alejandro.gomez@estudiantes.sga.edu.co",
    phone: "+57 301 234 5678",
    programId: "prog-01",
    programName: "Ingeniería de Sistemas y Computación",
    currentSemester: 7,
    academicStatus: "REGULAR ACTIVO",
    cumulativeGpa: 3.95,
    creditsApproved: 114
  },
  {
    id: "est-03",
    userId: "usr-07",
    code: "EST-9936",
    name: "Valentina Ortiz Londoño",
    documentId: "1019874563",
    email: "valentina.ortiz@estudiantes.sga.edu.co",
    phone: "+57 312 876 5432",
    programId: "prog-01",
    programName: "Ingeniería de Sistemas y Computación",
    currentSemester: 7,
    academicStatus: "REGULAR ACTIVO",
    cumulativeGpa: 4.68,
    creditsApproved: 122
  },
  {
    id: "est-04",
    userId: "usr-08",
    code: "EST-9937",
    name: "Camilo Andrés Torres",
    documentId: "1048751290",
    email: "camilo.torres@estudiantes.sga.edu.co",
    phone: "+57 318 901 2345",
    programId: "prog-01",
    programName: "Ingeniería de Sistemas y Computación",
    currentSemester: 7,
    academicStatus: "CONDICIONAL",
    cumulativeGpa: 3.15,
    creditsApproved: 98
  }
];

// Initial Enrollments and Grades
export const seedEnrollments: EnrollmentRecord[] = [
  {
    id: "mat-01",
    studentId: "est-01",
    studentName: "Mariana Silva Paredes",
    groupId: "grp-01",
    subjectCode: "ARQ-301",
    subjectName: "Arquitectura de Software y Sistemas Distribuidos",
    credits: 4,
    periodId: "per-01",
    enrolledAt: "2027-01-18 10:24:00",
    status: "MATRICULADA",
    corte1: 4.5,
    corte2: 4.2,
    corte3: 4.8,
    finalGrade: 4.50,
    gradeStatus: "APROBADA"
  },
  {
    id: "mat-02",
    studentId: "est-01",
    studentName: "Mariana Silva Paredes",
    groupId: "grp-03",
    subjectCode: "BD-202",
    subjectName: "Bases de Datos Relacionales y Concurrencia",
    credits: 3,
    periodId: "per-01",
    enrolledAt: "2027-01-18 10:25:30",
    status: "MATRICULADA",
    corte1: 4.0,
    corte2: 3.8,
    corte3: 4.3,
    finalGrade: 4.04,
    gradeStatus: "APROBADA"
  },
  {
    id: "mat-03",
    studentId: "est-02",
    studentName: "Alejandro Gómez Restrepo",
    groupId: "grp-01",
    subjectCode: "ARQ-301",
    subjectName: "Arquitectura de Software y Sistemas Distribuidos",
    credits: 4,
    periodId: "per-01",
    enrolledAt: "2027-01-18 11:15:10",
    status: "MATRICULADA",
    corte1: 3.5,
    corte2: 3.8,
    corte3: 4.0,
    finalGrade: 3.78,
    gradeStatus: "APROBADA"
  },
  {
    id: "mat-04",
    studentId: "est-03",
    studentName: "Valentina Ortiz Londoño",
    groupId: "grp-01",
    subjectCode: "ARQ-301",
    subjectName: "Arquitectura de Software y Sistemas Distribuidos",
    credits: 4,
    periodId: "per-01",
    enrolledAt: "2027-01-18 09:05:40",
    status: "MATRICULADA",
    corte1: 4.8,
    corte2: 5.0,
    corte3: 4.7,
    finalGrade: 4.84,
    gradeStatus: "APROBADA"
  },
  {
    id: "mat-05",
    studentId: "est-04",
    studentName: "Camilo Andrés Torres",
    groupId: "grp-01",
    subjectCode: "ARQ-301",
    subjectName: "Arquitectura de Software y Sistemas Distribuidos",
    credits: 4,
    periodId: "per-01",
    enrolledAt: "2027-01-18 14:22:15",
    status: "MATRICULADA",
    corte1: 2.8,
    corte2: 3.0,
    corte3: 2.5,
    finalGrade: 2.77,
    gradeStatus: "REPROBADA"
  }
];
