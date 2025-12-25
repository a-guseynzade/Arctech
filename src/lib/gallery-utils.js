// ============================================
// GALLERY IMAGE PATH UTILITIES
// ============================================

/**
 * Generates a gallery image path based on category and index
 * @param {string} category - "Architecture" | "Building" | "Interior" | "Construction"
 * @param {number} index - Image number (1, 2, 3...)
 * @param {"full" | "thumb"} variant - Image variant (full size or thumbnail)
 * @returns {string} The complete image path
 */
export function getGalleryImage(category, index, variant = "full") {
  const paddedIndex = String(index).padStart(3, "0");
  return `/gallery/${category}/${category}${paddedIndex}_${variant}.webp`;
}

/**
 * Get full-size gallery image path
 * @param {string} category - Category name
 * @param {number} index - Image index
 */
export const getFullImage = (category, index) => 
  getGalleryImage(category, index, "full");

/**
 * Get thumbnail gallery image path
 * @param {string} category - Category name
 * @param {number} index - Image index
 */
export const getThumbImage = (category, index) => 
  getGalleryImage(category, index, "thumb");

/**
 * Generate a project object with auto-generated image paths
 * @param {string} category - Project category
 * @param {number} imageIndex - Image index number
 */
export function createProject(category, imageIndex) {
  const id = `${category.toLowerCase()}-${imageIndex}`;
  return {
    id,
    category,
    alt: `${category} project ${imageIndex}`,
    image: getFullImage(category, imageIndex),
    thumbnail: getThumbImage(category, imageIndex),
  };
}
