// ============================================
// ARCTECH CONSTRUCTION COMPANY - LANDING DATA
// ============================================

// Category gallery images
import arch001 from "@/assets/Architecture/Architecture001.jpg";
import arch002 from "@/assets/Architecture/Architecture002.jpg";
import arch003 from "@/assets/Architecture/Architecture003.jpg";
import build001 from "@/assets/Building/Building001.jpg";
import build002 from "@/assets/Building/Building002.jpg";
import build003 from "@/assets/Building/Building003.jpg";
import interior001 from "@/assets/Interior/Interior001.jpg";
import interior002 from "@/assets/Interior/Interior002.jpg";
import interior003 from "@/assets/Interior/Interior003.jpg";
import const001 from "@/assets/Construction/Construction001.jpg";
import const002 from "@/assets/Construction/Construction002.jpg";
import const003 from "@/assets/Construction/Construction003.jpg";

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
    title: "Quality First",
    description: "We never compromise on quality, ensuring every project meets the highest standards.",
  },
  {
    icon: "Award",
    title: "Excellence",
    description: "Striving for exceptional results in everything we do, from planning to completion.",
  },
  {
    icon: "Handshake",
    title: "Trust & Transparency",
    description: "Building lasting relationships through honest communication and reliable partnerships.",
  },
  {
    icon: "ShieldCheck",
    title: "Safety First",
    description: "Prioritizing the safety of our team and clients in every project we undertake.",
  },
  {
    icon: "Lightbulb",
    title: "Innovation",
    description: "Embracing modern techniques and technologies to deliver cutting-edge solutions.",
  },
  {
    icon: "Leaf",
    title: "Sustainability",
    description: "Committed to eco-friendly practices and sustainable building for a better future.",
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

// Category gallery images mapped by category
export const projects = [
  // Architecture
  {
    id: "arch-1",
    title: "Skyview Tower",
    category: "Architecture",
    description: "Modern architectural design",
    image: arch001,
  },
  {
    id: "arch-2",
    title: "Modern Office Complex",
    category: "Architecture",
    description: "Contemporary architecture",
    image: arch002,
  },
  {
    id: "arch-3",
    title: "Innovation Hub",
    category: "Architecture",
    description: "Innovative architectural project",
    image: arch003,
  },
  // Building
  {
    id: "build-1",
    title: "The Fallingwater House",
    category: "Building",
    description: "Commercial building project",
    image: build001,
  },
  {
    id: "build-2",
    title: "Urban Heights",
    category: "Building",
    description: "Residential building complex",
    image: build002,
  },
  {
    id: "build-3",
    title: "Metro Plaza",
    category: "Building",
    description: "Modern building construction",
    image: build003,
  },
  // Interior
  {
    id: "int-1",
    title: "The Orange Apartments",
    category: "Interior",
    description: "Modern interior design",
    image: interior001,
  },
  {
    id: "int-2",
    title: "Luxury Villa Estate",
    category: "Interior",
    description: "Luxury interior styling",
    image: interior002,
  },
  {
    id: "int-3",
    title: "Executive Lounge",
    category: "Interior",
    description: "Contemporary interior space",
    image: interior003,
  },
  // Construction
  {
    id: "const-1",
    title: "Industrial Warehouse",
    category: "Construction",
    description: "Active construction site",
    image: const001,
  },
  {
    id: "const-2",
    title: "Harbor Bridge",
    category: "Construction",
    description: "Building under construction",
    image: const002,
  },
  {
    id: "const-3",
    title: "Central Station",
    category: "Construction",
    description: "Construction progress",
    image: const003,
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
