// src/components/PortfolioHero.jsx
import { memo } from "react";
import { Sparkles, MousePointer2 } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

function PortfolioHero() {
  const { t } = useLanguage();

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950"
      role="banner"
      aria-labelledby="portfolio-hero-title"
      aria-describedby="portfolio-hero-subtitle"
    >
      {/* Background blobs + grid (decorative) */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-gradient-shift" />
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full blur-3xl opacity-30 animate-float" />
        <div className="absolute top-40 right-20 w-40 h-40 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-3xl opacity-30 animate-float" />
        <div className="absolute bottom-20 left-1/3 w-36 h-36 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-full blur-3xl opacity-30 animate-float" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59,130,246,0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59,130,246,0.4) 1px, transparent 1px)
            `,
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-7xl mx-auto px-4">
        <div
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-full border border-white/10 mb-8"
          role="note"
        >
          <Sparkles className="w-4 h-4 text-yellow-400" aria-hidden="true" />
          <span className="text-sm font-medium bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {t("portfolio.hero.badge") || "We're Just Getting Started"}
          </span>
        </div>

        <h1
          id="portfolio-hero-title"
          className="mb-6"
        >
          <span
            className="
              block
              text-5xl 
              md:text-7xl 
              lg:text-8xl 
              font-black
              bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400
              bg-clip-text text-transparent
              mb-4
              leading-[1.32] md:leading-[1.34] lg:leading-[1.36]
            "
          >
            {t('portfolio.hero.title') || 'Portfolio'}
          </span>


          <span
            id="portfolio-hero-subtitle"
            className="block text-2xl md:text-4xl lg:text-5xl font-bold text-white/80"
          >
            {t("portfolio.hero.subtitle") || "Real Projects Coming Soon"}
          </span>
        </h1>

        <p className="text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12">
          {t("portfolio.hero.text") ||
            "We're a new agency — we're building Yeltu and our first client projects. Soon this page will showcase our real work 🔥"}
        </p>

        {/* Decorative pointer */}
        <div className="animate-bounce" aria-hidden="true">
          <MousePointer2 className="mx-auto text-blue-400" size={32} />
        </div>
      </div>

      {/* Bottom gradient fade (decorative) */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}

export default memo(PortfolioHero);
