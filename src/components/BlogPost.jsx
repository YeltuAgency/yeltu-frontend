import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import SEO from "./SEO";
import { ImageWithFallback } from "./ImageWithFallback";
import { fetchBlogBySlug } from "../api/blogApi";

// GTM helper
const pushToDataLayer = (eventName, params = {}) => {
  if (typeof window === "undefined" || !window.dataLayer) return;

  window.dataLayer.push({
    event: eventName,
    ...params,
  });
};

export default function BlogPost() {
  const { slug } = useParams();
  const { language } = useLanguage();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  /* -----------------------------
     FETCH BLOG
  ----------------------------- */
  useEffect(() => {
    let cancelled = false;

    const loadBlog = async () => {
      try {
        const res = await fetchBlogBySlug({
          slug,
          lang: language || "en",
        });

        if (!cancelled) setPost(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadBlog();
    return () => (cancelled = true);
  }, [slug, language]);

  /* -----------------------------
     RESOLVED SEO (FROM BACKEND)
  ----------------------------- */
  const seo = useMemo(() => {
    if (!post?.seo) return {};

    return {
      title: post.seo.title || post.title,
      description: post.seo.description || post.excerpt,
      ogTitle: post.seo.ogTitle || post.seo.title || post.title,
      ogDescription:
        post.seo.ogDescription ||
        post.seo.description ||
        post.excerpt,
      image: post.seo.ogImage || post.image,
      canonical:
        post.seo.canonical ||
        `https://yeltu.com/blog/post/${post.seo.slug}`,
      meta: post.seo.meta || [],
      slug: post.seo.slug,
    };
  }, [post]);

  /* -----------------------------
     JSON-LD
  ----------------------------- */
  const jsonLd = useMemo(() => {
    if (!post) return "{}";

    return JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: seo.ogTitle || seo.title,
      description: seo.ogDescription || seo.description,
      image: seo.image,
      datePublished: post.createdAt || new Date().toISOString(),
      inLanguage: language,
      mainEntityOfPage: seo.canonical,
      publisher: {
        "@type": "Organization",
        name: "Yeltu Agency",
        logo: {
          "@type": "ImageObject",
          url: "https://yeltu.com/og-home-en.jpg",
        },
      },
    });
  }, [post, seo, language]);

  /* -----------------------------
     TRACK VIEW EVENTS
  ----------------------------- */
  useEffect(() => {
    if (!post) return;

    const pagePath =
      typeof window !== "undefined"
        ? window.location.pathname
        : `/blog/post/${slug}`;

    pushToDataLayer("blog_view", {
      lang: language || "en",
      slug,
      category: post.category,
      page_path: pagePath,
    });

    pushToDataLayer("view_content", {
      content_type: "blog_post",
      content_id: post._id || slug,
      content_name: post.title,
      content_category: post.category,
    });
  }, [post, slug, language]);

  /* -----------------------------
     SAFE RETURN STATES
  ----------------------------- */
  if (loading) {
    return (
      <div
        className="py-32 text-center text-blue-300 text-xl animate-pulse"
        role="status"
        aria-live="polite"
      >
        Loading article…
      </div>
    );
  }

  if (!post) {
    return (
      <div
        className="py-32 text-center text-red-400 text-xl"
        role="alert"
        aria-live="assertive"
      >
        Article not found.
      </div>
    );
  }

  /* -----------------------------
     RENDER
  ----------------------------- */
  return (
    <div className="bg-slate-950 text-white min-h-screen">
      {/* SEO */}
      <SEO
        title={seo.title}
        description={seo.description}
        ogTitle={seo.ogTitle}
        ogDescription={seo.ogDescription}
        image={seo.image}
        canonical={seo.canonical}
        meta={seo.meta}
        slug={seo.slug}
      />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <main id="main-content" role="main" tabIndex={-1}>
        {/* HEADER / HERO */}
        <header
          className="relative py-24 px-4 overflow-hidden"
          aria-labelledby="blog-title"
        >
          <div className="absolute inset-0 opacity-40 bg-gradient-to-br from-blue-600/30 via-purple-600/20 to-pink-600/30 blur-3xl" />

          <div className="relative max-w-4xl mx-auto">
            <h1
              id="blog-title"
              className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent"
            >
              {post.title}
            </h1>

            <p className="text-blue-200/80 mb-4 text-lg" id="blog-excerpt">
              {post.excerpt}
            </p>

            <div className="text-sm text-blue-300">
              <span>{post.category} · </span>
              <time dateTime={post.createdAt}>
                {new Date(post.createdAt).toLocaleDateString()}
              </time>
            </div>
          </div>
        </header>

        {/* COVER IMAGE */}
        <figure
          className="max-w-5xl mx-auto px-4 mb-16"
          aria-labelledby="blog-title"
        >
          <div className="rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/20 border border-white/10 bg-white/5 backdrop-blur-xl">
            <ImageWithFallback
              src={post.image}
              alt={post.title || "Blog cover image"}
              loading="lazy"
              className="w-full h-[450px] object-cover rounded-3xl"
            />
          </div>
        </figure>

        {/* ARTICLE BODY */}
        <article
          className="max-w-3xl mx-auto px-4 pb-32"
          aria-describedby="blog-excerpt"
        >
          <div
            className="
              prose prose-invert prose-lg max-w-none leading-relaxed
              prose-a:text-blue-400 prose-a:underline prose-a:decoration-blue-500
              hover:prose-a:text-purple-300
            "
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div
            className="mt-16 p-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 text-center"
            role="note"
          >
            <h3 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
              Enjoyed the article?
            </h3>
            <p className="text-blue-200 mb-4">
              Share it or browse more posts from the Yeltu Blog.
            </p>
          </div>
        </article>
      </main>
    </div>
  );
}
