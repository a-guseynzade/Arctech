import { FileText, ClipboardList, Wrench, Handshake } from "lucide-react";
import { processSteps } from "@/features/landing/data/landing-data";

const iconMap = {
  FileText,
  ClipboardList,
  Wrench,
  Handshake,
};

export default function ProcessSteps() {
  return (
    <section className="py-16 lg:py-20 bg-[var(--dark)]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step, index) => {
            const Icon = iconMap[step.icon];
            return (
              <div key={step.number} className="relative group">
                {/* Connector Line */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-1/2 w-full h-px bg-white/20" />
                )}

                <div className="text-center relative">
                  {/* Icon Container */}
                  <div className="relative inline-flex mb-6">
                    <div className="w-24 h-24 rounded-full bg-[var(--dark-lighter)] border-2 border-[var(--orange)]/30 flex items-center justify-center group-hover:border-[var(--orange)] transition-colors duration-300">
                      <Icon className="w-10 h-10 text-[var(--orange)]" />
                    </div>
                    {/* Number Badge */}
                    <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[var(--orange)] text-[var(--dark)] text-sm font-bold flex items-center justify-center">
                      {step.number}
                    </span>
                  </div>

                  {/* Text */}
                  <h3 className="text-white font-semibold text-lg mb-1">
                    {step.title}
                  </h3>
                  <p className="text-white/60 text-sm">{step.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
