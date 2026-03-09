import { useState, Suspense, lazy, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import SEO from "../../components/SEO";
import { Button } from "../../components/ui/button";
import customWebAppsImg from "../../assets/services/customwebapps.webp";
import ecommerceImg from "../../assets/services/e-commerce.webp";
import businessImg from "../../assets/services/business.webp";
import webImg from "../../assets/services/webdevelopment.webp";
import {
  ArrowRight,
  X,
  LayoutTemplate,
  Zap,
  Search,
  PenTool,
  Code,
  CheckCircle,
  MonitorSmartphone,
  ShoppingCart,
  ArrowDown,
  Plus,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Network,
  ShieldCheck,
  Database,
} from "lucide-react";

const FloatingElements = lazy(() => import("../../components/FloatingElements"));

export default function BusinessWebsitesPage() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const [selectedFeatureCard, setSelectedFeatureCard] = useState(null);
  const [activeTab, setActiveTab] = useState("ecommerce");

  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const cardWidth = current.firstElementChild?.clientWidth || 0;
      const scrollAmount = cardWidth + 24;
      current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const withLang = (to) => {
    if (to.startsWith("http")) return to;
    if (language === "en") return to;
    return `/${language}${to === "/" ? "" : to}`;
  };

  const featureCards = [
    {
      id: "architecture",
      icon: LayoutTemplate,
      titleKey: "business.features.architecture.title",
      descKey: "business.features.architecture.desc",
    },
    {
      id: "integration",
      icon: Network,
      titleKey: "business.features.integration.title",
      descKey: "business.features.integration.desc",
    },
    {
      id: "uiux",
      icon: PenTool,
      titleKey: "business.features.uiux.title",
      descKey: "business.features.uiux.desc",
    },
    {
      id: "performance",
      icon: Zap,
      titleKey: "business.features.performance.title",
      descKey: "business.features.performance.desc",
    },
    {
      id: "security",
      icon: ShieldCheck,
      titleKey: "business.features.security.title",
      descKey: "business.features.security.desc",
    },
    {
      id: "scalable",
      icon: Database,
      titleKey: "business.features.scalable.title",
      descKey: "business.features.scalable.desc",
    },
  ];

  const processSteps = [
    {
      icon: Search,
      titleKey: "business.process.step1.title",
      descKey: "business.process.step1.desc",
    },
    {
      icon: LayoutTemplate,
      titleKey: "business.process.step2.title",
      descKey: "business.process.step2.desc",
    },
    {
      icon: PenTool,
      titleKey: "business.process.step3.title",
      descKey: "business.process.step3.desc",
    },
    {
      icon: Code,
      titleKey: "business.process.step4.title",
      descKey: "business.process.step4.desc",
    },
    {
      icon: CheckCircle,
      titleKey: "business.process.step5.title",
      descKey: "business.process.step5.desc",
    },
  ];

  const solutions = {
    webdev: {
      icon: MonitorSmartphone,
      titleKey: "business.solutions.webdev.title",
      descKey: "business.solutions.webdev.desc",
      link: "/services/web-development",
      image: webImg,
    },
    customwebapp: {
      icon: LayoutTemplate,
      titleKey: "business.solutions.customwebapp.title",
      descKey: "business.solutions.customwebapp.desc",
      link: "/services/web-development/custom-web-apps",
      image: customWebAppsImg,
    },
    ecommerce: {
      icon: ShoppingCart,
      titleKey: "business.solutions.ecommerce.title",
      descKey: "business.solutions.ecommerce.desc",
      link: "/services/web-development/ecommerce",
      image: ecommerceImg,
    },
  };

  const closingCards = [
    { titleKey: "webdev.closing.cards.tech.title", descKey: "webdev.closing.cards.tech.desc" },
    { titleKey: "webdev.closing.cards.product.title", descKey: "webdev.closing.cards.product.desc" },
    { titleKey: "webdev.closing.cards.perf.title", descKey: "webdev.closing.cards.perf.desc" },
    { titleKey: "webdev.closing.cards.secure.title", descKey: "webdev.closing.cards.secure.desc" },
  ];

  return (
    <main className="min-h-screen bg-white relative overflow-hidden font-sans">
      <SEO
        title={t("business.seo.title")}
        description={t("business.seo.desc")}
      />

      {/* 1. HERO SECTION */}
      <section
        aria-labelledby="hero-title"
        className="relative overflow-hidden text-white min-h-[90vh] flex items-center hero-bg"
      >
        <Suspense fallback={null}>
          <FloatingElements aria-hidden="true" />
        </Suspense>

        <div aria-hidden="true" className="absolute inset-0 hero-grid" />

        <div className="absolute left-4 md:left-8 bottom-32 hidden lg:flex flex-col items-center gap-6 z-20 opacity-80 fade-in-5">
          <span className="transform -rotate-90 tracking-[0.3em] text-[10px] text-blue-200 uppercase font-bold mb-4">
            Scroll
          </span>
          <div className="w-[1px] h-12 bg-white/20" />
          <ArrowDown className="transform rotate-90 w-4 h-4 text-blue-400 animate-bounce" />
        </div>

        <div className="bubble w-16 h-16 bg-blue-500/20 top-40 left-[-150px] animate-[bubble-move_12s_linear_infinite]" />
        <div className="bubble w-10 h-10 bg-violet-400/25 top-72 left-[-180px] animate-[bubble-move_16s_linear_infinite]" />
        <div className="bubble w-20 h-20 bg-purple-300/20 top-96 left-[-120px] animate-[bubble-move_20s_linear_infinite]" />

        <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-purple-500/35 blur-[160px]" />
        <div className="absolute top-40 left-0 w-[320px] h-[320px] bg-indigo-500/30 blur-[130px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid lg:grid-cols-2 gap-14 items-center w-full">
          <div className="z-10 flex flex-col h-full justify-center lg:pl-8">
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
              {t("business.hero.title")}
            </h1>

            <p className="mt-6 pb-6 text-lg text-blue-100 max-w-lg fade-in-3">
              {t("business.hero.hook")}
            </p>

            <div className="flex flex-col gap-4 fade-in-5">
              <div className="flex items-center gap-3 text-base font-medium text-slate-300">
                <ArrowRight className="w-5 h-5 text-blue-400" />
                {t("business.hero.points.precision")}
              </div>
              <div className="flex items-center gap-3 text-base font-medium text-slate-300">
                <ArrowRight className="w-5 h-5 text-blue-400" />
                {t("business.hero.points.integration")}
              </div>
              <div className="flex items-center gap-3 text-base font-medium text-slate-300">
                <ArrowRight className="w-5 h-5 text-blue-400" />
                {t("business.hero.points.scale")}
              </div>
            </div>

            <div className="mt-14 fade-in-4">
              <Button
                aria-label="Start Project"
                onClick={() => navigate(withLang("/contact"))}
                size="lg"
                className="px-8 py-5 text-base bg-gradient-to-r from-blue-500 to-violet-600 rounded-xl hover:scale-105 transition shadow-lg shadow-blue-500/20 mb-8"
              >
                {t("business.hero.cta")}
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </div>
          </div>

          <div className="relative hidden lg:flex justify-end items-center slide-in-right z-10">
            <img
              src={businessImg}
              alt="Business Website Development"
              className="w-full max-w-[800px] h-auto object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.5)] transform lg:scale-110 hover:-translate-y-2 transition-transform duration-700"
            />
          </div>
        </div>

        <div className="hero-wave absolute bottom-0 left-0 w-full h-24 pointer-events-none overflow-hidden">
          <svg
            viewBox="0 0 1440 120"
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 C220,120 1220,-40 1440,80 L1440,120 L0,120 Z"
              fill="#ffffff"
            />
          </svg>
        </div>
      </section>

      {/* 2. INTRO */}
      <section className="py-24 px-4 pt-4 pb-12 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1 space-y-6">
            <p className="text-lg text-slate-600 leading-relaxed">
              {t("business.intro.p1")}
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              {t("business.intro.p2")}
            </p>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent leading-tight lg:pl-10">
              {t("business.intro.title")}
            </h2>
          </div>
        </div>
      </section>

      {/* 3. FEATURE CARDS */}
      <section className="py-24 pt-10 pb-12 bg-slate-50 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8 mb-12 flex justify-between items-end">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight max-w-2xl leading-tight">
            {t("business.features.title")}
          </h2>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-4 md:px-8 pb-8 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {featureCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.id}
                  onClick={() => setSelectedFeatureCard(card)}
                  className="relative snap-center shrink-0 w-[85vw] md:w-[400px] min-h-[340px] bg-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col"
                >
                  <Icon
                    className="w-8 h-8 text-blue-600 mb-8 transition-transform group-hover:scale-110"
                    strokeWidth={1.5}
                  />

                  <h3 className="text-2xl font-bold text-blue-900 mb-4 tracking-tight">
                    {t(card.titleKey)}
                  </h3>
                  <p className="text-blue-800/70 text-lg leading-relaxed line-clamp-3 mb-10">
                    {t(card.descKey)}
                  </p>

                  <div className="absolute bottom-8 right-8 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center group-hover:bg-blue-700 transition-colors mt-auto shadow-md shadow-blue-600/20">
                    <Plus className="w-6 h-6 text-white" />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end gap-4 px-4 md:px-8 mt-4">
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-200/60 hover:bg-slate-300 text-slate-900 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" strokeWidth={2} />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-200/60 hover:bg-slate-300 text-slate-900 transition-colors"
            >
              <ChevronRight className="w-6 h-6" strokeWidth={2} />
            </button>
          </div>
        </div>
      </section>

      {/* FEATURE MODAL */}
      {selectedFeatureCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md transition-opacity">
          <div className="relative w-full max-w-lg bg-white/90 backdrop-blur-xl border border-white/50 rounded-[2rem] p-8 md:p-10 shadow-2xl transform animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedFeatureCard(null)}
              className="absolute top-6 right-6 p-2 bg-slate-100 rounded-full hover:bg-slate-200 text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <selectedFeatureCard.icon className="w-12 h-12 text-blue-600 mb-6" />
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              {t(selectedFeatureCard.titleKey)}
            </h3>
            <p className="text-slate-600 leading-relaxed">
              {t(selectedFeatureCard.descKey)}
            </p>
          </div>
        </div>
      )}

      {/* 4. DEEP DIVE */}
      <section className="py-24 px-4 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="order-1">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent leading-tight lg:pr-10">
                {t("business.deepdive.title")}
              </h1>
            </div>
            <div className="order-2 text-xl text-slate-600 leading-relaxed font-light">
              <p>{t("business.deepdive.p1")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PROCESS */}
      <section className="py-24 pt-12 bg-slate-900 text-white px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t("business.process.title")}
            </h2>
            <p className="text-slate-400 text-lg">
              {t("business.process.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="relative bg-slate-800/50 border border-slate-700 p-8 rounded-3xl hover:bg-slate-800 transition-colors"
                >
                  <div className="text-5xl font-black text-slate-700/50 absolute top-4 right-6 pointer-events-none">
                    0{index + 1}
                  </div>
                  <Icon className="w-10 h-10 text-blue-400 mb-6" />
                  <h3 className="text-xl font-bold mb-3">{t(step.titleKey)}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {t(step.descKey)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. SOLUTIONS TABS */}
      <section className="py-24 pt-14 pb-16 bg-white px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              {t("business.solutions.title")}
            </h2>
            <p className="text-slate-600 mt-4 text-lg">
              {t("business.solutions.subtitle")}
            </p>
          </div>

          <div className="flex justify-start lg:justify-center items-end border-b border-slate-200 mb-20 overflow-x-auto lg:overflow-visible w-full pt-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {Object.keys(solutions).map((key) => {
              const sol = solutions[key];
              const Icon = sol.icon;
              const isActive = activeTab === key;

              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`
                    relative flex flex-col items-center justify-center flex-1 min-w-[220px] pt-8 pb-8 px-6 transition-all duration-300
                    ${
                      isActive
                        ? "bg-white shadow-[0_-15px_30px_-15px_rgba(0,0,0,0.1)] border-t-4 border-t-violet-600 z-10 translate-y-[1px]"
                        : "bg-transparent hover:bg-slate-50 text-slate-500 border-t-4 border-t-transparent border-b-2 border-b-transparent"
                    }
                  `}
                >
                  <Icon
                    className={`w-10 h-10 mb-4 transition-colors ${
                      isActive ? "text-violet-600" : "text-slate-400"
                    }`}
                    strokeWidth={1.5}
                  />
                  <span
                    className={`text-sm md:text-base font-bold tracking-widest uppercase text-center transition-colors ${
                      isActive ? "text-violet-600" : "text-slate-500"
                    }`}
                  >
                    {t(sol.titleKey)}
                  </span>

                  <div
                    className={`absolute -bottom-6 transition-all duration-300 ${
                      isActive ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
                    }`}
                  >
                    <ChevronDown className="w-8 h-8 text-violet-600" strokeWidth={2.5} />
                  </div>
                </button>
              );
            })}
          </div>

          <div key={activeTab} className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div className="order-2 lg:order-1 space-y-6">
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900">
                {t(solutions[activeTab].titleKey)}
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed font-light">
                {t(solutions[activeTab].descKey)}
              </p>

              <div className="pt-4">
                <Link
                  to={withLang(solutions[activeTab].link)}
                  className="inline-flex items-center px-8 py-4 bg-slate-900 text-white font-semibold rounded-xl hover:bg-violet-600 transition-all shadow-lg hover:shadow-violet-600/30"
                >
                  {t("business.solutions.learnMore")}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>

            <div className="order-1 lg:order-2 relative w-full flex justify-center">
              <img
                src={solutions[activeTab].image}
                alt={t(solutions[activeTab].titleKey)}
                className="w-full max-w-[600px] h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.1)] transform hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7 & 8. CLOSING SPLIT SECTION */}
      <section className="relative py-24 pt-14 text-white overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-violet-950 px-4">
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

        <div className="absolute -top-20 -left-20 w-56 h-56 rounded-full bg-cyan-400/20 blur-3xl animate-float" />
        <div
          className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-violet-500/20 blur-3xl animate-float"
          style={{ animationDelay: "1.5s" }}
        />

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

        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start z-10">
          <div className="space-y-8 lg:sticky lg:top-24">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-br from-white to-slate-300 bg-clip-text text-transparent">
              {t("webdev.closing.title")}
            </h2>
            <div className="space-y-6 text-blue-100/80 text-lg leading-relaxed">
              <p>{t("webdev.closing.p1")}</p>
              <p>{t("webdev.closing.p2")}</p>
            </div>

            <div className="pt-4 hidden lg:block">
              <Button
                aria-label="Contact Yeltu Agency"
                onClick={() => navigate(withLang("/contact"))}
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 shadow-xl hover:scale-105 transition-all duration-300 px-8 py-6 text-base font-bold rounded-xl"
              >
                {t("webdev.closing.cta")}
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
            {closingCards.map((card, idx) => (
              <div
                key={idx}
                className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 p-8 rounded-3xl hover:bg-slate-800/60 transition-all group"
              >
                <h3 className="text-xl font-bold mb-4">{t(card.titleKey)}</h3>
                <p className="text-blue-100/70 text-sm leading-relaxed">
                  {t(card.descKey)}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-2 lg:hidden flex justify-start">
            <Button
              aria-label="Contact Yeltu Agency"
              onClick={() => navigate(withLang("/contact"))}
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 shadow-xl hover:scale-105 transition-all duration-300 px-8 py-6 text-base font-bold rounded-xl"
            >
              {t("webdev.closing.cta")}
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}