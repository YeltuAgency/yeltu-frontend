import { useMemo, useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "../contexts/LanguageContext";

function stripLangPrefix(pathname) {
  return pathname.replace(/^\/(az|ru)(?=\/|$)/, "") || "/";
}

function withLang(path, lang) {
  // EN has no prefix
  if (!path.startsWith("/")) path = `/${path}`;
  if (lang === "en") return path;
  return `/${lang}${path === "/" ? "" : path}`;
}

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, language } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      // Trigger effect only after scrolling 30px
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cleanPath = useMemo(
    () => stripLangPrefix(location.pathname),
    [location.pathname]
  );

  const navLinks = useMemo(
    () => [
      { name: t("nav.home"), path: "/" },
      { name: t("nav.about"), path: "/about" },
      { name: t("nav.services"), path: "/services" },
      { name: t("nav.projects"), path: "/projects" },
      { name: "Blog", path: "/blog" },
      { name: t("nav.contact"), path: "/contact" },
    ],
    [t]
  );

  const handleNavigate = (path) => {
    if (location.pathname.startsWith("/admin")) {
      navigate(path);
    } else {
      const next = withLang(path, language);
      navigate(next);
    }

    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className={`
        sticky top-0 z-50 w-full
        py-3
        transition-all duration-500 ease-in-out
        ${
          scrolled
            ? "bg-[#1e1b4b]/80 backdrop-blur-md shadow-lg border-b border-white/5" // SCROLLED: Indigo Glass + Blur
            : "bg-[#1e1b4b] border-b border-transparent shadow-none backdrop-blur-none" // TOP: Solid Indigo + NO Blur (Seamless)
        }
      `}
    >
      <a
        href="#main-content"
        className="
          sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 
          focus:z-50 focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 
          focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        "
      >
        Skip to main content
      </a>

      <nav
        className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[92rem]"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <button
            type="button"
            onClick={() => handleNavigate("/")}
            className="
              flex items-center gap-2 sm:gap-3
              hover:opacity-80 transition-opacity
              focus-visible:outline-none
            "
            aria-label="Go to Yeltu Agency homepage"
          >
            <Logo className="h-8 w-auto" />
            <span className="hidden md:inline-block text-[1.25rem] font-bold font-jakarta text-white tracking-tight">
              Yeltu Agency
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                cleanPath === link.path ||
                (link.path !== "/" && cleanPath.startsWith(`${link.path}/`));

              return (
                <button
                  key={link.path}
                  type="button"
                  onClick={() => handleNavigate(link.path)}
                  className={`
                    relative px-4 py-2 
                    text-[0.9rem] font-medium font-inter
                    rounded-full transition-all duration-300
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500

                    ${
                      isActive
                        ? "bg-white/10 text-white shadow-sm font-semibold" // Active
                        : "text-slate-300 hover:bg-white/5 hover:text-white" // Hover
                    }
                  `}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.name}
                </button>
              );
            })}

            {/* ✅ FIXED: Added specific override classes to FORCE white text */}
            <div 
              className="
                relative flex items-center
                ml-4 pl-4 border-l border-white/10 
                
                /* FORCE EVERYTHING INSIDE TO BE WHITE */
                text-white 
                [&_*]:text-white 
                
                /* EXCEPTION: Reset text color for the dropdown menu when it opens */
                [&_.absolute]:text-slate-900 
                [&_.absolute_*]:text-slate-900
                
                /* Ensure active blue state inside dropdown still works */
                [&_.absolute_.text-blue-600]:!text-blue-600
              "
            >
              <LanguageSwitcher />
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Same Force White Fix for Mobile */}
            <div className="relative flex items-center text-white [&_*]:text-white [&_.absolute]:text-slate-900 [&_.absolute_*]:text-slate-900">
                <LanguageSwitcher />
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((o) => !o)}
              className="
                p-2 rounded-lg text-slate-200 
                hover:text-white hover:bg-white/10
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
              "
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
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
            md:hidden absolute top-full left-0 w-full
            bg-[#1e1b4b] border-b border-white/10
            backdrop-blur-xl shadow-2xl animate-fadeIn overflow-hidden
          "
        >
          <div className="p-4 space-y-1">
            {navLinks.map((link) => {
              const isActive =
                cleanPath === link.path ||
                (link.path !== "/" && cleanPath.startsWith(`${link.path}/`));

              return (
                <button
                  key={link.path}
                  type="button"
                  onClick={() => handleNavigate(link.path)}
                  className={`
                    w-full text-left px-4 py-3 rounded-xl
                    text-sm font-medium transition-all
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500

                    ${
                      isActive
                        ? "bg-blue-600/20 text-blue-200 border border-blue-500/30"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
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