import { projects, allProjects, PREVIEW_LIMIT } from "../data/landing-data";

/**
 * Builds a category map for the FeaturedProjects component.
 * Keys are lowercase category identifiers that map to dictionary keys.
 * @param {Object} projectsData - The projects object (e.g., { interior: [], construction: [] }).
 * @param {Array} allProjectsData - A flattened array of all projects.
 * @param {number} previewLimit - Max number of projects to show in the preview grid.
 * @returns {Object} A map of category keys to their preview and gallery data.
 */
function buildCategoryData(projectsData, allProjectsData, previewLimit) {
  const categories = {};

  // "all" category: preview should be a diverse sample, gallery is all projects
  categories["all"] = {
    previewProjects: [
      ...projectsData.interior.slice(0, previewLimit / 2),
      ...projectsData.building.slice(0, previewLimit / 2),
    ],
    galleryImages: allProjectsData,
  };

  // Add each category with lowercase key
  Object.keys(projectsData).forEach((key) => {
    categories[key] = {
      previewProjects: projectsData[key].slice(0, previewLimit),
      galleryImages: projectsData[key],
    };
  });

  return categories;
}

export const categoryData = buildCategoryData(projects, allProjects, PREVIEW_LIMIT);
