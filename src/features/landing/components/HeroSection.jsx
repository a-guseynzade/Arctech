import { useState, useEffect } from "react";
<<<<<<< HEAD
=======
import { useLanguage } from "@/context/LanguageContext";
>>>>>>> feature
import { companyInfo } from "@/features/landing/data/landing-data";
import heroBg1 from "@/assets/bg/bg_full.webp";
import heroBg2 from "@/assets/bg/bg2_full.webp";
import heroBg3 from "@/assets/bg/bg3_full.webp";

const heroImages = [heroBg1, heroBg2, heroBg3];
<<<<<<< HEAD
const SLIDE_INTERVAL = 4000; // 6 seconds per slide

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
=======
const SLIDE_INTERVAL = 4000; // 4 seconds per slide

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { t } = useLanguage();
>>>>>>> feature

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroImages.length);
    }, SLIDE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen bg-[var(--dark)] overflow-hidden">
      {/* Background Slideshow */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-[1500ms] ease-in-out"
          style={{
            backgroundImage: `url(${image})`,
            opacity: index === activeIndex ? 1 : 0,
          }}
          aria-hidden={index !== activeIndex}
        />
      ))}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--dark)]/95 via-[var(--dark)]/80 to-[var(--dark)]/40" />

      {/* Content */}
      <div className="relative min-h-screen flex items-center justify-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white italic text-center">
<<<<<<< HEAD
          {companyInfo.tagline}
=======
          {t("hero.tagline")}
>>>>>>> feature
        </h1>
      </div>
    </section>
  );
}