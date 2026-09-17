import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserAccount,
  Appointment,
  SessionRecord,
  TreatmentPlan,
  ReminderPreferences,
} from '../types';

interface AuthContextType {
  currentUser: UserAccount | null;
  isAuthenticated: boolean;
  isDemoMode: boolean;
  toggleDemoMode: (enabled?: boolean) => void;
  login: (emailOrPhone: string, passwordHash: string, remember: boolean) => Promise<{ success: boolean; error?: string }>;
  signUp: (userData: {
    fullName: string;
    email: string;
    phone: string;
    passwordHash: string;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<UserAccount>) => void;
  updateReminderPreferences: (prefs: Partial<ReminderPreferences>) => void;
  appointments: Appointment[];
  sessions: SessionRecord[];
  treatmentPlans: TreatmentPlan[];
  addAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt'>) => void;
  cancelAppointment: (id: string) => void;
}

const DEFAULT_REMINDERS: ReminderPreferences = {
  whatsapp: true,
  sms: true,
  email: false,
  timing: '24-hour',
  consentGiven: true,
};

// Clearly labeled sample clinical data for demonstration preview mode ONLY
const DEMO_USER: UserAccount = {
  id: 'demo-patient-001',
  fullName: 'Rahul Krishnan',
  email: 'rahul.k@example.com',
  phone: '+91 98470 12345',
  createdAt: '2026-08-10T10:00:00Z',
  reminderPreferences: {
    whatsapp: true,
    sms: true,
    email: true,
    timing: '24-hour',
    consentGiven: true,
  },
  isDemo: true,
};

const DEMO_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-01',
    bookingRef: 'FRL-2026-4921',
    patientName: 'Rahul Krishnan',
    phone: '+91 98470 12345',
    email: 'rahul.k@example.com',
    preferredDate: '2026-09-24',
    preferredTime: '10:30 AM',
    serviceId: 'musculoskeletal',
    serviceName: 'Musculoskeletal Physiotherapy',
    patientType: 'Existing Patient',
    concern: 'Follow-up for lower back stiffness after prolonged desk work',
    status: 'Confirmed',
    createdAt: '2026-09-15T09:00:00Z',
  },
  {
    id: 'apt-02',
    bookingRef: 'FRL-2026-5830',
    patientName: 'Rahul Krishnan',
    phone: '+91 98470 12345',
    email: 'rahul.k@example.com',
    preferredDate: '2026-10-02',
    preferredTime: '04:00 PM',
    serviceId: 'strength-conditioning',
    serviceName: 'Strength & Conditioning',
    patientType: 'Existing Patient',
    concern: 'Core progression review',
    status: 'Requested',
    createdAt: '2026-09-17T08:30:00Z',
  },
];

const DEMO_SESSIONS: SessionRecord[] = [
  {
    id: 'ses-01',
    date: '2026-09-10',
    serviceName: 'Musculoskeletal Initial Assessment',
    status: 'Completed',
    notes: 'Completed baseline spinal range of motion evaluation and lumbar stabilization exercise orientation.',
  },
  {
    id: 'ses-02',
    date: '2026-09-03',
    serviceName: 'Exercise Rehabilitation & Posture Review',
    status: 'Completed',
    notes: 'Progressed posterior chain glute bridging and thoracic rotation mechanics.',
  },
];

const DEMO_PLANS: TreatmentPlan[] = [
  {
    id: 'plan-01',
    title: 'Lumbar Spine Stability & Postural Re-Education',
    startDate: '2026-09-03',
    targetGoal: 'Pain-free 45-minute seated endurance and restoring full lumbar flexion symmetry.',
    status: 'Active',
    progressPercent: 65,
    therapistInstructions: [
      'Perform prescribed McKenzie extensions 3 times daily (10 repetitions each).',
      'Maintain neutral pelvic posture during seated work; take dynamic standing breaks every 35 minutes.',
      'Refrain from heavy bilateral deadlifts until week 4 progression is cleared.',
      'Apply 15-minute cold compress if localized discomfort occurs post-stretching.',
    ],
    exercises: [
      { name: 'Bird-Dog Core Hold', reps: '3 sets x 8 reps (5s hold)', frequency: 'Daily' },
      { name: 'Prone Cobra Thoracic Extension', reps: '3 sets x 10 reps', frequency: 'Daily' },
      { name: 'Cat-Camel Spinal Mobilization', reps: '2 sets x 12 reps', frequency: 'Morning & Evening' },
      { name: 'Supported Hip Flexor Stretch', reps: '30s hold per side x 3', frequency: 'Twice Daily' },
    ],
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [sessions, setSessions] = useState<SessionRecord[]>([]);
  const [treatmentPlans, setTreatmentPlans] = useState<TreatmentPlan[]>([]);

  // Load persistent auth & data on boot
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('frl_auth_user');
      const storedDemo = localStorage.getItem('frl_demo_mode') === 'true';

      if (storedUser) {
        const parsedUser: UserAccount = JSON.parse(storedUser);
        setCurrentUser(parsedUser);

        // Load user's real saved records
        const savedApts = localStorage.getItem(`frl_apts_${parsedUser.id}`);
        if (savedApts) {
          setAppointments(JSON.parse(savedApts));
        }
        const savedSessions = localStorage.getItem(`frl_sessions_${parsedUser.id}`);
        if (savedSessions) {
          setSessions(JSON.parse(savedSessions));
        }
        const savedPlans = localStorage.getItem(`frl_plans_${parsedUser.id}`);
        if (savedPlans) {
          setTreatmentPlans(JSON.parse(savedPlans));
        }
      } else if (storedDemo) {
        // If demo mode was left enabled
        enableDemo();
      }
    } catch (e) {
      console.error('Error hydrating auth state:', e);
    }
  }, []);

  const enableDemo = () => {
    setIsDemoMode(true);
    setCurrentUser(DEMO_USER);
    setAppointments(DEMO_APPOINTMENTS);
    setSessions(DEMO_SESSIONS);
    setTreatmentPlans(DEMO_PLANS);
    localStorage.setItem('frl_demo_mode', 'true');
  };

  const disableDemo = () => {
    setIsDemoMode(false);
    localStorage.removeItem('frl_demo_mode');
    // Check if there was a real authenticated user
    const storedUser = localStorage.getItem('frl_auth_user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setCurrentUser(parsedUser);
      const savedApts = localStorage.getItem(`frl_apts_${parsedUser.id}`);
      setAppointments(savedApts ? JSON.parse(savedApts) : []);
      const savedSessions = localStorage.getItem(`frl_sessions_${parsedUser.id}`);
      setSessions(savedSessions ? JSON.parse(savedSessions) : []);
      const savedPlans = localStorage.getItem(`frl_plans_${parsedUser.id}`);
      setTreatmentPlans(savedPlans ? JSON.parse(savedPlans) : []);
    } else {
      setCurrentUser(null);
      setAppointments([]);
      setSessions([]);
      setTreatmentPlans([]);
    }
  };

  const toggleDemoMode = (enabled?: boolean) => {
    const shouldEnable = enabled !== undefined ? enabled : !isDemoMode;
    if (shouldEnable) {
      enableDemo();
    } else {
      disableDemo();
    }
  };

  const login = async (
    emailOrPhone: string,
    passwordHash: string,
    remember: boolean
  ): Promise<{ success: boolean; error?: string }> => {
    // Artificial small delay for realistic UX state
    await new Promise((resolve) => setTimeout(resolve, 600));

    const cleanInput = emailOrPhone.trim().toLowerCase();

    // Check if matching registered user exists in local database
    const usersDbStr = localStorage.getItem('frl_registered_users');
    const usersDb = usersDbStr ? JSON.parse(usersDbStr) : [];

    const found = usersDb.find(
      (u: any) =>
        (u.email.toLowerCase() === cleanInput || u.phone.replace(/\D/g, '') === cleanInput.replace(/\D/g, '')) &&
        u.passwordHash === passwordHash
    );

    if (found) {
      const userObj: UserAccount = {
        id: found.id,
        fullName: found.fullName,
        email: found.email,
        phone: found.phone,
        createdAt: found.createdAt,
        reminderPreferences: found.reminderPreferences || DEFAULT_REMINDERS,
        isDemo: false,
      };

      setCurrentUser(userObj);
      setIsDemoMode(false);
      localStorage.removeItem('frl_demo_mode');

      if (remember) {
        localStorage.setItem('frl_auth_user', JSON.stringify(userObj));
      } else {
        sessionStorage.setItem('frl_auth_user', JSON.stringify(userObj));
      }

      // Load user appointments
      const savedApts = localStorage.getItem(`frl_apts_${userObj.id}`);
      setAppointments(savedApts ? JSON.parse(savedApts) : []);
      const savedSessions = localStorage.getItem(`frl_sessions_${userObj.id}`);
      setSessions(savedSessions ? JSON.parse(savedSessions) : []);
      const savedPlans = localStorage.getItem(`frl_plans_${userObj.id}`);
      setTreatmentPlans(savedPlans ? JSON.parse(savedPlans) : []);

      return { success: true };
    }

    // Demo fallback shortcut for easy testing
    if (cleanInput === 'rahul.k@example.com' || cleanInput === 'demo@rehablab.com') {
      enableDemo();
      return { success: true };
    }

    return {
      success: false,
      error: 'Invalid credentials. Please verify your email/phone and password, or create a new account.',
    };
  };

  const signUp = async (userData: {
    fullName: string;
    email: string;
    phone: string;
    passwordHash: string;
  }): Promise<{ success: boolean; error?: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 700));

    const usersDbStr = localStorage.getItem('frl_registered_users');
    const usersDb = usersDbStr ? JSON.parse(usersDbStr) : [];

    // Verify duplicate email
    if (usersDb.some((u: any) => u.email.toLowerCase() === userData.email.trim().toLowerCase())) {
      return { success: false, error: 'An account with this email address already exists. Please log in.' };
    }

    const newUser = {
      id: `frl-usr-${Date.now()}`,
      fullName: userData.fullName.trim(),
      email: userData.email.trim().toLowerCase(),
      phone: userData.phone.trim(),
      passwordHash: userData.passwordHash,
      createdAt: new Date().toISOString(),
      reminderPreferences: DEFAULT_REMINDERS,
    };

    usersDb.push(newUser);
    localStorage.setItem('frl_registered_users', JSON.stringify(usersDb));

    const userAccount: UserAccount = {
      id: newUser.id,
      fullName: newUser.fullName,
      email: newUser.email,
      phone: newUser.phone,
      createdAt: newUser.createdAt,
      reminderPreferences: DEFAULT_REMINDERS,
      isDemo: false,
    };

    setCurrentUser(userAccount);
    setIsDemoMode(false);
    localStorage.removeItem('frl_demo_mode');
    localStorage.setItem('frl_auth_user', JSON.stringify(userAccount));

    // Fresh user has genuine empty records
    setAppointments([]);
    setSessions([]);
    setTreatmentPlans([]);

    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    setIsDemoMode(false);
    localStorage.removeItem('frl_auth_user');
    sessionStorage.removeItem('frl_auth_user');
    localStorage.removeItem('frl_demo_mode');
    setAppointments([]);
    setSessions([]);
    setTreatmentPlans([]);
  };

  const updateProfile = (data: Partial<UserAccount>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...data };
    setCurrentUser(updated);
    if (!isDemoMode) {
      localStorage.setItem('frl_auth_user', JSON.stringify(updated));
    }
  };

  const updateReminderPreferences = (prefs: Partial<ReminderPreferences>) => {
    if (!currentUser) return;
    const updated = {
      ...currentUser,
      reminderPreferences: {
        ...currentUser.reminderPreferences,
        ...prefs,
      },
    };
    setCurrentUser(updated);
    if (!isDemoMode) {
      localStorage.setItem('frl_auth_user', JSON.stringify(updated));
    }
  };

  const addAppointment = (appointment: Omit<Appointment, 'id' | 'createdAt'>) => {
    const newApt: Appointment = {
      ...appointment,
      id: `apt-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    const updated = [newApt, ...appointments];
    setAppointments(updated);

    if (currentUser && !isDemoMode) {
      localStorage.setItem(`frl_apts_${currentUser.id}`, JSON.stringify(updated));
    }
  };

  const cancelAppointment = (id: string) => {
    const updated = appointments.map((apt) =>
      apt.id === id ? { ...apt, status: 'Cancelled' as const } : apt
    );
    setAppointments(updated);

    if (currentUser && !isDemoMode) {
      localStorage.setItem(`frl_apts_${currentUser.id}`, JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        isDemoMode,
        toggleDemoMode,
        login,
        signUp,
        logout,
        updateProfile,
        updateReminderPreferences,
        appointments,
        sessions,
        treatmentPlans,
        addAppointment,
        cancelAppointment,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
