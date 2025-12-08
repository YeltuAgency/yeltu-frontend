import { useLanguage } from "../contexts/LanguageContext";
import { memo } from "react";

export default function AboutHero() {
  const { t } = useLanguage();

  const badgeText = t("about.badge") || "Digital Agency · Since 2020";
  const heroTitle = t("about.heroTitle") || "About Yeltu";
  const heroSubtitle =
    t("about.heroSubtitle") ||
    "We are a forward-thinking digital agency helping businesses grow with modern web, app, and marketing solutions.";

  return (
    <section
      aria-labelledby="about-hero-title"
      className="relative overflow-hidden text-white min-h-[50vh] flex items-center hero-bg"
    >
      {/* Background Grid */}
      <div aria-hidden="true" className="absolute inset-0 hero-grid" />

      {/* Floating background blobs */}
      <div
        className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-purple-500/35 blur-[160px]"
        aria-hidden="true"
      />
      <div
        className="absolute top-40 left-0 w-[320px] h-[320px] bg-indigo-500/30 blur-[130px]"
        aria-hidden="true"
      />

      {/* ❌ REMOVED ALL FLOATING ICONS */}
      {/* (Desktop + Mobile floating icons completely removed) */}

      {/* Content */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-blue-400/40 bg-white/5 backdrop-blur fade-in-1"
          role="note"
          aria-label={badgeText}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-violet-400 animate-pulse" />
          <span className="text-xs font-medium uppercase tracking-[0.22em] text-blue-100">
            {badgeText}
          </span>
        </div>

        <h1
          id="about-hero-title"
          className="mb-4 text-4xl sm:text-5xl md:text-6xl font-bold leading-tight fade-in-2"
          style={{
            background:
              "linear-gradient(135deg, #a78bfa 0%, #8b5cf6 40%, #7c3aed 70%, #6d28d9 100%)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          {heroTitle}
        </h1>

        <p
          className="max-w-2xl mx-auto text-blue-100/90 text-base sm:text-lg leading-relaxed fade-in-3"
          aria-label={heroSubtitle}
        >
          {heroSubtitle}
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------
   (FloatingIcon was removed completely, not needed)
-------------------------------------------------- */
