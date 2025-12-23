import HeroSection from "@/features/landing/components/HeroSection";
import ExperienceSection from "@/features/landing/components/ExperienceSection";
import ProcessSteps from "@/features/landing/components/ProcessSteps";
import FeaturedProjects from "@/features/landing/components/FeaturedProjects";
import WhyChooseUs from "@/features/landing/components/WhyChooseUs";
import RequestQuote from "@/features/landing/components/RequestQuote";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ExperienceSection />
      <ProcessSteps />
      <FeaturedProjects />
      <WhyChooseUs />
      <RequestQuote />
    </>
  );
}
