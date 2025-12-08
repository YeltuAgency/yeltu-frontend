// src/components/PortfolioPage.jsx
import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  lazy,
  Suspense,
} from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "../contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

import {
  fetchPortfolio,
  fetchFeaturedPortfolio,
} from "../api/portfolioApi";

import SEO from "./SEO";

// Lazy-load heavy sections
const PortfolioHero = lazy(() => import("./PortfolioHero"));
const PortfolioFilters = lazy(() => import("./PortfolioFilters"));
const PortfolioFeatured = lazy(() => import("./PortfolioFeatured"));
const PortfolioBentoGrid = lazy(() => import("./PortfolioBentoGrid"));

// Map API portfolio item -> UI project
const mapProject = (p) => ({
  id: p.id,
  title: p.title,
  description: p.description,
  image: p.image,
  category: p.category,
  tags: p.technologies || [],
  featured: p.featured,
  demoUrl: p.demoUrl,
  gradient: "from-blue-600 via-purple-600 to-pink-600",
  color: "#7c3aed",
});

export default function PortfolioPage() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const goContact = () => navigate("/contact");
  const [activeFilter, setActiveFilter] = useState("All");
  const [projects, setProjects] = useState([]);
  const [featured, setFeatured] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ⚡ Custom cursor refs (no re-renders)
  const cursorRef = useRef(null);
  const cursorVariantRef = useRef("default");
  const mousePosRef = useRef({ x: 0, y: 0 });

  /* ----------------------------------------------
     SEO TEXT (memoized)
  ---------------------------------------------- */
  const seoText = useMemo(() => {
    const lang = language || "en";
    const base = {
      en: {
        title:
          "Our Portfolio – Websites, Marketing & Digital Projects | Yeltu Agency",
        desc: "Browse our web development, marketing and design projects crafted for clients in Azerbaijan and globally.",
        image: "/og-portfolio-en.jpg",
      },
      az: {
        title:
          "Portfolio – Hazırladığımız Saytlar və Rəqəmsal Layihələr | Yeltu Agentliyi",
        desc: "Azərbaycan və beynəlxalq müştərilər üçün hazırladığımız veb saytlar, marketinq və dizayn işlərini kəşf edin.",
        image: "/og-portfolio-az.jpg",
      },
      ru: {
        title:
          "Портфолио – Наши сайты и цифровые проекты | Агентство Yeltu",
        desc: "Посмотрите веб-сайты, маркетинг и дизайн проекты, созданные для клиентов в Азербайджане и по всему миру.",
        image: "/og-portfolio-ru.jpg",
      },
    }[lang];

    return (
      base || {
        title: "Yeltu Agency Portfolio",
        desc: "Web, marketing, and digital projects by Yeltu.",
        image: "/og-portfolio-en.jpg",
      }
    );
  }, [language]);

  /* ----------------------------------------------
     FILTER CONFIG (memoized)
  ---------------------------------------------- */
  const filters = useMemo(
    () => [
      { id: "All", label: t("portfolio.filters.all") || "All" },
      { id: "Web", label: t("portfolio.filters.web") || "Web" },
      { id: "Marketing", label: t("portfolio.filters.marketing") || "Marketing" },
      { id: "Design", label: t("portfolio.filters.design") || "Design" },
    ],
    [t]
  );

  /* ----------------------------------------------
     JSON-LD (memoized)
  ---------------------------------------------- */
  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: seoText.title,
      description: seoText.desc,
      url: "https://yeltu.com/portfolio",
      image: seoText.image,
      hasPart: projects.map((p) => ({
        "@type": "CreativeWork",
        name: p.title,
        description: p.description,
        image: p.image,
        url: p.demoUrl || "https://yeltu.com/portfolio",
        genre: p.category,
      })),
    }),
    [seoText, projects]
  );

  /* ----------------------------------------------
     FETCH PORTFOLIO DATA
  ---------------------------------------------- */
  useEffect(() => {
    let isCancelled = false;

    const loadPortfolio = async () => {
      try {
        setLoading(true);
        setError(null);

        const lang = language || "en";

        const [allRes, featuredRes] = await Promise.all([
          fetchPortfolio({
            lang,
            category: activeFilter,
          }),
          fetchFeaturedPortfolio({ lang }),
        ]);

        if (isCancelled) return;

        setProjects((allRes?.data || []).map(mapProject));
        setFeatured((featuredRes?.data || []).map(mapProject));
      } catch (err) {
        if (isCancelled) return;
        console.error("Failed to load portfolio", err?.message || err);
        setError("Failed to load portfolio projects.");
      } finally {
        if (!isCancelled) setLoading(false);
      }
    };

    loadPortfolio();
    return () => {
      isCancelled = true;
    };
  }, [activeFilter, language]);

  /* ----------------------------------------------
     CUSTOM CURSOR (no React re-renders)
  ---------------------------------------------- */
  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const element = cursorRef.current;
    if (!element) return;

    let frameId;

    const render = () => {
      const { x, y } = mousePosRef.current;
      const scale = cursorVariantRef.current === "hover" ? 1.5 : 1;

      // 24px = cursor size, so subtract half to center
      element.style.transform = `translate(${x - 12}px, ${
        y - 12
      }px) scale(${scale})`;

      frameId = requestAnimationFrame(render);
    };

    render();
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  const setCursorVariant = useCallback((variant) => {
    cursorVariantRef.current = variant;
  }, []);

  const featuredTopTwo = useMemo(
    () => featured.slice(0, 2),
    [featured]
  );

  const pageUrl = `https://yeltu.com/portfolio/${
    language === "en" ? "" : language + "/"
  }`;

  /* ----------------------------------------------
     RENDER
  ---------------------------------------------- */
  return (
    <div className="min-h-screen bg-slate-950 text-white relative smooth-fade">
      {/* SEO META */}
      <SEO
        title={seoText.title}
        description={seoText.desc}
        keywords="portfolio, web projects, marketing projects, design projects, Yeltu"
        image={seoText.image}
        url={pageUrl}
      />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />


      {/* CUSTOM CURSOR (desktop only) */}
      <div
        ref={cursorRef}
        className="fixed z-50 pointer-events-none mix-blend-difference hidden md:block"
        style={{
          width: "24px",
          height: "24px",
          left: 0,
          top: 0,
        }}
        aria-hidden="true"
      >
        <div className="relative w-6 h-6">
          <div className="absolute inset-0 rounded-full border-2 border-white" />
          <div className="absolute inset-0 rounded-full blur-xl bg-white/40 opacity-60" />
          <div className="absolute inset-1 rounded-full bg-white" />
        </div>
      </div>

      {/* HERO */}
      <Suspense fallback={null}>
        <PortfolioHero />
      </Suspense>

      {/* FILTERS */}
      <Suspense fallback={null}>
        <PortfolioFilters
          filters={filters}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          setCursorVariant={setCursorVariant}
        />
      </Suspense>

      {/* LOADING */}
      {loading && (
        <div className="py-20 text-center text-blue-300">
          Loading portfolio...
        </div>
      )}

      {/* ERROR */}
      {!loading && error && (
        <div className="py-20 text-center text-red-400">{error}</div>
      )}

      {/* FEATURED */}
      {!loading && !error && featuredTopTwo.length > 0 && (
        <Suspense fallback={null}>
          <PortfolioFeatured
            projects={featuredTopTwo}
            setCursorVariant={setCursorVariant}
          />
        </Suspense>
      )}

      {/* BENTO GRID */}
      {!loading && !error && projects.length > 0 && (
        <Suspense fallback={null}>
          <PortfolioBentoGrid
            projects={projects}
            setCursorVariant={setCursorVariant}
          />
        </Suspense>
      )}

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-950 to-violet-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 animate-wave pointer-events-none" />

        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(148,163,184,0.35) 1px, transparent 1px),
              linear-gradient(90deg, rgba(148,163,184,0.35) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            maskImage:
              "radial-gradient(ellipse 70% 55% at 50% 45%, black, transparent)",
          }}
        />

        <div className="relative text-center max-w-4xl mx-auto px-4">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            {t("portfolio.cta.title") || "Let's Build Your Project"}
          </h2>

          <p className="text-lg md:text-2xl text-blue-100 mb-8">
            {t("portfolio.cta.subtitle") ||
              "Become one of the first clients in our portfolio ✨"}
          </p>

          <Button
            className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-10 py-6 text-lg font-bold rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all"
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
            onClick={goContact}
          >
            {t("portfolio.cta.button") || "Start Your Project"}
            <ArrowRight size={22} className="ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}
