import { Card, CardContent } from "./ui/card";
import { useLanguage } from "../contexts/LanguageContext";
import { Lightbulb, Shield, Zap, Target } from "lucide-react";
import { memo } from "react";

export const ValuesSection = memo(function ValuesSection() {
  const { t } = useLanguage();

  const values = [
    {
      icon: Lightbulb,
      title: t("about.values.innovation.title") || "Innovation",
      desc:
        t("about.values.innovation.description") ||
        "We stay ahead of the curve with modern technologies.",
    },
    {
      icon: Shield,
      title: t("about.values.reliability.title") || "Reliability",
      desc:
        t("about.values.reliability.description") ||
        "Your project is delivered on time, every time.",
    },
    {
      icon: Zap,
      title: t("about.values.creativity.title") || "Creativity",
      desc:
        t("about.values.creativity.description") ||
        "We blend artistic vision with technical expertise.",
    },
    {
      icon: Target,
      title: t("about.values.results.title") || "Results-Driven",
      desc:
        t("about.values.results.description") ||
        "We focus on measurable outcomes and growth.",
    },
  ];

  return (
    <section
      aria-labelledby="values-title"
      className="pb-16 md:pb-20 bg-gradient-to-b from-white via-slate-50 to-white relative overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2
            id="values-title"
            className="mb-3 text-3xl md:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600"
          >
            {t("about.values.title") || "Our Values"}
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            {t("about.values.subtitle") ||
              "The principles that guide how we think, build, and collaborate."}
          </p>
        </div>

        {/* Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map(({ icon: Icon, title, desc }, index) => (
            <Card
              key={index}
              role="article"
              aria-label={`${title}: ${desc}`}
              className="relative bg-white/95 backdrop-blur-xl border border-slate-200/80 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2"
            >
              <CardContent className="relative p-7 text-center space-y-4">
                <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 via-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/40">
                  <Icon className="text-white" size={26} aria-hidden="true" />
                </div>

                <h3 className="text-lg font-semibold text-slate-900">
                  {title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
});

export default memo(ValuesSection);
