import React, { useState } from 'react';
import {
  Activity,
  Flame,
  HeartPulse,
  Shield,
  Compass,
  Dumbbell,
  Sparkles,
  MessageCircle,
  Calendar,
  CheckCircle,
  Info,
} from 'lucide-react';
import { SERVICES_LIST } from '../data/servicesData';
import { CLINIC_INFO } from '../utils/whatsapp';

interface ServicesSectionProps {
  onSelectServiceForBooking: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(SERVICES_LIST.map((s) => s.category)))];

  const filteredServices =
    selectedCategory === 'All'
      ? SERVICES_LIST
      : SERVICES_LIST.filter((s) => s.category === selectedCategory);

  const renderIcon = (name: string) => {
    switch (name) {
      case 'Flame':
        return <Flame className="w-5 h-5" />;
      case 'HeartPulse':
        return <HeartPulse className="w-5 h-5" />;
      case 'Shield':
        return <Shield className="w-5 h-5" />;
      case 'Compass':
        return <Compass className="w-5 h-5" />;
      case 'Dumbbell':
        return <Dumbbell className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'Activity':
      default:
        return <Activity className="w-5 h-5" />;
    }
  };

  return (
    <section id="services" className="py-16 sm:py-20 bg-[#121216] border-t border-white/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-primary/15 text-brand-primary border border-brand-primary/30 text-xs font-semibold uppercase tracking-wider mb-3">
              Clinical Specializations
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Physiotherapy &amp; Rehabilitation Services
            </h2>
            <p className="mt-3 text-base text-gray-300 leading-relaxed">
              Targeted clinical programs designed to manage discomfort, re-establish joint biomechanics, and promote progressive functional strength.
            </p>
          </div>

          {/* Configurable Note Notice */}
          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#18181d] border border-white/15 text-xs text-gray-400 shadow-2xs">
            <Info className="w-4 h-4 text-brand-primary shrink-0" />
            <span>Clinic services are fully configurable in code</span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/25'
                  : 'bg-[#18181d] text-gray-300 border border-white/10 hover:border-brand-primary/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Cards Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const enquiryMessage = `Hello Functional Rehab Lab, I would like to enquire about your "${service.title}" service.`;
            const waUrl = `https://wa.me/${CLINIC_INFO.whatsappRawNumber}?text=${encodeURIComponent(enquiryMessage)}`;

            return (
              <div
                key={service.id}
                className="flex flex-col justify-between rounded-2xl bg-[#18181d] p-6 border border-white/10 shadow-xs hover:border-brand-primary/50 hover:bg-[#1c1c22] transition duration-200"
              >
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="w-11 h-11 rounded-xl bg-brand-primary/15 text-brand-primary flex items-center justify-center border border-brand-primary/20">
                      {renderIcon(service.iconName)}
                    </div>
                    <span className="text-[11px] font-semibold text-brand-primary bg-brand-primary/15 px-2.5 py-1 rounded-full border border-brand-primary/30">
                      {service.category}
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-white leading-snug">
                    {service.title}
                  </h3>

                  <p className="mt-2 text-xs text-gray-400 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Suitable Conditions Chips */}
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                      Common Focus Areas:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {service.suitableFor.map((item, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 text-[11px] text-gray-300 bg-[#222228] px-2 py-0.5 rounded-md border border-white/10"
                        >
                          <CheckCircle className="w-3 h-3 text-brand-primary shrink-0" />
                          <span>{item}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTAs: Enquire on WhatsApp & Book Slot */}
                <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-2 gap-2">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#25D366]/15 text-[#25D366] hover:bg-[#25D366]/25 border border-[#25D366]/30 font-bold text-xs transition"
                    title={`Enquire about ${service.title} via WhatsApp`}
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>

                  <button
                    onClick={() => onSelectServiceForBooking(service.id)}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-brand-primary text-white hover:bg-brand-hover font-bold text-xs transition shadow-lg shadow-brand-primary/20"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Slot</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
