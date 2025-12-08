import { useLanguage } from "../contexts/LanguageContext";

export default function MissionAndStory() {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-white via-slate-50 to-white relative overflow-hidden">

      {/* LIGHT BACKGROUND GRID */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.16),_transparent_60%),radial-gradient(ellipse_at_bottom,_rgba(139,92,246,0.14),_transparent_60%)]" />
        <div
          className="absolute inset-0 opacity-10 animate-grid-flow"
          style={{
            backgroundImage: `
              linear-gradient(rgba(148,163,184,0.35) 1px, transparent 1px),
              linear-gradient(90deg, rgba(148,163,184,0.35) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* ---- MISSION ---- */}
        <section aria-labelledby="mission-title">
          <div>
            <h2
              id="mission-title"
              className="mb-4 text-3xl md:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">
              {t("about.mission.title") || "Our Mission"}
            </h2>
            <p className="text-slate-600 leading-relaxed mb-3">
              {t("about.mission.body1") ||
                "At Yeltu, we believe every business deserves access to world-class digital solutions."}
            </p>
            <p className="text-slate-600 leading-relaxed">
              {t("about.mission.body2") ||
                "We combine strategy, design, and engineering to craft digital experiences that deliver measurable results."}
            </p>
          </div>
        </section>

        {/* ---- STORY ---- */}
        <section aria-labelledby="story-title">
          <div>
            <h2
              id="story-title"
              className="mb-4 text-3xl md:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">
              {t("about.story.title") || "Our Story"}
            </h2>
            <p className="text-slate-600 leading-relaxed mb-3">
              {t("about.story.body1") ||
                "Founded in 2020, Yeltu started from a simple observation: businesses need better digital tools."}
            </p>
            <p className="text-slate-600 leading-relaxed">
              {t("about.story.body2") ||
                "Today, we build websites, apps, and marketing campaigns that are fast, reliable, and scalable."}
            </p>
          </div>
        </section>
      </div>
    </section>
  );
}
