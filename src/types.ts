export type PatientType = 'New Patient' | 'Existing Patient';

export type AppointmentStatus = 'Requested' | 'Confirmed' | 'Completed' | 'Cancelled';

export type SessionStatus = 'Completed' | 'Follow-up Recommended';

export type PlanStatus = 'Active' | 'Under Review' | 'Completed';

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  suitableFor: string[];
  iconName: string;
}

export interface Appointment {
  id: string;
  bookingRef: string;
  patientName: string;
  phone: string;
  email?: string;
  preferredDate: string;
  preferredTime: string;
  serviceId: string;
  serviceName: string;
  patientType: PatientType;
  concern?: string;
  status: AppointmentStatus;
  createdAt: string;
}

export interface SessionRecord {
  id: string;
  date: string;
  serviceName: string;
  status: SessionStatus;
  notes?: string;
  therapist?: string;
}

export interface ExerciseItem {
  name: string;
  reps: string;
  frequency: string;
}

export interface TreatmentPlan {
  id: string;
  title: string;
  startDate: string;
  targetGoal: string;
  status: PlanStatus;
  progressPercent?: number;
  therapistInstructions: string[];
  exercises?: ExerciseItem[];
}

export interface ReminderPreferences {
  whatsapp: boolean;
  sms: boolean;
  email: boolean;
  timing: '24-hour' | 'Same-day';
  consentGiven: boolean;
}

export interface UserAccount {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  createdAt: string;
  reminderPreferences: ReminderPreferences;
  isDemo?: boolean;
}
