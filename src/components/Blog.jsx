import { useState, useEffect, useMemo, useCallback } from "react";
import { ArrowRight, Search, Tag, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./ImageWithFallback";
import AnimatedCard from "./AnimatedCard";
import { Input } from "./ui/input";
import { useLanguage } from "../contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import SEO from "./SEO";
import { useLangNavigate } from "../utils/useLangNavigate";


import { fetchBlogs, fetchFeaturedBlogs } from "../api/blogApi";

export default function Blog() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const langNavigate = useLangNavigate();

  /* -----------------------------
     LANGUAGE-SAFE BASE URLS
  ----------------------------- */
  const blogBase =
    language === "en" ? "/blog" : `/${language}/blog`;

  const blogBaseUrl =
    language === "en"
      ? "https://yeltu.com/blog"
      : `https://yeltu.com/${language}/blog`;

  /* -----------------------------
     SEO TEXT
  ----------------------------- */
  const seoText = useMemo(
    () =>
      ({
        en: {
          title: "Yeltu Blog – Tech, Design, Marketing & Development Insights",
          desc: "Read web development tutorials, marketing insights, SEO guides, and tech trends from Yeltu Agency experts.",
          image: "/og-blog-en.jpg",
        },
        az: {
          title:
            "Yeltu Blog – Texnologiya, Dizayn, Marketinq və İnkişaf Yazıları",
          desc: "Veb inkişaf dərsləri, SEO məqalələri, marketinq tövsiyələri və texnologiya trendlərini oxuyun.",
          image: "/og-blog-az.jpg",
        },
        ru: {
          title: "Блог Yeltu – Технологии, маркетинг, дизайн и разработка",
          desc: "Читайте статьи о веб-разработке, SEO, маркетинге и трендах технологий от экспертов Yeltu.",
          image: "/og-blog-ru.jpg",
        },
      }[language || "en"]),
    [language]
  );

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const [blogs, setBlogs] = useState([]);
  const [featured, setFeatured] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* -----------------------------
     CATEGORY CONFIG (MATCHES BACKEND ENUM)
  ----------------------------- */
  const categoryConfig = useMemo(
    () => [
      { id: "all", label: t("blog.categories.all") || "All" },
      { id: "technology", label: t("blog.categories.tech") || "Technology" },
      { id: "design", label: t("blog.categories.design") || "Design" },
      { id: "marketing", label: t("blog.categories.marketing") || "Marketing" },
      { id: "seo", label: t("blog.categories.seo") || "SEO" },
      { id: "development", label: t("blog.categories.dev") || "Development" },
    ],
    [t]
  );

  const getCategoryLabel = useCallback(
    (id) => categoryConfig.find((c) => c.id === id)?.label || id,
    [categoryConfig]
  );

  /* -----------------------------
     FETCH BLOGS + FEATURED
  ----------------------------- */
  useEffect(() => {
    let cancelled = false;

    const loadBlogs = async () => {
      try {
        setLoading(true);
        setError(null);

        const lang = language || "en";

        const [blogsRes, featuredRes] = await Promise.all([
          fetchBlogs({
            lang,
            category: selectedCategory,
            search: searchQuery.trim(),
          }),
          fetchFeaturedBlogs({ lang }),
        ]);

        if (cancelled) return;

        const mapBlog = (b) => ({
          id: b.id,
          title: b.title,
          excerpt: b.excerpt,
          category: b.category,
          image: b.image,
          featured: b.featured,
          date: new Date(b.createdAt).toLocaleDateString(),
          color: "from-blue-500 to-purple-500",
          seo: b.seo || {},
        });

        setBlogs(blogsRes.data.map(mapBlog));
        setFeatured(featuredRes.data.map(mapBlog));
      } catch (err) {
        console.error(err);
        if (!cancelled) setError("Failed to load blog posts.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadBlogs();
    return () => (cancelled = true);
  }, [selectedCategory, searchQuery, language]);

  /* -----------------------------
     FILTERED POSTS
  ----------------------------- */
  const { filteredPosts, featuredPosts, hasResults } = useMemo(() => {
    const normalized = searchQuery.trim().toLowerCase();

    const filtered = blogs.filter(
      (post) =>
        !normalized ||
        post.title?.toLowerCase().includes(normalized) ||
        post.excerpt?.toLowerCase().includes(normalized)
    );

    return {
      filteredPosts: filtered,
      featuredPosts: featured,
      hasResults: filtered.length > 0,
    };
  }, [blogs, featured, searchQuery]);

  /* -----------------------------
     JSON-LD
  ----------------------------- */
  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Blog",
      name: seoText.title,
      description: seoText.desc,
      url: blogBaseUrl,
      image: seoText.image,
      blogPost: blogs.map((b) => ({
        "@type": "BlogPosting",
        headline: b.title,
        description: b.excerpt,
        image: b.image,
        genre: b.category,
        datePublished: b.date,
        url: `${blogBaseUrl}/post/${b.seo?.slug || b.id}`,
      })),
    }),
    [seoText, blogs, blogBaseUrl]
  );

  /* RENDER */
  return (
    <div className="bg-slate-950">
      {/* SEO */}
      <SEO
        title={seoText.title}
        description={seoText.desc}
        image={seoText.image}
        canonical={blogBaseUrl}
      />

      {/* JSON-LD Accessible */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO */}
      <section
        className="relative overflow-hidden text-white min-h-[50vh] flex items-center hero-bg"
        role="banner"
        aria-labelledby="blog-hero-title"
      >
        {/* Background Grid */}
        <div aria-hidden="true" className="absolute inset-0 hero-grid" />

        {/* Floating Background Blobs */}
        <div
          className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-purple-500/35 blur-[160px]"
          aria-hidden="true"
        />
        <div
          className="absolute top-40 left-0 w-[320px] h-[320px] bg-indigo-500/30 blur-[130px]"
          aria-hidden="true"
        />

        {/* CONTENT */}
        <div className="relative max-w-7xl mx-auto px-4 text-center z-10">

          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full 
                      border border-blue-400/40 bg-white/5 backdrop-blur fade-in-1"
            role="note"
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-violet-400 animate-pulse"
              aria-hidden="true"
            />
            <span className="text-xs font-medium uppercase tracking-[0.22em] text-blue-100">
              {t("blog.hero.badge") || "Yeltu · Knowledge Hub"}
            </span>
          </div>

          {/* Title */}
          <h1
            id="blog-hero-title"
            className="mb-4 text-4xl sm:text-5xl md:text-6xl font-bold leading-tight fade-in-2 gradient-text-blog"
            aria-label="Yeltu Blog"
          >
            {t("blog.hero.title") || "Tech Blog & Updates"}
          </h1>

          {/* Subtitle */}
          <p className="text-blue-200 max-w-2xl mx-auto text-base sm:text-lg fade-in-3">
            {t("blog.hero.subtitle") ||
              "Insights, tutorials, and guides from the Yeltu team."}
          </p>
        </div>
      </section>


      {/* SEARCH + FILTERS */}
      <section
        className="bg-slate-950/95 border-y border-white/5 py-6 sticky top-16 z-30 backdrop-blur-xl"
        aria-label="Search blog posts and filter by category"
      >
        <div className="max-w-7xl mx-auto px-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* SEARCH */}
          <div className="relative w-full md:w-96">
            <label htmlFor="blog-search" className="sr-only">
              Search blog posts
            </label>
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300"
              size={20}
              aria-hidden="true"
            />
            <Input
              id="blog-search"
              type="text"
              role="searchbox"
              aria-label="Search articles"
              placeholder={t("blog.search.placeholder") || "Search articles..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/5 backdrop-blur-md border-white/15 text-white placeholder:text-blue-200/70 focus-visible:ring-blue-500"
            />
          </div>

          {/* FILTERS */}
          <div
            className="flex flex-wrap justify-center md:justify-end gap-2"
            role="radiogroup"
            aria-label="Blog categories filter"
          >
            {categoryConfig.map((category) => {
              const isActive = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  role="radio"
                  aria-checked={isActive}
                  aria-label={category.label}
                  onClick={() => setSelectedCategory(category.id)}
                  className={[
                    "px-4 py-2 rounded-full text-xs sm:text-sm transition-all duration-300 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900",
                    "border flex items-center gap-2",
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-violet-600 text-white border-transparent shadow-lg shadow-blue-500/30"
                      : "bg-white/5 border-white/15 text-blue-200 hover:bg-white/10",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "w-1.5 h-1.5 rounded-full",
                      isActive ? "bg-white" : "bg-blue-400",
                    ].join(" ")}
                  />
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* LOADING */}
      {loading && (
        <div
          className="py-20 text-center text-blue-300"
          aria-live="polite"
          role="status"
        >
          Loading articles…
        </div>
      )}

      {/* ERROR */}
      {!loading && error && (
        <div
          className="py-20 text-center text-red-400"
          role="alert"
          aria-live="assertive"
        >
          {error}
        </div>
      )}

      {/* FEATURED */}
      {!loading && !error && (
        <section
          className="py-16 bg-white"
          aria-labelledby="blog-featured-title"
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="text-blue-600" size={24} aria-hidden="true" />
              <h2 id="blog-featured-title" className="text-slate-900">
                {t("blog.featured.title") || "Featured Articles"}
              </h2>
            </div>

            {featuredPosts.length === 0 ? (
              <Card className="border-dashed border-slate-200 bg-slate-50">
                <CardContent className="py-10 text-center text-slate-500">
                  {t("blog.featured.empty") ||
                    "No featured articles yet — coming soon."}
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {featuredPosts.map((post, index) => {
                  const slug = post.seo?.slug || post.id;

                  return (
                    <article
                      key={slug}
                      className="group cursor-pointer"
                      aria-label={`Featured article: ${post.title}`}
                      onClick={() => navigate(`${blogBase}/post/${slug}`)}
                    >
                      <AnimatedCard
                        delay={index * 0.1}
                        className="bg-white border border-slate-200 hover:border-blue-500/70 hover:shadow-xl transition-all duration-300"
                      >
                        <div className="relative h-64 overflow-hidden">
                          <ImageWithFallback
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            loading="lazy"
                          />
                          <div
                            className={`absolute inset-0 bg-gradient-to-t ${post.color} opacity-40`}
                            aria-hidden="true"
                          />
                        </div>

                        <CardContent className="p-6 space-y-3">
                          <div className="flex items-center justify-between text-xs text-slate-500">
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-slate-100 text-slate-700">
                              <Tag size={12} aria-hidden="true" />
                              {getCategoryLabel(post.category)}
                            </span>
                            <time>{post.date}</time>
                          </div>

                          <h3 className="text-slate-900 text-xl font-semibold">
                            {post.title}
                          </h3>

                          <p className="text-slate-600 text-sm">
                            {post.excerpt}
                          </p>
                        </CardContent>
                      </AnimatedCard>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ALL POSTS */}
      {!loading && !error && (
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-2 mb-4">
              <Tag className="text-blue-600" size={24} aria-hidden="true" />
              <h2 className="text-slate-900">
                {t("blog.all.title") || "All Articles"}
              </h2>
            </div>

            {!hasResults ? (
              <div className="mt-6" aria-live="polite">
                <Card className="border-dashed border-slate-300 bg-white/80">
                  <CardContent className="py-10 text-center space-y-2">
                    <p className="text-slate-700 font-medium">
                      {t("blog.search.noResultsTitle") || "No articles found"}
                    </p>
                    <p className="text-slate-500 text-sm max-w-md mx-auto">
                      {t("blog.search.noResultsText") ||
                        "Try clearing the search or selecting a different category."}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => {
                  const slug = post.seo?.slug || post.id;

                  return (
                    <article
                      key={slug}
                      className="group cursor-pointer"
                      aria-label={`Article: ${post.title}`}
                      onClick={() => navigate(`${blogBase}/post/${slug}`)}
                    >
                      <AnimatedCard
                        delay={index * 0.05}
                        className="bg-white border border-slate-200 hover:border-blue-500/70 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="relative h-48 overflow-hidden">
                          <ImageWithFallback
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            loading="lazy"
                          />
                          <div
                            className={`absolute inset-0 bg-gradient-to-t ${post.color} opacity-40`}
                            aria-hidden="true"
                          />
                        </div>

                        <CardContent className="p-5 space-y-3">
                          <div className="flex items-center justify-between text-xs text-slate-500">
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-slate-100 text-slate-700">
                              <Tag size={12} aria-hidden="true" />
                              {getCategoryLabel(post.category)}
                            </span>

                            <time>{post.date}</time>
                          </div>

                          <h3 className="text-slate-900 text-lg font-semibold">
                            {post.title}
                          </h3>

                          <p className="text-slate-600 text-sm line-clamp-3">
                            {post.excerpt}
                          </p>
                        </CardContent>
                      </AnimatedCard>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {/* CTA */}
      <section
        className="
          relative py-20 text-white text-center overflow-hidden 
          bg-gradient-to-br from-slate-900 via-blue-950 to-violet-950
        "
        aria-labelledby="blog-cta-title"
      >
        {/* GRID BACKGROUND */}
        <div
          aria-hidden="true"
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

        {/* FLOATING ORBS */}
        <div
          className="absolute -top-20 -left-20 w-56 h-56 rounded-full bg-cyan-400/20 blur-3xl animate-float"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-violet-500/20 blur-3xl animate-float"
          aria-hidden="true"
          style={{ animationDelay: "1.5s" }}
        />

        {/* SCAN LINE */}
        <div
          aria-hidden="true"
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
        <div className="relative max-w-3xl mx-auto px-4 z-10">
          <h2
            id="blog-cta-title"
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            {t("blog.cta.title") || "Ready to Transform Your Business?"}
          </h2>

          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            {t("blog.cta.subtitle") ||
              "Let's discuss how we can help you grow."}
          </p>

          <Button
            onClick={() => langNavigate("/contact")}
            size="lg"
            aria-label="Go to contact page"
            className="
              bg-white text-blue-600 hover:bg-blue-50 
              shadow-xl hover:scale-105 transition-all duration-300
              inline-flex items-center gap-2
            "
          >
            {t("blog.cta.button") || "Get In Touch"}
            <ArrowRight className="ml-1" size={20} aria-hidden="true" />
          </Button>
        </div>
      </section>

    </div>
  );
}
