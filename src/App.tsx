import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { BrandProvider, useBrand } from './context/BrandContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { BookingSection } from './components/BookingSection';
import { PatientDashboard } from './components/PatientDashboard';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { MobileBottomBar } from './components/MobileBottomBar';
import { OfflineIndicator } from './components/OfflineIndicator';
import { AuthModal } from './components/AuthModal';
import { PrivacyTermsModal } from './components/PrivacyTermsModal';
import { BrandCustomizerModal } from './components/BrandCustomizerModal';

export function MainAppContent() {
  const { isCustomizerOpen, setIsCustomizerOpen } = useBrand();
  const [activeSection, setActiveSection] = useState<string>('home');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState<'login' | 'signup'>('login');
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);

  // Smooth navigation helper
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);

    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenAuth = (mode: 'login' | 'signup' = 'login') => {
    setAuthInitialMode(mode);
    setAuthModalOpen(true);
  };

  const handleSelectServiceForBooking = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    handleNavigate('book');
  };

  // Scroll listener to update active navigation tab dynamically
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      const sections = ['contact', 'dashboard', 'book', 'services', 'about'];

      for (const sectionId of sections) {
        const elem = document.getElementById(sectionId);
        if (elem && elem.offsetTop <= scrollPos) {
          setActiveSection(sectionId);
          return;
        }
      }
      setActiveSection('home');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0d0d10] text-gray-100 flex flex-col selection:bg-brand-primary/30 selection:text-white">
      {/* Offline Alert */}
      <OfflineIndicator />

      {/* Main Sticky Navigation */}
      <Navbar
        onOpenAuth={handleOpenAuth}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero onNavigate={handleNavigate} />

        {/* About Section */}
        <AboutSection onNavigate={handleNavigate} />

        {/* Services Directory */}
        <ServicesSection onSelectServiceForBooking={handleSelectServiceForBooking} />

        {/* WhatsApp Appointment Booking Section */}
        <BookingSection
          selectedServiceId={selectedServiceId}
          onNavigateToDashboard={() => handleNavigate('dashboard')}
          onOpenPrivacy={() => setPrivacyModalOpen(true)}
        />

        {/* Authenticated / Demo Patient Portal Dashboard */}
        <PatientDashboard
          onNavigateToBook={() => handleNavigate('book')}
          onOpenAuth={handleOpenAuth}
        />

        {/* Contact, Coordinates & Location Section */}
        <ContactSection onNavigateToBook={() => handleNavigate('book')} />
      </main>

      {/* Professional Clinic Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenPrivacy={() => setPrivacyModalOpen(true)}
      />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />

      {/* Mobile Floating Bottom Bar */}
      <MobileBottomBar
        onNavigate={handleNavigate}
        onOpenAuth={handleOpenAuth}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authInitialMode}
        onOpenPrivacy={() => {
          setAuthModalOpen(false);
          setPrivacyModalOpen(true);
        }}
      />

      {/* Privacy Policy & Terms Modal */}
      <PrivacyTermsModal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
      />

      {/* Brand & Logo Color Customizer Modal */}
      <BrandCustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrandProvider>
      <AuthProvider>
        <MainAppContent />
      </AuthProvider>
    </BrandProvider>
  );
}
