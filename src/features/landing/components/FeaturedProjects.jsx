import { useState, useCallback, lazy, Suspense } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight } from "lucide-react";
import { OptimizedImage } from "@/components/common/OptimizedImage";
import { projects, projectCategories } from "@/features/landing/data/landing-data";

// Lazy load GalleryModal - only loads when user opens it
const GalleryModal = lazy(() => import("./GalleryModal"));

export default function FeaturedProjects() {
  const [activeCategory, setActiveCategory] = useState("All Works");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredProjects =
    activeCategory === "All Works"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  // Memoized handlers for stable references
  const handleImageClick = useCallback((index) => {
    setSelectedIndex(index);
    setModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setModalOpen(false);
  }, []);

  return (
    <section id="projects" className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--dark)]">
            Featured <span className="italic font-light">Project</span>
          </h2>

          {/* Tabs */}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.slice(0, 3).map((project, index) => (
            <Card
              key={project.id}
              onClick={() => handleImageClick(index)}
              className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            >
              <div className="relative overflow-hidden h-64">
                <OptimizedImage
                  src={project.thumbnail}
                  alt={project.alt}
                  className="w-full h-full"
                  imgClassName="group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark)]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </Card>
          ))}
        </div>

        {/* Explore All Link */}
        <div className="text-right mt-8">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-[var(--primary-brand)] hover:text-[var(--primary-brand-dark)] font-semibold transition-colors"
          >
            Explore All Projects
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Gallery Modal - Lazy loaded with Suspense */}
      <Suspense fallback={null}>
        <GalleryModal
          images={filteredProjects}
          initialIndex={selectedIndex}
          open={modalOpen}
          onClose={handleModalClose}
        />
      </Suspense>
    </section>
  );
}

