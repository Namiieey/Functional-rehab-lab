import React from 'react';
import { Phone, MessageCircle, Calendar, User } from 'lucide-react';
import { CLINIC_INFO } from '../utils/whatsapp';
import { useAuth } from '../context/AuthContext';

interface MobileBottomBarProps {
  onNavigate: (sectionId: string) => void;
  onOpenAuth: (mode?: 'login' | 'signup') => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ onNavigate, onOpenAuth }) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 sm:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 py-2 px-3 shadow-lg">
      <div className="grid grid-cols-4 gap-1 items-center">
        {/* Call Now */}
        <a
          href={CLINIC_INFO.telUrl}
          id="mobile-bottom-call"
          className="flex flex-col items-center justify-center py-1 rounded-xl text-gray-700 hover:text-brand-primary active:bg-gray-100 transition"
        >
          <Phone className="w-5 h-5 text-brand-primary" />
          <span className="text-[10px] font-semibold mt-0.5">Call</span>
        </a>

        {/* WhatsApp */}
        <a
          href={`https://wa.me/${CLINIC_INFO.whatsappRawNumber}?text=${encodeURIComponent('Hello Functional Rehab Lab, I would like to enquire about an appointment.')}`}
          target="_blank"
          rel="noopener noreferrer"
          id="mobile-bottom-whatsapp"
          className="flex flex-col items-center justify-center py-1 rounded-xl text-[#128C7E] active:bg-gray-100 transition"
        >
          <MessageCircle className="w-5 h-5 text-[#25D366]" />
          <span className="text-[10px] font-semibold mt-0.5">WhatsApp</span>
        </a>

        {/* Book */}
        <button
          onClick={() => onNavigate('book')}
          id="mobile-bottom-book"
          className="flex flex-col items-center justify-center py-1 rounded-xl bg-brand-primary text-white shadow-xs active:scale-95 transition"
        >
          <Calendar className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-0.5">Book</span>
        </button>

        {/* Portal */}
        <button
          onClick={() => (isAuthenticated ? onNavigate('dashboard') : onOpenAuth('login'))}
          id="mobile-bottom-portal"
          className="flex flex-col items-center justify-center py-1 rounded-xl text-gray-700 hover:text-brand-primary active:bg-gray-100 transition"
        >
          <User className="w-5 h-5 text-brand-primary" />
          <span className="text-[10px] font-semibold mt-0.5">Portal</span>
        </button>
      </div>
    </div>
  );
};
