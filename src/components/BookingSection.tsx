import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  ExternalLink,
  Info,
} from 'lucide-react';
import { SERVICES_LIST } from '../data/servicesData';
import {
  CLINIC_INFO,
  buildWhatsAppBookingUrl,
  generateBookingRef,
} from '../utils/whatsapp';
import { useAuth } from '../context/AuthContext';
import { PatientType } from '../types';

interface BookingSectionProps {
  selectedServiceId?: string;
  onNavigateToDashboard?: () => void;
  onOpenPrivacy?: () => void;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  selectedServiceId,
  onNavigateToDashboard,
  onOpenPrivacy,
}) => {
  const { currentUser, isAuthenticated, addAppointment } = useAuth();

  // Form states
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('10:00 AM');
  const [serviceId, setServiceId] = useState(SERVICES_LIST[0].id);
  const [patientType, setPatientType] = useState<PatientType>('New Patient');
  const [concern, setConcern] = useState('');
  const [consentChecked, setConsentChecked] = useState(false);

  // Status feedback
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [lastRequestedRef, setLastRequestedRef] = useState<string | null>(null);

  // Sync when user logs in or selects service externally
  useEffect(() => {
    if (currentUser) {
      if (!patientName) setPatientName(currentUser.fullName);
      if (!phone) setPhone(currentUser.phone);
      if (!email && currentUser.email) setEmail(currentUser.email);
    }
  }, [currentUser]);

  useEffect(() => {
    if (selectedServiceId && SERVICES_LIST.some((s) => s.id === selectedServiceId)) {
      setServiceId(selectedServiceId);
    }
  }, [selectedServiceId]);

  // Minimum date: today
  const todayString = new Date().toISOString().split('T')[0];

  const timeSlots = [
    '08:30 AM',
    '09:30 AM',
    '10:30 AM',
    '11:30 AM',
    '02:30 PM',
    '03:30 PM',
    '04:30 PM',
    '05:30 PM',
    '06:30 PM',
  ];

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!patientName.trim()) {
      errs.patientName = 'Please enter patient full name.';
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.phone = 'Please provide a valid 10-digit phone number with WhatsApp access.';
    }
    if (!preferredDate) {
      errs.preferredDate = 'Please select a preferred appointment date.';
    }
    if (!preferredTime) {
      errs.preferredTime = 'Please select a preferred time.';
    }
    if (!consentChecked) {
      errs.consent = 'Please confirm consent for clinic appointment communication.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleBookViaWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const selectedService = SERVICES_LIST.find((s) => s.id === serviceId);
    const serviceName = selectedService ? selectedService.title : 'General Physiotherapy Assessment';

    // Generate verified WhatsApp message URL
    const waUrl = buildWhatsAppBookingUrl({
      patientName,
      phone,
      preferredDate,
      preferredTime,
      service: serviceName,
      patientType,
      concern,
    });

    const bookingRef = generateBookingRef();
    setLastRequestedRef(bookingRef);

    // Save request into dashboard record so patient can reference it
    addAppointment({
      bookingRef,
      patientName,
      phone,
      email: email.trim() || undefined,
      preferredDate,
      preferredTime,
      serviceId,
      serviceName,
      patientType,
      concern: concern.trim() || undefined,
      status: 'Requested',
    });

    // Launch WhatsApp directly
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="book" className="py-16 sm:py-20 bg-[#0d0d10] border-t border-white/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Context & Guidelines */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-primary/15 text-brand-primary border border-brand-primary/30 text-xs font-semibold uppercase tracking-wider">
              Appointments
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Request a Physiotherapy Appointment
            </h2>
            <p className="text-base text-gray-300 leading-relaxed">
              Bookings are coordinated directly with clinic reception via WhatsApp to verify therapist availability and schedule your personalized assessment without automated delays.
            </p>

            {/* Crucial Disclaimer Mandated by Prompt */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#18181d] border border-brand-primary/30 space-y-2">
              <div className="flex items-center gap-2 text-brand-primary font-bold text-xs">
                <Info className="w-4 h-4 shrink-0" />
                <span>Important Booking Information:</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Submitting this form initiates an appointment <strong>REQUEST</strong> via WhatsApp. Your session is <strong>confirmed only after</strong> our clinic reception verifies the therapist schedule and confirms the reserved slot with you.
              </p>
            </div>

            {/* Direct Contact Alternatives */}
            <div className="p-5 rounded-2xl bg-[#18181d] border border-white/10 space-y-3.5">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Direct Contact Alternatives
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Clinic Phone / WhatsApp:</span>
                  <a
                    href={CLINIC_INFO.telUrl}
                    className="font-bold text-brand-primary hover:underline"
                  >
                    {CLINIC_INFO.phoneDisplay}
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Location:</span>
                  <span className="font-semibold text-gray-200 text-right">
                    Near KIMS Rd, Anayara
                  </span>
                </div>
              </div>
            </div>

            {/* Booking Confirmation Box (Shown after booking request) */}
            {lastRequestedRef && (
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-200 space-y-2 animate-in fade-in duration-150">
                <div className="flex items-center gap-2 font-bold text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Message Prepared</span>
                </div>
                <p>
                  Reference: <strong className="font-mono text-white">{lastRequestedRef}</strong>.
                  The request has been recorded in your local Patient Dashboard.
                </p>
                {onNavigateToDashboard && (
                  <button
                    onClick={onNavigateToDashboard}
                    className="text-xs font-bold text-brand-primary underline hover:text-brand-hover"
                  >
                    View in Patient Dashboard &rarr;
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Appointment Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-[#16161b] p-6 sm:p-8 lg:p-10 border border-white/10 shadow-2xl shadow-black/50">
              <form onSubmit={handleBookViaWhatsApp} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Patient Name */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      Patient Full Name <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={patientName}
                        onChange={(e) => {
                          setPatientName(e.target.value);
                          if (errors.patientName) setErrors({ ...errors, patientName: '' });
                        }}
                        placeholder="e.g. Rahul Krishnan"
                        className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-white/15 bg-[#202026] text-white placeholder:text-gray-500 focus:outline-hidden focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition"
                      />
                    </div>
                    {errors.patientName && (
                      <p className="mt-1 text-[11px] text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.patientName}
                      </p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      Phone Number (WhatsApp) <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (errors.phone) setErrors({ ...errors, phone: '' });
                        }}
                        placeholder="+91 98470 12345"
                        className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-white/15 bg-[#202026] text-white placeholder:text-gray-500 focus:outline-hidden focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition"
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-[11px] text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email (Optional) */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      Email Address <span className="text-gray-400 font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="patient@example.com"
                        className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-white/15 bg-[#202026] text-white placeholder:text-gray-500 focus:outline-hidden focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition"
                      />
                    </div>
                  </div>

                  {/* Patient Type */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      Patient Type <span className="text-red-400">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setPatientType('New Patient')}
                        className={`py-2 px-3 text-xs font-semibold rounded-xl border transition ${
                          patientType === 'New Patient'
                            ? 'bg-brand-primary text-white border-brand-primary'
                            : 'bg-[#202026] text-gray-300 border-white/15 hover:bg-white/5'
                        }`}
                      >
                        New Patient
                      </button>
                      <button
                        type="button"
                        onClick={() => setPatientType('Existing Patient')}
                        className={`py-2 px-3 text-xs font-semibold rounded-xl border transition ${
                          patientType === 'Existing Patient'
                            ? 'bg-brand-primary text-white border-brand-primary'
                            : 'bg-[#202026] text-gray-300 border-white/15 hover:bg-white/5'
                        }`}
                      >
                        Existing Patient
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Preferred Date */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      Preferred Date <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="date"
                        min={todayString}
                        required
                        value={preferredDate}
                        onChange={(e) => {
                          setPreferredDate(e.target.value);
                          if (errors.preferredDate) setErrors({ ...errors, preferredDate: '' });
                        }}
                        className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-white/15 bg-[#202026] text-white focus:outline-hidden focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition [color-scheme:dark]"
                      />
                    </div>
                    {errors.preferredDate && (
                      <p className="mt-1 text-[11px] text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.preferredDate}
                      </p>
                    )}
                  </div>

                  {/* Preferred Time Slot */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      Preferred Time Slot <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Clock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <select
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-white/15 bg-[#202026] text-white focus:outline-hidden focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition [color-scheme:dark]"
                      >
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Service / Treatment */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Service / Treatment <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={serviceId}
                    onChange={(e) => setServiceId(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-white/15 bg-[#202026] text-white focus:outline-hidden focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition [color-scheme:dark]"
                  >
                    {SERVICES_LIST.map((srv) => (
                      <option key={srv.id} value={srv.id}>
                        {srv.title} ({srv.category})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Concern / Short Description */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Brief Description of Problem / Concern{' '}
                    <span className="text-gray-400 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={concern}
                    onChange={(e) => setConcern(e.target.value)}
                    placeholder="e.g. Experiencing pain in lower back after lifting, difficulty sitting for longer than 20 minutes..."
                    className="w-full p-3.5 text-sm rounded-xl border border-white/15 bg-[#202026] text-white placeholder:text-gray-500 focus:outline-hidden focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition"
                  />
                </div>

                {/* Consent Checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consentChecked}
                      onChange={(e) => {
                        setConsentChecked(e.target.checked);
                        if (errors.consent) setErrors({ ...errors, consent: '' });
                      }}
                      className="w-4 h-4 rounded-sm text-brand-primary focus:ring-brand-primary mt-0.5 shrink-0 accent-orange-500"
                    />
                    <span className="text-xs text-gray-400 leading-relaxed">
                      I understand that clicking "Book via WhatsApp" opens WhatsApp to send an appointment request to Functional Rehab Lab, and my slot is confirmed only after clinic reception verifies therapist availability.{' '}
                      <button
                        type="button"
                        onClick={onOpenPrivacy}
                        className="text-brand-primary font-semibold hover:underline"
                      >
                        Privacy Policy
                      </button>
                      .
                    </span>
                  </label>
                  {errors.consent && (
                    <p className="mt-1 text-[11px] text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.consent}
                    </p>
                  )}
                </div>

                {/* Primary Submit Button */}
                <button
                  type="submit"
                  id="submit-book-whatsapp-btn"
                  className="w-full py-4 px-6 rounded-2xl bg-[#25D366] text-white font-bold text-sm hover:bg-[#1EBE5D] transition active:scale-[0.99] flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Book via WhatsApp</span>
                  <ExternalLink className="w-4 h-4 text-white/80" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
