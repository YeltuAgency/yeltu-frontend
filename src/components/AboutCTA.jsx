import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "../contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

export default function AboutCTA() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const goContact = () => navigate("/contact");


  return (
    <section
      aria-labelledby="about-cta-title"
      className={`
        relative py-20 text-white text-center overflow-hidden 
        bg-gradient-to-br from-slate-900 via-blue-950 to-violet-950
      `}
    >
      {/* GRID BACKGROUND */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34,211,238,0.25) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,92,246,0.25) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          opacity: 0.2,
        }}
      />

      {/* FLOATING ORBS */}
      <div
        className="absolute -top-20 -left-20 w-56 h-56 rounded-full bg-cyan-400/20 blur-3xl animate-float"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-violet-500/20 blur-3xl animate-float"
        style={{ animationDelay: "1.5s" }}
        aria-hidden="true"
      />

      {/* MOVING SCAN LINE */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(34,211,238,0.25), transparent)",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 90%)",
          animation: "scan 4s linear infinite",
        }}
      />

      {/* CONTENT */}
      <div className="relative max-w-3xl mx-auto px-6 z-10">
        <h2
          id="about-cta-title"
          className="mb-6 text-3xl md:text-4xl font-bold"
        >
          {t("about.cta.title") || "Ready to Build What’s Next?"}
        </h2>

        <p className="text-blue-100 mb-8 text-lg">
          {t("about.cta.subtitle") ||
            "Tell us about your idea — we’ll help you turn it into a modern digital experience."}
        </p>

        <Button
          aria-label="Navigate to Contact page"
          onClick={goContact}
          size="lg"
          className="
            bg-white text-blue-600 hover:bg-blue-50 
            shadow-xl hover:scale-105 
            transition-all duration-300
          "
        >
          {t("about.cta.button") || "Get In Touch"}
          <ArrowRight className="ml-2" size={20} />
        </Button>
      </div>
    </section>
  );
}
