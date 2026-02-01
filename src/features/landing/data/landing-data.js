// ============================================
// ARCTECH CONSTRUCTION COMPANY - LANDING DATA
// ============================================
<<<<<<< HEAD
=======
// This file contains NON-TRANSLATABLE data only.
// All translatable content lives in src/lib/dictionary.js
>>>>>>> feature

import { generateGalleryProjects } from "../lib/gallery-data-generator";
import { MapPin, Phone, Clock } from "lucide-react";

// ============================================
// CONFIGURATION
// ============================================

export const PREVIEW_LIMIT = 6;

// ============================================
<<<<<<< HEAD
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
=======
// NAVIGATION (language-keyed for direct access)
// ============================================

export const navLinksData = {
  en: [
    { label: "Home", href: "#" },
    { label: "Projects", href: "#projects" },
    { label: "About Us", href: "#about" },
    { label: "Contact", href: "#services" },
  ],
  tr: [
    { label: "Ana Sayfa", href: "#" },
    { label: "Projeler", href: "#projects" },
    { label: "Hakkımızda", href: "#about" },
    { label: "İletişim", href: "#services" },
  ],
};

// ============================================
// COMPANY INFO (static, name is not translated)
// ============================================

export const companyInfo = {
  name: "Arctech",
};

// ============================================
// LANGUAGES (for switcher UI)
// ============================================

export const languages = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "tr", label: "Türkçe", flag: "🇹🇷" },
];

// ============================================
// PROJECTS (images are not translatable)
// ============================================

// Category keys map to dictionary for labels
export const projectCategoryKeys = [
  "all",
  "construction",
  "architecture",
  "building",
  "interior",
];

// Projects by category (image data only)
>>>>>>> feature
export const projects = {
  interior: generateGalleryProjects("Interior"),
  architecture: generateGalleryProjects("Architecture"),
  building: generateGalleryProjects("Building"),
  construction: generateGalleryProjects("Construction"),
};

// Pre-computed array of ALL projects (for "All Works" gallery modal)
export const allProjects = Object.values(projects).flat();

// ============================================
<<<<<<< HEAD
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
=======
// CONTACT INFO (icons only, text from dictionary)
// ============================================

export const contactInfoIcons = {
  location: MapPin,
  contact: Phone,
  hours: Clock,
};

// ============================================
// FOOTER (social icons are not translatable)
// ============================================

export const footerSocials = ["linkedin", "youtube", "instagram", "twitter", "facebook"];
>>>>>>> feature
