import { useState, Suspense, lazy, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import SEO from "../../components/SEO";
import { Button } from "../../components/ui/button";
import brandStrategyImg from "../../assets/services/brandstrategy.webp";
import {
  ArrowRight,
  X,
  LayoutTemplate,
  Zap,
  Search,
  SearchCheck,
  PenTool,
  CheckCircle,
  ArrowDown,
  Plus,
  ChevronLeft,
  ChevronRight,
  LineChart,
  MessagesSquare,
  Palette,
  ScanSearch,
  Users,
} from "lucide-react";

const FloatingElements = lazy(() => import("../../components/FloatingElements"));

export default function BrandStrategyPage() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const [selectedFeatureCard, setSelectedFeatureCard] = useState(null);

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
      id: "research",
      icon: Search,
      titleKey: "brandstrategy.features.research.title",
      descKey: "brandstrategy.features.research.desc",
    },
    {
      id: "positioning",
      icon: MessagesSquare,
      titleKey: "brandstrategy.features.positioning.title",
      descKey: "brandstrategy.features.positioning.desc",
    },
    {
      id: "identity",
      icon: Palette,
      titleKey: "brandstrategy.features.identity.title",
      descKey: "brandstrategy.features.identity.desc",
    },
    {
      id: "architecture",
      icon: LayoutTemplate,
      titleKey: "brandstrategy.features.architecture.title",
      descKey: "brandstrategy.features.architecture.desc",
    },
    {
      id: "audit",
      icon: ScanSearch,
      titleKey: "brandstrategy.features.audit.title",
      descKey: "brandstrategy.features.audit.desc",
    },
    {
      id: "testing",
      icon: Users,
      titleKey: "brandstrategy.features.testing.title",
      descKey: "brandstrategy.features.testing.desc",
    },
  ];

  const processSteps = [
    {
      icon: Search,
      titleKey: "brandstrategy.process.step1.title",
      descKey: "brandstrategy.process.step1.desc",
    },
    {
      icon: MessagesSquare,
      titleKey: "brandstrategy.process.step2.title",
      descKey: "brandstrategy.process.step2.desc",
    },
    {
      icon: PenTool,
      titleKey: "brandstrategy.process.step3.title",
      descKey: "brandstrategy.process.step3.desc",
    },
    {
      icon: LineChart,
      titleKey: "brandstrategy.process.step4.title",
      descKey: "brandstrategy.process.step4.desc",
    },
    {
      icon: CheckCircle,
      titleKey: "brandstrategy.process.step5.title",
      descKey: "brandstrategy.process.step5.desc",
    },
  ];

  const closingCards = [
    { titleKey: "webdev.closing.cards.tech.title", descKey: "webdev.closing.cards.tech.desc" },
    { titleKey: "webdev.closing.cards.product.title", descKey: "webdev.closing.cards.product.desc" },
    { titleKey: "webdev.closing.cards.perf.title", descKey: "webdev.closing.cards.perf.desc" },
    { titleKey: "webdev.closing.cards.secure.title", descKey: "webdev.closing.cards.secure.desc" },
  ];

  return (
    <main className="min-h-screen bg-white relative overflow-hidden font-sans">
      <SEO
        title={t("brandstrategy.seo.title")}
        description={t("brandstrategy.seo.desc")}
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
              {t("brandstrategy.hero.title")}
            </h1>

            <p className="mt-6 pb-6 text-lg text-blue-100 max-w-lg fade-in-3">
              {t("brandstrategy.hero.hook")}
            </p>

            <div className="flex flex-col gap-4 fade-in-5">
              <div className="flex items-center gap-3 text-base font-medium text-slate-300">
                <ArrowRight className="w-5 h-5 text-blue-400" />
                {t("brandstrategy.hero.points.identity")}
              </div>
              <div className="flex items-center gap-3 text-base font-medium text-slate-300">
                <ArrowRight className="w-5 h-5 text-blue-400" />
                {t("brandstrategy.hero.points.branding")}
              </div>
              <div className="flex items-center gap-3 text-base font-medium text-slate-300">
                <ArrowRight className="w-5 h-5 text-blue-400" />
                {t("brandstrategy.hero.points.rebranding")}
              </div>
            </div>

            <div className="mt-14 fade-in-4">
              <Button
                aria-label="Start Project"
                onClick={() => navigate(withLang("/contact"))}
                size="lg"
                className="px-8 py-5 text-base bg-gradient-to-r from-blue-500 to-violet-600 rounded-xl hover:scale-105 transition shadow-lg shadow-blue-500/20 mb-8"
              >
                {t("brandstrategy.hero.cta")}
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </div>
          </div>

          <div className="relative hidden lg:flex justify-end items-center slide-in-right z-10">
            <img
              src={brandStrategyImg}
              alt="Brand Strategy"
              className="w-full max-w-[800px] h-auto object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.5)] transform lg:scale-110 hover:-translate-y-2 transition-transform duration-700"
            />
          </div>
        </div>

        <div className="hero-wave absolute bottom-0 left-0 w-full h-24 pointer-events-none overflow-hidden">
          <svg viewBox="0 0 1440 120" className="w-full h-full" preserveAspectRatio="none">
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
              {t("brandstrategy.intro.p1")}
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              {t("brandstrategy.intro.p2")}
            </p>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent leading-tight lg:pl-10">
              {t("brandstrategy.intro.title")}
            </h2>
          </div>
        </div>
      </section>

      {/* 3. FEATURE CARDS */}
      <section className="py-24 pt-10 pb-12 bg-slate-50 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8 mb-12 flex justify-between items-end">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight max-w-2xl leading-tight">
            {t("brandstrategy.features.title")}
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

      {/* 4. DEEP DIVE TEXT */}
      <section className="py-24 px-4 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="order-1">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent leading-tight lg:pr-10">
                {t("brandstrategy.deepdive.h1.title")}
              </h1>
            </div>
            <div className="order-2 space-y-6 text-xl text-slate-600 leading-relaxed font-light">
              <p>{t("brandstrategy.deepdive.h1.p1")}</p>
              <p>{t("brandstrategy.deepdive.h1.p2")}</p>
              <p>{t("brandstrategy.deepdive.h1.p3")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="relative w-full h-12 md:h-24 bg-white">
        <div
          className="absolute inset-0 bg-gradient-to-r from-blue-600 to-violet-600"
          style={{
            clipPath: "polygon(0 20%, 35% 20%, 65% 80%, 100% 80%, 100% 150%, 0 150%)",
          }}
        ></div>

        <div
          className="absolute inset-0 bg-slate-50"
          style={{
            clipPath: "polygon(0 calc(20% + 4px), 35% calc(20% + 4px), 65% calc(80% + 4px), 100% calc(80% + 4px), 100% 150%, 0 150%)",
          }}
        ></div>
      </div>

      {/* 4B. DEEP DIVE 2 */}
      <section className="py-24 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="order-2 lg:order-1 space-y-6 text-xl text-slate-600 leading-relaxed font-light">
              <p>{t("brandstrategy.deepdive.h2.p1")}</p>
              <p>{t("brandstrategy.deepdive.h2.p2")}</p>
            </div>
            <div className="order-1 lg:order-2">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent leading-tight lg:pl-10">
                {t("brandstrategy.deepdive.h2.title")}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PROCESS */}
      <section className="py-24 pt-12 bg-slate-900 text-white px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t("brandstrategy.process.title")}
            </h2>
            <p className="text-slate-400 text-lg">
              {t("brandstrategy.process.subtitle")}
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
                  <p className="text-slate-400 text-sm leading-relaxed">{t(step.descKey)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6 & 7. CLOSING SPLIT SCREEN */}
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
                <p className="text-blue-100/70 text-sm leading-relaxed">{t(card.descKey)}</p>
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