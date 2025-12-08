// src/components/legal/CookiePolicy.jsx
import SEO from "../SEO";
import { useLanguage } from "../../contexts/LanguageContext";

export default function CookiePolicy() {
  const { t } = useLanguage();

  const seo = {
    title: t("legal.cookies.seoTitle"),
    description: t("legal.cookies.seoDescription"),
    image: "/og-legal.jpg",
    url: "https://yeltu.com/cookies",
  };

  return (
    <div className="bg-slate-950 text-white py-20 px-4 animate-fade-in">
      <SEO {...seo} />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
          {t("legal.cookies.title")}
        </h1>

        <p className="text-blue-300 mb-8">{t("legal.cookies.lastUpdatedLabel")}</p>

        <div className="prose prose-invert prose-lg max-w-none text-blue-100 space-y-6">
          <p>{t("legal.cookies.intro")}</p>
          <p>{t("legal.cookies.content1")}</p>
          <p>{t("legal.cookies.content2")}</p>
          <p>{t("legal.cookies.content3")}</p>
          <p>{t("legal.cookies.content4")}</p>
          <p>{t("legal.cookies.content5")}</p>
        </div>
      </div>
    </div>
  );
}
