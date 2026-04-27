
export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  specialty?: string;
  tier?: string;
  joined: string;
  status: 'Active' | 'Paused' | 'Inactivated';
  sessions: number;
}

export type Page = 'home' | 'dashboard' | 'history' | 'wizard' | 'pricing' | 'profile' | 'admin' | 'help' | 'privacy' | 'terms' | 'contact' | 'auth' | 'generate';
export type BundleType = 'Nurse Boundaries Builder' | 'Nurse No More Pleaser' | 'Toxic Unit Shield';

export interface Script {
  text: string;
  why: string;
  worked?: boolean;
}

export interface MetricBreakdown {
  label: string;
  value: string | number;
  info: string;
}

export interface PleaserPhase {
  level: number;
  title: string;
  mindsetShift: string;
  experiment: string;
  completed: boolean;
}

export interface BoundaryPlan {
  id: string;
  issue: string;
  bundle: BundleType;
  timestamp: number;
  strategy: string;
  scripts: Script[];
  objections: { 
    objection: string; 
    objectionExplanation: string;
    rebuttal: string; 
    rebuttalExplanation: string;
  }[];
  psychologicalInsight: string;
  personalStory: string;
  context?: string;
  isSaved?: boolean;
  premiumInsights?: string[];
  clinicalRationale?: string;
  longTermImpact?: string;
  // Pleaser specific
  currentPhase?: number;
  guiltScore?: number;
  resilienceScore?: number;
}

export interface UserStats {
  sessionsCompleted: number;
  burnoutRisk: 'Low' | 'Moderate' | 'High';
  burnoutBreakdown: MetricBreakdown[];
  boundaryScore: number;
  resilienceBreakdown: MetricBreakdown[];
  recentTrends: { day: string; score: number }[];
  performanceMetrics: MetricBreakdown[];
  // Robust Pleaser Metrics
  freedomScore: number;
  assertiveStreak: number;
  resentmentHeatmap: { [key: string]: number }; // day: intensity 1-10
  incidentDelta: number; // percentage reduction
  freedomGain: number; // percentage increase this week
  transformationSummary: string;
  reclaimedHours: number;
  clinicalInsight: string;
  milestoneTitle: string;
}

export enum BoundaryIssue {
  OVERTIME = "Mandatory Overtime & Extra Shifts",
  SCOPE_CREEP = "Non-Nursing Tasks (Scope Creep)",
  DIFFICULT_PATIENTS = "Aggressive or Demanding Patients",
  INTERPROFESSIONAL = "Disrespect from Physicians/Management",
  EMOTIONAL_LABOR = "Emotional Overload from Families",
  WORK_LIFE = "Calls/Texts During Off-Hours",
  PEER_PRESSURE = "Coworker Guilt-Tripping",
  CHARTING = "Unpaid Charting After Shift"
}
