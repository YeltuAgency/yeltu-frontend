// components/ServicesGrid.jsx
import { memo } from "react";
import { Card, CardContent } from "./ui/card";
import { ArrowRight } from "lucide-react";

function ServicesGrid({ services }) {
  return (
    <section
      className="py-16 bg-gradient-to-b from-white via-slate-50 to-white relative overflow-hidden"
      aria-labelledby="services-grid-title"
    >
      <h2
        id="services-grid-title"
        className="sr-only"
      >
        List of Professional Services
      </h2>

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="space-y-6" role="list">
          {services.map((service, index) => (
            <Card
              role="listitem"
              key={index}
              className="group relative bg-white/95 rounded-3xl border border-slate-200 hover:shadow-2xl transition-all duration-500"
              aria-label={`${service.title} service`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-10 transition-all`}
                aria-hidden="true"
              />

              <CardContent className="relative p-7 md:p-9 flex flex-col md:flex-row gap-8 items-start">
                {/* Icon + Title */}
                <div className="flex items-center gap-4 flex-shrink-0">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-all`}
                    aria-hidden="true"
                  >
                    <service.icon size={28} className="text-white" />
                  </div>

                  <h3
                    className="text-xl font-semibold text-slate-900"
                  >
                    {service.title}
                  </h3>
                </div>

                {/* Description + Features */}
                <div className="flex-1">
                  <p className="text-slate-600 mb-4">{service.description}</p>

                  <div className="flex flex-wrap gap-2" role="list">
                    {service.features.map((f, i) => (
                      <span
                        role="listitem"
                        key={i}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-full text-slate-700 text-sm"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-blue-500"
                          aria-hidden="true"
                        />
                        {f}
                      </span>
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
