import { useEffect, useCallback, useState, useRef, useMemo, memo } from "react";
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
// CONSTANTS
// ============================================================================

/** Navigation directions config */
const NAV_DIRS = [
  { dir: -1, Icon: ChevronLeft, label: "Previous", pos: "left-4" },
  { dir: 1, Icon: ChevronRight, label: "Next", pos: "right-4" },
];

// ============================================================================
// UTILITIES
// ============================================================================

/** Modular index wrap: handles negative indices elegantly */
const wrap = (i, n) => ((i % n) + n) % n;

/** Preload image into browser cache */
const preloadImage = (src) => {
  if (!src) return;
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
 * Individual slide item with glassmorphism effect
 * @param {{ project: { id: string, image: string, alt: string }, index: number, isLoaded: boolean, onLoad: (index: number) => void }} props
 */
const SlideItem = memo(function SlideItem({ project, index, isLoaded, onLoad }) {
  const handleLoad = useCallback(() => onLoad(index), [onLoad, index]);

  return (
    <CarouselItem className="flex items-center justify-center">
      <div className="relative w-[80vw] h-[75vh] max-w-5xl rounded-2xl overflow-hidden">
        {/* Blurred background layer */}
        <div
          className="absolute inset-0 bg-cover bg-center blur-[40px] brightness-[0.6] scale-[1.2]"
          style={{ backgroundImage: `url(${encodeURI(project.image)})` }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30" />
        {/* Foreground content */}
        <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
          {!isLoaded && <Skeleton className="w-full h-full rounded-xl" />}
          <img
            src={project.image}
            alt={project.alt}
            onLoad={handleLoad}
            className={cn(
              "max-w-full max-h-full object-contain transition-opacity duration-300",
              isLoaded ? "opacity-100" : "opacity-0 absolute"
            )}
          />
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
 * @param {{ images: Array<{ id: string, image: string, alt: string }>, initialIndex?: number, open: boolean, onClose: () => void }} props
 */
export function GalleryModal({ images, initialIndex = 0, open, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [api, setApi] = useState(null);

  const loadedRef = useRef(new Set());
  const n = images?.length ?? 0;

  const carouselOpts = useMemo(
    () => ({ startIndex: initialIndex, loop: true }),
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

  // Sync loadedRef in effect (React 18+ concurrent safe)
  useEffect(() => {
    loadedRef.current = loadedImages;
  }, [loadedImages]);

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

  // Prefetch adjacent images using modular arithmetic
  useEffect(() => {
    if (!open || n === 0) return;
    [-1, 0, 1].forEach((offset) => {
      const i = wrap(currentIndex + offset, n);
      if (!loadedRef.current.has(i)) preloadImage(images[i]?.image);
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

  // Reset loaded state on close
  useEffect(() => {
    if (!open) setLoadedImages(new Set());
  }, [open]);

  if (!images || n === 0) return null;

  return (
    <DialogPrimitive.Root open={open} onOpenChange={handleOpenChange}>
      <DialogPrimitive.Portal>
        {/* Dark backdrop overlay with blur */}
        <DialogPrimitive.Overlay className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        
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
                  {images.map((project, i) => (
                    <SlideItem
                      key={project.id}
                      project={project}
                      index={i}
                      isLoaded={loadedImages.has(i)}
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
