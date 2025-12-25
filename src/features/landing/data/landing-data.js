// ============================================
// ARCTECH CONSTRUCTION COMPANY - LANDING DATA
// ============================================

import { createProject } from "@/lib/gallery-utils";

// ============================================
// NAVIGATION & COMPANY INFO
// ============================================

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
];

export const companyInfo = {
  name: "Arctech",
  tagline: "Build Your Dreams",
  description:
    "We provide exceptional architectural design, construction, and building maintenance services. With decades of experience and a commitment to excellence, we transform visions into reality.",
};

export const languages = [
  { code: "en", label: "English" },
  { code: "tr", label: "Türkçe" },
];

// ============================================
// HERO SECTION
// ============================================

// ============================================
// CORE VALUES SECTION
// ============================================

export const chooseUsValues= [
  {
    icon: "Target",
    title: "Best Quality",
    description: "We never compromise on quality, ensuring every project meets the highest standards.",
  },
  {
    icon: "Handshake",
    title: "Trust & Transparency",
    description: "Building lasting relationships through honest communication and reliable partnerships.",
  },
  {
    icon: "Lightbulb",
    title: "Innovation",
    description: "Embracing modern techniques and technologies to deliver cutting-edge solutions.",
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

// Projects with auto-generated image paths via createProject utility
export const projects = [
  // Architecture
  createProject("Architecture", 1),
  createProject("Architecture", 2),
  createProject("Architecture", 3),
  
  // Building
  createProject("Building", 1),
  createProject("Building", 2),
  createProject("Building", 3),
  
  // Interior
  createProject("Interior", 1),
  createProject("Interior", 2),
  createProject("Interior", 3),
  
  // Construction
  createProject("Construction", 1),
  createProject("Construction", 2),
  createProject("Construction", 3),
];

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
    email: "contact@arctech.com",
    phone: "+1 (555) 123-4567",
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
  office: {
    title: "Office",
    lines: [
      "125 Innovation Drive, Suite 400",
      "New York, NY 10001",
      "United States",
    ],
  },
  contact: {
    title: "Contact",
    email: "contact@arctech.com",
    phone: "+1 (555) 123-4567",
  },
  socials: ["linkedin", "youtube", "instagram", "twitter", "facebook"],
};
