import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { CLINIC_INFO } from '../utils/whatsapp';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const defaultMessage = 'Hello Functional Rehab Lab, I would like to enquire about physiotherapy treatment.';
  const waUrl = `https://wa.me/${CLINIC_INFO.whatsappRawNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end gap-2 pointer-events-auto">
      {showTooltip && (
        <div className="relative max-w-xs bg-white text-gray-900 px-3.5 py-2.5 rounded-2xl shadow-xl border border-gray-100 text-xs flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex-1">
            <p className="font-bold text-[#0d5c58]">Have a Question?</p>
            <p className="text-[11px] text-gray-500">Chat with Functional Rehab Lab</p>
          </div>
          <button
            onClick={() => setShowTooltip(false)}
            className="p-1 text-gray-400 hover:text-gray-600 rounded-full"
            aria-label="Dismiss message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          {/* Subtle speech bubble tail */}
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white border-r border-b border-gray-100 rotate-45" />
        </div>
      )}

      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        id="floating-whatsapp-btn"
        className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:bg-[#1EBE5D] hover:scale-105 active:scale-95 transition duration-200 focus:outline-hidden focus:ring-4 focus:ring-[#25D366]/30"
        aria-label="Chat on WhatsApp with Functional Rehab Lab"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
    </div>
  );
};
