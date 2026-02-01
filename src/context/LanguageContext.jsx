import { createContext, useContext, useState, useCallback, useMemo } from "react";
import { dictionary } from "@/lib/dictionary";

// ============================================
// LANGUAGE CONTEXT
// ============================================

const LanguageContext = createContext(null);

const STORAGE_KEY = "arctech-language";
const DEFAULT_LANGUAGE = "en";
const SUPPORTED_LANGUAGES = ["en", "tr"];

/**
 * Get nested value from dictionary using dot notation
 * @param {Object} obj - Dictionary object
 * @param {string} path - Dot-separated path (e.g., 'header.nav.home')
 * @returns {any} The value at path, or the path itself as fallback
 */
function getNestedValue(obj, path) {
  const keys = path.split(".");
  let value = obj;

  for (const key of keys) {
    if (value === null || value === undefined) {
      return path; // Fallback to key name
    }
    value = value[key];
  }

  return value ?? path; // Return value or fallback to key
}

/**
 * Language Provider Component
 * Manages language state with localStorage persistence
 */
export function LanguageProvider({ children }) {
  // Initialize from localStorage or default
  const [language, setLanguageState] = useState(() => {
    if (typeof window === "undefined") return DEFAULT_LANGUAGE;
    
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED_LANGUAGES.includes(stored)) {
      return stored;
    }
    return DEFAULT_LANGUAGE;
  });

  // Memoized translation function
  const t = useCallback(
    (key) => {
      const translations = dictionary[language];
      if (!translations) {
        console.warn(`[i18n] Language "${language}" not found in dictionary`);
        return key;
      }
      return getNestedValue(translations, key);
    },
    [language]
  );

  // Language setter with localStorage sync
  const setLanguage = useCallback((code) => {
    if (!SUPPORTED_LANGUAGES.includes(code)) {
      console.warn(`[i18n] Unsupported language: ${code}`);
      return;
    }
    setLanguageState(code);
    localStorage.setItem(STORAGE_KEY, code);
  }, []);

  // Memoized context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t,
      languages: SUPPORTED_LANGUAGES,
    }),
    [language, setLanguage, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * Custom hook to access language context
 * @returns {{ language: string, setLanguage: (code: string) => void, t: (key: string) => any, languages: string[] }}
 */
export function useLanguage() {
  const context = useContext(LanguageContext);
  
  if (context === null) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  
  return context;
}
