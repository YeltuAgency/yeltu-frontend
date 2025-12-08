import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "../contexts/LanguageContext";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.about"), path: "/about" },
    { name: t("nav.services"), path: "/services" },
    { name: t("nav.projects"), path: "/projects" },
    { name: "Blog", path: "/blog" },
    { name: t("nav.contact"), path: "/contact" },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className="
        sticky top-0 z-50
        bg-transparent
        backdrop-blur-xl
      "
    >
      {/* 🔹 TOP GRADIENT LINE */}
      <div className="h-[2px] w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />

      {/* Skip link */}
      <a
        href="#main-content"
        className="
          sr-only 
          focus:not-sr-only 
          focus:absolute 
          focus:top-2 
          focus:left-2 
          focus:z-50 
          focus:bg-blue-600 
          focus:text-white 
          focus:px-4 
          focus:py-2 
          focus:rounded-lg 
          focus:outline-none 
          focus:ring-2 
          focus:ring-offset-2 
          focus:ring-blue-500
        "
      >
        Skip to main content
      </a>

      <nav
        className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[92rem]"
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Main Bar */}
        <div
          className="
            h-[55px]
            flex items-center justify-between

            /* 🌟 Premium glossy blue navbar */
            bg-gradient-to-r from-[rgba(236,245,255,0.75)] via-[rgba(220,235,255,0.65)] to-[rgba(236,245,255,0.78)]
            backdrop-blur-2xl

            border border-blue-200/40
            shadow-[0_6px_26px_rgba(30,64,175,0.18)]
            rounded-xl

            mt-0 mb-1
            px-4 sm:px-6 lg:px-8
            w-full

            transition-all duration-300
          "
        >
          {/* Logo */}
          <button
            type="button"
            onClick={() => handleNavigate("/")}
            className="
              flex items-center gap-2 sm:gap-3
              hover:opacity-90 transition-opacity
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-offset-2
              focus-visible:ring-blue-500
            "
            aria-label="Go to Yeltu Agency homepage"
          >
            <Logo className="h-20 w-auto sm:h-22 md:h-24 lg:h-24" />

            <span
              className="
                hidden md:inline-block
                text-[1.25rem] font-italic
                font-jakarta
                
                /* 🔥 Gradient-clipped brand name using your requested color */
                bg-[#1f0c31]
                bg-clip-text text-transparent

                tracking-wide
              "
            >
              Yeltu | Web & Digital Agency
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;

              return (
                <button
                  key={link.path}
                  type="button"
                  onClick={() => handleNavigate(link.path)}
                  className={`
                    relative px-3 py-1.5 
                    text-[1.05rem] font-medium tracking-
                    font-inter
                    rounded-lg transition-all duration-300

                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-offset-2
                    focus-visible:ring-blue-500

                    ${
                      isActive
                        ? "text-blue-700 font-semibold"
                        : "text-black/70 hover:text-black hover:bg-white/40 hover:backdrop-blur-xl"
                    }
                  `}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.name}

                  {/* Active dot */}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="
                        absolute -bottom-1 left-1/2 -translate-x-1/2
                        w-1.5 h-1.5 rounded-full bg-blue-600
                        shadow-[0_0_8px_rgba(59,130,246,0.7)]
                      "
                    />
                  )}
                </button>
              );
            })}

            <LanguageSwitcher />
          </div>

          {/* Mobile Right Section */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher />

            <button
              type="button"
              onClick={() => setMobileMenuOpen((o) => !o)}
              className="
                p-2 rounded-lg
                text-slate-700 hover:text-blue-600
                hover:bg-white/40 dark:hover:bg-slate-800/40
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-blue-500
              "
              aria-label={
                mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav"
          className="
            md:hidden
            bg-white/95 dark:bg-slate-950/95
            border-t border-white/20 dark:border-slate-800/40
            backdrop-blur-xl
            animate-fadeIn
          "
        >
          <div className="max-w-[92rem] mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;

              return (
                <button
                  key={link.path}
                  type="button"
                  onClick={() => handleNavigate(link.path)}
                  className={`
                    w-full text-left px-4 py-3 rounded-lg
                    text-sm font-medium
                    transition-all

                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-blue-500

                    ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-slate-800 dark:text-slate-100 hover:bg-slate-100/90 dark:hover:bg-slate-800/80"
                    }
                  `}
                >
                  {link.name}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
