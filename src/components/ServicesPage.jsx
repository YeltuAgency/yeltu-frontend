// pages/ServicesPage.jsx
import { lazy, Suspense, useMemo } from "react";
import SEO from "../components/SEO";
import { useLanguage } from "../contexts/LanguageContext";

import servicesEn from "../data/servicesEnData";
import servicesAz from "../data/servicesAzData";
import servicesRu from "../data/servicesRuData";

// Lazy-load sections
const ServicesHero = lazy(() => import("../components/ServicesHero"));
const ServicesGrid = lazy(() => import("../components/ServicesGrid"));
const ServicesProcess = lazy(() => import("../components/ServicesProcess"));
const ServicesCTA = lazy(() => import("../components/ServicesCTA"));

export default function ServicesPage() {
  const { language } = useLanguage();

  const { services, processPhases } =
    language === "az"
      ? servicesAz
      : language === "ru"
      ? servicesRu
      : servicesEn;

  // ... REST OF YOUR CODE REMAINS EXACTLY THE SAME ...


  /* -----------------------------------------------
     MULTILINGUAL SEO TEXT
  ------------------------------------------------ */
  const seoText = useMemo(
    () =>
      ({
        en: {
          title: "Our Services – Web Development, SEO & Branding | Yeltu Agency",
          desc: "Explore Yeltu Agency services: Web development, UI/UX design, SEO, branding, animations, and full digital solutions.",
        },
        az: {
          title: "Xidmətlərimiz – Web İnkişafı, SEO və Brendinq | Yeltu Agentliyi",
          desc: "Yeltu Agentliyinin xidmətləri: Web inkişafı, UI/UX dizayn, SEO, brendinq, animasiyalar və rəqəmsal həllər.",
        },
        ru: {
          title: "Наши Услуги – Веб-разработка, SEO и Брендинг | Yeltu Agency",
          desc: "Услуги Yeltu Agency: веб-разработка, дизайн UI/UX, SEO, брендинг, анимации и цифровые решения.",
        },
      }[language] || {
        title: "Yeltu Agency Services",
        desc: "Premium digital services for modern businesses.",
      }),
    [language]
  );

  /* -----------------------------------------------
     PAGE URL (correct SEO structure)
  ------------------------------------------------ */
  const pageUrl =
    language === "en"
      ? "https://yeltu.com/services"
      : `https://yeltu.com/${language}/services`;

  /* -----------------------------------------------
     RENDER
  ------------------------------------------------ */
  return (
    <main
      className="min-h-screen bg-slate-900 smooth-fade"
      role="main"
      aria-label="Services Page"
    >
      {/* SEO TAGS */}
      <SEO
        title={seoText.title}
        description={seoText.desc}
        image={`/og-services-${language}.jpg`}
        url={pageUrl}
        lang={language}
      />

      {/* JSON-LD SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: seoText.title,
            description: seoText.desc,
            url: pageUrl,
            inLanguage: language,
            mainEntity: {
              "@type": "Organization",
              name: "Yeltu Agency",
              url: "https://yeltu.com",
              logo: "https://yeltu.com/og-home-en.jpg",
              sameAs: [
                "https://instagram.com/yeltu",
                "https://linkedin.com/company/yeltu",
              ],
            },
          }),
        }}
      />

      {/* PAGE SECTIONS */}
      <Suspense fallback={null}>
        <ServicesHero />
      </Suspense>

      <Suspense fallback={null}>
        <ServicesGrid services={services} />
      </Suspense>

      <Suspense fallback={null}>
        <ServicesProcess processPhases={processPhases} />
      </Suspense>

      <Suspense fallback={null}>
        <ServicesCTA />
      </Suspense>
    </main>
  );
}
