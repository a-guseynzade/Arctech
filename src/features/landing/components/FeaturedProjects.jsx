import { useState, lazy, Suspense } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight } from "lucide-react";

import { projects, projectCategories, PREVIEW_LIMIT } from "@/features/landing/data/landing-data";
import { categoryData } from "@/features/landing/lib/category-data";
import { useImagePreloader } from "@/features/landing/hooks/useImagePreloader";
import { ProjectCard } from "./ProjectCard";

const GalleryModal = lazy(() => import("./GalleryModal"));

export default function FeaturedProjects() {
  const [activeCategory, setActiveCategory] = useState("All Works");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useImagePreloader(projects, PREVIEW_LIMIT);

  const handleImageClick = (index) => {
    setSelectedIndex(index);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const galleryImages = categoryData[activeCategory]?.galleryImages || allProjects;

  return (
    <section id="projects" className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--dark)]">
            Featured <span className="italic font-light">Project</span>
          </h2>

          <Tabs value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="bg-transparent h-auto flex-wrap gap-2">
              {projectCategories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="data-[state=active]:bg-[var(--primary-brand)] data-[state=active]:text-white bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Projects Grid */}
        {projectCategories.map((categoryName) => {
          const isActive = categoryName === activeCategory;
          const data = categoryData[categoryName];
          if (!data) return null;

          return (
            <div
              key={categoryName}
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${isActive ? "" : "hidden"}`}
              aria-hidden={!isActive}
            >
              {data.previewProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => handleImageClick(index)}
                />
              ))}
            </div>
          );
        })}

        {/* Explore All Link */}
        <div className="text-right mt-8">
          <a
            href="/projects"
            className="inline-flex items-center gap-2 text-[var(--primary-brand)] hover:text-[var(--primary-brand-dark)] font-semibold transition-colors"
          >
            Explore All Projects
            <ArrowRight className="w-4 h-4" />
          </a>
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
