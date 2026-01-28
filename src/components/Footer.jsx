import { 
  Linkedin,
  Instagram,
  Facebook,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Logo from "./Logo.jsx";
import { useLanguage } from "../contexts/LanguageContext";
import { useLangNavigate } from "../utils/useLangNavigate";

export function Footer({ onNavigate }) {
  const { t } = useLanguage();

  const socialLinks = [
    { icon: Linkedin, href: "", label: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/yeltuagency/", label: "Instagram" },
    { icon: Facebook, href: "https://www.facebook.com/YeltuAgency", label: "Facebook" },
  ];

  const navigate = useLangNavigate();
    const handleNavigate = (section) => {
      navigate(`/${section}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer 
      className="bg-[#0b1120] text-white relative z-10 border-t border-slate-800"
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* 4-COLUMN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* COLUMN 1: BRAND LOCKUP */}
          <div className="space-y-6">
            
            {/* LOGO + TEXT LOCKUP */}
            <div className="flex items-center gap-3">
              <Logo className="h-14 w-auto" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white leading-none tracking-tight">
                  YELTU
                </span>
                <span className="text-[10px] font-semibold text-blue-400 tracking-[0.1em] uppercase mt-1">
                  Web & Digital Agency
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              {t("footer.tagline")}
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="
                    w-10 h-10 rounded-lg bg-slate-800/50 border border-slate-700
                    hover:bg-gradient-to-r hover:from-blue-500 hover:to-violet-600 hover:border-transparent
                    flex items-center justify-center text-slate-400 hover:text-white
                    transition-all duration-300
                  "
                >
                  <social.icon size={18} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* COLUMN 2: QUICK LINKS */}
          <nav aria-label="Footer quick links">
            <h3 className="mb-6 font-semibold text-white tracking-wide">
              {t("footer.quicklinks")}
            </h3>
            <ul className="space-y-3">
              {["About", "Services", "Projects", "Contact"].map((link) => (
                <li key={link}>
                  <button
                    type="button"
                    onClick={() => handleNavigate(link.toLowerCase())}
                    className="
                      text-slate-400 hover:text-blue-400 transition-colors
                      text-sm text-left block w-full
                      focus-visible:outline-none focus-visible:text-blue-400
                    "
                  >
                    {t(`footer.links.${link.toLowerCase()}`) || link}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* COLUMN 3: LEGAL */}
          <nav aria-label="Legal links">
            <h3 className="mb-6 font-semibold text-white tracking-wide">
              {t("footer.legal")}
            </h3>
            <ul className="space-y-3">
              <li>
                <button
                  type="button"
                  onClick={() => handleNavigate("privacy")}
                  className="text-sm text-slate-400 hover:text-blue-400 transition-colors block text-left"
                >
                  {t("footer.links.privacy")}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavigate("terms")}
                  className="text-sm text-slate-400 hover:text-blue-400 transition-colors block text-left"
                >
                  {t("footer.links.terms")}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavigate("cookies")}
                  className="text-sm text-slate-400 hover:text-blue-400 transition-colors block text-left"
                >
                  {t("footer.links.cookies")}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavigate("cookie-preferences")}
                  className="text-sm text-slate-400 hover:text-blue-400 transition-colors block text-left"
                >
                  {t("footer.links.cookiePreferences")}
                </button>
              </li>
            </ul>
          </nav>

          {/* COLUMN 4: CONTACT */}
          <section aria-label="Contact information">
            <h3 className="mb-6 font-semibold text-white tracking-wide">
              {t("footer.contact")}
            </h3>
            <div className="space-y-4 text-sm text-slate-400">
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-blue-500 mt-0.5" />
                <a
                  href="mailto:hello@yeltu.com"
                  className="hover:text-white transition-colors"
                >
                  info@yeltu.com
                </a>
              </div>

              <div className="flex items-start gap-3">
                <Phone size={18} className="text-blue-500 mt-0.5" />
                <a
                  href="tel:+994103240782"
                  className="hover:text-white transition-colors"
                >
                  +994 (10) 324-07-82
                </a>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-blue-500 mt-0.5" />
                <span>Baku, AZE</span>
              </div>
            </div>
          </section>

        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-slate-800/50 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
          <p>© 2025 Yeltu. {t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  );
}