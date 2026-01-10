import HeroSection from "@/features/landing/components/HeroSection";
import WhyChooseUs from "@/features/landing/components/FeaturesList";
import ProcessSteps from "@/features/landing/components/ProcessSteps";
import ProjectsGrid from "@/features/landing/components/ProjectsGrid";
import RequestQuote from "@/features/landing/components/RequestQuote";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProjectsGrid />
      <ProcessSteps />
      <WhyChooseUs />
      <RequestQuote />
    </>
  );
}
