import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { SheetOverlay } from "@/components/ui/sheet";

import { useLanguage } from "@/context/LanguageContext";
import { useActiveSection } from "@/context/ActiveSectionContext";
import { navLinksData, languages } from "@/features/landing/data/landing-data";
import { cn } from "@/lib/utils";

/** Stagger animation for nav items entering from the right */
const itemVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.1 + i * 0.08, duration: 0.35, ease: "easeOut" },
  }),
};

/**
 * iOS-style segmented control for language switching.
 * Uses Framer Motion layoutId for the fluid sliding pill indicator.
 */
function LanguageSwitcher({ language, setLanguage }) {
  const activeIndex = languages.findIndex((l) => l.code === language);

  return (
    <div
      className="relative flex rounded-full bg-white/5 p-1"
      role="radiogroup"
      aria-label="Language"
    >
      {/* Sliding pill indicator */}
      <motion.div
        className="absolute inset-y-1 rounded-full bg-primary-brand"
        initial={false}
        animate={{
          left: `${activeIndex * (100 / languages.length)}%`,
        }}
        style={{
          width: `${100 / languages.length}%`,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 32 }}
      />

      {languages.map((lang) => (
        <button
          key={lang.code}
          type="button"
          role="radio"
          aria-checked={lang.code === language}
          onClick={() => setLanguage(lang.code)}
          className={cn(
            "relative z-10 flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-medium transition-colors duration-200",
            lang.code === language ? "text-white" : "text-white/50"
          )}
        >
          <span>{lang.flag}</span>
          <span>{lang.label}</span>
        </button>
      ))}
    </div>
  );
}

/**
 * Mobile navigation menu content rendered inside Sheet.
 * Features staggered entrance animations, active route indicator,
 * and iOS-style segmented language switcher.
 */
export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const { activeHash } = useActiveSection();
  const navLinks = navLinksData[language] || navLinksData.en;

  const handleNavClick = (href) => {
    setIsOpen(false);
    // Let Lenis handle the physical scroll, and useScrollSpy will auto-update activeHash
  };

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <DialogPrimitive.Trigger asChild className="lg:hidden">
        <button className="text-white p-2" aria-label="Open menu">
          <Menu className="w-6 h-6" />
        </button>
      </DialogPrimitive.Trigger>

      <DialogPrimitive.Portal>
        <SheetOverlay className="backdrop-blur-md bg-black/60" />

        <DialogPrimitive.Content
          className="fixed inset-y-0 right-0 z-50 flex flex-col h-full w-[min(320px,85vw)] bg-[var(--dark)] border-l border-white/10 shadow-2xl px-[clamp(1rem,4vw,1.5rem)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right data-[state=closed]:duration-300 data-[state=open]:duration-500"
        >
          <DialogPrimitive.Close 
            className="
              absolute top-4 right-4 z-10 
              flex items-center justify-center 
              size-12 rounded-full 
              bg-white/5 text-white/80 
              transition-all duration-150 
              hover:bg-white/10 hover:text-white 
              active:scale-95 active:ring-2 active:ring-primary-brand
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-brand
            "
          >
            <X className="size-5" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>

          <DialogPrimitive.Title className="sr-only">Navigation menu</DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">Main navigation and language selection</DialogPrimitive.Description>

          <div className="flex flex-col h-full pt-20">
      {/* Navigation Links */}
      <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
        <AnimatePresence>
          {isOpen &&
            navLinks.map((link, i) => {
              const isActive = link.href === activeHash || (link.href === "#" && activeHash === "#home");

              return (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  custom={i}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  className={cn(
                    "relative flex items-center py-3.5 pl-5 rounded-xl text-xl font-semibold tracking-wide transition-colors duration-200",
                    isActive
                      ? "text-white bg-white/5 border-l-[3px] border-primary-brand"
                      : "text-white/50 hover:text-white/80 border-l-[3px] border-transparent"
                  )}
                >
                  {link.label}
                </motion.a>
              );
            })}
        </AnimatePresence>
      </nav>

      {/* Language Switcher — pushed to bottom with auto margin */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.4, ease: "easeOut" }}
        className="mt-auto pb-[clamp(2rem,6vh,3rem)] pt-6"
      >
        <div className="border-t border-white/10 pt-6">
          <LanguageSwitcher language={language} setLanguage={setLanguage} />
        </div>
      </motion.div>
    </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
