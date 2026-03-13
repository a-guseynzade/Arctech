import { useState, useEffect } from "react";
import { ChevronDown, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/context/LanguageContext";
import { useActiveSection } from "@/context/ActiveSectionContext";
import { navLinksData, languages, companyInfo } from "@/features/landing/data/landing-data";
import MobileMenu from "@/components/layout/MobileMenu";
import logo from "@/assets/logo.png";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { activeHash } = useActiveSection();

  // Get current language display info
  const currentLang = languages.find((l) => l.code === language) || languages[0];
  
  // Get localized nav links
  const navLinks = navLinksData[language] || navLinksData.en;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`
        fixed top-0 left-0 right-0 z-50
        ${scrolled 
          ? "bg-[var(--dark)]/90 border-b border-white/20 shadow-md" 
          : "bg-transparent border-transparent"                                  
        }
      `}
    >
      <div className="w-full max-w-[1280px] mx-auto px-[clamp(1rem,4vw,2rem)]">
        <div className="flex items-center justify-between h-[clamp(3rem,4vw,4rem)]">
          {/* Logo */}
          <a href="/" className="flex items-center gap-[clamp(0.5rem,2vw,0.75rem)]">
            <img src={logo} alt="Arctech Logo" className="h-[clamp(2.25rem,4vw,2.5rem)] w-auto" />
            <span className="text-[clamp(1.125rem,2vw+0.5rem,1.25rem)] font-bold text-primary-brand uppercase tracking-wider">
              {companyInfo.name} 
            </span>
          </a>

          {/* Desktop Navigation - Lenis handles anchor scrolling via anchors: true */}
          <nav className="hidden lg:flex items-center gap-[clamp(1.5rem,3vw,2.5rem)] group">
            {navLinks.map((link) => {
              const isActive = link.href === activeHash || (link.href === "#" && activeHash === "#home");
              
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`
                    relative transition-colors duration-200 text-[clamp(0.875rem,1.5vw,1rem)] font-medium
                    after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] 
                    after:bg-primary-brand after:transition-transform after:duration-300 after:origin-left
                    after:scale-x-0 hover:text-primary-brand hover:after:scale-x-100
                    ${isActive 
                      ? "text-primary-brand after:scale-x-100 group-hover:text-white/80 group-hover:after:scale-x-0 group-hover:hover:text-primary-brand group-hover:hover:after:scale-x-100" 
                      : "text-white/80"
                    }
                  `}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right Side - Language & CTA */}
          <div className="hidden lg:flex items-center gap-[clamp(1rem,2vw,1.5rem)]">
            {/* Language Switcher */}
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-[clamp(0.5rem,1vw,0.75rem)] text-white/80 hover:text-primary-brand transition-colors text-[clamp(0.875rem,1.5vw,1rem)] relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] after:bg-primary-brand after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">
                  <Globe className="w-[1.2em] h-[1.2em]" />
                  <span>{currentLang.flag}</span>
                  <span>{currentLang.label}</span>
                  <ChevronDown className="w-[1.2em] h-[1.2em]" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-[var(--dark-lighter)] border-white/10">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`text-white hover:bg-primary-brand/20 cursor-pointer ${
                      lang.code === language ? "bg-primary-brand/10" : ""
                    }`}
                  >
                    <span className="mr-2">{lang.flag}</span>
                    {lang.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu */}
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
