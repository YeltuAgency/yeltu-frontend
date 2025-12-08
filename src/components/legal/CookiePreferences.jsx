// src/components/legal/CookiePreferences.jsx
import { useEffect, useState } from "react";
import SEO from "../SEO";
import { useLanguage } from "../../contexts/LanguageContext";
import { Button } from "../ui/button";

export default function CookiePreferences() {
  const { t } = useLanguage();

  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  // Load saved preferences
  useEffect(() => {
    const pref = localStorage.getItem("yeltu_cookie_prefs");
    if (pref) {
      const parsed = JSON.parse(pref);
      setAnalytics(parsed.analytics);
      setMarketing(parsed.marketing);
    }
  }, []);

  const savePrefs = () => {
    const data = { analytics, marketing };
    localStorage.setItem("yeltu_cookie_prefs", JSON.stringify(data));

    // Apply GTM Consent Mode
    if (window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: analytics ? "granted" : "denied",
        ad_storage: marketing ? "granted" : "denied",
      });
    }

    alert(t("legal.cookiePrefs.statusSaved"));
  };

  const seo = {
    title: t("legal.cookiePrefs.seoTitle"),
    description: t("legal.cookiePrefs.seoDescription"),
    image: "/og-legal.jpg",
    url: "https://yeltu.com/cookie-preferences",
  };

  return (
    <div className="bg-slate-950 text-white py-20 px-4 animate-fade-in">
      <SEO {...seo} />

      <div className="max-w-3xl mx-auto space-y-10">
        <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          {t("legal.cookiePrefs.title")}
        </h1>

        <p className="text-blue-300">{t("legal.cookiePrefs.intro")}</p>

        {/* Options */}
        <div className="space-y-8 mt-8">
          {/* Necessary */}
          <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
            <h3 className="text-xl font-bold text-white">
              {t("legal.cookiePrefs.necessaryTitle")}
            </h3>
            <p className="text-blue-200 text-sm">
              {t("legal.cookiePrefs.necessaryText")}
            </p>
          </div>

          {/* Analytics */}
          <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
            <div className="flex justify-between mb-2">
              <h3 className="text-xl font-bold text-white">
                {t("legal.cookiePrefs.analyticsTitle")}
              </h3>
              <button
                onClick={() => setAnalytics(!analytics)}
                className={`px-4 py-1 rounded-full text-sm ${
                  analytics ? "bg-blue-600" : "bg-slate-700"
                }`}
              >
                {analytics
                  ? t("legal.cookiePrefs.labelOn")
                  : t("legal.cookiePrefs.labelOff")}
              </button>
            </div>
            <p className="text-blue-200 text-sm">
              {t("legal.cookiePrefs.analyticsText")}
            </p>
          </div>

          {/* Marketing */}
          <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
            <div className="flex justify-between mb-2">
              <h3 className="text-xl font-bold text-white">
                {t("legal.cookiePrefs.marketingTitle")}
              </h3>
              <button
                onClick={() => setMarketing(!marketing)}
                className={`px-4 py-1 rounded-full text-sm ${
                  marketing ? "bg-purple-600" : "bg-slate-700"
                }`}
              >
                {marketing
                  ? t("legal.cookiePrefs.labelOn")
                  : t("legal.cookiePrefs.labelOff")}
              </button>
            </div>
            <p className="text-blue-200 text-sm">
              {t("legal.cookiePrefs.marketingText")}
            </p>
          </div>
        </div>

        {/* Save */}
        <Button
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl py-4 text-lg font-semibold"
          onClick={savePrefs}
        >
          {t("legal.cookiePrefs.saveButton")}
        </Button>

        <a
          href="/"
          className="block text-center text-blue-400 mt-4 hover:text-blue-300"
        >
          {t("legal.cookiePrefs.backToSiteButton")}
        </a>
      </div>
    </div>
  );
}
