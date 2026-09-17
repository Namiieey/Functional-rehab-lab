import React from 'react';
import { Target, Compass, Sparkles, Check, ArrowRight } from 'lucide-react';

interface AboutSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigate }) => {
  return (
    <section id="about" className="py-16 sm:py-20 bg-[#0d0d10] border-t border-white/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-primary/15 text-brand-primary border border-brand-primary/30 text-xs font-semibold uppercase tracking-wider mb-3">
            About Our Practice
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Restoring Functional Movement Through Evidence-Informed Physiotherapy
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-300 leading-relaxed">
            At Functional Rehab Lab in Anayara, Thiruvananthapuram, our practice is grounded in a thorough understanding of human biomechanics and structured functional recovery. Rather than focusing solely on temporary symptom relief, we assess the complete kinetic chain to help you rebuild natural, confident movement.
          </p>
        </div>

        {/* 4 Pillars of Care */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-[#18181d] border border-white/10 hover:border-brand-primary/50 transition space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-primary/15 text-brand-primary flex items-center justify-center font-bold">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Personalised Rehabilitation</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Every injury and body responds differently. We formulate treatment plans based on detailed clinical evaluation, movement patterns, and your lifestyle demands.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#18181d] border border-white/10 hover:border-brand-primary/50 transition space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-primary/15 text-brand-primary flex items-center justify-center font-bold">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Functional Recovery</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              We focus on restoring meaningful daily physical function—whether that means sitting comfortably at your desk, climbing stairs pain-free, or returning to athletic training.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#18181d] border border-white/10 hover:border-brand-primary/50 transition space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-primary/15 text-brand-primary flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Patient-Centred Care</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              You are an active partner in your rehabilitation. We explain your condition clearly, set transparent milestones together, and empower you with self-management strategies.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#18181d] border border-white/10 hover:border-brand-primary/50 transition space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-primary/15 text-brand-primary flex items-center justify-center font-bold">
              <Check className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Structured Plans</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Care follows progressive, phased protocols from acute symptom control to progressive loading and long-term functional stability, preventing injury recurrence.
            </p>
          </div>
        </div>

        {/* Location & Practice Note */}
        <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-[#16161b] border border-brand-primary/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1 max-w-2xl">
            <h4 className="text-sm font-bold text-white">
              Conveniently Located in Anayara, Thiruvananthapuram
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Situated near KIMS Rd, Oruvathilkotta, our clinic offers accessible, modern rehabilitation care for patients across Thiruvananthapuram.
            </p>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-primary text-white text-xs font-bold hover:bg-brand-hover transition shrink-0 shadow-lg shadow-brand-primary/25"
          >
            <span>View Clinic Location &amp; Map</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
