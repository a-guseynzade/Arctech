import { Separator } from "@/components/ui/separator";
import {
  Linkedin,
  Youtube,
  Instagram,
  Twitter,
  Facebook,
} from "lucide-react";
import { navLinks, footerData, companyInfo } from "@/features/landing/data/landing-data";

const socialIcons = {
  linkedin: Linkedin,
  youtube: Youtube,
  instagram: Instagram,
  twitter: Twitter,
  facebook: Facebook,
};

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-10 lg:py-12">
        <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-16">
          {/* Brand & Description - Takes majority of width */}
          <div className="flex-1">
            <a href="/" className="inline-block mb-3">
              <span className="text-2xl font-bold text-[var(--primary-brand)] uppercase tracking-wider">
                {companyInfo.name}
              </span>
            </a>
            <p className="text-gray-500 text-sm leading-relaxed">
              {footerData.description}
            </p>
          </div>

          {/* Right Side - Vertical Stack, Right-Aligned */}
          <div className="flex flex-col items-start lg:items-end gap-5 shrink-0">
            {/* Navigation Links */}
            <div className="lg:text-right">
              <h4 className="text-lg font-semibold text-[var(--dark)] mb-3">About Us</h4>
              <ul className="flex flex-wrap gap-x-5 gap-y-1 lg:justify-end">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-500 hover:text-[var(--primary-brand)] transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {footerData.socials.map((social) => {
                const Icon = socialIcons[social];
                return (
                  <a
                    key={social}
                    href="#"
                    className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[var(--primary-brand)] group transition-colors duration-200"
                  >
                    <Icon className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <Separator className="bg-gray-200" />
      <div className="container mx-auto px-4 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} {companyInfo.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-400 hover:text-[var(--primary-brand)] text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-[var(--primary-brand)] text-sm transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
