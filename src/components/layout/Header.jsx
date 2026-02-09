import { useState, useEffect } from "react";
import { Menu, ChevronDown, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/context/LanguageContext";
import { navLinksData, languages, companyInfo } from "@/features/landing/data/landing-data";
import logo from "@/assets/logo.png";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

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
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <img src={logo} alt="Arctech Logo" className="h-20 lg:h-24 w-auto" />
            <span className="text-3xl lg:text-4xl font-bold text-[var(--primary-brand)] uppercase tracking-wider">
              {companyInfo.name}
            </span>
          </a>

          {/* Desktop Navigation - Lenis handles anchor scrolling via anchors: true */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-white/80 hover:text-[var(--primary-brand)] transition-colors duration-200 text-xl font-medium after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] after:bg-[var(--primary-brand)] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Side - Language & CTA */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 text-white/80 hover:text-[var(--primary-brand)] transition-colors text-xl relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] after:bg-[var(--primary-brand)] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">
                  <Globe className="w-4 h-4" />
                  <span>{currentLang.flag}</span>
                  <span>{currentLang.label}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-[var(--dark-lighter)] border-white/10">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`text-white hover:bg-[var(--primary-brand)]/20 cursor-pointer ${
                      lang.code === language ? "bg-[var(--primary-brand)]/10" : ""
                    }`}
                  >
                    <span className="mr-2">{lang.flag}</span>
                    {lang.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <button className="text-white p-2">
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[var(--dark)] border-white/10 w-[280px]">
              <div className="flex flex-col h-full pt-8">
                {/* Mobile Navigation */}
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-white/80 hover:text-[var(--primary-brand)] transition-colors text-2xl font-medium py-2"
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>

                {/* Mobile Language Switcher */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-white/50 text-xl mb-3">{t("header.nav.contact")}</p>
                  <div className="flex gap-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsOpen(false);
                        }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xl transition-colors ${
                          lang.code === language
                            ? "bg-[var(--primary-brand)] text-white"
                            : "bg-white/10 text-white/80 hover:bg-white/20"
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile CTA */}
                <div className="mt-auto pb-8">
                  <Button className="w-full bg-[var(--primary-brand)] hover:bg-[var(--primary-brand-dark)] text-white font-semibold">
                    {t("header.contact_us")}
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
