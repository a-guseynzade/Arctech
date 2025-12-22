import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Linkedin,
  Youtube,
  Instagram,
  Twitter,
  Facebook,
  Send,
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
    <footer className="bg-[var(--dark)] text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <a href="/" className="inline-block mb-4">
              <span className="text-2xl font-bold text-[var(--orange)] uppercase tracking-wider">
                {companyInfo.name}
              </span>
            </a>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              {footerData.description}
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {footerData.socials.map((social) => {
                const Icon = socialIcons[social];
                return (
                  <a
                    key={social}
                    href="#"
                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--orange)] transition-colors duration-200"
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* About Us Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">About Us</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-[var(--orange)] transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#" className="text-white/60 hover:text-[var(--orange)] transition-colors text-sm">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-[var(--orange)] transition-colors text-sm">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Office */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{footerData.office.title}</h4>
            <div className="text-white/60 text-sm leading-relaxed space-y-1">
              {footerData.office.lines.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
            <div className="mt-4">
              <h5 className="text-sm font-semibold mb-2">{footerData.contact.title}</h5>
              <p className="text-white/60 text-sm">
                Email: {footerData.contact.email}
              </p>
              <p className="text-white/60 text-sm">
                Phone: {footerData.contact.phone}
              </p>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Subscribe To Our Newsletter</h4>
            <p className="text-white/60 text-sm mb-4">
              Get the latest updates and news about our services.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 flex-1"
              />
              <Button className="bg-[var(--orange)] hover:bg-[var(--orange-dark)] px-3">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <Separator className="bg-white/10" />
      <div className="container mx-auto px-4 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} {companyInfo.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/50 hover:text-[var(--orange)] text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-white/50 hover:text-[var(--orange)] text-sm transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
