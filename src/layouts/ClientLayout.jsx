import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useLanguage } from "../contexts/LanguageContext";
import ScrollToTop from "../components/ScrollToTop";

export default function ClientLayout() {
  const location = useLocation();
  const { language } = useLanguage();

  // --------- GTM PAGEVIEW TRACKING ----------
  useEffect(() => {
    if (!window.dataLayer) window.dataLayer = [];

    window.dataLayer.push({
      event: "page_view",
      page_path: location.pathname + location.search,
      page_title: document.title,
      page_language: language,
    });

    console.log("GTM page_view ▸", {
      page_path: location.pathname + location.search,
      lang: language,
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
