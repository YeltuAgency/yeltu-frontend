// src/components/legal/TermsConditions.jsx
import SEO from "../SEO";
import { useLanguage } from "../../contexts/LanguageContext";

export default function TermsConditions() {
  const { t } = useLanguage();

  const seo = {
    title: t("legal.terms.seoTitle"),
    description: t("legal.terms.seoDescription"),
    image: "/og-legal.jpg",
    url: "https://yeltu.com/terms",
  };

  return (
    <div className="bg-slate-950 text-white py-20 px-4 animate-fade-in">
      <SEO {...seo} />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
          {t("legal.terms.title")}
        </h1>

        <p className="text-blue-300 mb-8">{t("legal.terms.lastUpdatedLabel")}</p>

        <div className="prose prose-invert prose-lg max-w-none text-blue-100 space-y-6">
          <p>{t("legal.terms.intro")}</p>
          <p>{t("legal.terms.content1")}</p>
          <p>{t("legal.terms.content2")}</p>
          <p>{t("legal.terms.content3")}</p>
          <p>{t("legal.terms.content4")}</p>
          <p>{t("legal.terms.content5")}</p>
          <p>{t("legal.terms.content6")}</p>
          <p>{t("legal.terms.content7")}</p>
        </div>
      </div>
    </div>
  );
}
