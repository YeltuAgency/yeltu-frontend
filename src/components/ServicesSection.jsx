import {
  Code,
  TrendingUp,
  Palette,
  Search,
  Users,
  Smartphone,
  ArrowRight
} from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

// Animated letters component (JSX version)
const AnimatedText = ({ text, isHovered }) => {
  const animations = [
    "letter-bounce",
    "letter-wiggle",
    "letter-pulse",
    "letter-swing",
    "letter-pop",
  ];

  return (
    <span className="flex flex-wrap gap-x-1">
      {text.split(" ").map((word, wordIndex) => (
        <span key={wordIndex} className="inline-flex">
          {word.split("").map((char, charIndex) => {
            const animation =
              animations[(charIndex + wordIndex) % animations.length];

            return (
              <span
                key={charIndex}
                className="inline-block"
                style={{
                  animation: isHovered
                    ? `${animation} 0.6s ease-in-out infinite`
                    : "none",
                  animationDelay: `${charIndex * 0.03}s`,
                }}
              >
                {char}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
};

export default function ServicesSection({ onNavigate }) {
  const { t } = useLanguage();
  const [hoveredService, setHoveredService] = useState(null);

  const services = [
    {
      icon: Code,
      title: t("services.webDev.title"),
      description: t("services.webDev.desc"),
      gradient: "from-blue-500 via-indigo-500 to-purple-600",
      iconBg: "from-blue-50 to-indigo-50",
      iconColor: "text-blue-600",
    },
    {
      icon: Smartphone,
      title: t("services.mobile.title"),
      description: t("services.mobile.desc"),
      gradient: "from-purple-500 via-violet-500 to-fuchsia-600",
      iconBg: "from-purple-50 to-fuchsia-50",
      iconColor: "text-purple-600",
    },
    {
      icon: TrendingUp,
      title: t("services.growth.title"),
      description: t("services.growth.desc"),
      gradient: "from-indigo-500 via-blue-500 to-cyan-600",
      iconBg: "from-indigo-50 to-blue-50",
      iconColor: "text-indigo-600",
    },
    {
      icon: Palette,
      title: t("services.brand.title"),
      description: t("services.brand.desc"),
      gradient: "from-rose-500 via-pink-500 to-orange-500",
      iconBg: "from-rose-50 to-pink-50",
      iconColor: "text-rose-600",
    },
    {
      icon: Search,
      title: t("services.seo.title"),
      description: t("services.seo.desc"),
      gradient: "from-emerald-500 via-teal-500 to-cyan-600",
      iconBg: "from-emerald-50 to-teal-50",
      iconColor: "text-emerald-600",
    },
    {
      icon: Users,
      title: t("services.consulting.title"),
      description: t("services.consulting.desc"),
      gradient: "from-violet-500 via-purple-500 to-indigo-600",
      iconBg: "from-violet-50 to-purple-50",
      iconColor: "text-violet-600",
    },
  ];

  return (
    <section
      className="relative pt-0 pb-24 bg-gradient-to-b"
      style={{
        backgroundColor: "#edf3fa"
      }}
    >
      {/* Texture & Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          }}
        />
        <div className="absolute top-20 -left-20 w-[600px] h-[600px] bg-gradient-to-br from-blue-100/60 via-purple-100/40 to-transparent rounded-full blur-[120px]" />
        <div className="absolute -bottom-20 -right-20 w-[700px] h-[700px] bg-gradient-to-tl from-violet-100/60 via-pink-100/40 to-transparent rounded-full blur-[130px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* --- MAIN SPLIT LAYOUT --- */}
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-24 items-start">
          
          {/* --- LEFT SIDE: STICKY HEADER & CTA --- */}
          <div className="lg:w-5/12 w-full lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center mb-16 lg:mb-0 pt-12 lg:pt-0">
            <div className="text-left">
              <div className="inline-flex items-center gap-3 px-6 py-3 mb-8 bg-white/80 backdrop-blur-xl rounded-full border border-slate-200 shadow-sm">
                <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                <span className="text-xs font-semibold bg-gradient-to-r from-slate-600 to-slate-800 bg-clip-text text-transparent uppercase tracking-[0.2em]">
                  {t("services.expertise")}
                </span>
              </div>

              <h2 className="
                text-6xl md:text-7xl font-extrabold 
                tracking-tight 
                text-slate-900
              ">
                <span className="block text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light leading-[1.1] mb-4">
                  <span className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent">
                    {t("services.info.title1")}
                  </span>
                </span>
                <span className="block text-3xl md:text-4xl lg:text-5xl text-slate-500 font-light tracking-wide">
                  {t("services.info.title2")}
                </span>
              </h2>

              <p className="text-lg md:text-xl text-slate-600 max-w-xl leading-relaxed mt-8">
                {t("services.info.description")}
              </p>

              {/* CTA Button */}
              <div className="mt-12">
                <button
                  onClick={() => onNavigate("services")}
                  className="group relative inline-flex items-center gap-3 px-10 py-5 bg-white/80 backdrop-blur-xl rounded-full border border-slate-300 overflow-hidden transition-all duration-500 hover:bg-white hover:border-slate-400 hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-1 w-full md:w-auto justify-center md:justify-start"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <span className="relative z-10 text-base font-semibold text-slate-800">
                    {t("services.allbutton")}
                  </span>
                  <ArrowRight className="relative z-10 w-4 h-4 text-slate-600 group-hover:translate-x-1 transition-transform duration-300" />
                </button>

                <p className="mt-4 text-sm text-slate-500">
                  {t("services.end")}
                </p>
              </div>
            </div>
          </div>

          {/* --- RIGHT SIDE: SCROLLING GRID --- */}
          <div className="lg:w-7/12 w-full pt-12 lg:pt-32">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-24 pb-32">
              {services.map((service, index) => {
                const Icon = service.icon;
                const isHovered = hoveredService === index;

                return (
                  <div
                    key={index}
                    // ✅ FIXED: Reduced height to 280px for a very compact look
                    className="group relative cursor-pointer min-h-[280px]"
                    onMouseEnter={() => setHoveredService(index)}
                    onMouseLeave={() => setHoveredService(null)}
                    onClick={() => onNavigate("services")}
                  >
                    <div
                      className={`absolute -inset-[1px] bg-gradient-to-br ${service.gradient} rounded-[2rem] opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-700`}
                    />

                    <div className="relative h-full bg-white/70 backdrop-blur-2xl rounded-[2rem] p-8 border border-slate-200/60 overflow-hidden transition-all duration-700 group-hover:bg-white/90 group-hover:border-slate-300/80 group-hover:-translate-y-2 group-hover:shadow-xl group-hover:shadow-slate-200/50 flex flex-col">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-slate-50/30 opacity-60" />

                      <div
                        className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full transition-transform duration-1200 ${
                          isHovered ? "translate-x-full" : ""
                        }`}
                      />

                      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-slate-100/40 to-transparent rounded-full blur-2xl" />

                      {/* ✅ FLEX LAYOUT: Compact vertical spacing */}
                      <div className="relative space-y-4 flex-grow flex flex-col">
                        
                        {/* ✅ NEW LAYOUT: Icon and Title side-by-side */}
                        <div className="flex items-center gap-5">
                          <div
                            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.iconBg} flex items-center justify-center flex-shrink-0 transition-all duration-500 shadow-sm`}
                          >
                            <Icon
                              className={service.iconColor}
                              size={28}
                              strokeWidth={1.5}
                              style={{
                                animation: isHovered
                                  ? "icon-rotate 1.4s ease-in-out infinite"
                                  : "none",
                                transformOrigin: "center",
                              }}
                            />
                          </div>

                          <h3 className="text-2xl font-semibold text-slate-800 leading-tight">
                            <AnimatedText text={service.title} isHovered={isHovered} />
                          </h3>
                        </div>

                        <p className="text-slate-600 leading-relaxed text-[15px] flex-grow">
                          {service.description}
                        </p>

                        <div className="flex items-center gap-2 pt-2 mt-auto">
                          <span
                            className={`text-base font-medium bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent transition-all duration-300 ${
                              isHovered ? "opacity-100" : "opacity-0"
                            }`}
                          >
                            {t("services.learnmore")}
                          </span>
                          <ArrowRight
                            className={`w-5 h-5 transition-all duration-300 ${
                              isHovered
                                ? "translate-x-0 opacity-100"
                                : "-translate-x-2 opacity-0"
                            }`}
                          />
                        </div>
                      </div>

                      <div
                        className={`absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}