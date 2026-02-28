import HeroSection from "@/features/landing/components/HeroSection";
import About from "@/features/landing/components/About";
import PartnersMarquee from "@/features/landing/components/PartnersMarquee";
import ProjectsGrid from "@/features/landing/components/ProjectsGrid";
import RequestQuote from "@/features/landing/components/RequestQuote";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProjectsGrid />
      <About />
      <PartnersMarquee />
      <RequestQuote />
    </>
  );
}
