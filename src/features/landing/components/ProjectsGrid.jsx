import { useState, lazy, Suspense } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight } from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";
import { projectCategoryKeys } from "@/features/landing/data/landing-data";
import { categoryData } from "@/features/landing/lib/category-data";
import { ProjectCard } from "./ProjectCard";
import FadeIn from "@/components/animations/FadeIn";

const GalleryModal = lazy(() => import("./GalleryModal"));

export default function ProjectsGrid() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { t } = useLanguage();

  // Get localized category labels
  const getCategoryLabel = (key) => t(`projects.categories.${key}`);

  const handleImageClick = (index) => {
    setSelectedIndex(index);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const galleryImages = categoryData[activeCategory]?.galleryImages || categoryData.all.galleryImages;

  return (
    <section id="projects" className="py-[clamp(1.5rem,3vw,2rem)] bg-white">
      <div className="w-full max-w-[1280px] mx-auto px-[clamp(1rem,4vw,2rem)]">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-[clamp(1rem,3vw,1.25rem)] mb-5">
          <h2 className="text-[clamp(1.875rem,4vw+1rem,2.5rem)] tracking-tight font-bold text-[var(--dark)]">
            {t("projects.title")} <span className="text-[var(--primary-brand)]">{t("projects.title_highlight")}</span>
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

        {/* Projects Grid */}
        {projectCategoryKeys.map((categoryKey) => {
          const isActive = categoryKey === activeCategory;
          const data = categoryData[categoryKey];
          if (!data) return null;

          return (
            <div
              key={categoryKey}
              className={`grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-4 lg:gap-5 ${isActive ? "" : "hidden"}`}
              aria-hidden={!isActive}
            >
              {data.previewProjects.slice(0, 6).map((project, index) => (
                <FadeIn key={project.id} delay={index * 0.1}>
                  <ProjectCard
                    project={project}
                    onClick={() => handleImageClick(index)}
                  />
                </FadeIn>
              ))}
            </div>
          );
        })}
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
