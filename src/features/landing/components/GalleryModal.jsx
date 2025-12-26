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
// CONSTANTS & UTILITIES
// ============================================================================

const NAV_DIRS = [
  { dir: -1, Icon: ChevronLeft, label: "Previous", pos: "left-4" },
  { dir: 1, Icon: ChevronRight, label: "Next", pos: "right-4" },
];

/** Modular index wrap: handles negative indices elegantly */
const wrap = (i, n) => ((i % n) + n) % n;

/** Preload image into browser cache */
const preloadImage = (src) =>
  src && new Promise((r) => Object.assign(new Image(), { onload: r, onerror: r, src }));

// ============================================================================
// MEMOIZED SUB-COMPONENTS
// ============================================================================

const ModalHeader = memo(function ModalHeader({ currentIndex, totalImages, onClose }) {
  return (
    <>
      {/* Counter - top left of carousel card */}
      <div className="absolute top-4 left-4 z-30 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium">
        {currentIndex + 1} / {totalImages}
      </div>
      {/* Close button - top right of carousel card */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 z-30 bg-black/60 backdrop-blur-sm hover:bg-white/20 text-white h-10 w-10 rounded-full"
        onClick={onClose}
      >
        <X className="h-5 w-5" />
      </Button>
    </>
  );
});

const NavigationButtons = memo(function NavigationButtons({ onNavigate }) {
  return (
    <>
      {NAV_DIRS.map(({ dir, Icon, label, pos }) => (
        <button
          key={dir}
          onClick={() => onNavigate(dir)}
          className={cn(
            "absolute top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14",
            "rounded-full flex items-center justify-center cursor-pointer",
            "bg-white/15 backdrop-blur-md border border-white/20",
            "hover:bg-white/30 hover:scale-105 transition-all duration-200",
            pos
          )}
          aria-label={`${label} image`}
        >
          <Icon className="h-6 w-6 md:h-7 md:w-7 text-white" />
        </button>
      ))}
    </>
  );
});

const SlideItem = memo(function SlideItem({ project, isLoaded, onLoad }) {
  return (
    <CarouselItem className="flex items-center justify-center">
      <div className="relative w-[80vw] h-[75vh] max-w-5xl rounded-2xl overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${project.image})`,
            filter: "blur(40px) brightness(0.6)",
            transform: "scale(1.2)",
          }}
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
          {!isLoaded && <Skeleton className="w-full h-full rounded-xl" />}
          <img
            src={project.image}
            alt={project.alt}
            onLoad={onLoad}
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

export function GalleryModal({ images, initialIndex = 0, open, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [api, setApi] = useState(null);

  const n = images?.length || 0;

  // Unified navigation handler using direction vector
  const handleNavigate = useCallback(
    (dir) => api?.[dir > 0 ? "scrollNext" : "scrollPrev"](),
    [api]
  );

  const handleImageLoad = useCallback(
    (i) => setLoadedImages((prev) => new Set(prev).add(i)),
    []
  );

  // Sync carousel position & track slide changes
  useEffect(() => {
    if (!api) return;

    if (open) {
      api.scrollTo(initialIndex, true);
      setCurrentIndex(initialIndex);
    }

    const onSelect = () => setCurrentIndex(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => api.off("select", onSelect);
  }, [api, open, initialIndex]);

  // Prefetch adjacent images using modular arithmetic (O(1) index calc)
  useEffect(() => {
    if (!open || n === 0) return;
    [-1, 0, 1].forEach((offset) => {
      const i = wrap(currentIndex + offset, n);
      if (!loadedImages.has(i)) preloadImage(images[i]?.image);
    });
  }, [open, currentIndex, images, n, loadedImages]);

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

  // Body scroll lock
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = prev);
  }, [open]);

  // Reset loaded state on close
  useEffect(() => {
    if (!open) setLoadedImages(new Set());
  }, [open]);

  if (n === 0) return null;

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[100] bg-transparent" />
        <DialogPrimitive.Content
          className="fixed inset-0 z-[101] outline-none"
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          <DialogPrimitive.Title className="sr-only">Gallery</DialogPrimitive.Title>

          <div className="fixed inset-0 z-[102] flex items-center justify-center py-16 md:py-20">
            <div className="relative w-full max-w-5xl flex items-center justify-center">
              {/* Header positioned on carousel card corners */}
              <ModalHeader
                currentIndex={currentIndex}
                totalImages={n}
                onClose={onClose}
              />

              <Carousel
                setApi={setApi}
                className="w-full"
                opts={{ startIndex: initialIndex, loop: true }}
              >
                <CarouselContent>
                  {images.map((project, i) => (
                    <SlideItem
                      key={project.id}
                      project={project}
                      isLoaded={loadedImages.has(i)}
                      onLoad={() => handleImageLoad(i)}
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
