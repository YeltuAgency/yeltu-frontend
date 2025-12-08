// src/components/PortfolioFilters.jsx
import { memo } from "react";

function PortfolioFilters({
  filters,
  activeFilter,
  setActiveFilter,
  setCursorVariant,
}) {
  return (
    <section
      className="sticky top-16 z-40 bg-slate-950/80 backdrop-blur-xl border-y border-white/5 py-4"
      aria-label="Filter projects by category"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div
          className="flex flex-wrap justify-center gap-3"
          role="radiogroup"
          aria-label="Project categories"
        >
          {filters.map((filter) => {
            const isActive = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                role="radio"
                aria-checked={isActive}
                aria-label={filter.label}
                onClick={() => setActiveFilter(filter.id)}
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
                className={[
                  "relative px-7 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
                  "border border-white/10 bg-white/5 text-slate-200",
                  "hover:bg-white/10 hover:border-white/20",
                  isActive &&
                    "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white border-transparent shadow-lg shadow-purple-500/30",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <span className="relative z-10">{filter.label}</span>
                {isActive && (
                  <span
                    className="absolute inset-0 rounded-full bg-white/10"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default memo(PortfolioFilters);
