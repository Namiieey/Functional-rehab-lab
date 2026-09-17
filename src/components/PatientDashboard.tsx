import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Activity,
  CheckCircle2,
  AlertCircle,
  Clock3,
  XCircle,
  FileText,
  Bell,
  User,
  Shield,
  Phone,
  Mail,
  Plus,
  RefreshCw,
  Info,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { CLINIC_INFO } from '../utils/whatsapp';

interface PatientDashboardProps {
  onNavigateToBook: () => void;
  onOpenAuth: (mode?: 'login' | 'signup') => void;
}

export const PatientDashboard: React.FC<PatientDashboardProps> = ({
  onNavigateToBook,
  onOpenAuth,
}) => {
  const {
    currentUser,
    isAuthenticated,
    isDemoMode,
    toggleDemoMode,
    appointments,
    sessions,
    treatmentPlans,
    cancelAppointment,
    updateProfile,
    updateReminderPreferences,
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'appointments' | 'sessions' | 'treatment' | 'reminders' | 'profile'>('appointments');

  // Edit profile modal or inline state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');

  if (!isAuthenticated || !currentUser) {
    return (
      <section id="dashboard" className="py-16 sm:py-20 bg-[#fafbfc] border-t border-gray-100 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="rounded-3xl bg-white p-8 sm:p-12 text-center border border-gray-200/80 shadow-xs space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mx-auto">
              <Shield className="w-8 h-8" />
            </div>
            <div className="max-w-md mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Patient Portal Access
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Log in to securely review your upcoming appointments, rehabilitation treatment plans, session notes, and communication preferences.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => onOpenAuth('login')}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-primary text-white font-bold text-sm hover:bg-brand-hover transition shadow-xs"
              >
                Sign In to Patient Portal
              </button>
              <button
                onClick={() => onOpenAuth('signup')}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-gray-800 font-bold text-sm border border-gray-200 hover:bg-gray-50 transition"
              >
                Create Account
              </button>
            </div>

            <div className="pt-6 border-t border-gray-100 flex items-center justify-center">
              <button
                onClick={() => toggleDemoMode(true)}
                className="inline-flex items-center gap-2 text-xs font-semibold text-brand-primary hover:underline"
              >
                <Sparkles className="w-4 h-4 text-brand-primary" />
                <span>Or explore Demo Patient Mode (Sample records)</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const handleStartEditProfile = () => {
    setEditName(currentUser.fullName);
    setEditPhone(currentUser.phone);
    setIsEditingProfile(true);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      fullName: editName.trim(),
      phone: editPhone.trim(),
    });
    setIsEditingProfile(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" /> Confirmed
          </span>
        );
      case 'Requested':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
            <Clock3 className="w-3 h-3" /> Requested
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
            <CheckCircle2 className="w-3 h-3" /> Completed
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200">
            <XCircle className="w-3 h-3" /> Cancelled
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <section id="dashboard" className="py-12 sm:py-16 bg-[#fafbfc] border-t border-gray-100 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200/80">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">
                Welcome back, {currentUser.fullName}
              </h2>
              {isDemoMode && (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                  Demo Preview Mode
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-gray-500">
              Patient Portal • Functional Rehab Lab, Anayara
            </p>
          </div>

          {/* Controls: Request appointment or Toggle Demo mode */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => toggleDemoMode()}
              className="px-3 py-2 text-xs font-semibold rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 transition"
              title="Toggle between real blank account and sample demo data"
            >
              <RefreshCw className="w-3.5 h-3.5 inline mr-1 text-brand-primary" />
              <span>{isDemoMode ? 'Exit Demo Mode' : 'View Sample Records'}</span>
            </button>
            <button
              onClick={onNavigateToBook}
              className="px-4 py-2 bg-brand-primary text-white text-xs font-bold rounded-xl hover:bg-brand-hover transition flex items-center gap-1.5 shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Request</span>
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-gray-200 overflow-x-auto pb-px scrollbar-none">
          <button
            onClick={() => setActiveTab('appointments')}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 whitespace-nowrap transition ${
              activeTab === 'appointments'
                ? 'border-brand-primary text-brand-primary'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Upcoming Appointments ({appointments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('treatment')}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 whitespace-nowrap transition ${
              activeTab === 'treatment'
                ? 'border-brand-primary text-brand-primary'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Treatment Plans ({treatmentPlans.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('sessions')}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 whitespace-nowrap transition ${
              activeTab === 'sessions'
                ? 'border-brand-primary text-brand-primary'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Previous Sessions ({sessions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('reminders')}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 whitespace-nowrap transition ${
              activeTab === 'reminders'
                ? 'border-brand-primary text-brand-primary'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Reminder Settings</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 whitespace-nowrap transition ${
              activeTab === 'profile'
                ? 'border-brand-primary text-brand-primary'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile Details</span>
          </button>
        </div>

        {/* Tab Content A: Upcoming Appointments */}
        {activeTab === 'appointments' && (
          <div className="space-y-4">
            {appointments.length === 0 ? (
              <div className="rounded-2xl bg-white p-10 text-center border border-gray-200/80 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
                  <Calendar className="w-6 h-6" />
                </div>
                <div className="space-y-1 max-w-sm mx-auto">
                  <h3 className="text-base font-bold text-gray-900">No Upcoming Appointments</h3>
                  <p className="text-xs text-gray-500">
                    You currently have no scheduled or requested rehabilitation sessions.
                  </p>
                </div>
                <button
                  onClick={onNavigateToBook}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-primary text-white text-xs font-bold hover:bg-brand-hover transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>Request an Appointment via WhatsApp</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {appointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="rounded-2xl bg-white p-5 border border-gray-200/80 shadow-2xs space-y-4 hover:border-brand-primary/30 transition"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[11px] font-mono font-semibold text-gray-400 block">
                          Ref: {apt.bookingRef}
                        </span>
                        <h4 className="text-base font-bold text-gray-900 mt-0.5">
                          {apt.serviceName}
                        </h4>
                        <span className="text-xs text-gray-500">{apt.patientType}</span>
                      </div>
                      {getStatusBadge(apt.status)}
                    </div>

                    <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-[#fafbfc] text-xs">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Calendar className="w-3.5 h-3.5 text-brand-primary" />
                        <span className="font-semibold">{apt.preferredDate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Clock className="w-3.5 h-3.5 text-brand-primary" />
                        <span className="font-semibold">{apt.preferredTime}</span>
                      </div>
                    </div>

                    {apt.concern && (
                      <div className="text-xs text-gray-600 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                        <strong className="text-gray-700 block mb-0.5">Concern / Note:</strong>
                        <p>{apt.concern}</p>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2 text-xs border-t border-gray-100">
                      <span className="text-gray-400 text-[11px]">
                        Created: {new Date(apt.createdAt).toLocaleDateString()}
                      </span>
                      {apt.status === 'Requested' && (
                        <button
                          onClick={() => cancelAppointment(apt.id)}
                          className="text-red-600 hover:text-red-700 font-semibold text-xs transition"
                        >
                          Cancel Request
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab Content B: Previous Sessions */}
        {activeTab === 'sessions' && (
          <div className="space-y-4">
            {sessions.length === 0 ? (
              <div className="rounded-2xl bg-white p-10 text-center border border-gray-200/80 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="space-y-1 max-w-sm mx-auto">
                  <h3 className="text-base font-bold text-gray-900">No Previous Sessions</h3>
                  <p className="text-xs text-gray-500">
                    Past clinical notes and completed session logs will appear here after your evaluations.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {sessions.map((ses) => (
                  <div
                    key={ses.id}
                    className="rounded-2xl bg-white p-5 border border-gray-200/80 shadow-2xs space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold text-xs">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-gray-900">{ses.serviceName}</h4>
                          <span className="text-xs text-gray-500">Date: {ses.date}</span>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        {ses.status}
                      </span>
                    </div>

                    {ses.notes && (
                      <p className="text-xs text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-100 leading-relaxed">
                        <strong className="text-gray-800 font-semibold block mb-0.5">Clinical Notes:</strong>
                        {ses.notes}
                      </p>
                    )}

                    {ses.therapist && (
                      <p className="text-[11px] text-gray-500">
                        Physiotherapist: <span className="font-semibold text-gray-700">{ses.therapist}</span>
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab Content C: Treatment Plans */}
        {activeTab === 'treatment' && (
          <div className="space-y-4">
            {treatmentPlans.length === 0 ? (
              <div className="rounded-2xl bg-white p-10 text-center border border-gray-200/80 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
                  <Activity className="w-6 h-6" />
                </div>
                <div className="space-y-1 max-w-sm mx-auto">
                  <h3 className="text-base font-bold text-gray-900">No Treatment Plan Available</h3>
                  <p className="text-xs text-gray-500">
                    A personalized rehabilitation roadmap with home exercises and targets will be assigned following your initial physical assessment.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {treatmentPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className="rounded-3xl bg-white p-6 sm:p-8 border border-gray-200/80 shadow-xs space-y-6"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
                      <div>
                        <span className="text-xs font-semibold text-brand-primary uppercase tracking-wider">
                          Rehabilitation Plan
                        </span>
                        <h3 className="text-xl font-bold text-gray-950 mt-1">{plan.title}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">Initiated: {plan.startDate}</p>
                      </div>
                      <span className="self-start sm:self-center px-3 py-1 text-xs font-bold rounded-full bg-teal-100 text-brand-primary">
                        {plan.status}
                      </span>
                    </div>

                    {/* Target Goal */}
                    <div className="p-4 rounded-2xl bg-brand-primary/5 border border-brand-primary/15 space-y-1">
                      <span className="text-xs font-bold text-brand-primary uppercase tracking-wider block">
                        Target Clinical Goal:
                      </span>
                      <p className="text-sm text-gray-800 font-medium leading-relaxed">
                        {plan.targetGoal}
                      </p>
                    </div>

                    {/* Progress Bar (Only when based on actual entered data) */}
                    {plan.progressPercent !== undefined && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-gray-700">Protocol Milestone Progress:</span>
                          <span className="text-brand-primary">{plan.progressPercent}% Completed</span>
                        </div>
                        <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-brand-primary rounded-full transition-all duration-500"
                            style={{ width: `${plan.progressPercent}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Therapist Instructions */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                        Therapist Clinical Instructions:
                      </h4>
                      <ul className="space-y-2">
                        {plan.therapistInstructions.map((instruction, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-1.5 shrink-0" />
                            <span>{instruction}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Exercise Schedule */}
                    {plan.exercises && plan.exercises.length > 0 && (
                      <div className="space-y-3 pt-2">
                        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                          Prescribed Home Exercise Schedule:
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {plan.exercises.map((ex, idx) => (
                            <div
                              key={idx}
                              className="p-3.5 rounded-xl bg-gray-50 border border-gray-200/70 text-xs space-y-1"
                            >
                              <p className="font-bold text-gray-900">{ex.name}</p>
                              <p className="text-gray-600">Reps: <span className="font-medium text-gray-800">{ex.reps}</span></p>
                              <p className="text-gray-600">Frequency: <span className="font-medium text-brand-primary">{ex.frequency}</span></p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab Content D: Reminder Settings (Section 10) */}
        {activeTab === 'reminders' && (
          <div className="rounded-3xl bg-white p-6 sm:p-8 border border-gray-200/80 shadow-xs space-y-6 max-w-2xl">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-gray-900">Appointment Reminder Channels</h3>
              <p className="text-xs text-gray-500">
                Configure how and when you receive notifications prior to your scheduled physiotherapy visits.
              </p>
            </div>

            {/* Crucial Section 10 Disclaimer */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <Info className="w-4 h-4 text-amber-700" />
                <span>Notice on Communication Delivery:</span>
              </div>
              <p className="leading-relaxed">
                Automated SMS &amp; WhatsApp reminders require active provider gateway credentials. Preferences saved here govern clinic communication consent.
              </p>
            </div>

            {/* Channels toggles */}
            <div className="space-y-4 pt-2">
              <label className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-brand-primary/30 transition cursor-pointer">
                <div>
                  <span className="text-sm font-bold text-gray-900 block">WhatsApp Reminders</span>
                  <span className="text-xs text-gray-500">Receive interactive reminder to +91 80885 96486</span>
                </div>
                <input
                  type="checkbox"
                  checked={currentUser.reminderPreferences.whatsapp}
                  onChange={(e) => updateReminderPreferences({ whatsapp: e.target.checked })}
                  className="w-5 h-5 rounded-md text-brand-primary focus:ring-brand-primary"
                />
              </label>

              <label className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-brand-primary/30 transition cursor-pointer">
                <div>
                  <span className="text-sm font-bold text-gray-900 block">SMS Notifications</span>
                  <span className="text-xs text-gray-500">Standard text message delivery</span>
                </div>
                <input
                  type="checkbox"
                  checked={currentUser.reminderPreferences.sms}
                  onChange={(e) => updateReminderPreferences({ sms: e.target.checked })}
                  className="w-5 h-5 rounded-md text-brand-primary focus:ring-brand-primary"
                />
              </label>

              <label className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-brand-primary/30 transition cursor-pointer">
                <div>
                  <span className="text-sm font-bold text-gray-900 block">Email Reminders</span>
                  <span className="text-xs text-gray-500">Sent to {currentUser.email}</span>
                </div>
                <input
                  type="checkbox"
                  checked={currentUser.reminderPreferences.email}
                  onChange={(e) => updateReminderPreferences({ email: e.target.checked })}
                  className="w-5 h-5 rounded-md text-brand-primary focus:ring-brand-primary"
                />
              </label>
            </div>

            {/* Reminder Timing Selector */}
            <div className="pt-2">
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                Preferred Advance Timing:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => updateReminderPreferences({ timing: '24-hour' })}
                  className={`py-2.5 px-4 text-xs font-semibold rounded-xl border transition ${
                    currentUser.reminderPreferences.timing === '24-hour'
                      ? 'bg-brand-primary text-white border-brand-primary'
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  24 Hours in Advance
                </button>
                <button
                  type="button"
                  onClick={() => updateReminderPreferences({ timing: 'Same-day' })}
                  className={`py-2.5 px-4 text-xs font-semibold rounded-xl border transition ${
                    currentUser.reminderPreferences.timing === 'Same-day'
                      ? 'bg-brand-primary text-white border-brand-primary'
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  Same Day (Morning)
                </button>
              </div>
            </div>

            {/* Sample Reminder Template Preview */}
            <div className="mt-4 p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                Standard Reminder Template:
              </span>
              <div className="p-3 bg-white rounded-xl border border-gray-200/80 font-mono text-xs text-gray-700 space-y-1.5">
                <p>Hello {currentUser.fullName},</p>
                <p>This is a reminder about your appointment at Functional Rehab Lab.</p>
                <p>Date: [Scheduled Date]</p>
                <p>Time: [Scheduled Time]</p>
                <p>If you need assistance, please contact: +91 80885 96486</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content E: Profile Details */}
        {activeTab === 'profile' && (
          <div className="rounded-3xl bg-white p-6 sm:p-8 border border-gray-200/80 shadow-xs space-y-6 max-w-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Patient Profile</h3>
                <p className="text-xs text-gray-500">Contact information and account record</p>
              </div>
              {!isEditingProfile && (
                <button
                  onClick={handleStartEditProfile}
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {isEditingProfile ? (
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Full Legal / Preferred Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-hidden focus:border-brand-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-hidden focus:border-brand-primary"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-brand-primary text-white text-xs font-bold rounded-xl hover:bg-brand-hover transition"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditingProfile(false)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 text-xs font-semibold rounded-xl hover:bg-gray-200 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4 text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-150">
                    <span className="text-xs text-gray-500 block">Full Name</span>
                    <span className="font-bold text-gray-900">{currentUser.fullName}</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-150">
                    <span className="text-xs text-gray-500 block">Phone</span>
                    <span className="font-bold text-gray-900">{currentUser.phone}</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-150">
                    <span className="text-xs text-gray-500 block">Email Address</span>
                    <span className="font-bold text-gray-900">{currentUser.email}</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-150">
                    <span className="text-xs text-gray-500 block">Clinic Location</span>
                    <span className="font-bold text-gray-900">Anayara, Thiruvananthapuram</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-brand-primary/5 border border-brand-primary/15 text-xs text-gray-700">
                  <p className="font-semibold text-brand-primary mb-1">Clinic Verification Note:</p>
                  <p>
                    All health records are tied to your primary registered phone number. For any record amendments or physical paper summary requests, contact reception at {CLINIC_INFO.phoneDisplay}.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
