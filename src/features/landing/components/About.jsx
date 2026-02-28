import { useLanguage } from "@/context/LanguageContext";
import constructionImg from "@/assets/grid_full.webp";
import FadeIn from "@/components/animations/FadeIn";

export default function About() {
  const { t } = useLanguage();
  
  // Get localized values from dictionary
  const aboutValues = t("about.values");
  const quote = t("about.quote");

  return (
    <section id="about" className="py-[clamp(3rem,6vw,5rem)] bg-gray-50/50">
      <div className="w-full max-w-[1280px] mx-auto px-[clamp(1rem,4vw,2rem)] @container">
        <div className="grid grid-cols-1 @4xl:grid-cols-12 items-start relative gap-8 @4xl:gap-0">

          {/* Left: Large Feature Image */}
          <div className="@4xl:col-span-8 @4xl:col-start-1 @4xl:row-start-1 relative z-0 pr-0">
            <FadeIn direction="right" delay={0.1}>
              {/* УМЕНЬШЕНО: h-[clamp(25rem...)] -> h-[clamp(20rem,40cqw,28rem)] */}
              {/* Теперь высота от 320px до 448px (вместо 400px-600px) */}
              <div className="rounded-3xl overflow-hidden shadow-lg h-[clamp(20rem,40cqw,28rem)]">
                <img 
                  src={constructionImg} 
                  alt="About Arctech"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </FadeIn>
          </div>

          {/* Right: Overlapping Content Card */}
          <div className="@4xl:col-span-6 @4xl:col-start-7 @4xl:row-start-1 relative z-10 @4xl:mt-[clamp(6rem,10cqw,9rem)]">
            <FadeIn direction="up" delay={0.3}>
              <div className="bg-white p-[clamp(1.5rem,4cqw,3rem)] rounded-3xl shadow-xl border border-gray-100">
                
                {/* Tagline/Intro with Premium Styling */}
                <div className="relative mb-[clamp(1.5rem,3cqw,2rem)]">
                  <p className="text-slate-700 text-[clamp(1.125rem,2.5cqw,1.5rem)] leading-relaxed pl-6 border-l-2 border-[var(--primary-brand)] italic">
                    "{quote}"
                  </p>
                </div>

                {/* Intrinsic Grid для ценностей */}
                <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-[clamp(1.5rem,3cqw,2rem)]">
                  {Array.isArray(aboutValues) && aboutValues.map((value, index) => (
                    <div key={index} className="group">
                      <h3 className="text-[clamp(1.125rem,2cqw,1.25rem)] font-bold text-[var(--primary-brand)] mb-2">
                        {value.title}
                      </h3>
                      <p className="text-gray-500 text-[clamp(0.875rem,1.2cqw,1rem)] leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  ))}
                </div>

              </div>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
}