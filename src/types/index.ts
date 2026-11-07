export type RoleType = 'ADMINISTRADOR' | 'COORDINADOR' | 'DOCENTE' | 'ESTUDIANTE';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: RoleType;
  department?: string;
  code: string;
  active: boolean;
  avatarInitials: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  user: string;
  role: RoleType;
  action: string;
  affectedRecord: string;
  ipAddress: string;
  status: 'EXITOSO' | 'DENEGADO' | 'ADVERTENCIA';
  details?: string;
}

export interface FunctionalRequirement {
  id: string; // RF-01 to RF-12
  name: string;
  module: string;
  description: string;
  priority: 'CRÍTICA' | 'ALTA' | 'MEDIA';
  actors: string[];
  verificationCriteria: string;
}

export interface NonFunctionalRequirement {
  id: string; // RNF-01 to RNF-12
  name: string;
  category: 'Seguridad' | 'Rendimiento' | 'Disponibilidad' | 'Escalabilidad' | 'Mantenibilidad' | 'Usabilidad' | 'Integridad' | 'Interoperabilidad' | 'Respaldo' | 'Trazabilidad' | 'Privacidad' | 'Compatibilidad';
  description: string;
  metric: string;
  targetValue: string;
  priority: 'CRÍTICA' | 'ALTA' | 'MEDIA';
}

export interface ArchitectureComparisonItem {
  criterion: string;
  modularMonolith: string;
  microservices: string;
  pureLayered: string;
  winner: 'Monolito Modular' | 'Microservicios' | 'Capas Tradicionales';
  justification: string;
}

export interface ADR {
  id: string;
  title: string;
  status: 'Aceptado' | 'Propuesto' | 'En Revisión';
  date: string;
  context: string;
  decision: string;
  consequencesPositive: string[];
  consequencesNegative: string[];
  mitigations: string[];
}

export interface RiskAnalysisItem {
  id: string;
  category: 'SPOF' | 'Seguridad' | 'Escalabilidad';
  risk: string;
  impact: 'Crítico' | 'Alto' | 'Medio';
  likelihood: 'Alta' | 'Media' | 'Baja';
  mitigationStrategy: string;
  contingencyPlan: string;
}

export interface AISuggestion {
  id: string;
  promptTopic: string;
  suggestion: string;
  status: 'Aceptada' | 'Modificada' | 'Descartada';
  teamRationale: string;
}

export interface TraceabilityItem {
  reqId: string;
  reqName: string;
  type: 'RF' | 'RNF';
  component: string;
  systemModel: string;
  designDecision: string;
  verificationMethod: string;
}
