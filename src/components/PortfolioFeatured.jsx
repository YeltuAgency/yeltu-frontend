// src/components/PortfolioFeatured.jsx
import { memo } from "react";
import { ImageWithFallback } from "./ImageWithFallback";
import { useLanguage } from "../contexts/LanguageContext";

function PlaceholderCard({ project, setCursorVariant }) {
  return (
    <article
      className="group relative"
      onMouseEnter={() => setCursorVariant("hover")}
      onMouseLeave={() => setCursorVariant("default")}
      aria-label={project.title || "Featured project placeholder"}
    >
      <div
        className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 rounded-3xl blur-md transition-all duration-500"
        aria-hidden="true"
      />

      <div className="relative bg-slate-900/60 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl transform group-hover:-translate-y-1 group-hover:scale-[1.01] transition-all duration-500">
        <div className="h-[320px] overflow-hidden relative">
          <ImageWithFallback
            src={project.image}
            alt={
              project.title
                ? `${project.title} – featured project thumbnail`
                : "Featured project placeholder"
            }
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />

          <div
            className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-40`}
            aria-hidden="true"
          />
        </div>

        <div className="p-8 space-y-3 text-left">
          <h3 className="text-2xl md:text-3xl font-bold">{project.title}</h3>
          <p className="text-slate-300">{project.description}</p>

          {project.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-3" aria-label="Technologies used">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-white/10 text-xs uppercase tracking-wide text-slate-200 border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="text-white/70 text-xs italic pt-3">
            Real case studies will be published here soon.
          </div>
        </div>
      </div>
    </article>
  );
}

function PortfolioFeatured({ projects, setCursorVariant }) {
  const { t } = useLanguage();

  return (
    <section
      className="py-16 md:py-20 px-4 bg-slate-950"
      aria-labelledby="portfolio-featured-title"
    >
      <div className="max-w-7xl mx-auto text-center mb-14">
        <h2
          id="portfolio-featured-title"
          className="text-4xl md:text-6xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
        >
          {t("portfolio.sections.featured.title") || "Featured Work Coming Soon"}
        </h2>

        <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
          {t("portfolio.sections.featured.subtitle") ||
            "For now, enjoy the animations. Real client work goes here soon."}
        </p>
      </div>

      <ul
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto"
        role="list"
      >
        {projects.map((project, index) => (
          <li
            key={index}
            role="listitem"
            className="opacity-0 translate-y-6 animate-fade-in-up"
            style={{ animationDelay: `${index * 0.12}s` }}
          >
            <PlaceholderCard
              project={project}
              setCursorVariant={setCursorVariant}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default memo(PortfolioFeatured);
