import { Helmet } from "react-helmet";
import { useLanguage } from "../contexts/LanguageContext";

export default function SEO({ title, description, keywords, image, url }) {
  let lang = "en";

  try {
    lang = useLanguage().lang || "en";
  } catch (err) {
    console.warn("SEO rendered before LanguageProvider. Using fallback lang='en'.");
  }

  const localeMap = {
    en: "en_US",
    az: "az_AZ",
    ru: "ru_RU",
  };

  const canonicalUrl = url || "https://yeltu.com/";

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />

      <link rel="alternate" href="https://yeltu.com/" hrefLang="en" />
      <link rel="alternate" href="https://yeltu.com/az/" hrefLang="az" />
      <link rel="alternate" href="https://yeltu.com/ru/" hrefLang="ru" />
      <link rel="alternate" href="https://yeltu.com/" hrefLang="x-default" />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={localeMap[lang] || "en_US"} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
}
