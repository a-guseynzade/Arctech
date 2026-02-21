// ============================================
// ARCTECH CONSTRUCTION COMPANY - LANDING DATA
// ============================================
// This file contains NON-TRANSLATABLE data only.
// All translatable content lives in src/lib/dictionary.js

import { generateGalleryProjects } from "../lib/gallery-data-generator";
import { MapPin, Phone, Clock } from "lucide-react";

// ============================================
// CONFIGURATION
// ============================================

export const PREVIEW_LIMIT = 6;

// ============================================
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
  "building",
  "interior",
  "construction",
  "architecture"
];

// Projects by category (image data only)
export const projects = {
  interior: generateGalleryProjects("Interior"),
  architecture: generateGalleryProjects("Architecture"),
  building: generateGalleryProjects("Building"),
  construction: generateGalleryProjects("Construction"),
};

// Pre-computed array of ALL projects (for "All Works" gallery modal)
export const allProjects = Object.values(projects).flat();

// ============================================
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
