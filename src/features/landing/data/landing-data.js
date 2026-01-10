// ============================================
// ARCTECH CONSTRUCTION COMPANY - LANDING DATA
// ============================================

import { generateGalleryProjects } from "../lib/gallery-data-generator";

// ============================================
// CONFIGURATION
// ============================================

export const PREVIEW_LIMIT = 6;

// ============================================
// NAVIGATION & COMPANY INFO
// ============================================

export const navLinks = [
  { label: "Home", href: "#" },
  { label: "Projects", href: "#projects" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const companyInfo = {
  name: "Arctech",
  tagline: "Build Your Dreams",
};

export const languages = [
  { code: "en", label: "English" },
  { code: "tr", label: "Türkçe" },
];

export const chooseUsValues = [

  {
    icon: "Handshake",
    title: "Trust & Transparency",
    description:
      "Our trust & Transparency salles and allow tmefor must quality in quality, and practices.",
  },
  {
    icon: "Target",
    title: "Best Quality",
    description:
      "High-quality dolor sit amet, consectetur adipiscing elit, and high-quality comprring and construction.",
  },
];

// ============================================
// PROCESS STEPS
// ============================================

export const processSteps = [
  {
    number: "01",
    title: "Evaluation And Signing",
    subtitle: "Of The Contract",
    icon: "FileText",
  },
  {
    number: "02",
    title: "Preparation Of The",
    subtitle: "Work Plan",
    icon: "ClipboardList",
  },
  {
    number: "03",
    title: "Implementation Of",
    subtitle: "Quality Works",
    icon: "Wrench",
  },
  {
    number: "04",
    title: "Delivering The Project",
    subtitle: "To The Customer",
    icon: "Handshake",
  },
];

// ============================================
// PROJECTS
// ============================================

export const projectCategories = [
  "All Works",
  "Construction",
  "Architecture",
  "Building",
  "Interior",
];

// Projects by category
export const projects = {
  interior: generateGalleryProjects("Interior"),
  architecture: generateGalleryProjects("Architecture"),
  building: generateGalleryProjects("Building"),
  construction: generateGalleryProjects("Construction"),
};

// Pre-computed array of ALL projects (for "All Works" gallery modal)
export const allProjects = Object.values(projects).flat();

// ============================================
// SERVICES & CONTACT
// ============================================

export const services = [
  { value: "construction", label: "Construction" },
  { value: "renovation", label: "Renovation" },
  { value: "architecture", label: "Architecture Design" },
  { value: "interior", label: "Interior Design" },
  { value: "consulting", label: "Consulting" },
  { value: "maintenance", label: "Building Maintenance" },
];

export const contactInfo = {
  location: {
    title: "Our Location",
    lines: [
      "125 Innovation Drive, Suite 400",
      "New York, NY 10001, United States",
    ],
  },
  contact: {
    title: "Quick Contact",
    lines: ["Email: contact@arctech.com", "Phone: +1 (555) 123-4567"],
  },
  hours: {
    title: "Opening Hours",
    lines: ["Monday – Friday", "09:00 AM – 06:00 PM"],
  },
};

// ============================================
// FOOTER
// ============================================

export const footerData = {
  description:
    "We have the confidence to provide the best service for you, with the support of Professional and Certified HR that we currently have and the high-quality materials we use and structured work techniques, we will be able to realize timely completion of work.",
  socials: ["linkedin", "youtube", "instagram", "twitter", "facebook"],
};
