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
      <div className="w-full max-w-[1280px] mx-auto px-[clamp(1rem,4vw,2rem)]">
        <div className="flex items-center justify-between h-[clamp(3rem,4vw,4rem)]">
          {/* Logo */}
          <a href="/" className="flex items-center gap-[clamp(0.5rem,2vw,0.75rem)]">
            <img src={logo} alt="Arctech Logo" className="h-[clamp(2.25rem,4vw,2.5rem)] w-auto" />
            <span className="text-[clamp(1.125rem,2vw+0.5rem,1.25rem)] font-bold text-[var(--primary-brand)] uppercase tracking-wider">
              {companyInfo.name} 
            </span>
          </a>

          {/* Desktop Navigation - Lenis handles anchor scrolling via anchors: true */}
          <nav className="hidden lg:flex items-center gap-[clamp(1.5rem,3vw,2.5rem)]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-white/80 hover:text-[var(--primary-brand)] transition-colors duration-200 text-[clamp(0.875rem,1.5vw,1rem)] font-medium after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] after:bg-[var(--primary-brand)] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Side - Language & CTA */}
          <div className="hidden lg:flex items-center gap-[clamp(1rem,2vw,1.5rem)]">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-[clamp(0.5rem,1vw,0.75rem)] text-white/80 hover:text-[var(--primary-brand)] transition-colors text-[clamp(0.875rem,1.5vw,1rem)] relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] after:bg-[var(--primary-brand)] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">
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
            {/* Здесь брейкпоинт оправдан — это переключение макро-структуры */}
            <SheetTrigger asChild className="lg:hidden">
              <button className="text-white p-2">
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>

            {/* Intrinsic Width: максимум 320px, но не больше 85% ширины экрана */}
            <SheetContent side="right" className="bg-[var(--dark)] border-white/10 w-[min(320px,85vw)] px-[clamp(1rem,4vw,1.5rem)]">
              
              {/* Отступ сверху зависит от высоты экрана (vh), чтобы не съедать место на низких экранах */}
              <div className="flex flex-col h-full pt-[clamp(1rem,5vh,2rem)]">
                
                {/* Mobile Navigation */}
                {/* gap зависит от высоты экрана: от 8px до 16px */}
                <nav className="flex flex-col gap-[clamp(0.5rem,2vh,1rem)]">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      // Fluid типографика: текст от 1.125rem до 1.5rem в зависимости от ширины экрана
                      className="text-white/80 hover:text-[var(--primary-brand)] transition-colors text-[clamp(1.125rem,4vw,1.5rem)] font-medium py-[clamp(0.25rem,1vh,0.5rem)]"
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>

                {/* Mobile Language Switcher */}
                <div className="mt-[clamp(1rem,4vh,1.5rem)] pt-[clamp(1rem,4vh,1.5rem)] border-t border-white/10">
                  <p className="text-white/50 text-[clamp(0.875rem,3vw,1.125rem)] mb-[clamp(0.5rem,2vh,0.75rem)]">
                    {t("header.nav.contact")}
                  </p>
                  <div className="flex flex-wrap gap-2"> {/* flex-wrap спасает, если языков станет много */}
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsOpen(false);
                        }}
                        // Intrinsic sizing: кнопки сами подстроятся под свой контент, flex-1 растянет их равномерно
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-[clamp(0.875rem,3vw,1.125rem)] transition-colors ${
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
                <div className="mt-auto pb-[clamp(1.5rem,5vh,2rem)] pt-4">
                  <Button className="w-full bg-[var(--primary-brand)] hover:bg-[var(--primary-brand-dark)] text-white font-semibold py-6 text-[clamp(1rem,3vw,1.125rem)]">
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
