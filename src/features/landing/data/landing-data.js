// ============================================
// ARCTECH CONSTRUCTION COMPANY - LANDING DATA
// ============================================

// Image imports (local assets for better performance)
import projectTower from "@/assets/project-tower.png";
import projectHouse from "@/assets/project-house.png";
import projectApartments from "@/assets/project-apartments.png";
import projectOffice from "@/assets/project-office.png";
import projectVilla from "@/assets/project-villa.png";
import projectWarehouse from "@/assets/project-warehouse.png";

// ============================================
// NAVIGATION & COMPANY INFO
// ============================================

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
];

export const companyInfo = {
  name: "Arctech",
  tagline: "Building Tomorrow's Landmarks",
  description:
    "We provide exceptional architectural design, construction, and building maintenance services. With decades of experience and a commitment to excellence, we transform visions into reality.",
};

export const languages = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
];

// ============================================
// HERO SECTION
// ============================================

export const stats = [
  { value: 25, suffix: "+", label: "Years of", sublabel: "Experience" },
  { value: 378, suffix: "+", label: "Projects", sublabel: "Complete" },
  { value: 69, suffix: "+", label: "Winning", sublabel: "Global Awards" },
];

// ============================================
// EXPERIENCE SECTION
// ============================================

export const experienceData = {
  years: 25,
  title: "of experience!",
  paragraphs: [
    "We have a team of experienced professionals who have been in the industry for over 25 years. Our contractors possess a wealth of knowledge and skills acquired through decades of hands-on work, making them true experts in their field.",
    "With 25 years of experience, our contractors have developed a deep understanding of industry standards and regulations. We ensure that all our projects comply with the latest safety and building codes, and that the final product meets or exceeds our client's expectations.",
  ],
  founder: {
    name: "John Morrison",
    title: "Founder & CEO",
    signature: "John M.",
  },
};

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
  "Renovations",
  "Interior",
];

export const projects = [
  {
    id: 1,
    title: "Skyview Tower",
    category: "Renovation & Architecture",
    image: projectTower,
    tags: ["Construction", "Architecture", "Renovations"],
  },
  {
    id: 2,
    title: "The Fallingwater House",
    category: "Building & Interior",
    image: projectHouse,
    tags: ["Building", "Interior"],
  },
  {
    id: 3,
    title: "The Orange Apartments",
    category: "Construction & Interior",
    image: projectApartments,
    tags: ["Construction", "Interior"],
  },
  {
    id: 4,
    title: "Modern Office Complex",
    category: "Architecture & Building",
    image: projectOffice,
    tags: ["Architecture", "Building"],
  },
  {
    id: 5,
    title: "Luxury Villa Estate",
    category: "Renovations & Interior",
    image: projectVilla,
    tags: ["Renovations", "Interior"],
  },
  {
    id: 6,
    title: "Industrial Warehouse",
    category: "Construction & Building",
    image: projectWarehouse,
    tags: ["Construction", "Building"],
  },
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

export const ctaFeatures = [
  "Professional Staff",
  "100% Satisfaction",
  "Accurate Testing",
  "Transparent Pricing",
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
