import { createContext, useContext, useEffect, useMemo, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import en from "../i18n/locales/en.json";
import az from "../i18n/locales/az.json";
import ru from "../i18n/locales/ru.json";

import { getLangFromPath } from "../utils/getLangFromPath";

const LanguageContext = createContext(null);

const translations = { en, az, ru };
const SUPPORTED = ["en", "az", "ru"];

/* -------------------------------------------
   Helpers
------------------------------------------- */
function getNested(obj, path) {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
}

// EN has NO prefix, only az/ru have prefixes
function stripLangPrefix(pathname) {
  return pathname.replace(/^\/(az|ru)(?=\/|$)/, "");
}

/* -------------------------------------------
   Provider
------------------------------------------- */
export function LanguageProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  /**
   * URL language:
   * - "az" | "ru" if prefixed
   * - null if EN (no prefix)
   */
  const urlLang = useMemo(() => getLangFromPath(pathname), [pathname]);

  /**
   * ✅ URL is the truth.
   * If no prefix => EN
   */
  const language = urlLang ?? "en";

  /**
   * Persist preference (for later, optional)
   * Does NOT affect current page language
   */
  useEffect(() => {
    try {
      localStorage.setItem("yeltu_lang", language);
    } catch {}
  }, [language]);

  /**
   * Explicit language change (user action ONLY)
   */
  const setLanguage = useCallback(
    (nextLang) => {
      if (!SUPPORTED.includes(nextLang)) return;
      if (pathname.startsWith("/admin")) return;

      const cleanPath = stripLangPrefix(pathname) || "/";
      const search = location.search || "";

      const nextPath =
        nextLang === "en"
          ? `${cleanPath === "/" ? "/" : cleanPath}${search}` // EN = no prefix
          : `/${nextLang}${cleanPath === "/" ? "" : cleanPath}${search}`;

      navigate(nextPath, { replace: true });
    },
    [navigate, pathname, location.search]
  );

  /**
   * Translation helper
   */
  const t = useCallback(
    (key) =>
      getNested(translations[language], key) ??
      getNested(translations.en, key) ??
      key,
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

/* -------------------------------------------
   Hook
------------------------------------------- */
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
