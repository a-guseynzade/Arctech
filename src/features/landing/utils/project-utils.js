// ============================================
// PROJECT DATA GENERATION UTILITIES
// ============================================

/**
 * Generates gallery image path
 * @param {string} category - "Architecture" | "Building" | "Interior" | "Construction"
 * @param {number} index - Image number (1, 2, 3...)
 * @param {"full" | "thumb"} variant - Image variant
 * @returns {string} The complete image path
 */
export function getGalleryImagePath(category, index, variant = "full") {
  const padded = String(index).padStart(3, "0");
  return `/gallery/${category}/${category}${padded}_${variant}.webp`;
}

/**
 * Generates all projects for a category based on available images
 * @param {string} category - Category name
 * @returns {Array<{ id: string, category: string, alt: string, image: string, thumbnail: string }>}
 */
export function generateProjects(category) {
  const galleryThumbnails = import.meta.glob('/public/gallery/**/*_thumb.webp');
  const pattern = `/public/gallery/${category}/`;
  const count = Object.keys(galleryThumbnails).filter(path => path.startsWith(pattern)).length;

  return Array.from({ length: count }, (_, i) => {
    const index = i + 1;
    const padded = String(index).padStart(3, "0");
    
    return {
      id: `${category.toLowerCase()}-${index}`,
      category,
      alt: `${category} project ${index}`,
      image: `/gallery/${category}/${category}${padded}_full.webp`,
      thumbnail: `/gallery/${category}/${category}${padded}_thumb.webp`,
    };
  });
}

