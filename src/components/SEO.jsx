import { Helmet } from "react-helmet";
import { useLanguage } from "../contexts/LanguageContext";

export default function SEO({
  title,
  description,
  ogTitle,
  ogDescription,
  image,
  canonical,
  meta = [],
  slug,
}) {
  /* --------------------------------
     LANGUAGE (SAFE, BACKWARD-COMPAT)
  -------------------------------- */
  let language = "en";

  try {
    const ctx = useLanguage();
    language = ctx?.language || ctx?.lang || "en";
  } catch (err) {
    // SEO may render outside LanguageProvider (SSR / early render)
    language = "en";
  }

  const locales = {
    en: "en_US",
    az: "az_AZ",
    ru: "ru_RU",
  };

  const baseUrl = "https://yeltu.com";

  // Safety fallbacks
  const safeSlug = slug || "";
  const safeCanonical =
    canonical || `${baseUrl}/blog/post/${safeSlug}`;

  return (
    <Helmet>
      {/* BASIC */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* CANONICAL */}
      <link rel="canonical" href={safeCanonical} />

      {/* HREFLANG */}
      <link
        rel="alternate"
        href={`${baseUrl}/blog/post/${safeSlug}`}
        hrefLang="en"
      />
      <link
        rel="alternate"
        href={`${baseUrl}/az/blog/post/${safeSlug}`}
        hrefLang="az"
      />
      <link
        rel="alternate"
        href={`${baseUrl}/ru/blog/post/${safeSlug}`}
        hrefLang="ru"
      />
      <link
        rel="alternate"
        href={`${baseUrl}/blog/post/${safeSlug}`}
        hrefLang="x-default"
      />

      {/* OPEN GRAPH */}
      <meta property="og:title" content={ogTitle || title} />
      <meta
        property="og:description"
        content={ogDescription || description}
      />
      {image && <meta property="og:image" content={image} />}
      <meta property="og:url" content={safeCanonical} />
      <meta property="og:type" content="article" />
      <meta
        property="og:locale"
        content={locales[language] || "en_US"}
      />

      {/* TWITTER */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle || title} />
      <meta
        name="twitter:description"
        content={ogDescription || description}
      />
      {image && <meta name="twitter:image" content={image} />}

      {/* CUSTOM META */}
      {meta.map((m, i) => {
        if (!m?.name || !m?.content) return null;
        return <meta key={i} name={m.name} content={m.content} />;
      })}
    </Helmet>
  );
}
