import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/global.css";
import "./i18n";

import ErrorBoundary from "./components/ErrorBoundary";

import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { CookieConsentProvider, useCookieConsent } from "./contexts/CookieConsentContext";

import CookieBanner from "./components/CookieBanner";
import CookieModal from "./components/CookieModal";

// ========================================
//   GTM WRAPPER
// ========================================
function GTMWrapper({ children }) {
  const { consent } = useCookieConsent();

  React.useEffect(() => {
    if (!consent.analytics) return;

    const sendPageView = () => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "page_view",
        page_path: window.location.pathname + window.location.search,
        page_location: window.location.href,
        page_title: document.title,
      });
    };

    sendPageView();

    const originalPush = history.pushState;
    const originalReplace = history.replaceState;

    history.pushState = function (...args) {
      originalPush.apply(this, args);
      window.dispatchEvent(new Event("locationchange"));
    };

    history.replaceState = function (...args) {
      originalReplace.apply(this, args);
      window.dispatchEvent(new Event("locationchange"));
    };

    const handlePopstate = () => {
      window.dispatchEvent(new Event("locationchange"));
    };

    window.addEventListener("popstate", handlePopstate);
    window.addEventListener("locationchange", sendPageView);

    return () => {
      window.removeEventListener("popstate", handlePopstate);
      window.removeEventListener("locationchange", sendPageView);
    };
  }, [consent.analytics]);

  return children;
}

// ================================
// RENDER ROOT
// ================================
ReactDOM.createRoot(document.getElementById("root")).render(
  <CookieConsentProvider>
    <BrowserRouter>
      <LanguageProvider>
        <GTMWrapper>
          <ErrorBoundary>
            <App />
            <CookieBanner />
            <CookieModal />
          </ErrorBoundary>
        </GTMWrapper>
      </LanguageProvider>
    </BrowserRouter>
  </CookieConsentProvider>
);
