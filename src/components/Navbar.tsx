import React, { useState, useEffect } from 'react';
import { Phone, Calendar, User, Menu, X, Shield, LogOut, ArrowRight, MessageCircle, Palette } from 'lucide-react';
import { CLINIC_INFO } from '../utils/whatsapp';
import { useAuth } from '../context/AuthContext';
import { useBrand } from '../context/BrandContext';
import { PWAInstallButton } from './PWAInstallButton';

interface NavbarProps {
  onOpenAuth: (mode?: 'login' | 'signup') => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth, activeSection, onNavigate }) => {
  const { currentUser, isAuthenticated, isDemoMode, logout } = useAuth();
  const { colors, currentLogoUrl, setIsCustomizerOpen } = useBrand();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'book', label: 'Book Appointment' },
    { id: 'dashboard', label: 'Patient Dashboard' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled
          ? 'bg-[#0d0d10]/95 backdrop-blur-md shadow-lg shadow-black/40 border-b border-white/10'
          : 'bg-[#0d0d10] border-b border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-hidden"
            aria-label="Functional Rehab Lab - Back to Home"
          >
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center p-1 shadow-xs border transition group-hover:scale-105 overflow-hidden bg-[#16161b] border-white/15"
            >
              <img
                src={currentLogoUrl}
                alt="Functional Rehab Lab Logo"
                className="max-h-full max-w-full object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div>
              <span className="block text-base sm:text-lg font-bold text-white tracking-tight leading-tight group-hover:text-brand-primary transition">
                Functional Rehab Lab
              </span>
              <span className="block text-[11px] font-medium text-gray-400 uppercase tracking-wider">
                Anayara, Thiruvananthapuram
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold tracking-wide transition ${
                    isActive
                      ? 'bg-brand-primary/20 text-brand-primary shadow-xs'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Desktop Actions */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Brand Logo & Color Switcher */}
            <button
              onClick={() => setIsCustomizerOpen(true)}
              id="navbar-brand-theme-btn"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition hover:opacity-90 active:scale-[0.98] bg-[#18181d] border-white/15 text-gray-200"
              title="Change Clinic Logo & UI Colors"
            >
              <span
                className="w-2.5 h-2.5 rounded-full shadow-inner ring-1 ring-white/20"
                style={{ backgroundColor: colors.primary }}
              />
              <Palette className="w-3.5 h-3.5 text-brand-primary" />
              <span className="hidden xl:inline text-[11px]">Logo & Colors</span>
            </button>

            {/* PWA Install Button */}
            <PWAInstallButton variant="navbar" />

            {/* Click to Call */}
            <a
              href={CLINIC_INFO.telUrl}
              id="navbar-call-btn"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-gray-200 hover:text-brand-primary hover:bg-white/5 transition border border-white/15 active:scale-[0.98]"
              title="Direct Clinic Phone"
            >
              <Phone className="w-3.5 h-3.5 text-brand-primary" />
              <span className="hidden xl:inline">{CLINIC_INFO.phoneDisplay}</span>
              <span className="xl:hidden">Call</span>
            </a>

            {/* Auth Button or User Badge */}
            {isAuthenticated && currentUser ? (
              <div className="relative flex items-center gap-2">
                <button
                  onClick={() => handleLinkClick('dashboard')}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#18181d] border border-white/15 text-gray-200 text-xs font-semibold hover:bg-white/5 transition"
                  title="Open Patient Dashboard"
                >
                  <User className="w-3.5 h-3.5 text-brand-primary" />
                  <span className="max-w-[100px] truncate">{currentUser.fullName.split(' ')[0]}</span>
                  {isDemoMode && (
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-1.5 py-0.5 rounded-full border border-amber-500/30">
                      Demo
                    </span>
                  )}
                </button>
                <button
                  onClick={logout}
                  className="p-2 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition"
                  title="Log out"
                  aria-label="Log out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => onOpenAuth('login')}
                id="navbar-login-btn"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-gray-200 hover:text-white hover:bg-white/5 transition border border-white/15"
              >
                <User className="w-3.5 h-3.5 text-brand-primary" />
                <span>Login</span>
              </button>
            )}

            {/* Primary Book Appointment CTA */}
            <button
              onClick={() => handleLinkClick('book')}
              id="navbar-book-btn"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-white text-xs font-bold transition shadow-lg shadow-brand-primary/25 active:scale-[0.98] bg-brand-primary hover:bg-brand-hover"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Right Controls: Theme + Call + Menu */}
          <div className="flex items-center gap-2 sm:hidden">
            <button
              onClick={() => setIsCustomizerOpen(true)}
              className="p-2 rounded-xl border border-white/15 bg-[#18181d] text-gray-300 transition"
              title="Logo & Colors"
              aria-label="Logo & Colors"
            >
              <Palette className="w-4 h-4 text-brand-primary" />
            </button>
            <a
              href={CLINIC_INFO.telUrl}
              className="p-2.5 rounded-xl bg-[#18181d] border border-white/15 text-gray-200 hover:text-brand-primary transition"
              aria-label="Call Functional Rehab Lab"
            >
              <Phone className="w-4 h-4 text-brand-primary" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-gray-200 hover:bg-white/10 transition"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-white/10 bg-[#121216] px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-150 text-white">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold text-left transition ${
                    isActive
                      ? 'bg-brand-primary/20 text-brand-primary'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-white/10 space-y-2.5">
            {/* Brand Color Theme Button in Mobile */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsCustomizerOpen(true);
              }}
              className="w-full py-2.5 rounded-xl border border-white/15 text-gray-200 text-xs font-semibold flex items-center justify-center gap-2 bg-[#18181d]"
            >
              <Palette className="w-4 h-4 text-brand-primary" />
              <span>Change Logo & Brand Palette</span>
            </button>

            {/* Install button in mobile menu */}
            <div className="flex justify-between items-center py-1">
              <span className="text-xs text-gray-400 font-medium">Progressive Web App:</span>
              <PWAInstallButton variant="navbar" />
            </div>

            {/* Auth in Mobile */}
            {isAuthenticated && currentUser ? (
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#18181d] border border-white/10">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-brand-primary" />
                  <div>
                    <p className="text-xs font-bold text-white">{currentUser.fullName}</p>
                    <p className="text-[11px] text-gray-400">{currentUser.phone}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="px-2.5 py-1 text-xs font-medium text-red-400 hover:bg-red-500/10 rounded-lg transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth('login');
                }}
                className="w-full py-2.5 rounded-xl border border-white/15 text-gray-200 text-xs font-semibold flex items-center justify-center gap-2 bg-[#18181d]"
              >
                <User className="w-4 h-4 text-brand-primary" />
                <span>Patient Login / Sign Up</span>
              </button>
            )}

            {/* Direct WhatsApp CTA in Mobile Menu */}
            <a
              href={`https://wa.me/${CLINIC_INFO.whatsappRawNumber}?text=${encodeURIComponent('Hello Functional Rehab Lab, I would like to request an appointment.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-[#25D366] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Request via WhatsApp</span>
            </a>

            {/* Book Appointment on page */}
            <button
              onClick={() => handleLinkClick('book')}
              className="w-full py-3 rounded-xl text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/25 bg-brand-primary hover:bg-brand-hover"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment Form</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

