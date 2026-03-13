import HeroSection from "@/features/landing/components/HeroSection";
import About from "@/features/landing/components/About";
import PartnersMarquee from "@/features/landing/components/PartnersMarquee";
import ProjectsGrid from "@/features/landing/components/ProjectsGrid";
import RequestQuote from "@/features/landing/components/RequestQuote";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { navLinksData } from "@/features/landing/data/landing-data";

export default function HomePage() {
  // Extract simple string IDs without the hash ('projects', 'about', 'services')
  // We expect the first one '' to be handled internally by useScrollSpy mapping to 'home'
  const sectionIds = navLinksData.en.map(link => link.href.replace('#', ''));
  useScrollSpy(sectionIds);

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
