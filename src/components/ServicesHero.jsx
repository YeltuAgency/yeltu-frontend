import { useLanguage } from "../contexts/LanguageContext";

export default function ServicesHero() {
  const { t } = useLanguage();

  const heroTitle = t("services.hero.title") ?? "What We Do Best";
  const heroSubtitle =
    t("services.hero.subtitle") ??
    "Comprehensive digital services designed to accelerate your business growth.";

  return (
    <section
      aria-labelledby="services-hero-title"
      className="relative overflow-hidden text-white min-h-[50vh] flex items-center hero-bg"
    >
      {/* Background Grid */}
      <div aria-hidden="true" className="absolute inset-0 hero-grid" />

      {/* Floating Background Blobs (same as AboutHero) */}
      <div
        className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-purple-500/35 blur-[160px]"
        aria-hidden="true"
      />
      <div
        className="absolute top-40 left-0 w-[320px] h-[320px] bg-indigo-500/30 blur-[130px]"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1
          id="services-hero-title"
          className="mb-4 text-4xl sm:text-5xl md:text-6xl font-bold leading-tight fade-in-1"
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
          className="max-w-2xl mx-auto text-blue-100/90 text-base sm:text-lg leading-relaxed fade-in-2"
          aria-label={heroSubtitle}
        >
          {heroSubtitle}
        </p>
      </div>
    </section>
  );
}
