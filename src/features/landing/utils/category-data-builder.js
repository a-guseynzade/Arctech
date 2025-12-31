/**
 * Builds a category map for the FeaturedProjects component.
 * @param {Object} projectsData - The projects object (e.g., { interior: [], construction: [] }).
 * @param {Array} allProjectsData - A flattened array of all projects.
 * @param {number} previewLimit - Max number of projects to show in the preview grid.
 * @returns {Object} A map of category names to their preview and gallery data.
 */
export function buildCategoryData(projectsData, allProjectsData, previewLimit) {
  const categories = {};

  // "All Works" category: preview should be a diverse sample, gallery is all projects
  categories["All Works"] = {
    previewProjects: projectsData.interior.slice(0, previewLimit),
    galleryImages: allProjectsData,
  };

  Object.keys(projectsData).forEach((key) => {
    const categoryName = key.charAt(0).toUpperCase() + key.slice(1);
    categories[categoryName] = {
      previewProjects: projectsData[key].slice(0, previewLimit),
      galleryImages: projectsData[key],
    };
  });

  return categories;
}
