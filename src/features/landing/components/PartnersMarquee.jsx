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
      <div className="w-full max-w-[1280px] mx-auto px-[clamp(1rem,4vw,2rem)] mb-[clamp(2rem,5vw,3rem)]">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-[clamp(1.875rem,4vw,2.5rem)] tracking-tight font-bold text-[var(--dark)] mb-6">
            {t("partners.title")} <span className="text-[var(--primary-brand)]">{t("partners.title_highlight")}</span>
          </h2>
        </div>
      </div>

      {/* Marquee Container with Premium Card Styling */}
      <div className="w-full max-w-[1280px] mx-auto px-[clamp(1rem,4vw,2rem)]">
        <FadeIn duration={1.0}>
          <div className="relative p-[clamp(1.5rem,3vw,2.5rem)] rounded-3xl bg-white border border-gray-200 shadow-sm overflow-hidden">
            {/* Gradient Edge Fades - matching card background */}
            <div className="absolute inset-y-0 left-0 w-[clamp(6rem,10vw,8rem)] bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-[clamp(6rem,10vw,8rem)] bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />
            {/* Marquee Track */}
            <div className="flex w-max animate-marquee hover:[animation-play-state:paused] will-change-transform transform-gpu gap-[clamp(3rem,8vw,6rem)]">
              {/* Render logos twice for seamless loop */}
              {[...logos, ...logos].map((src, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 flex items-center justify-center w-[clamp(7rem,12vw,10rem)] h-[clamp(3rem,6vw,5rem)] group"
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
