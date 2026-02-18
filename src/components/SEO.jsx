import { Helmet } from "react-helmet";
import { useLanguage } from "../contexts/LanguageContext";

/**
 * SEO component (generic + backward compatible)
 *
 * Supports:
 * - canonical via `canonical` (path or full URL) OR `url` (full URL)
 * - multilingual hreflang auto-generated from canonical/url
 * - blog fallback using `slug` (legacy)
 * - jsonLd as object or array (injects <script type="application/ld+json">)
 * - custom meta tags array (name/content)
 *
 * Backward compatibility:
 * - If you don't pass canonical/url, it falls back to blog post canonical using `slug`
 */
export default function SEO({
  title,
  description,
  ogTitle,
  ogDescription,
  image,
  canonical, // path or full URL
  url, // full URL (some pages use this prop already)
  meta = [],
  slug, // legacy blog slug fallback
  lang, // optional override (ServicesPage passes lang)
  jsonLd, // object or array of objects
  noindex = false, // optional
}) {
  /* -----------------------------
     LANGUAGE (SAFE)
  ----------------------------- */
  let language = lang || "en";

  try {
    const ctx = useLanguage();
    language = lang || ctx?.language || ctx?.lang || "en";
  } catch {
    language = lang || "en";
  }

  const locales = { en: "en_US", az: "az_AZ", ru: "ru_RU" };
  const baseUrl = "https://yeltu.com";

  /* -----------------------------
     URL HELPERS
  ----------------------------- */
  const isAbs = (v) => /^https?:\/\//i.test(String(v || ""));
  const ensureSlash = (p) => (p?.startsWith("/") ? p : `/${p || ""}`);

  // Normalize any input into absolute URL
  const toAbsUrl = (maybeUrlOrPath) => {
    if (!maybeUrlOrPath) return baseUrl;
    if (isAbs(maybeUrlOrPath)) return maybeUrlOrPath;
    return `${baseUrl}${ensureSlash(maybeUrlOrPath)}`;
  };

  // Extract pathname from absolute url
  const toPathname = (absUrl) => {
    try {
      const u = new URL(absUrl);
      return u.pathname || "/";
    } catch {
      // if absUrl isn't valid, treat it as path
      return ensureSlash(absUrl);
    }
  };

  const stripLangPrefix = (pathname) =>
    pathname.replace(/^\/(az|ru)(?=\/|$)/, "") || "/";

  /* -----------------------------
     CANONICAL RESOLUTION (priority)
     1) canonical
     2) url
     3) legacy blog fallback using slug
  ----------------------------- */
  const safeSlug = slug || "";
  const legacyBlogPath = `/blog/post/${safeSlug}`;

  const resolvedCanonicalAbs = toAbsUrl(
    canonical || url || legacyBlogPath
  );

  const canonicalPath = toPathname(resolvedCanonicalAbs);

  // Build hreflang URLs by removing lang prefix then re-adding
  const cleanPath = stripLangPrefix(canonicalPath);
  const enUrl = `${baseUrl}${cleanPath === "/" ? "" : cleanPath}`;
  const azUrl = `${baseUrl}/az${cleanPath === "/" ? "" : cleanPath}`;
  const ruUrl = `${baseUrl}/ru${cleanPath === "/" ? "" : cleanPath}`;

  /* -----------------------------
     JSON-LD
  ----------------------------- */
  const jsonLdArray = Array.isArray(jsonLd)
    ? jsonLd
    : jsonLd
    ? [jsonLd]
    : [];

  /* -----------------------------
     IMAGE NORMALIZATION
     If you pass /path.jpg, it becomes https://yeltu.com/path.jpg
  ----------------------------- */
  const resolvedImage = image ? toAbsUrl(image) : null;

  return (
    <Helmet>
      {/* BASIC */}
      {title ? <title>{title}</title> : null}
      {description ? (
        <meta name="description" content={description} />
      ) : null}

      {/* INDEXING */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : null}

      {/* CANONICAL */}
      <link rel="canonical" href={resolvedCanonicalAbs} />

      {/* HREFLANG */}
      <link rel="alternate" href={enUrl} hrefLang="en" />
      <link rel="alternate" href={azUrl} hrefLang="az" />
      <link rel="alternate" href={ruUrl} hrefLang="ru" />
      <link rel="alternate" href={enUrl} hrefLang="x-default" />

      {/* OPEN GRAPH */}
      <meta property="og:title" content={ogTitle || title || ""} />
      <meta
        property="og:description"
        content={ogDescription || description || ""}
      />
      {resolvedImage ? (
        <meta property="og:image" content={resolvedImage} />
      ) : null}
      <meta property="og:url" content={resolvedCanonicalAbs} />
      <meta property="og:type" content="website" />
      <meta
        property="og:locale"
        content={locales[language] || "en_US"}
      />

      {/* TWITTER */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle || title || ""} />
      <meta
        name="twitter:description"
        content={ogDescription || description || ""}
      />
      {resolvedImage ? (
        <meta name="twitter:image" content={resolvedImage} />
      ) : null}

      {/* CUSTOM META */}
      {Array.isArray(meta)
        ? meta.map((m, i) => {
            if (!m?.name || !m?.content) return null;
            return <meta key={i} name={m.name} content={m.content} />;
          })
        : null}

      {/* JSON-LD */}
      {jsonLdArray.map((obj, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(obj)}
        </script>
      ))}
    </Helmet>
  );
}