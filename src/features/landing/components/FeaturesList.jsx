import { chooseUsValues } from "@/features/landing/data/landing-data";
import {
  Target,
  Handshake,
} from "lucide-react";
import constructionImg from "@/assets/grid_full.webp";

const iconMap = {
  Target,
  Handshake,
};

export default function FeaturesList() {
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
            Replacing the old-framed cards with replaced the old framed cards with a modern Bento Grid layout.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Left Column: Image Only */}
          <div className="lg:col-span-3 rounded-2xl overflow-hidden h-full min-h-[300px] lg:min-h-full">
            <img 
              src={constructionImg} 
              alt="Why Choose Us"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Column: Stacked items */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {chooseUsValues.map((value, index) => {
              const IconComponent = iconMap[value.icon];
              return (
            <div
              key={index}
              className="p-8 rounded-2xl bg-white border border-gray-200 shadow-sm flex-1 flex flex-col justify-center"
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center">
                  {IconComponent && (
                    <IconComponent className="w-6 h-6" strokeWidth={1.5} />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed text-base">
                    {value.description}
                  </p>
                </div>
              </div>
            </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
