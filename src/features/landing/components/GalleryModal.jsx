import { useEffect, useCallback, useState, memo } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

// ============================================================================
// MEMOIZED SUB-COMPONENTS (UI Shell Pattern)
// These components only re-render when their specific props change
// ============================================================================

/**
 * Modal header with counter and close button
 * Only re-renders when currentIndex or totalImages changes
 */
const ModalHeader = memo(function ModalHeader({ 
  currentIndex, 
  totalImages, 
  onClose 
}) {
  return (
    <div className="fixed top-0 left-0 right-0 z-[104] flex items-center justify-between px-4 py-4 md:px-8">
      {/* Image counter with background pill */}
      <div className="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium">
        {currentIndex + 1} / {totalImages}
      </div>
      
      {/* Close button */}
      <Button
        variant="ghost"
        size="icon"
        className="bg-black/60 backdrop-blur-sm hover:bg-white/20 text-white h-10 w-10 rounded-full"
        onClick={onClose}
      >
        <X className="h-5 w-5" />
      </Button>
    </div>
  );
});

/**
 * Navigation buttons (prev/next arrows)
 * Decoupled from content loading state to prevent layout shifts
 */
const NavigationButtons = memo(function NavigationButtons({ 
  onPrev, 
  onNext 
}) {
  return (
    <>
      {/* Previous button */}
      <button
        onClick={onPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center cursor-pointer bg-white/15 backdrop-blur-md border border-white/20 hover:bg-white/30 hover:scale-105 transition-all duration-200"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-6 w-6 md:h-7 md:w-7 text-white" />
      </button>

      {/* Next button */}
      <button
        onClick={onNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center cursor-pointer bg-white/15 backdrop-blur-md border border-white/20 hover:bg-white/30 hover:scale-105 transition-all duration-200"
        aria-label="Next image"
      >
        <ChevronRight className="h-6 w-6 md:h-7 md:w-7 text-white" />
      </button>
    </>
  );
});

/**
 * Individual slide item with glassmorphism effect
 * Only re-renders when its own loaded state or image changes
 */
const SlideItem = memo(function SlideItem({ 
  project, 
  isLoaded, 
  onLoad 
}) {
  return (
    <CarouselItem className="flex items-center justify-center">
      {/* Glassmorphism container with blurred background */}
      <div className="relative w-[80vw] h-[75vh] max-w-5xl rounded-2xl overflow-hidden">
        {/* Blurred background layer - uses current image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${project.image})`,
            filter: 'blur(40px) brightness(0.6)',
            transform: 'scale(1.2)'
          }}
        />
        
        {/* Dark overlay for better contrast */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Foreground content layer */}
        <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
          {/* Loading skeleton */}
          {!isLoaded && (
            <Skeleton className="w-full h-full rounded-xl" />
          )}
          
          {/* Sharp foreground image - flat, no shadow */}
          <img
            src={project.image}
            alt={project.alt}
            onLoad={onLoad}
            className={cn(
              "max-w-full max-h-full object-contain",
              "transition-opacity duration-300",
              isLoaded ? "opacity-100" : "opacity-0 absolute"
            )}
          />
        </div>
      </div>
    </CarouselItem>
  );
});

// ============================================================================
// IMAGE PRELOADING UTILITY
// Uses in-memory Image() constructor for better browser cache utilization
// ============================================================================

/**
 * Preload an image into browser cache
 * @param {string} src - Image source URL
 * @returns {Promise<void>}
 */
const preloadImage = (src) => {
  if (!src) return Promise.resolve();
  
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = resolve;
    img.onerror = resolve; // Don't block on errors
    img.src = src;
  });
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Gallery Modal with optimized image slider
 * 
 * Performance Features:
 * - Memoized sub-components (UI Shell pattern)
 * - In-memory image preloading for smooth transitions
 * - useCallback for stable handler references
 * - Keyboard navigation (arrows + escape)
 * - Body scroll lock when open
 * - State reset on close
 * 
 * @param {Object} props
 * @param {Array} props.images - Array of project objects with image, alt, id
 * @param {number} props.initialIndex - Starting slide index
 * @param {boolean} props.open - Modal open state
 * @param {Function} props.onClose - Close handler
 */
export function GalleryModal({ images, initialIndex = 0, open, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [api, setApi] = useState(null);

  // -------------------------------------------------------------------------
  // MEMOIZED HANDLERS
  // -------------------------------------------------------------------------
  
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handlePrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const handleNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const handleImageLoad = useCallback((index) => {
    setLoadedImages((prev) => new Set([...prev, index]));
  }, []);

  const handleOpenChange = useCallback((isOpen) => {
    if (!isOpen) onClose();
  }, [onClose]);

  // -------------------------------------------------------------------------
  // EFFECTS
  // -------------------------------------------------------------------------

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

  // Prefetch adjacent images using in-memory Image() constructor
  useEffect(() => {
    if (!open || images.length === 0) return;

    // Prefetch current, prev, and next
    const indicesToPrefetch = [
      currentIndex,
      currentIndex - 1,
      currentIndex + 1,
    ].filter((i) => i >= 0 && i < images.length);

    indicesToPrefetch.forEach((i) => {
      if (!loadedImages.has(i)) {
        preloadImage(images[i]?.image);
      }
    });
  }, [open, currentIndex, images, loadedImages]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        api?.scrollPrev();
      } else if (e.key === "ArrowRight") {
        api?.scrollNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, api]);

  // Body scroll lock when modal is open
  useEffect(() => {
    if (open) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [open]);

  // Reset loaded images state when modal closes
  useEffect(() => {
    if (!open) {
      setLoadedImages(new Set());
    }
  }, [open]);

  // -------------------------------------------------------------------------
  // RENDER
  // -------------------------------------------------------------------------

  if (!images || images.length === 0) return null;

  return (
    <DialogPrimitive.Root open={open} onOpenChange={handleOpenChange}>
      <DialogPrimitive.Portal>
        {/* Transparent overlay for click-outside-to-close behavior */}
        <DialogPrimitive.Overlay 
          className="fixed inset-0 z-[100] bg-transparent"
        />
        
        {/* Full-screen content container */}
        <DialogPrimitive.Content 
          className="fixed inset-0 z-[101] outline-none"
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          {/* Hidden title for accessibility */}
          <DialogPrimitive.Title className="sr-only">
            Gallery
          </DialogPrimitive.Title>

          {/* Memoized header - only re-renders on index change */}
          <ModalHeader 
            currentIndex={currentIndex}
            totalImages={images.length}
            onClose={handleClose}
          />

          {/* Main content area - centered */}
          <div className="fixed inset-0 z-[102] flex items-center justify-center py-16 md:py-20">
            {/* Wrapper for carousel and fixed navigation buttons */}
            <div className="relative w-full max-w-5xl flex items-center justify-center">
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
                    <SlideItem
                      key={project.id}
                      project={project}
                      isLoaded={loadedImages.has(index)}
                      onLoad={() => handleImageLoad(index)}
                    />
                  ))}
                </CarouselContent>
              </Carousel>

              {/* Memoized navigation - never re-renders unless handlers change */}
              <NavigationButtons 
                onPrev={handlePrev}
                onNext={handleNext}
              />
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export default GalleryModal;
