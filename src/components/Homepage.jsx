import { ArrowRight, Star, Code, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "../contexts/LanguageContext";
import SEO from "./SEO";
import { useEffect, useState } from "react";
import { fetchBlogs } from "../api/blogApi";
import { useLangNavigate } from "../utils/useLangNavigate";
import { lazy, Suspense, useCallback } from "react";
import { useSectionObserver } from "../hooks/useSectionObserver";
import { Link } from "react-router-dom";
import ConstellationPlaceholder from "./ConstellationPlaceholder";


// Lazy-load heavy components
const FloatingElements = lazy(() => import("./FloatingElements"));
const AnimatedCodeEditor = lazy(() => import("./AnimatedCodeEditor"));
const ServicesSection = lazy(() => import("./ServicesSection"));
const AnimatedCard = lazy(() => import("./AnimatedCard"));

export default function Homepage() {
  const { t, language } = useLanguage();   // ✅ FIXED
  const [blogs, setBlogs] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const navigate = useLangNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (e) => {
    const scrollLeft = e.target.scrollLeft;
    const width = e.target.clientWidth;
    const index = Math.round(scrollLeft / width);
    setCurrentIndex(index);
  };

  useEffect(() => {
    async function load() {
      try {
        const res = await fetchBlogs({ lang: language });  // ✅ FIXED
        setBlogs(res.data || []);
      } catch (err) {
        console.error("Homepage blogs fetch failed:", err);
        setBlogs([]);
      } finally {
        setLoadingBlogs(false);
      }
    }
    load();
  }, [language]);  // ✅ FIXED


  /* ---------------------------------------------
     Memoized navigation handlers
  --------------------------------------------- */
  const goContact = () => navigate("/contact");
  const goProjects = () => navigate("/projects");
  const goAbout = () => navigate("/about");
  const goBlogLists = () => navigate("/blog");

  const goBlogUrl = (slug) => {
    if (!slug) return "/blog";
    return `/blog/post/${slug}`;
  };

  // ✅ FIX: MISSING NAVIGATOR FOR SERVICES SECTION
  const onNavigate = (section) => {
    if (section === "services") navigate("/services");
  };

  /* ---------------------------------------------
     Section Observers (for lazy reveal)
  --------------------------------------------- */
  const { ref: servicesRef, visible: showServices } = useSectionObserver();
  const { ref: projectsRef, visible: showProjects } = useSectionObserver();
  const { ref: blogRef, visible: showBlog } = useSectionObserver();
  const { ref: aboutRef, visible: showAbout } = useSectionObserver();
  const { ref: ctaRef, visible: showCTA } = useSectionObserver();

  const hasProjects = false;

  /* ---------------------------------------------
     SEO TEXT
  --------------------------------------------- */
  const seoText =
    {
      en: {
        title: "Digital & Web Agency in Azerbaijan | Yeltu",
        desc: "Yeltu is a digital and web agency in Azerbaijan providing web development, MERN, SEO, digital marketing, and UX-driven solutions.",
      },
      az: {
        title: "Rəqəmsal Marketinq və Vebsayt Agentliyi | Yeltu Azərbaycan",
        desc: "Yeltu Azərbaycanın aparıcı rəqəmsal və veb agentliyidir. Veb sayt, SEO və rəqəmsal marketinq xidmətləri təqdim edirik.",
      },
      ru: {
        title: "Цифровое и веб-агентство в Азербайджане | Yeltu",
        desc: "Yeltu — цифровое и веб-агентство в Азербайджане. Веб-разработка, SEO, digital-маркетинг и UX-дизайн.",
      },
    }[language] || {
      title: "Yeltu Agency",
      desc: "Premium web development and digital services.",
    };

  return (
    <div>
      {/* SEO */}
      <SEO
        title={seoText.title}
        description={seoText.desc}
        keywords="
          digital agency azerbaijan,
          web agency azerbaijan,
          digital marketing azerbaijan,
          seo agency azerbaijan,
          web development baku,
          mobile app development,
          custom mobile app development,
          veb agentliyi,
          rəqəmsal marketinq agentliyi,
          seo xidməti azərbaycan,
          smm xidməti,
          google ads,
          sosial media idarəetməsi,
          meta ads,
          veb sayt hazırlanması,
          mobil tətbiq hazırlanması,
          biznes üçün veb sayt,
          biznes üçün mobil tətbiq
        "
        image={`https://yeltu.com/og-home-${language}.jpg`}
        url={`https://yeltu.com/${language === "en" ? "" : language + "/"}`}
        lang={language}
      />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["Organization", "ProfessionalService"],
            name: "Yeltu Agency",
            url: "https://yeltu.com",
            logo: "https://yeltu.com/yeltu-logo.png",
            description: seoText.desc,
            inLanguage: language,

            areaServed: {
              "@type": "Country",
              name: "Azerbaijan",
            },

            knowsAbout: [
              "Web Development",
              "Digital Marketing",
              "SEO",
              "Mobile App Development",
              "UX/UI Design",
            ],

            sameAs: [
              "https://instagram.com/yeltuagency",
              "https://linkedin.com/company/yeltu",
            ],

            contactPoint: {
              "@type": "ContactPoint",
              email: "info@yeltu.com",
              contactType: "customer support",
              availableLanguage: ["en", "az", "ru"],
            },

            address: {
              "@type": "PostalAddress",
              addressCountry: "AZ",
              addressLocality: "Baku",
            },
          }),
        }}
      />

      {/* ---------------------------------- */}
      {/* HERO SECTION */}
      {/* ---------------------------------- */}
      <section
        aria-labelledby="hero-title"
        className="relative overflow-hidden text-white min-h-[90vh] flex items-center hero-bg"
      >
        <Suspense fallback={null}>
          <FloatingElements aria-hidden="true" />
        </Suspense>

        <div aria-hidden="true" className="absolute inset-0 hero-grid" />

        <div className="bubble w-16 h-16 bg-blue-500/20 top-40 left-[-150px] animate-[bubble-move_12s_linear_infinite]" />
        <div className="bubble w-10 h-10 bg-violet-400/25 top-72 left-[-180px] animate-[bubble-move_16s_linear_infinite]" />
        <div className="bubble w-20 h-20 bg-purple-300/20 top-96 left-[-120px] animate-[bubble-move_20s_linear_infinite]" />

        <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-purple-500/35 blur-[160px]" />
        <div className="absolute top-40 left-0 w-[320px] h-[320px] bg-indigo-500/30 blur-[130px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid lg:grid-cols-2 gap-14 items-center">
          <div className="z-10">
            <div className="inline-block mt-4 mb-6 px-5 py-2 bg-white/10 border border-white/20 rounded-full backdrop-blur-md fade-in-1">
              <span className="text-blue-200">✨ Digital Excellence</span>
            </div>

            <h1
              id="hero-title"
              className="font-extrabold tracking-tight fade-in-2"
              style={{
                fontSize: "50px",
                lineHeight: "1.05",
                background:
                  "linear-gradient(180deg, #a78bfa 0%, #8b5cf6 40%, #8c52ff 70%, #5ce1e6 100%)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              {t("hero.title")}
            </h1>

            <p className="mt-6 text-lg text-blue-100 max-w-lg fade-in-3">
              {t("hero.subtitle")}
            </p>

            <div className="flex flex-wrap gap-4 mt-8 fade-in-4">
              <Button
                aria-label="Contact Yeltu Agency"
                onClick={goContact}
                size="lg"
                className="px-8 py-5 text-base bg-gradient-to-r from-blue-500 to-violet-600 rounded-xl hover:scale-105 transition"
              >
                {t("hero.cta")}
                <ArrowRight className="ml-2" size={20} />
              </Button>

              <Button
                aria-label="View Yeltu Agency projects"
                onClick={goProjects}
                size="lg"
                variant="outline"
                className="px-8 py-5 text-base border-white/40 rounded-xl hover:bg-white/10"
              >
                {t("hero.viewWork")}
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-10 mt-14 fade-in-5">
              {[
                { number: "24/7", label: t("hero.stats.support") },
                { number: "100%", label: t("hero.stats.dedicated") },
                { number: t("hero.stats.custom"), label: t("hero.stats.solutions") },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl sm:text-4xl font-black">{stat.number}</div>
                  <div className="text-blue-200 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden lg:flex justify-center slide-in-right -mt-6">
            <div className="absolute inset-0 bg-violet-500/30 blur-[130px] scale-110 rounded-3xl" />
            <AnimatedCodeEditor />
          </div>
        </div>

        <div className="hero-wave absolute bottom-0 left-0 w-full h-24 pointer-events-none overflow-hidden">
          <svg viewBox="0 0 1440 120" className="w-full h-full" preserveAspectRatio="none">
            <path 
              d="M0,0 C220,120 1220,-40 1440,80 L1440,120 L0,120 Z" 
              fill="#edf3fa"
            />
          </svg>
        </div>
      </section>

      {/* ---------------------------------- */}
      {/* SERVICES */}
      {/* ---------------------------------- */}
      <section
        ref={servicesRef}
        aria-labelledby="services-title"
        className={showServices ? "section-visible" : "section-hidden"}
      >
        <Suspense fallback={null}>
          {showServices && <ServicesSection onNavigate={onNavigate} />}
        </Suspense>
      </section>

      {/* ---------------------------------- */}
      {/* PROJECTS */}
      {/* ---------------------------------- */}
      <section
        ref={projectsRef}
        aria-labelledby="projects-title"
        className="w-full p-0" // Removed bg-white, set padding to 0 so the canvas fills it
      >
        <ConstellationPlaceholder 
          t={t} 
          goProjects={goProjects} 
          hasProjects={hasProjects}
        >
          {/* PASSING THE GRID AS CHILDREN */}
          {hasProjects && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[1, 2, 3].map((x) => (
                <Suspense key={x} fallback={null}>
                  <AnimatedCard
                    role="button"
                    tabIndex={0}
                    onClick={goProjects}
                    // OPTIONAL: I updated the card style slightly to look good on Dark Background (Glass style)
                    // If you prefer solid white, change bg-white/10 to bg-white/90
                    className="group cursor-pointer bg-white/10 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 hover:border-cyan-400/50 hover:-translate-y-2 transition-all duration-300"
                  >
                    <div className="relative aspect-[4/3] bg-gradient-to-br from-white/5 to-white/10 animate-pulse rounded-t-[2.5rem]" />
                    <div className="p-7">
                      <h3 className="text-6xl md:text-7xl font-extrabold uppercase bg-clip-text text-transparent bg-gradient-to-r from-violet-200 to-cyan-200 tracking-[0.25em] text-center">
                        {t('homepage.projects.comingSoon')}
                      </h3>
                    </div>
                  </AnimatedCard>
                </Suspense>
              ))}
            </div>
          )}
        </ConstellationPlaceholder>
      </section>
      {/* ---------------------------------- */}
      {/* BLOG */}
      {/* ---------------------------------- */}
      <section
        ref={blogRef}
        aria-labelledby="blog-title"
        className={`py-24 relative overflow-hidden bg-gradient-to-b from-white to-slate-50 ${
          showBlog ? "section-visible" : "section-hidden"
        }`}
      >
        {/* ░▒░ BACKGROUND DECORATION ░▒░ */}
        <div aria-hidden="true" className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan-50/50 blur-[120px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/4" />
        <div aria-hidden="true" className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-violet-50/50 blur-[100px] rounded-full pointer-events-none -translate-x-1/3 translate-y-1/4" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 id="blog-title" className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-slate-900">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-900 to-slate-700">
                {t("homepage.blog.title")}
              </span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg font-light leading-relaxed">
              {t("homepage.blog.subtitle")}
            </p>
          </div>

          {/* ░▒░ MOBILE SCROLL WRAPPER ░▒░ */}
          <div className="md:hidden w-screen overflow-x-scroll no-scrollbar snap-x snap-mandatory pb-8">
            <div className="flex px-4 gap-4" style={{ width: "max-content" }}>
              {(loadingBlogs ? [1, 2, 3] : blogs.slice(0, 3)).map((blog, i) => (
                <Suspense key={blog?.id || i} fallback={null}>
                  {loadingBlogs ? (
                    <AnimatedCard
                      className="
                        w-[85vw] shrink-0 snap-center
                        bg-white border border-slate-200 rounded-[2rem] overflow-hidden
                        animate-pulse shadow-sm
                      "
                    >
                      <div className="h-56 bg-slate-900" />
                      <div className="p-6">
                        <div className="h-4 bg-slate-100 w-2/3 rounded mb-3" />
                        <div className="h-3 bg-slate-50 w-1/2 rounded" />
                      </div>
                    </AnimatedCard>
                  ) : (
                    <Link
                      to={goBlogUrl(blog.seo?.slug)}
                      className="block w-[85vw] shrink-0 snap-center"
                    >
                      <AnimatedCard
                        className="
                          h-full bg-white shadow-lg shadow-slate-200/50
                          border border-slate-100 rounded-[2rem] overflow-hidden
                          transition-all duration-300 flex flex-col
                        "
                      >
                         {/* Edge-to-Edge Dark Image Header */}
                        <div className="h-56 bg-slate-900 relative flex items-center justify-center overflow-hidden">
                             <div 
                                className="w-full h-full bg-cover bg-center bg-no-repeat opacity-90"
                                style={{ backgroundImage: `url(${blog.image})` }}
                             />
                             {/* Gradient Overlay for depth */}
                             <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />

                             {blog.category && (
                                <span className="absolute top-4 left-4 px-4 py-1.5 text-[10px] uppercase tracking-wider font-bold
                                rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 shadow-sm">
                                {blog.category}
                                </span>
                            )}
                        </div>

                        <div className="p-6 flex flex-col flex-grow">
                            <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight">
                            {blog.title}
                            </h3>

                            <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed flex-grow">
                            {blog.excerpt}
                            </p>

                            <div className="flex items-center gap-2 text-violet-600 font-bold text-sm mt-auto">
                            {t("homepage.blog.readMore")}
                            <ArrowRight size={16} />
                            </div>
                        </div>
                      </AnimatedCard>
                    </Link>
                  )}
                </Suspense>
              ))}
            </div>
          </div>

          {/* ░▒░ DESKTOP GRID ░▒░ */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            
            {loadingBlogs
              ? [1, 2, 3].map((i) => (
                  <Suspense key={i} fallback={null}>
                    <AnimatedCard className="relative bg-white border border-slate-200 rounded-[2rem] overflow-hidden animate-pulse shadow-sm">
                      <div className="h-64 bg-slate-900" />
                      <div className="p-8">
                        <div className="h-4 bg-slate-100 w-2/3 rounded mb-3" />
                        <div className="h-3 bg-slate-50 w-1/2 rounded" />
                      </div>
                    </AnimatedCard>
                  </Suspense>
                ))
              : blogs.slice(0, 3).map((blog) => (
                  <Suspense key={blog.id} fallback={null}>
                    <Link to={goBlogUrl(blog.seo.slug)} className="block h-full">
                      <AnimatedCard
                        className="
                          relative group cursor-pointer h-full
                          bg-white
                          border border-slate-100
                          hover:border-violet-100
                          rounded-[2rem] overflow-hidden
                          transition-all duration-500 hover:-translate-y-2
                          shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)]
                          hover:shadow-[0_25px_50px_-12px_rgba(124,58,237,0.15)]
                          flex flex-col
                        "
                      >
                        {/* 1. DARK HEADER (The Fix for the Logo) */}
                        <div className="h-64 bg-slate-900 relative overflow-hidden group-hover:shadow-inner transition-all">
                            
                            {/* The Image (Scales on hover) */}
                            <div
                              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90
                                       transform group-hover:scale-105 transition-transform duration-700 ease-out"
                              style={{ backgroundImage: `url(${blog.image})` }}
                            />
                            
                            {/* Subtle dark overlay so white logos pop */}
                            <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors" />

                            {/* Category Tag */}
                            {blog.category && (
                              <span className="absolute top-5 left-5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest
                                  rounded-full bg-white/10 backdrop-blur-md
                                  text-white border border-white/20 shadow-lg
                                  group-hover:bg-white group-hover:text-violet-700 group-hover:border-white transition-all">
                                  {blog.category}
                              </span>
                            )}
                        </div>

                        {/* 2. WHITE BODY */}
                        <div className="p-8 flex flex-col flex-grow">
                            <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-snug group-hover:text-violet-700 transition-colors">
                              {blog.title}
                            </h3>

                            <p className="text-slate-500 mb-8 line-clamp-2 text-base leading-relaxed flex-grow font-light">
                              {blog.excerpt}
                            </p>

                            <div className="flex items-center gap-2 text-slate-400 group-hover:text-violet-600 transition-all border-t border-slate-100 pt-6 mt-auto">
                              <span className="text-sm font-bold tracking-wide uppercase">{t("homepage.blog.readMore")}</span>
                              <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                      </AnimatedCard>
                    </Link>
                  </Suspense>
                ))}
          </div>

          <div className="text-center mt-20">
            {/* CHANGED TO STANDARD HTML BUTTON TO FORCE STYLES */}
            <button
              aria-label="View all blog posts"
              onClick={goBlogLists}
              className="
                group relative inline-flex items-center gap-2
                px-10 py-4 rounded-full
                bg-white text-slate-900 border border-slate-200
                font-semibold text-base tracking-wide
                overflow-hidden transition-all duration-300
                hover:border-transparent hover:text-white
                hover:shadow-lg hover:shadow-violet-600/20 hover:-translate-y-1
                cursor-pointer
              "
            >
              {/* Gradient layer for hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out" />
              
              <span className="relative z-10 flex items-center gap-2">
                {t("homepage.blog.button")}
                <ArrowRight className="transition-transform group-hover:translate-x-1" size={18} />
              </span>
            </button>
          </div>
        </div>
      </section>
      {/* ---------------------------------- */}
      {/* ABOUT */}
      {/* ---------------------------------- */}
      <section
        ref={aboutRef}
        aria-labelledby="about-title"
        className={`pt-8 pb-20 bg-gradient-to-b from-white via-slate-50/50 to-white relative ${
          showAbout ? "section-visible" : "section-hidden"
        }`}
      >
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-100/40 via-purple-100/30 to-transparent rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-gradient-to-tl from-violet-100/40 via-pink-100/30 to-transparent rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-white/60 backdrop-blur-xl rounded-full border border-slate-200/50 shadow-sm"
                aria-hidden="true"
              >
                <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full" />
                <span className="text-xs font-medium text-slate-700 uppercase tracking-widest">
                  {t("homepage.about.badge")}
                </span>
              </div>

              <h2
                id="about-title"
                className="mb-8 tracking-tight leading-tight pt-[0.28em] pb-[0.06em]"
              >
                <span
                  className="
                    inline-block
                    text-5xl md:text-6xl lg:text-7xl
                    font-bold mb-3
                    leading-[1.25]
                    pt-[0.18em]
                    bg-gradient-to-r from-slate-900 to-slate-800
                    bg-clip-text text-transparent
                  "
                >
                  {t("homepage.about.title1")}
                </span>
                <span
                  className="
                    inline-block
                    text-5xl md:text-6xl lg:text-7xl
                    font-bold
                    leading-[1.25]
                    pt-[0.18em]
                    bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600
                    bg-clip-text text-transparent
                  "
                >
                  {t("homepage.about.title2")}
                </span>
              </h2>

              <p className="text-lg text-slate-600 leading-relaxed mb-10 max-w-xl">
                {t("homepage.about.description")}
              </p>

              <button
                aria-label="Read more about Yeltu Agency"
                onClick={goAbout}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-all"
              >
                {t("homepage.about.cta")}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="relative space-y-4">
              <MemoStat
                value="6"
                ariaHidden
                label={t("homepage.about.stats.services")}
                gradient="from-blue-600 to-violet-600"
                Icon={Code}
                delayClass="animate-float-card-1"
              />
              <MemoStat
                value="24/7"
                label={t("homepage.about.stats.support")}
                gradient="from-violet-600 to-purple-600"
                Icon={Star}
                delayClass="animate-float-card-2"
              />
              <MemoStat
                value="100%"
                label={t("homepage.about.stats.quality")}
                gradient="from-blue-600 to-pink-600"
                Icon={TrendingUp}
                delayClass="animate-float-card-3"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------- */}
      {/* CTA */}
      <section
        ref={ctaRef}
        aria-labelledby="cta-title"
        className={`relative py-20 text-white text-center overflow-hidden 
          bg-gradient-to-br from-slate-900 via-blue-950 to-violet-950
          ${showCTA ? "section-visible" : "section-hidden"}`}
      >

        {/* GRID BACKGROUND (ULTRA LIGHTWEIGHT) */}
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34,211,238,0.25) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139,92,246,0.25) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            opacity: 0.2,
          }}
        />

        {/* FLOATING ORBS (GPU-ACCELERATED) */}
        <div className="absolute -top-20 -left-20 w-56 h-56 rounded-full bg-cyan-400/20 blur-3xl animate-float" />
        <div
          className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-violet-500/20 blur-3xl animate-float"
          style={{ animationDelay: "1.5s" }}
        />

        {/* MOVING SCAN LINE */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(34,211,238,0.25), transparent)",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 90%)",
            animation: "scan 4s linear infinite",
          }}
        />

        {/* CONTENT */}
        <div className="relative max-w-3xl mx-auto px-6 z-10">
          <h2 id="cta-title" className="mb-6 text-3xl md:text-4xl font-bold">
            {t("homepage.cta.title")}
          </h2>

          <p className="text-blue-100 mb-8 text-lg">
            {t("homepage.cta.subtitle")}
          </p>

          <Button
            aria-label="Contact Yeltu Agency"
            onClick={goContact}
            size="lg"
            className="bg-white text-blue-600 hover:bg-blue-50 shadow-xl hover:scale-105 transition-all duration-300"
          >
            {t("homepage.cta.button")}
            <ArrowRight className="ml-2" size={20} />
          </Button>
        </div>
      </section>

    </div>
  );
}

/* ----------------------------------------------
   MEMOIZED STAT CARD
---------------------------------------------- */
import { memo } from "react";

const MemoStat = memo(function Stat({ value, label, gradient, Icon, delayClass }) {
  return (
    <div className={`group ${delayClass}`}>
      <div
        className="relative bg-white/60 backdrop-blur-2xl rounded-3xl p-8 border border-white/60 hover:-translate-y-1 transition-all"
        aria-label={label}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className={`text-5xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-2`}>
              {value}
            </div>
            <div className="text-sm font-medium text-slate-600">{label}</div>
          </div>

          <div
            aria-hidden="true"
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/10 to-violet-500/10 flex items-center justify-center"
          >
            <Icon className="w-8 h-8 text-blue-600" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
});
