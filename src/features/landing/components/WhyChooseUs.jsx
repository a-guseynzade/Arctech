import { Check } from "lucide-react";
import { ctaFeatures } from "@/features/landing/data/landing-data";

export default function WhyChooseUs() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[var(--orange)]/10 text-[var(--orange)] px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Check className="w-4 h-4" />
            Why Choose Us
          </div>

          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--dark)] leading-tight mb-8">
            Leading Way In Building &
            <br />
            <span className="italic font-light">Civil Construction</span>
          </h2>

          {/* Features */}
          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10">
            {ctaFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[var(--orange)] flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-[var(--dark)] font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
