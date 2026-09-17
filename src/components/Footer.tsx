import React from 'react';
import { MapPin, Phone, MessageCircle, Navigation, Shield, ArrowUp } from 'lucide-react';
import { CLINIC_INFO } from '../utils/whatsapp';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenPrivacy: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenPrivacy }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-950 text-gray-400 text-xs pt-16 pb-24 sm:pb-16 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Col 1: Brand & Clinic Identity */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0d5c58] text-white flex items-center justify-center font-bold text-sm">
                FRL
              </div>
              <div>
                <span className="text-base font-bold text-white block">
                  Functional Rehab Lab
                </span>
                <span className="text-[11px] text-gray-500 uppercase tracking-wider block">
                  Physiotherapy &amp; Rehabilitation Centre
                </span>
              </div>
            </div>

            <p className="text-gray-400 leading-relaxed max-w-md">
              Evidence-informed physiotherapy, biomechanical assessment, and structured functional rehabilitation care in Anayara, Thiruvananthapuram.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={CLINIC_INFO.telUrl}
                className="px-3 py-2 rounded-lg bg-gray-900 text-gray-200 hover:text-white border border-gray-800 transition flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-teal-400" />
                <span>{CLINIC_INFO.phoneDisplay}</span>
              </a>

              <a
                href={`https://wa.me/${CLINIC_INFO.whatsappRawNumber}?text=${encodeURIComponent('Hello Functional Rehab Lab, I have an enquiry.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-lg bg-[#25D366]/15 text-[#25D366] hover:bg-[#25D366]/25 transition flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition"
                >
                  About Our Practice
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition"
                >
                  Physiotherapy Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('book')}
                  className="hover:text-white transition"
                >
                  Book Appointment via WhatsApp
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="hover:text-white transition"
                >
                  Patient Portal Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition"
                >
                  Clinic Location &amp; Directions
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Address & Directions */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Clinic Location
            </h4>
            <div className="flex items-start gap-2.5 text-gray-400 leading-relaxed">
              <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <span>
                Near KIMS Rd, Oruvathilkotta,<br />
                Anayara, Thiruvananthapuram,<br />
                Kerala 695029, India
              </span>
            </div>

            <div className="pt-2">
              <a
                href={CLINIC_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-teal-400 hover:text-teal-300 font-medium"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Open in Google Maps &rarr;</span>
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer & Bottom Bar */}
        <div className="pt-8 border-t border-gray-900 space-y-4">
          <p className="text-[11px] text-gray-500 leading-relaxed">
            <strong>Medical Disclaimer:</strong> The content provided on this website is for informational and educational purposes only and should not be construed as clinical diagnosis or replacement for individualized medical evaluation. Always consult a certified physiotherapist or licensed healthcare practitioner regarding any physical discomfort or medical condition.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-900/60 text-[11px] text-gray-500">
            <p>
              &copy; {new Date().getFullYear()} Functional Rehab Lab. All rights reserved.
            </p>

            <div className="flex items-center gap-4">
              <button
                onClick={onOpenPrivacy}
                className="hover:text-gray-300 transition underline"
              >
                Privacy Policy &amp; Terms
              </button>
              <button
                onClick={scrollToTop}
                className="p-2 rounded-lg bg-gray-900 text-gray-400 hover:text-white transition flex items-center gap-1"
                aria-label="Scroll to top of page"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Back to Top</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
