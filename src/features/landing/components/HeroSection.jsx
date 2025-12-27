import { companyInfo } from "@/features/landing/data/landing-data";
import heroBg from "@/assets/hero-bg.png";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-[var(--dark)] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--dark)]/95 via-[var(--dark)]/80 to-[var(--dark)]/40" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 lg:px-8 pt-32 lg:pt-40 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              {companyInfo.tagline}
            </h1>
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              {companyInfo.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
              // We Prepare
              // <br />
              // For The{" "}
              // <span className="text-[var(--orange)] italic font-light">Future</span>