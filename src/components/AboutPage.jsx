import { lazy, Suspense, useMemo } from "react";
import SEO from "../components/SEO";
import { useLanguage } from "../contexts/LanguageContext";
import { useSectionObserver } from "../hooks/useSectionObserver";

// Lazy-loaded page sections
const AboutHero = lazy(() => import("./AboutHero"));
const MissionAndStory = lazy(() => import("./MissionAndStory"));
const ValuesSection = lazy(() => import("./ValuesSection"));
const AboutCTA = lazy(() => import("./AboutCTA"));

export default function AboutPage({ onNavigate }) {
  const { language } = useLanguage();

  const { ref: pageRef, visible: pageVisible } = useSectionObserver({
    rootMargin: "0px",
    threshold: 0.05,
  });

  /* -----------------------------------------
     SEO TEXT PER LANGUAGE
  ----------------------------------------- */
  const seo = useMemo(() => {
    const map = {
      en: {
        title: "About Yeltu Agency – Who We Are",
        desc: "Yeltu Agency is a modern MERN web development & branding studio in Azerbaijan. Learn about our mission, values and story.",
      },
      az: {
        title: "Yeltu Agentliyi Haqqında – Biz Kimik",
        desc: "Yeltu Agentliyi Azərbaycanda müasir MERN veb inkişaf və brendinq studiyasıdır. Missiyamız, dəyərlərimiz və hekayəmiz.",
      },
      ru: {
        title: "О Yeltu Agency – Кто мы",
        desc: "Yeltu Agency — современная студия MERN-разработки и брендинга в Азербайджане. Узнайте о нашей миссии, ценностях и истории.",
      },
    };

    return (
      map[language] || {
        title: "Yeltu Agency",
        desc: "Premium web development and digital services.",
      }
    );
  }, [language]);

  const pageUrl =
    language === "en" ? `https://yeltu.com/about` : `https://yeltu.com/${language}/about`;

  /* -----------------------------------------
     RENDER
  ----------------------------------------- */
  return (
    <div
      ref={pageRef}
      role="main"
      className={`bg-slate-900 observe-fade ${
        pageVisible ? "section-visible" : ""
      }`}
    >
      {/* SEO META TAGS */}
      <SEO
        title={seo.title}
        description={seo.desc}
        keywords="about yeltu, web agency, MERN developers, branding, Yeltu Azerbaijan"
        image={`/og-about-${language}.jpg`}
        url={pageUrl}
        lang={language}
      />

      {/* JSON-LD STRUCTURED DATA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: seo.title,
            description: seo.desc,
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
              address: {
                "@type": "PostalAddress",
                addressCountry: "AZ",
                addressLocality: "Baku",
              },
            },
          }),
        }}
      />

      {/* PAGE SECTIONS */}
      <Suspense fallback={<div className="h-40" />}>
        <AboutHero />
      </Suspense>

      <Suspense fallback={<div className="h-40" />}>
        <MissionAndStory />
      </Suspense>

      <Suspense fallback={<div className="h-40" />}>
        <ValuesSection />
      </Suspense>

      <Suspense fallback={<div className="h-40" />}>
        <AboutCTA onNavigate={onNavigate} />
      </Suspense>
    </div>
  );
}
