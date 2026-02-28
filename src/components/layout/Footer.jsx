import { Separator } from "@/components/ui/separator";
import {
  Linkedin,
  Youtube,
  Instagram,
  Twitter,
  Facebook,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { navLinksData, footerSocials, companyInfo } from "@/features/landing/data/landing-data";

const socialIcons = {
  linkedin: Linkedin,
  youtube: Youtube,
  instagram: Instagram,
  twitter: Twitter,
  facebook: Facebook,
};

export default function Footer() {
  const { language, t } = useLanguage();
  const navLinks = navLinksData[language] || navLinksData.en;

  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Main Footer */}
      {/* Уменьшили py: max был 4rem, стал 2.5rem */}
      <div className="w-full max-w-[1280px] mx-auto px-[clamp(1rem,4vw,2rem)] py-[clamp(0.5rem,1vw,1rem)]">
        {/* Уменьшили gap: max был 6rem, стал 3rem */}
        <div className="flex flex-wrap items-start gap-[clamp(2rem,5vw,4rem)]">
          
          {/* Brand & Description */}
          <div className="flex-1 min-w-[min(100%,320px)]">
            <a href="/" className="inline-block mb-2">
              <span className="text-[clamp(1.25rem,2vw+0.8rem,1.5rem)] font-bold text-[var(--primary-brand)] uppercase tracking-wider">
                {companyInfo.name}
              </span>
            </a>
            <p className="text-gray-500 text-[clamp(0.9rem,1vw+0.5rem,1rem)] leading-relaxed max-w-[700px] text-balance">
              {t("footer.description")}
            </p>
          </div>

          {/* Navigation Links Container */}
          <div className="flex flex-col gap-[clamp(1rem,2vw,1.25rem)] shrink-0 ms-auto min-w-[min(100%,280px)]">
            <div className="w-full">
              <h4 className="text-[clamp(1rem,1.5vw+0.5rem,1.125rem)] font-semibold text-[var(--dark)] mb-[clamp(0.5rem,1vw,0.75rem)]">
                {t("footer.quick_links")}
              </h4>
              <ul className="flex flex-wrap gap-x-[clamp(1rem,2vw,1.25rem)] gap-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-gray-500 hover:text-[var(--primary-brand)] transition-colors text-[clamp(0.875rem,1vw+0.5rem,0.95rem)]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Icons Container */}
            <div className="flex flex-wrap items-center gap-[clamp(0.5rem,1vw,1rem)]">
              {footerSocials.map((social) => {
                const Icon = socialIcons[social];
                return (
                  <a
                    key={social}
                    href="/?#services"
                    aria-label={`Visit our ${social} page`}
                    className="w-[clamp(2rem,4vw,2.5rem)] h-[clamp(2rem,4vw,2.5rem)] shrink-0 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[var(--primary-brand)] group transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--primary-brand)] outline-none"
                  >
                    <Icon className="w-[clamp(1rem,1.5vw,1.125rem)] h-[clamp(1rem,1.5vw,1.125rem)] text-gray-600 group-hover:text-white transition-colors" />
                  </a>  
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <Separator className="bg-gray-200" />
      
      {/* Уменьшили py для нижней полоски */}
      <div className="w-full max-w-[1280px] mx-auto px-[clamp(1rem,4vw,2rem)] py-[clamp(0.75rem,1.25vw,1rem)]">
        <div className="flex flex-wrap items-center justify-between gap-[clamp(0.75rem,2vw,1rem)]">
          <p className="text-gray-400 text-[clamp(0.8rem,1vw+0.5rem,0.875rem)]">
            © {new Date().getFullYear()} {companyInfo.name}. {t("footer.rights")}
          </p>
          
          <div className="flex flex-wrap items-center gap-[clamp(1rem,3vw,1.5rem)]">
            <a 
              href="#" 
              className="text-gray-400 hover:text-[var(--primary-brand)] text-[clamp(0.8rem,1vw+0.5rem,0.875rem)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-brand)] rounded-sm"
            >
              {t("footer.terms")}
            </a>
            <a 
              href="#" 
              className="text-gray-400 hover:text-[var(--primary-brand)] text-[clamp(0.8rem,1vw+0.5rem,0.875rem)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-brand)] rounded-sm"
            >
              {t("footer.privacy")}
            </a>  
          </div>
        </div>
      </div>
    </footer>
  );
}