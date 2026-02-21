import { useLanguage } from "@/context/LanguageContext";
import constructionImg from "@/assets/grid_full.webp";
import FadeIn from "@/components/animations/FadeIn";

export default function About() {
  const { t } = useLanguage();
  
  // Get localized values from dictionary
  const aboutValues = t("about.values");
  const quote = t("about.quote");

  return (
    <section id="about" className="py-12 lg:py-16 2xl:py-20 3xl:py-28 bg-gray-50/50">
      <div className="container mx-auto px-4 lg:px-6 xl:px-8 3xl:max-w-screen-2xl">
        <div className="grid lg:grid-cols-12 items-start relative">
          
          {/* Left: Large Feature Image */}
          <div className="lg:col-span-8 lg:col-start-1 lg:row-start-1 relative z-0 pr-0">
            <FadeIn direction="right" delay={0.1}>
              <div className="rounded-3xl overflow-hidden shadow-lg h-[400px] lg:h-[500px] xl:h-[600px] 3xl:h-[750px]">
                <img 
                  src={constructionImg} 
                  alt="About Arctech"
                  className="w-full h-full object-cover"
                />
              </div>
            </FadeIn>
          </div>

          {/* Right: Overlapping Content Card */}
          <div className="lg:col-span-6 lg:col-start-7 lg:row-start-1 relative z-10 mt-[-60px] lg:mt-32 xl:mt-40 2xl:mt-48 3xl:mt-64">
            <FadeIn direction="up" delay={0.3}>
              <div className="bg-white p-8 lg:py-8 lg:px-10 xl:py-10 xl:px-12 3xl:p-16 rounded-2xl shadow-xl border border-gray-100">
                
                {/* Tagline/Intro with Premium Styling */}
                <div className="relative mb-5">
                  <p className="text-slate-700 text-xl lg:text-2xl 3xl:text-3xl leading-relaxed pl-6 border-l-2 border-[var(--primary-brand)] italic">
                    "{quote}"
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 lg:gap-8 xl:gap-10 2xl:gap-12">
                  {Array.isArray(aboutValues) && aboutValues.map((value, index) => (
                    <div key={index} className="group">
                      <h3 className="text-lg xl:text-xl 2xl:text-2xl font-bold text-[var(--primary-brand)]">
                        {value.title}
                      </h3>
                      <p className="text-gray-500 text-base xl:text-lg 3xl:text-xl leading-relaxed">
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
