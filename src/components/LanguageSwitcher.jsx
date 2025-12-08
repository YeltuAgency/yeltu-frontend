import { useLanguage } from "../contexts/LanguageContext";
import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: "en", label: "EN", name: "English" },
    { code: "az", label: "AZ", name: "Azərbaycan" },
    { code: "ru", label: "RU", name: "Русский" },
  ];

  const currentLang = languages.find((l) => l.code === language);

  /* Close dropdown when clicking outside */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1 px-3 py-1.5 text-slate-600 hover:text-blue-600 transition-colors"
      >
        <span className="text-sm">{currentLang?.label}</span>
        <ChevronDown
          size={14}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-xl border border-slate-200 py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                language === lang.code
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
