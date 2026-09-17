import React from 'react';
import { MapPin, Phone, MessageCircle, Navigation, Clock, ShieldCheck, ExternalLink, Calendar } from 'lucide-react';
import { CLINIC_INFO } from '../utils/whatsapp';

interface ContactSectionProps {
  onNavigateToBook: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onNavigateToBook }) => {
  return (
    <section id="contact" className="py-16 sm:py-20 bg-[#121216] border-t border-white/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-primary/15 text-brand-primary border border-brand-primary/30 text-xs font-semibold uppercase tracking-wider mb-3">
            Clinic Contact &amp; Location
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Visit Functional Rehab Lab
          </h2>
          <p className="mt-3 text-base text-gray-300 leading-relaxed">
            Conveniently situated in Anayara, Thiruvananthapuram, near KIMS Rd and Oruvathilkotta. Appointments are scheduled in advance to ensure dedicated therapist time.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contact & Details */}
          <div className="lg:col-span-5 space-y-6">
            {/* Address Card */}
            <div className="p-6 rounded-3xl bg-[#18181d] border border-white/10 shadow-xs space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-brand-primary/15 text-brand-primary flex items-center justify-center shrink-0 mt-0.5 border border-brand-primary/20">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white">Clinic Address</h3>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-medium">
                    Functional Rehab Lab<br />
                    Near KIMS Rd, Oruvathilkotta<br />
                    Anayara, Thiruvananthapuram<br />
                    Kerala 695029, India
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex flex-wrap gap-2.5">
                <a
                  href={CLINIC_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="contact-directions-btn"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-primary text-white text-xs font-bold hover:bg-brand-hover transition shadow-lg shadow-brand-primary/25"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Open Google Maps</span>
                  <ExternalLink className="w-3 h-3 text-white/80" />
                </a>
              </div>
            </div>

            {/* Direct Telephone & WhatsApp Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#18181d] border border-white/10 shadow-xs space-y-2.5">
                <div className="w-9 h-9 rounded-xl bg-brand-primary/15 text-brand-primary flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 block">Phone Enquiries</span>
                  <a
                    href={CLINIC_INFO.telUrl}
                    id="contact-call-btn"
                    className="text-sm font-bold text-white hover:text-brand-primary transition block mt-0.5"
                  >
                    {CLINIC_INFO.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#18181d] border border-white/10 shadow-xs space-y-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#25D366]/15 text-[#25D366] flex items-center justify-center border border-[#25D366]/20">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 block">WhatsApp Desk</span>
                  <a
                    href={`https://wa.me/${CLINIC_INFO.whatsappRawNumber}?text=${encodeURIComponent('Hello Functional Rehab Lab, I have a general enquiry.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="contact-whatsapp-btn"
                    className="text-sm font-bold text-[#25D366] hover:underline transition block mt-0.5"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Hours & Scheduling Protocol */}
            <div className="p-5 rounded-2xl bg-[#16161b] border border-brand-primary/30 space-y-2">
              <div className="flex items-center gap-2 text-brand-primary font-bold text-xs">
                <Clock className="w-4 h-4 shrink-0" />
                <span>Operating Guidelines &amp; Hours:</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Consultations are conducted <strong>by prior appointment</strong> to avoid overcrowding and provide dedicated focus. Emergency physiotherapy triage can be coordinated via direct phone call.
              </p>
              <div className="pt-2">
                <button
                  onClick={onNavigateToBook}
                  className="inline-flex items-center gap-2 text-xs font-bold text-brand-primary hover:underline"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Reserve an appointment slot &rarr;</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Google Maps Interactive Preview Card */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40 bg-[#18181d]">
              {/* Map Header Bar */}
              <div className="px-6 py-4 bg-[#16161b] border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-gray-200">
                    Live Clinic Coordinates (Anayara, TVM)
                  </span>
                </div>
                <a
                  href={CLINIC_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-brand-primary hover:underline flex items-center gap-1"
                >
                  <span>Open Full Map</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Map Embed Frame (Using verified coordinate anchor) */}
              <div className="relative w-full h-[360px] sm:h-[420px] bg-[#1a1a20]">
                <iframe
                  title="Functional Rehab Lab Clinic Location Map"
                  src="https://maps.google.com/maps?q=8.5123419,76.9096047&hl=en&z=16&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full filter invert-[0.88] hue-rotate-180 contrast-[1.1]"
                />

                {/* Floating Directions Badge */}
                <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-[#16161b]/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-white/15 text-xs flex items-center justify-between gap-3">
                  <div>
                    <strong className="text-white block font-bold">Functional Rehab Lab</strong>
                    <span className="text-gray-400 text-[11px]">Near KIMS Rd, Oruvathilkotta</span>
                  </div>
                  <a
                    href={CLINIC_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-brand-primary text-white text-[11px] font-bold shrink-0 hover:bg-brand-hover transition shadow-lg shadow-brand-primary/25"
                  >
                    Directions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
