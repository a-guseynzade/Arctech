import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import FadeIn from "@/components/animations/FadeIn";

// Dynamic logo imports
const logoModules = import.meta.glob("@/assets/partners/*.webp", {
  eager: true,
  import: "default",
});
const logos = Object.values(logoModules);

export default function PartnersMarquee({ className }) {
  const { t } = useLanguage();

  return (
    <section
      className={cn(
        "py-12 lg:py-16 bg-white overflow-hidden",
        className
      )}
    >
      {/* Section Header - matching FeaturesList styling */}
      <div className="container mx-auto px-4 lg:px-8 mb-10">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--dark)] mb-6 whitespace-nowrap">
            {t("partners.title")} <span className="text-[var(--primary-brand)]">{t("partners.title_highlight")}</span>
          </h2>
        </div>
      </div>

      {/* Marquee Container with Premium Card Styling */}
      <div className="container mx-auto px-4 lg:px-8">
        <FadeIn duration={1.0}>
          <div className="relative p-8 lg:p-12 rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden">
            {/* Gradient Edge Fades - matching card background */}
            <div className="absolute inset-y-0 left-0 w-24 sm:w-32 lg:w-48 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 sm:w-32 lg:w-48 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

            {/* Marquee Track */}
            <div className="flex w-max animate-marquee hover:[animation-play-state:paused] will-change-transform transform-gpu gap-12 sm:gap-16 lg:gap-24">
              {/* Render logos twice for seamless loop */}
              {[...logos, ...logos].map((src, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 flex items-center justify-center w-32 sm:w-36 lg:w-44 h-14 sm:h-16 lg:h-20 group"
                >
                  <img
                    src={src}
                    alt=""
                    className="max-w-full max-h-full w-auto h-auto object-contain"
                    loading="lazy"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
