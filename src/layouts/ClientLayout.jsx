import { Outlet, useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useLanguage } from "../contexts/LanguageContext";
import ScrollToTop from "../components/ScrollToTop";

export default function ClientLayout() {
  const location = useLocation();
  const { language } = useLanguage();
  const { lang } = useParams();

  useEffect(() => {
    document.documentElement.lang = language || "en";
  }, [language]);

  useEffect(() => {
    if (!window.dataLayer) window.dataLayer = [];

    window.dataLayer.push({
      event: "page_view",
      page_path: location.pathname + location.search,
      page_title: document.title,
      page_language: language,
    });
  }, [location.pathname, location.search, language]);

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}