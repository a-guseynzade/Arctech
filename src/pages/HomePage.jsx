import HeroSection from "@/features/landing/components/HeroSection";
import WhyChooseUs from "@/features/landing/components/WhyChooseUs";
import ProcessSteps from "@/features/landing/components/ProcessSteps";
import FeaturedProjects from "@/features/landing/components/FeaturedProjects";
import RequestQuote from "@/features/landing/components/RequestQuote";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProjects />
      <ProcessSteps />
      <WhyChooseUs />
      <RequestQuote />
    </>
  );
}
