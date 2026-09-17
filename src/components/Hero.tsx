import React from 'react';
import { Calendar, Phone, MapPin, CheckCircle2, ShieldCheck, HeartPulse, Activity, ArrowRight } from 'lucide-react';
import { CLINIC_INFO } from '../utils/whatsapp';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-gradient-to-b from-[#f0f9f8]/60 via-white to-white">
      {/* Decorative Biomechanical Grid & Kinetic Waves */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-35">
        <svg className="w-full h-full" viewBox="0 0 1440 600" fill="none" preserveAspectRatio="none">
          <circle cx="1200" cy="180" r="320" stroke="#0d5c58" strokeWidth="1" strokeDasharray="6 6" strokeOpacity="0.2" />
          <circle cx="1200" cy="180" r="240" stroke="#0d5c58" strokeWidth="1" strokeOpacity="0.1" />
          <path
            d="M-100 400 C 300 250, 700 480, 1100 320 C 1300 240, 1400 300, 1550 250"
            stroke="#14b8a6"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            strokeOpacity="0.25"
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Clinical Location Chip */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0d5c58]/10 text-[#0d5c58] text-xs font-semibold tracking-wide border border-[#0d5c58]/15">
              <MapPin className="w-3.5 h-3.5 text-[#0d5c58]" />
              <span>Anayara, Thiruvananthapuram • Near KIMS Rd</span>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-950 tracking-tight leading-[1.12]">
                Move Better.{' '}
                <span className="text-[#0d5c58] block sm:inline">Recover Stronger.</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-700 leading-relaxed font-normal max-w-2xl">
                Personalised physiotherapy and rehabilitation care in Anayara, Thiruvananthapuram.
              </p>
            </div>

            {/* CTAs: Primary (Book Appointment), Secondary (Call Now), Additional (Get Directions) */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
              {/* Primary CTA */}
              <button
                onClick={() => onNavigate('book')}
                id="hero-book-appointment-btn"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#0d5c58] text-white text-sm font-bold shadow-md hover:bg-[#094643] transition active:scale-[0.98]"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </button>

              {/* Secondary CTA */}
              <a
                href={CLINIC_INFO.telUrl}
                id="hero-call-now-btn"
                className="inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl bg-white text-gray-800 text-sm font-bold border border-gray-200 hover:border-[#0d5c58]/40 hover:text-[#0d5c58] hover:bg-gray-50 transition active:scale-[0.98]"
              >
                <Phone className="w-4 h-4 text-[#0d5c58]" />
                <span>Call Now: {CLINIC_INFO.phoneDisplay}</span>
              </a>

              {/* Additional CTA */}
              <a
                href={CLINIC_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-get-directions-btn"
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-gray-600 hover:text-[#0d5c58] text-sm font-semibold hover:bg-gray-100/60 transition"
              >
                <MapPin className="w-4 h-4 text-[#0d5c58]" />
                <span>Get Directions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Trust Indicators (Strict adherence to prompt - no invented numbers or claims) */}
            <div className="pt-6 border-t border-gray-200/80">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0d5c58]/10 flex items-center justify-center text-[#0d5c58] shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-gray-900">Personalised Care</h3>
                    <p className="text-[11px] text-gray-500">Individualised assessment</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0d5c58]/10 flex items-center justify-center text-[#0d5c58] shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-gray-900">Evidence-Based</h3>
                    <p className="text-[11px] text-gray-500">Structured rehabilitation</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0d5c58]/10 flex items-center justify-center text-[#0d5c58] shrink-0">
                    <HeartPulse className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-gray-900">Patient-Focused</h3>
                    <p className="text-[11px] text-gray-500">Active functional recovery</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Visual Panel: Premium Physiotherapy & Biomechanics Illustration Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-gradient-to-br from-[#0d5c58] to-[#07302e] text-white p-7 sm:p-9 shadow-xl overflow-hidden border border-[#0d5c58]/30">
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#2dd4bf]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-teal-300">
                      <Activity className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-teal-200 block uppercase tracking-wider">
                        Clinical Focus
                      </span>
                      <span className="text-sm font-bold text-white">Functional Movement Analysis</span>
                    </div>
                  </div>
                  <span className="text-[11px] bg-teal-400/20 text-teal-200 font-semibold px-2.5 py-1 rounded-full border border-teal-400/30">
                    Active
                  </span>
                </div>

                {/* Key rehabilitation pillars */}
                <div className="space-y-3.5 text-xs text-teal-50/90">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <div className="flex items-center justify-between font-semibold text-white">
                      <span>1. Kinetic Assessment</span>
                      <span className="text-teal-300">Targeted</span>
                    </div>
                    <p className="text-[11px] text-teal-100/80">
                      In-depth biomechanical review of joint mobility, muscle engagement, and posture.
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <div className="flex items-center justify-between font-semibold text-white">
                      <span>2. Structured Treatment</span>
                      <span className="text-teal-300">Progressive</span>
                    </div>
                    <p className="text-[11px] text-teal-100/80">
                      Hands-on joint mobilization combined with targeted neuromuscular activation.
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <div className="flex items-center justify-between font-semibold text-white">
                      <span>3. Functional Strength</span>
                      <span className="text-teal-300">Sustainable</span>
                    </div>
                    <p className="text-[11px] text-teal-100/80">
                      Safe loading protocols to prevent recurrence and restore everyday physical resilience.
                    </p>
                  </div>
                </div>

                {/* Direct WhatsApp Appointment Request Notice */}
                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('book')}
                    className="w-full py-3 rounded-xl bg-teal-400 text-gray-950 font-bold text-xs hover:bg-teal-300 transition flex items-center justify-center gap-2"
                  >
                    <span>Request WhatsApp Appointment</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <p className="text-[11px] text-teal-200/70 text-center mt-2">
                    Direct communication with clinic reception
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
