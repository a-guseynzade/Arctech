/**
 * Generates project entries for a gallery category based on available thumbnails.
 * @param {string} category - The category folder name (e.g., "Interior", "Exterior")
 * @returns {Array<Object>} Array of project objects with id, category, alt, image, and thumbnail paths
 */
export function generateGalleryProjects(category) {
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
