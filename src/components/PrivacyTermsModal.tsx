import React from 'react';
import { X, ShieldCheck, Lock, FileCheck } from 'lucide-react';
import { CLINIC_INFO } from '../utils/whatsapp';

interface PrivacyTermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyTermsModal: React.FC<PrivacyTermsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl my-8 rounded-3xl bg-[#18181d] p-6 sm:p-8 shadow-2xl border border-white/10 max-h-[85vh] flex flex-col animate-in fade-in duration-150 text-gray-300">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-brand-primary/15 text-brand-primary flex items-center justify-center border border-brand-primary/20">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Healthcare Privacy &amp; Terms</h2>
              <p className="text-xs text-gray-400">Functional Rehab Lab, Thiruvananthapuram</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="mt-4 space-y-4 text-xs sm:text-sm text-gray-300 overflow-y-auto pr-1 leading-relaxed">
          <section className="space-y-1.5">
            <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-brand-primary" /> 1. Patient Data Confidentiality
            </h3>
            <p className="text-gray-300">
              Functional Rehab Lab treats all patient evaluations, medical history, clinical notes, and treatment plans as sensitive medical data. We adhere to clinical privacy standards and do not sell, rent, or trade your personal or health information to third-party advertisers.
            </p>
          </section>

          <section className="space-y-1.5">
            <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5 text-brand-primary" /> 2. WhatsApp Communication &amp; Appointment Requests
            </h3>
            <p className="text-gray-300">
              Submitting an appointment request generates a structured message transmitted to the clinic's WhatsApp desk at {CLINIC_INFO.phoneDisplay}. An appointment request does not constitute an automatically confirmed reservation until clinic reception verifies therapist schedules and confirms the designated slot.
            </p>
          </section>

          <section className="space-y-1.5">
            <h3 className="font-bold text-white text-sm">3. Local Device Storage &amp; Demo Mode</h3>
            <p className="text-gray-300">
              In client demonstration mode, session records and appointments are encrypted and stored locally in your browser storage. Passwords are protected using Web Crypto SHA-256 cryptographic hashing with a clinic-specific salt and are never stored in plain text.
            </p>
          </section>

          <section className="space-y-1.5">
            <h3 className="font-bold text-white text-sm">4. Medical Information Disclaimer</h3>
            <p className="text-gray-300">
              Information published on this website is for general educational and informational purposes regarding physiotherapy and musculoskeletal recovery. It does not replace formal in-person clinical diagnosis or individualized medical advice. Always consult a qualified physiotherapist or medical doctor for acute injuries.
            </p>
          </section>

          <section className="space-y-1.5">
            <h3 className="font-bold text-white text-sm">5. Contact Clinic Regarding Records</h3>
            <p className="text-gray-300">
              To request copies of your evaluation records, update registered contact numbers, or request complete record deletion, please contact clinic reception at {CLINIC_INFO.phoneDisplay} or visit our facility near KIMS Rd, Oruvathilkotta, Anayara, Thiruvananthapuram.
            </p>
          </section>
        </div>

        {/* Footer Action */}
        <div className="mt-6 pt-4 border-t border-white/10 shrink-0 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-brand-primary text-white font-semibold text-xs hover:bg-brand-hover transition shadow-lg shadow-brand-primary/25"
          >
            I Understand &amp; Agree
          </button>
        </div>
      </div>
    </div>
  );
};
