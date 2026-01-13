// ============================================
// ARCTECH CONSTRUCTION COMPANY - LANDING DATA
// ============================================

import { generateGalleryProjects } from "../lib/gallery-data-generator";
import { MapPin, Phone, Clock } from "lucide-react";

// ============================================
// CONFIGURATION
// ============================================

export const PREVIEW_LIMIT = 6;

// ============================================
// NAVIGATION & HERO
// ============================================

export const navLinks = [
  { label: "Home", href: "#" },
  { label: "Projects", href: "#projects" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#services" },
];

export const companyInfo = {
  name: "Arctech",
  tagline: "Build Your Dreams",
};

export const languages = [
  { code: "en", label: "English" },
  { code: "tr", label: "Türkçe" },
];

// ============================================
// ABOUT
// ============================================

export const aboutValues = {
  quote: "Your vision is our blueprint. We approach every project with a problem-solving mindset, dedicated to delivering results that add real value to your investment",
  values: [
    {
      title: "Trust & Transparency",
      description:
        "We believe in open books and clear timelines. Our transparent workflow ensures you are informed, confident, and in control at every stage of the construction process.",
    },
    {
      title: "Best Quality",
      description:
        "We take pride in our work so you can take pride in your property. Our team delivers high-performance construction designed to last for generations.",
    },
  ]
};


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

export const contactInfo = [
  {
    key: "location",
    Icon: MapPin,
    title: "Our Location",
    lines: [
      "125 Innovation Drive, Suite 400",
      "New York, NY 10001, United States",
    ],
  },
  {
    key: "contact",
    Icon: Phone,
    title: "Quick Contact",
    lines: ["Email: contact@arctech.com", "Phone: +1 (555) 123-4567"],
  },
  {
    key: "hours",
    Icon: Clock,
    title: "Opening Hours",
    lines: ["Monday – Friday", "09:00 AM – 06:00 PM"],
  },
];

// ============================================
// FOOTER
// ============================================

export const footerData = {
  description:
    "We have the confidence to provide the best service for you, with the support of Professional and Certified HR that we currently have and the high-quality materials we use and structured work techniques, we will be able to realize timely completion of work.",
  socials: ["linkedin", "youtube", "instagram", "twitter", "facebook"],
};
