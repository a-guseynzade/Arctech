import { useEffect, useCallback, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/**
 * Gallery Modal with optimized image slider
 * Features:
 * - Full-screen modal with carousel
 * - Prefetches prev/next images for smooth navigation
 * - Keyboard navigation (arrows + escape)
 * - Click outside or X to close
 */
export function GalleryModal({ images, initialIndex = 0, open, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [api, setApi] = useState(null);

  // Sync carousel with initialIndex when modal opens
  useEffect(() => {
    if (open && api) {
      api.scrollTo(initialIndex, true);
      setCurrentIndex(initialIndex);
    }
  }, [open, initialIndex, api]);

  // Track carousel slide changes
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrentIndex(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    return () => api.off("select", onSelect);
  }, [api]);

  // Prefetch adjacent images
  useEffect(() => {
    if (!open || images.length === 0) return;

    const prefetchImage = (src) => {
      if (!src) return;
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = src;
      document.head.appendChild(link);
      return link;
    };

    const links = [];
    
    // Prefetch current, prev, and next
    const indicesToPrefetch = [
      currentIndex,
      currentIndex - 1,
      currentIndex + 1,
    ].filter((i) => i >= 0 && i < images.length);

    indicesToPrefetch.forEach((i) => {
      if (!loadedImages.has(i)) {
        const link = prefetchImage(images[i]?.image);
        if (link) links.push(link);
      }
    });

    // Cleanup preload links on unmount
    return () => {
      links.forEach((link) => link.remove());
    };
  }, [open, currentIndex, images, loadedImages]);

  // Mark image as loaded
  const handleImageLoad = useCallback((index) => {
    setLoadedImages((prev) => new Set([...prev, index]));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft" && api) {
        api.scrollPrev();
      } else if (e.key === "ArrowRight" && api) {
        api.scrollNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, api]);

  if (!images || images.length === 0) return null;

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogPrimitive.Portal>
        {/* Full-screen overlay */}
        <DialogPrimitive.Overlay 
          className="fixed inset-0 z-[100] bg-black/95 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        />
        
        {/* Full-screen content container */}
        <DialogPrimitive.Content 
          className="fixed inset-0 z-[101] flex items-center justify-center outline-none p-4 md:p-8"
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          {/* Hidden title for accessibility */}
          <DialogPrimitive.Title className="sr-only">
            Gallery
          </DialogPrimitive.Title>
          
          {/* Main container with max width - controls positioned relative to this */}
          <div className="relative w-full max-w-5xl mx-auto">
            
            {/* Top controls - positioned relative to image container */}
            <div className="absolute -top-12 md:-top-14 left-0 right-0 flex items-center justify-between z-10">
              {/* Image counter with background pill */}
              <div className="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium">
                {currentIndex + 1} / {images.length}
              </div>
              
              {/* Close button - prominent with background */}
              <Button
                variant="ghost"
                size="icon"
                className="bg-black/60 backdrop-blur-sm hover:bg-white/20 text-white h-10 w-10 rounded-full"
                onClick={onClose}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Carousel wrapper with space for desktop arrows */}
            <div className="md:px-20">
              <Carousel
                setApi={setApi}
                className="w-full"
                opts={{
                  startIndex: initialIndex,
                  loop: true,
                }}
              >
                <CarouselContent>
                  {images.map((project, index) => (
                    <CarouselItem
                      key={project.id}
                      className="flex items-center justify-center"
                    >
                      <div className="relative w-full flex items-center justify-center">
                        {/* Loading skeleton */}
                        {!loadedImages.has(index) && (
                          <Skeleton className="w-full aspect-video max-h-[70vh] rounded-lg" />
                        )}
                        
                        {/* Full-size image with proper containment */}
                        <img
                          src={project.image}
                          alt={project.alt}
                          onLoad={() => handleImageLoad(index)}
                          className={cn(
                            "max-w-full max-h-[70vh] w-auto h-auto object-contain rounded-lg shadow-2xl",
                            "transition-opacity duration-300",
                            loadedImages.has(index) ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                {/* Navigation arrows - Responsive positioning */}
                {/* Mobile: inside image with overlay style */}
                {/* Desktop: completely outside image container */}
                <CarouselPrevious 
                  className={cn(
                    "h-12 w-12 md:h-14 md:w-14 shadow-xl",
                    // Mobile: inside, overlay style
                    "left-2 bg-black/50 hover:bg-black/70 text-white border-none",
                    // Desktop: outside image container
                    "md:left-0 md:-translate-x-full md:ml-[-1rem] md:bg-black/70 md:hover:bg-black/90 md:border-2 md:border-white/30 md:hover:border-white/50"
                  )}
                />
                <CarouselNext 
                  className={cn(
                    "h-12 w-12 md:h-14 md:w-14 shadow-xl",
                    // Mobile: inside, overlay style
                    "right-2 bg-black/50 hover:bg-black/70 text-white border-none",
                    // Desktop: outside image container
                    "md:right-0 md:translate-x-full md:mr-[-1rem] md:bg-black/70 md:hover:bg-black/90 md:border-2 md:border-white/30 md:hover:border-white/50"
                  )}
                />
              </Carousel>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export default GalleryModal;

