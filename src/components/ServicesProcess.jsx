// components/ServicesProcess.jsx
import { memo } from "react";
import { useLanguage } from "../contexts/LanguageContext";

function ServicesProcess({ processPhases }) {
  const { t } = useLanguage();

  return (
    <section
      className="relative py-24 bg-white overflow-hidden"
      aria-labelledby="services-process-title"
    >
      <h2
        id="services-process-title"
        className="text-center text-5xl font-bold mb-16 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent"
      >
        {t("services.process.title")}
      </h2>

      <div className="max-w-7xl mx-auto px-4">
        <div
          className="
            relative flex justify-between items-start
            max-md:flex-col max-md:gap-14
          "
          role="list"
        >
          {/* DESKTOP COLOR-CHANGING SLIDING LINE */}
          <div
            className="
              absolute top-12 left-0 right-0 h-1 bg-slate-200 rounded-full overflow-hidden
              max-md:hidden
            "
            aria-hidden="true"
          >
            <div
              className="
                h-full w-full animate-process-line
              "
              aria-hidden="true"
            />
          </div>

          {processPhases.map((step, i) => (
            <div
              role="listitem"
              key={i}
              className="
                relative flex flex-col items-center w-1/4 group
                max-md:w-full max-md:flex-row max-md:items-start max-md:gap-4
              "
              aria-label={`Step ${step.number}: ${step.title}`}
            >
              {/* NUMBER BOX */}
              <div
                className={`
                  w-20 h-20 rounded-2xl flex items-center justify-center text-white text-xl font-bold 
                  shadow-xl transform transition-all duration-500 
                  group-hover:scale-110 ${step.color}

                  /* ★ Auto-highlight animation synced to line movement ★ */
                  animate-step-${i + 1}
                  
                  max-md:w-14 max-md:h-14 max-md:text-base
                `}
                aria-hidden="true"
              >
                {step.number}
              </div>

              {/* PARTICLE (desktop only) */}
              <div
                className={`
                  absolute top-0 w-3 h-3 rounded-full opacity-0 
                  group-hover:opacity-100 animate-floating-dot
                  transition-opacity duration-300 ${step.colorDot}

                  /* ★ Auto show particle when active ★ */
                  animate-stepDot-${i + 1}

                  max-md:hidden
                `}
                aria-hidden="true"
              />

              {/* TEXT */}
              <div className="
                flex flex-col items-center text-center
                max-md:flex-1 max-md:items-start max-md:text-left
              ">
                <h3 className="mt-6 text-xl font-semibold text-slate-800 max-md:mt-0 leading-tight">
                  {step.title}
                </h3>

                <p className="mt-2 text-slate-600 text-center max-w-xs max-md:text-left max-md:max-w-full">
                  {step.description}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default memo(ServicesProcess);
