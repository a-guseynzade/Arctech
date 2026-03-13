import { useState, useEffect, lazy, Suspense } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ArrowRight } from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";
import { projectCategoryKeys } from "@/features/landing/data/landing-data";
import { categoryData } from "@/features/landing/lib/category-data";
import { ProjectCard } from "./ProjectCard";
import FadeIn from "@/components/animations/FadeIn";
import { cn } from "@/lib/utils";

const GalleryModal = lazy(() => import("./GalleryModal"));

/** Embla options: swipeable carousel on mobile, deactivated on md+ */
const CAROUSEL_OPTS = {
  align: "start",
  containScroll: "trimSnaps",
  breakpoints: {
    "(min-width: 768px)": { active: false },
  },
};

/**
 * Dot indicators for mobile carousel navigation.
 * Active dot stretches into a pill shape for clear affordance.
 * Hidden on md+ via parent wrapper.
 */
function DotIndicators({ api }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  useEffect(() => {
    if (!api) return;

    const onInit = () => {
      setScrollSnaps(api.scrollSnapList());
      setSelectedIndex(api.selectedScrollSnap());
    };
    const onSelect = () => setSelectedIndex(api.selectedScrollSnap());

    onInit();
    api.on("reInit", onInit);
    api.on("select", onSelect);

    return () => {
      api.off("reInit", onInit);
      api.off("select", onSelect);
    };
  }, [api]);

  if (scrollSnaps.length <= 1) return null;

  return (
    <div className="flex justify-center gap-1.5 pt-4 md:hidden" aria-hidden="true">
      {scrollSnaps.map((_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => api?.scrollTo(index)}
          className={cn(
            "h-2 rounded-full transition-all duration-300",
            index === selectedIndex
              ? "w-6 bg-[var(--primary-brand)]"
              : "w-2 bg-[var(--primary-brand)]/20"
          )}
        />
      ))}
    </div>
  );
}

export default function ProjectsGrid() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [carouselApi, setCarouselApi] = useState(null);
  const { t } = useLanguage();

  const getCategoryLabel = (key) => t(`projects.categories.${key}`);

  const handleImageClick = (projectId) => {
    const realIndex = activeData.galleryIndexById.get(projectId) ?? 0;
    setSelectedIndex(realIndex);
    setModalOpen(true);
  };

  const handleModalClose = () => setModalOpen(false);

  const activeData = categoryData[activeCategory];
  const galleryImages =
    activeData?.galleryImages || categoryData.all.galleryImages;

  return (
    <section id="projects" className="py-[clamp(1.5rem,3vw,2rem)] bg-white">
      <div className="w-full max-w-[1280px] mx-auto px-[clamp(1rem,4vw,2rem)]">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-[clamp(1rem,3vw,1.25rem)] mb-5">
          <h2 className="text-[clamp(1.875rem,4vw+1rem,2.5rem)] tracking-tight font-bold text-[var(--dark)]">
            {t("projects.title")}{" "}
            <span className="text-[var(--primary-brand)]">
              {t("projects.title_highlight")}
            </span>
          </h2>

          <Tabs value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="bg-transparent h-auto flex flex-wrap gap-[clamp(0.5rem,1.5vw,0.75rem)] p-0 m-0">
              {projectCategoryKeys.map((categoryKey) => (
                <TabsTrigger
                  key={categoryKey}
                  value={categoryKey}
                  className="data-[state=active]:bg-[var(--primary-brand)] data-[state=active]:text-white bg-[var(--primary-brand)]/10 text-[var(--dark)] px-[clamp(1rem,2vw,1.25rem)] py-[clamp(0.5rem,1vw,0.625rem)] rounded-full text-[clamp(0.75rem,1vw+0.5rem,0.875rem)] font-medium"
                >
                  {getCategoryLabel(categoryKey)}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Projects: Swipe carousel on mobile, CSS grid on md+ */}
        {activeData && (
          <FadeIn key={activeCategory}>
            <Carousel
              opts={CAROUSEL_OPTS}
              setApi={setCarouselApi}
              className="[&_[data-slot=carousel-content]]:md:overflow-visible"
            >
              <CarouselContent className="md:ml-0 md:grid md:grid-cols-[repeat(auto-fit,minmax(320px,1fr))] md:gap-4 lg:gap-5">
                {activeData.previewProjects.slice(0, 6).map((project, index) => (
                  <CarouselItem
                    key={project.id}
                    className="basis-[85%] sm:basis-[70%] md:basis-auto md:pl-0"
                  >
                  <div className="pointer-events-none md:pointer-events-auto">
                    <ProjectCard
                      project={project}
                      onClick={() => handleImageClick(project.id)}
                    />
                  </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </FadeIn>
        )}

        <DotIndicators api={carouselApi} />

        <div className="flex justify-end mt-4 md:mt-6">
          <button
            className="group relative inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[var(--primary-brand)]/10 text-[var(--dark)] text-sm font-semibold transition-colors duration-500 hover:text-white overflow-hidden"
          >
            <span className="relative z-10">{t("projects.catalog_btn")}</span>
            <span className="relative z-10 flex items-center justify-center w-7 h-7 rounded-full bg-white text-[var(--primary-brand)] transition-colors duration-500 shadow-sm group-hover:translate-x-1">
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
            <span className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-[var(--primary-brand)] rounded-full -z-0 transition-transform duration-500 scale-0 group-hover:scale-[25] origin-center" />
          </button>
        </div>
      </div>

      {/* Gallery Modal */}
      <Suspense fallback={null}>
        <GalleryModal
          images={galleryImages}
          initialIndex={selectedIndex}
          open={modalOpen}
          onClose={handleModalClose}
        />
      </Suspense>
    </section>
  );
}
