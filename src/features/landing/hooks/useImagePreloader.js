import { useEffect } from "react";

/**
 * Preloads a list of image sources in the background.
 * @param {string[]} imageSources - Array of image URLs to preload.
 */
export function useImagePreloader(projectsData, previewLimit) {
  const imageSources = Object.values(projectsData)
    .flatMap((categoryProjects) => categoryProjects.slice(0, previewLimit))
    .map((project) => project.thumbnail);
  useEffect(() => {
    if (!imageSources || imageSources.length === 0) return;

    imageSources.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [imageSources]);
}
