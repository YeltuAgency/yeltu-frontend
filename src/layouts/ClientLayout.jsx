import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useLanguage } from "../contexts/LanguageContext";
import ScrollToTop from "../components/ScrollToTop";   // ✅ ADD THIS


export default function ClientLayout() {
  const location = useLocation();
  const { lang } = useLanguage();

  // --------- GTM PAGEVIEW TRACKING ----------
  useEffect(() => {
    if (!window.dataLayer) window.dataLayer = [];

    window.dataLayer.push({
      event: "page_view",
      page_path: location.pathname + location.search,
      page_title: document.title,
      page_language: lang || "en",
    });

    // Debug in console
    console.log("GTM page_view ▸", {
      page_path: location.pathname,
      lang,
    });
  }, [location, lang]);

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
