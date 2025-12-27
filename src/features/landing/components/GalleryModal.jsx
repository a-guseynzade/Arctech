import { useEffect, useCallback, useState, useMemo, memo } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ============================================================================
// CONSTANTS
// ============================================================================

/** Navigation directions config */
const NAV_DIRS = [
  { dir: -1, Icon: ChevronLeft, label: "Previous", pos: "left-4" },
  { dir: 1, Icon: ChevronRight, label: "Next", pos: "right-4" },
];

/** Global preload cache - persists across modal opens */
const preloadCache = new Set();

// ============================================================================
// UTILITIES
// ============================================================================

/** Modular index wrap: handles negative indices elegantly */
const wrap = (i, n) => ((i % n) + n) % n;

/** Preload image into browser cache with de-duplication */
const preloadImage = (src) => {
  if (!src || preloadCache.has(src)) return;
  preloadCache.add(src);
  const img = new Image();
  img.src = src;
};

// ============================================================================
// MEMOIZED SUB-COMPONENTS
// ============================================================================

/**
 * Modal header with counter and close button
 * Uses DialogPrimitive.Close for proper Radix integration
 * @param {{ currentIndex: number, totalImages: number }} props
 */
const ModalHeader = memo(function ModalHeader({ currentIndex, totalImages }) {
  return (
    <>
      {/* Counter - top left */}
      <div className="absolute top-4 left-4 z-[130] bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium">
        {currentIndex + 1} / {totalImages}
      </div>
      {/* Close button - using Radix DialogClose for proper behavior */}
      <DialogPrimitive.Close asChild>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-[130] bg-black/60 backdrop-blur-sm hover:bg-white/20 text-white h-10 w-10 rounded-full"
        >
          <X className="h-5 w-5" />
        </Button>
      </DialogPrimitive.Close>
    </>
  );
});

/**
 * Navigation buttons (prev/next) using shadcn Button
 * @param {{ onNavigate: (dir: number) => void }} props
 */
const NavigationButtons = memo(function NavigationButtons({ onNavigate }) {
  return (
    <>
      {NAV_DIRS.map(({ dir, Icon, label, pos }) => (
        <Button
          key={dir}
          variant="ghost"
          size="icon"
          onClick={() => onNavigate(dir)}
          className={cn(
            "absolute top-1/2 -translate-y-1/2 z-[120] w-12 h-12 md:w-14 md:h-14",
            "rounded-full flex items-center justify-center",
            "bg-white/15 backdrop-blur-md border border-white/20",
            "hover:bg-white/30 hover:scale-105 transition-all duration-200",
            pos
          )}
          aria-label={`${label} image`}
        >
          <Icon className="h-6 w-6 md:h-7 md:w-7 text-white" />
        </Button>
      ))}
    </>
  );
});

/**
 * Individual slide item with lazy loading and conditional gradient vignette
 * Gradients only render on active slide for performance
 * @param {{ project: { id: string, image: string, alt: string }, index: number, isLoaded: boolean, shouldLoad: boolean, isActive: boolean, onLoad: (index: number) => void }} props
 */
const SlideItem = memo(function SlideItem({ project, index, isLoaded, shouldLoad, isActive, onLoad }) {
  const handleLoad = useCallback(() => onLoad(index), [onLoad, index]);

  return (
    <CarouselItem 
      className="flex items-center justify-center"
      style={{ contentVisibility: shouldLoad ? 'visible' : 'auto' }}
    >
      <div className="relative w-[80vw] h-[75vh] max-w-5xl rounded-2xl overflow-hidden bg-black/40 will-change-transform">
        {/* Gradient vignette - only on active slide for performance */}
        {isActive && (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
          </>
        )}
        
        {/* Foreground content with lazy loading */}
        <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
          {shouldLoad && (
            <img
              src={project.image}
              alt={project.alt}
              onLoad={handleLoad}
              className={cn(
                "max-w-full max-h-full object-contain transition-opacity duration-300",
                "drop-shadow-2xl",
                isLoaded ? "opacity-100" : "opacity-0"
              )}
            />
          )}
        </div>
      </div>
    </CarouselItem>
  );
});

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Gallery Modal with optimized image slider
 * Uses Radix Dialog primitives for full-screen overlay with proper accessibility
 * 
 * Performance optimizations:
 * - Memoized visibleIndices: Set lookup instead of callback per-slide
 * - Conditional gradients: Only active slide renders gradient overlays
 * - content-visibility: Auto for off-screen slides (skip rendering)
 * - will-change: Transform hint for GPU acceleration
 * - Embla options: watchSlides/watchResize disabled, faster duration
 * - Manual resize handler: Debounced reInit on orientation/resize change
 * - Global preload cache: Prevents duplicate image loads
 * 
 * @param {{ images: Array<{ id: string, image: string, alt: string }>, initialIndex?: number, open: boolean, onClose: () => void }} props
 */
export function GalleryModal({ images, initialIndex = 0, open, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [api, setApi] = useState(null);

  const n = images?.length ?? 0;

  // Memoized Set of visible slide indices (current ±1) - avoids recalc during render
  const visibleIndices = useMemo(() => {
    if (n === 0) return new Set();
    return new Set([-1, 0, 1].map(offset => wrap(currentIndex + offset, n)));
  }, [currentIndex, n]);

  // Embla carousel options with performance optimizations
  const carouselOpts = useMemo(
    () => ({
      startIndex: initialIndex,
      loop: true,
      watchSlides: false,   // Disable DOM mutation watching
      watchResize: false,   // Modal has fixed size, no need to watch
      duration: 20,         // Slightly faster animation for snappier feel
    }),
    [initialIndex]
  );

  const handleNavigate = useCallback(
    (dir) => api?.[dir > 0 ? "scrollNext" : "scrollPrev"](),
    [api]
  );

  const handleImageLoad = useCallback(
    (i) => setLoadedImages((prev) => new Set(prev).add(i)),
    []
  );

  const handleOpenChange = useCallback(
    (isOpen) => { if (!isOpen) onClose(); },
    [onClose]
  );

  // Sync carousel position when modal opens
  useEffect(() => {
    if (open && api) {
      api.scrollTo(initialIndex, true);
      setCurrentIndex(initialIndex);
    }
  }, [open, initialIndex, api]);

  // Subscribe to carousel slide changes
  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrentIndex(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => api.off("select", onSelect);
  }, [api]);

  // Prefetch adjacent images using global cache
  useEffect(() => {
    if (!open || n === 0) return;
    [-1, 0, 1].forEach((offset) => {
      const i = wrap(currentIndex + offset, n);
      preloadImage(images[i]?.image);
    });
  }, [open, currentIndex, images, n]);

  // Keyboard navigation
  useEffect(() => {
    if (!open || !api) return;
    const onKey = (e) => {
      const dir = { ArrowLeft: -1, ArrowRight: 1 }[e.key];
      if (dir) handleNavigate(dir);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, api, handleNavigate]);

  // Handle resize/orientation change - reInit carousel with debounce
  useEffect(() => {
    if (!open || !api) return;
    
    let timeoutId = null;
    const handleResize = () => {
      // Debounce reInit to avoid excessive recalculations
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        api.reInit();
      }, 150);
    };
    
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, [open, api]);

  if (!images || n === 0) return null;

  return (
    <DialogPrimitive.Root open={open} onOpenChange={handleOpenChange}>
      <DialogPrimitive.Portal>
        {/* Dark backdrop overlay - removed backdrop-blur for performance */}
        <DialogPrimitive.Overlay className="fixed inset-0 z-[100] bg-black/90 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        
        {/* Full-screen content */}
        <DialogPrimitive.Content
          className="fixed inset-0 z-[101] outline-none"
          aria-describedby="gallery-description"
        >
          <DialogPrimitive.Title className="sr-only">Gallery</DialogPrimitive.Title>
          <DialogPrimitive.Description id="gallery-description" className="sr-only">
            Image gallery viewer with keyboard navigation
          </DialogPrimitive.Description>

          {/* Centered content wrapper */}
          <div className="fixed inset-0 z-[102] flex items-center justify-center py-16 md:py-20">
            <div className="relative w-full max-w-5xl flex items-center justify-center">
              <ModalHeader
                currentIndex={currentIndex}
                totalImages={n}
              />

              <Carousel setApi={setApi} className="w-full" opts={carouselOpts}>
                <CarouselContent>
                  {/* Render all slides, lazy load images based on proximity */}
                  {images.map((project, i) => (
                    <SlideItem
                      key={project.id}
                      project={project}
                      index={i}
                      isLoaded={loadedImages.has(i)}
                      shouldLoad={visibleIndices.has(i)}
                      isActive={i === currentIndex}
                      onLoad={handleImageLoad}
                    />
                  ))}
                </CarouselContent>
              </Carousel>

              <NavigationButtons onNavigate={handleNavigate} />
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export default GalleryModal;
