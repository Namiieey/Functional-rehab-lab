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
    <section id="services" className="py-16 sm:py-20 bg-[#fafbfc] border-t border-gray-100 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0d5c58]/10 text-[#0d5c58] text-xs font-semibold uppercase tracking-wider mb-3">
              Clinical Specializations
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight">
              Physiotherapy &amp; Rehabilitation Services
            </h2>
            <p className="mt-3 text-base text-gray-600 leading-relaxed">
              Targeted clinical programs designed to manage discomfort, re-establish joint biomechanics, and promote progressive functional strength.
            </p>
          </div>

          {/* Configurable Note Notice */}
          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-xs text-gray-500 shadow-2xs">
            <Info className="w-4 h-4 text-[#0d5c58] shrink-0" />
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
                  ? 'bg-[#0d5c58] text-white shadow-xs'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
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
                className="flex flex-col justify-between rounded-2xl bg-white p-6 border border-gray-200/80 shadow-2xs hover:border-[#0d5c58]/40 hover:shadow-xs transition duration-200"
              >
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#0d5c58]/10 text-[#0d5c58] flex items-center justify-center">
                      {renderIcon(service.iconName)}
                    </div>
                    <span className="text-[11px] font-semibold text-[#0d5c58] bg-[#0d5c58]/5 px-2.5 py-1 rounded-full border border-[#0d5c58]/15">
                      {service.category}
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-gray-900 leading-snug">
                    {service.title}
                  </h3>

                  <p className="mt-2 text-xs text-gray-600 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Suitable Conditions Chips */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                      Common Focus Areas:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {service.suitableFor.map((item, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 text-[11px] text-gray-600 bg-gray-50 px-2 py-0.5 rounded-md border border-gray-150"
                        >
                          <CheckCircle className="w-3 h-3 text-[#0d5c58]/70 shrink-0" />
                          <span>{item}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTAs: Enquire on WhatsApp & Book Slot */}
                <div className="mt-6 pt-4 border-t border-gray-100 grid grid-cols-2 gap-2">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#25D366]/10 text-[#128C7E] hover:bg-[#25D366]/20 font-bold text-xs transition"
                    title={`Enquire about ${service.title} via WhatsApp`}
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>

                  <button
                    onClick={() => onSelectServiceForBooking(service.id)}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#0d5c58] text-white hover:bg-[#094643] font-bold text-xs transition"
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
