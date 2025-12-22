import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { stats, heroFeatures, companyInfo } from "@/features/landing/data/landing-data";
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
              We Prepare
              <br />
              For The{" "}
              <span className="text-[var(--orange)] italic font-light">Future</span>
            </h1>
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              {companyInfo.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Button className="bg-[var(--orange)] hover:bg-[var(--orange-dark)] text-white font-semibold px-6 py-6 text-base">
                Our Services
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-6 py-6 text-base"
              >
                View Project
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 lg:gap-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-baseline justify-center">
                    <span className="text-3xl lg:text-4xl font-bold text-[var(--orange)]">
                      {stat.value}
                    </span>
                    <span className="text-2xl text-[var(--orange)]">{stat.suffix}</span>
                  </div>
                  <p className="text-white/60 text-sm mt-1">
                    {stat.label}
                    <br />
                    {stat.sublabel}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Feature Badges */}
          <div className="hidden lg:block">
            <div className="bg-[var(--orange)] rounded-lg p-6 max-w-sm ml-auto transform translate-y-20">
              <div className="space-y-4">
                {heroFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[var(--dark)] mt-0.5 flex-shrink-0" />
                    <p className="text-[var(--dark)] font-medium text-sm">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Features Badge */}
      <div className="lg:hidden bg-[var(--orange)] py-6 px-4">
        <div className="container mx-auto">
          <div className="grid gap-4">
            {heroFeatures.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[var(--dark)] mt-0.5 flex-shrink-0" />
                <p className="text-[var(--dark)] font-medium text-sm">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
