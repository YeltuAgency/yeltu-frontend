import { 
  Linkedin,
  Instagram,
  Dribbble,
  Mail,
  Phone,
  MapPin,
  Facebook,
} from "lucide-react";
import Logo from "./Logo.jsx";
import { useLanguage } from "../contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

export function Footer({ onNavigate }) {
  const { t } = useLanguage();

  const socialLinks = [
    { icon: Linkedin, href: "", label: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/yeltuagency/", label: "Instagram" },
    { icon: Facebook, href: "https://www.facebook.com/YeltuAgency", label: "Facebook" },
  ];

  const navigate = useNavigate();
    const handleNavigate = (section) => {
      navigate(`/${section}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
  
  };

  return (
    <footer 
      className="bg-[#0b1120] text-white relative z-10"
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">

        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* BRAND */}
          <div>
            <Logo className="h-20 w-auto mb-4 opacity-90" />
            <p className="text-slate-400 max-w-xs leading-relaxed">
              {t("footer.tagline")}
            </p>
          </div>

          {/* QUICK LINKS (NOW 2 COLUMNS) */}
          <nav aria-label="Footer quick links">
            <h3 className="mb-4 font-semibold text-lg text-white">
              {t("footer.quicklinks")}
            </h3>

            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              {["About", "Services", "Projects", "Contact"].map((link) => (
                <button
                  key={link}
                  type="button"
                  onClick={() => handleNavigate(link.toLowerCase())}
                  className="
                    text-slate-400 hover:text-blue-400 transition
                    text-sm text-left
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-offset-2
                    focus-visible:ring-blue-500
                    focus-visible:ring-offset-[#0b1120]
                  "
                >
                  {t(`footer.links.${link.toLowerCase()}`) || link}
                </button>
              ))}

              {/* LEGAL LINKS */}
              <a
                href="/privacy"
                className="text-sm text-slate-400 hover:text-blue-400 transition block"
              >
                {t("footer.links.privacy")}
              </a>
              <a
                href="/terms"
                className="text-sm text-slate-400 hover:text-blue-400 transition block"
              >
                {t("footer.links.terms")}
              </a>
              <a
                href="/cookies"
                className="text-sm text-slate-400 hover:text-blue-400 transition block"
              >
                {t("footer.links.cookies")}
              </a>
              <a
                href="/cookie-preferences"
                className="text-sm text-slate-400 hover:text-blue-400 transition block"
              >
                {t("footer.links.cookiePreferences")}
              </a>
            </div>
          </nav>

          {/* CONTACT */}
          <section aria-label="Contact information">
            <h3 className="mb-4 font-semibold text-lg text-white">
              {t("footer.contact")}
            </h3>

            <div className="space-y-4 text-sm text-slate-400">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-blue-400" />
                <a
                  href="mailto:hello@yeltu.com"
                  className="hover:text-blue-400 transition"
                >
                  info@yeltu.com
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={16} className="text-blue-400" />
                <a
                  href="tel:+994103240782"
                  className="hover:text-blue-400 transition"
                >
                  +994 (10) 324-07-82
                </a>
              </div>

              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-blue-400" />
                <span>Baku , AZE</span>
              </div>
            </div>
          </section>

          {/* SOCIAL */}
          <section aria-label="Social media links">
            <h3 className="mb-4 font-semibold text-lg text-white">
              {t("footer.follow")}
            </h3>

            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="
                    w-10 h-10 rounded-lg bg-slate-800 
                    hover:bg-gradient-to-r hover:from-blue-500 hover:to-violet-600 
                    flex items-center justify-center
                    transition
                  "
                >
                  <social.icon size={18} aria-hidden="true" />
                </a>
              ))}
            </div>
          </section>
        </div>

        {/* BOTTOM BORDER */}
        <div className="border-t border-slate-800 mt-14 pt-6 text-center text-slate-500 text-sm">
          © 2025 Yeltu. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}
