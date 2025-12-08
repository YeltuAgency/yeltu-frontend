import { createContext, useContext, useState, useEffect } from "react";

import en from "../i18n/locales/en.json";
import az from "../i18n/locales/az.json";
import ru from "../i18n/locales/ru.json";

const LanguageContext = createContext();

const translations = { en, az, ru };

// Utility: nested key resolver (legal.privacy.title → value)
function getNested(obj, path) {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
}

export function LanguageProvider({ children }) {
  // Load saved language OR default to "en"
  const [language, setLanguage] = useState(
    () => localStorage.getItem("yeltu_lang") || "en"
  );

  // Save to localStorage whenever user changes the language
  useEffect(() => {
    localStorage.setItem("yeltu_lang", language);
  }, [language]);

  const t = (key) => getNested(translations[language], key) || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return ctx;
}
