// src/components/legal/PrivacyPolicy.jsx
import SEO from "../SEO";
import { useLanguage } from "../../contexts/LanguageContext";

export default function PrivacyPolicy() {
  const { t } = useLanguage();

  const seo = {
    title: t("legal.privacy.seoTitle"),
    description: t("legal.privacy.seoDescription"),
    image: "/og-legal.jpg",
    url: "https://yeltu.com/privacy",
  };

  return (
    <div className="bg-slate-950 text-white py-20 px-4 animate-fade-in">
      <SEO {...seo} />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
          {t("legal.privacy.title")}
        </h1>

        <p className="text-blue-300 mb-8">{t("legal.privacy.lastUpdatedLabel")}</p>

        <div className="prose prose-invert prose-lg max-w-none text-blue-100 space-y-6">
          <p>{t("legal.privacy.intro")}</p>
          <p>{t("legal.privacy.content1")}</p>
          <p>{t("legal.privacy.content2")}</p>
          <p>{t("legal.privacy.content3")}</p>
          <p>{t("legal.privacy.content4")}</p>
          <p>{t("legal.privacy.content5")}</p>
          <p>{t("legal.privacy.content6")}</p>
          <p>{t("legal.privacy.content7")}</p>
          <p>{t("legal.privacy.content8")}</p>

          <h2 className="text-2xl font-bold mt-10">
            {t("legal.privacy.contactTitle")}
          </h2>
          <p>{t("legal.privacy.contactText")}</p>
        </div>
      </div>
    </div>
  );
}
