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
      <div className="container mx-auto px-4 lg:px-6 xl:px-8 3xl:max-w-screen-2xl mb-10">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl 3xl:text-6xl font-bold text-[var(--dark)] mb-6">
            {t("partners.title")} <span className="text-[var(--primary-brand)]">{t("partners.title_highlight")}</span>
          </h2>
        </div>
      </div>

      {/* Marquee Container with Premium Card Styling */}
      <div className="container mx-auto px-4 lg:px-6 xl:px-8 3xl:max-w-screen-2xl">
        <FadeIn duration={1.0}>
          <div className="relative p-6 lg:p-8 xl:p-10 2xl:p-12 3xl:p-16 rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden">
            {/* Gradient Edge Fades - matching card background */}
            <div className="absolute inset-y-0 left-0 w-24 sm:w-32 lg:w-32 xl:w-40 2xl:w-48 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 sm:w-32 lg:w-32 xl:w-40 2xl:w-48 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

            {/* Marquee Track */}
            <div className="flex w-max animate-marquee hover:[animation-play-state:paused] will-change-transform transform-gpu gap-10 sm:gap-14 lg:gap-16 xl:gap-20 2xl:gap-24 3xl:gap-32">
              {/* Render logos twice for seamless loop */}
              {[...logos, ...logos].map((src, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 flex items-center justify-center w-28 sm:w-32 lg:w-36 xl:w-40 2xl:w-44 3xl:w-56 h-12 sm:h-14 lg:h-16 xl:h-18 2xl:h-20 3xl:h-24 group"
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
