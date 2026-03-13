import { projects, allProjects, PREVIEW_LIMIT } from "../data/landing-data";

/** Build id→index lookup for a gallery array (O(n), done once at build) */
const buildIndexMap = (images) =>
  new Map(images.map((img, i) => [img.id, i]));

function buildCategoryData(projectsData, allProjectsData, previewLimit) {
  const categories = {};

  categories["all"] = {
    previewProjects: [
      ...projectsData.interior.slice(0, previewLimit / 2),
      ...projectsData.building.slice(0, previewLimit / 2),
    ],
    galleryImages: allProjectsData,
    galleryIndexById: buildIndexMap(allProjectsData),
  };

  Object.keys(projectsData).forEach((key) => {
    categories[key] = {
      previewProjects: projectsData[key].slice(0, previewLimit),
      galleryImages: projectsData[key],
      galleryIndexById: buildIndexMap(projectsData[key]),
    };
  });

  return categories;
}

export const categoryData = buildCategoryData(projects, allProjects, PREVIEW_LIMIT);
