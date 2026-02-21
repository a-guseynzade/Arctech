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
    <section id="projects" className="py-12 lg:py-16 bg-white">
      <div className="w-full max-w-[1440px] mx-auto px-[clamp(1.5rem,5vw,8rem)]">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <h2 className="text-[clamp(1.75rem,3vw,3.25rem)] font-bold text-[var(--dark)]">
            {t("projects.title")} <span className="text-[var(--primary-brand)]">{t("projects.title_highlight")}</span>
          </h2>

          <Tabs value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="bg-transparent h-auto flex-wrap gap-2">
              {projectCategoryKeys.map((categoryKey) => (
                <TabsTrigger
                  key={categoryKey}
                  value={categoryKey}
                  className="data-[state=active]:bg-[var(--primary-brand)] data-[state=active]:text-white bg-[var(--primary-brand)]/10 text-[var(--dark)] px-4 py-2 rounded-full text-[clamp(0.8125rem,1vw,0.9375rem)]"
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
              className={`grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-[clamp(1rem,1.5vw,2rem)] ${isActive ? "" : "hidden"}`}
              aria-hidden={!isActive}
            >
              {data.previewProjects.map((project, index) => (
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

        <div className="text-right mt-8">
          <button
            className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--primary-brand)]/10 text-[var(--dark)] font-semibold transition-colors duration-500 hover:text-white overflow-hidden"
          >
            <span className="relative z-10">{t("projects.catalog_btn")}</span>
            <span className="relative z-10 flex items-center justify-center size-6 rounded-full bg-white text-[var(--primary-brand)] transition-colors duration-500 group-hover:bg-white group-hover:text-[var(--primary-brand)] shadow-sm">
              <ArrowRight className="w-3 h-3" />
            </span>
            <span className="absolute right-5 top-1/2 -translate-y-1/2 size-8 bg-[var(--primary-brand)] rounded-full -z-0 transition-transform duration-500 scale-0 group-hover:scale-[25] origin-center" />
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
