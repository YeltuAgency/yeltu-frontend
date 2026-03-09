// components/ServicesGrid.jsx
import { memo } from "react";
import { Card, CardContent } from "./ui/card";
import { ArrowRight } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

function ServicesGrid({ services }) {
  const navigate = useNavigate();
  const { lang } = useParams();

  const withLang = (path) => {
    if (!path) return "#";
    return lang ? `/${lang}${path}` : path;
  };

  return (
    <section
      className="py-16 bg-gradient-to-b from-white via-slate-50 to-white relative overflow-hidden"
      aria-labelledby="services-grid-title"
    >
      <h2 id="services-grid-title" className="sr-only">
        List of Professional Services
      </h2>

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="space-y-6" role="list">
          {services.map((service, index) => (
            <Card
              role="listitem"
              key={index}
              tabIndex={0}
              onClick={() => navigate(withLang(service.path))}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  navigate(withLang(service.path));
                }
              }}
              className="group relative bg-white/95 rounded-3xl border border-slate-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 cursor-pointer"
              aria-label={`${service.title} service`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-10 transition-all rounded-3xl`}
                aria-hidden="true"
              />

              <CardContent className="relative p-7 md:p-9 flex flex-col md:flex-row gap-8 items-start">
                <div className="flex items-center gap-4 flex-shrink-0">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-all`}
                    aria-hidden="true"
                  >
                    <service.icon size={28} className="text-white" />
                  </div>

                  <h3 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                    {service.title}
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
                  </h3>
                </div>

                <div className="flex-1">
                  <p className="text-slate-600 mb-4">{service.description}</p>

                  <div className="flex flex-wrap gap-2" role="list">
                    {service.features?.map((feature, i) => (
                      <Link
                        key={i}
                        to={withLang(feature.path)}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-700 text-sm transition-colors"
                        role="listitem"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-blue-500"
                          aria-hidden="true"
                        />
                        {feature.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(ServicesGrid);