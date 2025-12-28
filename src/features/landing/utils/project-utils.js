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
 * Creates a project object with image paths
 * @param {string} category - Category name
 * @param {number} index - Project index
 * @returns {{ id: string, category: string, alt: string, image: string, thumbnail: string }}
 */
export function createProject(category, index) {
  return {
    id: `${category.toLowerCase()}-${index}`,
    category,
    alt: `${category} project ${index}`,
    image: getGalleryImagePath(category, index, "full"),
    thumbnail: getGalleryImagePath(category, index, "thumb"),
  };
}

/**
 * Generates N projects for a category
 * @param {string} category - Category name
 * @param {number} count - Number of projects to generate
 * @returns {Array} Array of project objects
 */
export function generateProjects(category, count = 3) {
  return Array.from({ length: count }, (_, i) => createProject(category, i + 1));
}
