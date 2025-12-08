// src/components/PortfolioBentoGrid.jsx
import { memo } from "react";
import { ImageWithFallback } from "./ImageWithFallback";
import { useLanguage } from "../contexts/LanguageContext";

function PlaceholderBentoCard({ project, index, setCursorVariant }) {
  return (
    <article
      className="group relative cursor-default rounded-3xl overflow-hidden bg-slate-900/70 border border-white/10"
      onMouseEnter={() => setCursorVariant("hover")}
      onMouseLeave={() => setCursorVariant("default")}
      aria-label={project.title || `Placeholder project ${index + 1}`}
    >
      <ImageWithFallback
        src={project.image}
        alt={
          project.title
            ? `${project.title} – placeholder project thumbnail`
            : "Portfolio project placeholder"
        }
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-70 transition-opacity duration-500"
      />

      <div
        className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-50 group-hover:opacity-70 transition-opacity duration-500`}
        aria-hidden="true"
      />

      <div className="relative p-6 flex flex-col justify-end h-[260px]">
        <span className="text-xs uppercase tracking-[0.25em] text-slate-100/70 mb-2">
          Placeholder #{index + 1}
        </span>
        <h3 className="text-xl md:text-2xl font-black mb-1">
          {project.title}
        </h3>
        <p className="text-white/80 text-sm">
          We&apos;re currently building our first real client projects.
        </p>
      </div>
    </article>
  );
}

function PortfolioBentoGrid({ projects, setCursorVariant }) {
  const { t } = useLanguage();

  return (
    <section
      className="py-16 md:py-20 px-4 bg-slate-950"
      aria-labelledby="portfolio-all-projects-title"
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2
          id="portfolio-all-projects-title"
          className="text-3xl md:text-5xl font-black bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-3"
        >
          {t("portfolio.sections.all.title") || "All Projects"}
        </h2>

        <p className="text-slate-400 mb-12">
          {t("portfolio.sections.all.subtitle") || "Portfolio loading… 🚀"}
        </p>

        <ul
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
          role="list"
        >
          {projects.map((project, index) => (
            <li
              key={index}
              role="listitem"
              className="opacity-0 translate-y-6 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.05 + 0.1}s` }}
            >
              <PlaceholderBentoCard
                project={project}
                index={index}
                setCursorVariant={setCursorVariant}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default memo(PortfolioBentoGrid);
