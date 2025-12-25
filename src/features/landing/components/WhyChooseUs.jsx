import { chooseUsValues } from "@/features/landing/data/landing-data";
import {
  Target,
  Award,
  Handshake,
  ShieldCheck,
  Lightbulb,
  Leaf,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const iconMap = {
  Target,
  Award,
  Handshake,
  ShieldCheck,
  Lightbulb,
  Leaf,
};

export default function WhyChooseUs() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--dark)] mb-6">
             Why Choose{" "}
            <span className="text-[var(--primary-brand)]">Us</span>
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            These principles guide everything we do, from the smallest detail to the biggest project.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {chooseUsValues.map((value, index) => {
            const IconComponent = iconMap[value.icon];
            return (
              <Card
                key={index}
                className="group relative bg-white border border-gray-100 hover:border-[var(--primary-brand)]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[var(--primary-brand)]/5 overflow-hidden"
              >
                {/* Decorative gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-brand)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <CardContent className="relative p-8">
                  {/* Icon Container */}
                  <div className="w-14 h-14 rounded-2xl bg-[var(--primary-brand)]/10 flex items-center justify-center mb-6 group-hover:bg-[var(--primary-brand)] group-hover:scale-110 transition-all duration-300">
                    {IconComponent && (
                      <IconComponent className="w-7 h-7 text-[var(--primary-brand)] group-hover:text-white transition-colors duration-300" />
                    )}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-[var(--dark)] mb-3 group-hover:text-[var(--primary-brand)] transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
