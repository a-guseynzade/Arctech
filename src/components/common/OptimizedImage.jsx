import { useState, useCallback } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/**
 * High-performance image component with progressive loading.
 *
 * Features:
 * - Blur-up effect: Shows low-quality thumbnail while full image loads
 * - Skeleton fallback: If no thumbnail, shows animated skeleton
 * - Smooth fade transition: Professional opacity animation on load
 * - Layout stability: Prevents Cumulative Layout Shift (CLS)
 * - Native lazy loading: Uses browser's built-in lazy loading
 *
 * @param {Object} props
 * @param {string} props.src - Full quality image source (required)
 * @param {string} [props.thumbnail] - Low-quality placeholder image
 * @param {string} props.alt - Image alt text (required)
 * @param {string} [props.className] - Additional classes for the wrapper
 * @param {string} [props.imgClassName] - Additional classes for the img element
 * @param {"lazy"|"eager"} [props.loading="lazy"] - Loading strategy
 * @param {"async"|"sync"|"auto"} [props.decoding="async"] - Decoding strategy
 * @param {string} [props.sizes] - Responsive sizes attribute
 * @param {Function} [props.onLoad] - Callback when image loads
 */
export function OptimizedImage({
  src,
  thumbnail,
  alt,
  className,
  imgClassName,
  loading = "lazy",
  decoding = "async",
  sizes,
  onLoad,
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(
    (e) => {
      setIsLoaded(true);
      onLoad?.(e);
    },
    [onLoad]
  );

  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoaded(true); // Hide skeleton on error too
  }, []);

  return (
    <div
      className={cn("relative overflow-hidden bg-muted", className)}
      {...props}
    >
      {/* Skeleton placeholder - shown while loading if no thumbnail */}
      {!isLoaded && !thumbnail && (
        <Skeleton className="absolute inset-0 w-full h-full" />
      )}

      {/* Thumbnail placeholder - blur-up effect */}
      {thumbnail && !isLoaded && (
        <img
          src={thumbnail}
          alt=""
          aria-hidden="true"
          className={cn(
            "absolute inset-0 w-full h-full object-cover",
            "blur-sm scale-105", // Slight blur and scale to hide pixelation
            imgClassName
          )}
        />
      )}

      {/* Main image */}
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding={decoding}
        sizes={sizes}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "w-full h-full object-cover",
          "transition-opacity duration-500 ease-out",
          isLoaded ? "opacity-100" : "opacity-0",
          hasError && "hidden",
          imgClassName
        )}
      />

      {/* Error fallback */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
          <span className="text-sm">Failed to load image</span>
        </div>
      )}
    </div>
  );
}

export default OptimizedImage;
