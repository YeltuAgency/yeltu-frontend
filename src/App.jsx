import { Routes, Route } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react"; // ✅ added useEffect

// CONTEXTS
import { AuthProvider } from "./contexts/AuthContext";

// LAYOUTS
import ClientLayout from "./layouts/ClientLayout";
import AdminLayout from "./layouts/AdminLayout";

import LoadingOverlay from "./components/LoadingOverlay";

// ---- LAZY LOADED CLIENT PAGES ---- //
const Homepage = lazy(() => import("./components/Homepage"));
const AboutPage = lazy(() => import("./components/AboutPage"));
const ServicesPage = lazy(() => import("./components/ServicesPage"));
const PortfolioPage = lazy(() => import("./components/PortfolioPage"));
const ContactPage = lazy(() => import("./components/ContactPage"));
const Blog = lazy(() => import("./components/Blog"));
const BlogPost = lazy(() => import("./components/BlogPost"));
const NotFound = lazy(() => import("./components/NotFound"));
const WebDevelopmentPage = lazy(() => import("./pages/services/WebDevelopmentPage"));
const CustomWebAppsPage = lazy(() => import("./pages/services/CustomWebAppsPage"));
const EcommercePage = lazy(() => import("./pages/services/EcommercePage"));
const BusinessWebsitesPage = lazy(() => import("./pages/services/BusinessWebsitesPage"));
const BrandStrategyPage = lazy(() => import("./pages/services/BrandStrategyPage"));
const MobileAppDevelopmentPage = lazy(() => import("./pages/services/MobileAppDevelopmentPage"));
const IosAndroidAppDevelopmentPage = lazy(() => import("./pages/services/IosAndroidAppDevelopmentPage"));
const CrossPlatformAppDevelopmentPage = lazy(() => import("./pages/services/CrossPlatformAppDevelopmentPage"));
const AppStoreOptimizationPage = lazy(() => import("./pages/services/AppStoreOptimizationPage"));
const DigitalMarketingPage = lazy(() => import("./pages/services/DigitalMarketingPage"));
const SeoPage = lazy(() => import("./pages/services/SeoPage"));
const SemPage = lazy(() => import("./pages/services/SemPage"));
const SmmPage = lazy(() => import("./pages/services/SmmPage"));
const DesignPage = lazy(() => import("./pages/services/DesignPage"));

// ---- LAZY LOADED ADMIN PAGES ---- //
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashBoard"));
const AdminBlogsList = lazy(() => import("./pages/AdminBlogsList"));
const AdminBlogForm = lazy(() => import("./pages/AdminBlogForm"));
const AdminPortfolioList = lazy(() => import("./pages/AdminPortfolioList"));
const AdminPortfolioForm = lazy(() => import("./pages/AdminPortfolioForm"));

import { ProtectedRoute } from "./components/ProtectedRoute";

// LEGAL
import PrivacyPolicy from "./components/legal/PrivacyPolicy";
import TermsConditions from "./components/legal/TermsConditions";
import CookiePolicy from "./components/legal/CookiePolicy";
import CookiePreferences from "./components/legal/CookiePreferences";

export default function App() {

  // ✅ iOS Safari orientation-change reflow fix (DO NOT REMOVE)
  useEffect(() => {
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
      !window.MSStream;

    if (!isIOS) return;

    const forceReflow = () => {
      document.body.style.display = "none";
      // force layout recalculation
      void document.body.offsetHeight;
      document.body.style.display = "";
    };

    window.addEventListener("orientationchange", forceReflow);

    return () => {
      window.removeEventListener("orientationchange", forceReflow);
    };
  }, []);

  return (
    <AuthProvider>
      <Suspense fallback={<LoadingOverlay />}>
        <Routes>

          {/* ==================== CLIENT (DEFAULT = EN) ==================== */}
          <Route element={<ClientLayout />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/web-development" element={<WebDevelopmentPage />} />
            <Route path="/services/web-development/custom-web-apps" element={<CustomWebAppsPage />} />
            <Route path="/services/web-development/ecommerce" element={<EcommercePage />} />
            <Route path="/services/web-development/business-websites" element={<BusinessWebsitesPage />} />
            <Route path="/services/mobile-app-development" element={<MobileAppDevelopmentPage />} />
            <Route path="/services/mobile-app-development/ios-android-app-development" element={<IosAndroidAppDevelopmentPage />} />
            <Route path="/services/mobile-app-development/cross-platform-app-development" element={<CrossPlatformAppDevelopmentPage />} />
            <Route path="/services/mobile-app-development/app-store-optimization" element={<AppStoreOptimizationPage />} />
            <Route path="/services/brand-strategy" element={<BrandStrategyPage />} />
            <Route path="/services/digital-marketing" element={<DigitalMarketingPage />} />
            <Route path="/services/digital-marketing/seo" element={<SeoPage />} />
            <Route path="/services/digital-marketing/sem" element={<SemPage />} />
            <Route path="/services/digital-marketing/smm" element={<SmmPage />} />
            <Route path="/services/digital-marketing/design" element={<DesignPage />} />
            <Route path="/projects" element={<PortfolioPage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/post/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<ContactPage />} />

            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsConditions />} />
            <Route path="/cookies" element={<CookiePolicy />} />
            <Route path="/cookie-preferences" element={<CookiePreferences />} />
          </Route>

          {/* ==================== CLIENT (LANG PREFIXED) ==================== */}
          <Route path="/:lang" element={<ClientLayout />}>
            <Route index element={<Homepage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="services/web-development" element={<WebDevelopmentPage />} />
            <Route path="services/web-development/custom-web-apps" element={<CustomWebAppsPage />} />
            <Route path="services/web-development/ecommerce" element={<EcommercePage />} />
            <Route path="services/web-development/business-websites" element={<BusinessWebsitesPage />} />
            <Route path="services/brand-strategy" element={<BrandStrategyPage />} />
            <Route path="services/mobile-app-development" element={<MobileAppDevelopmentPage />} />
            <Route path="services/mobile-app-development/ios-android-app-development" element={<IosAndroidAppDevelopmentPage />} />
            <Route path="services/mobile-app-development/cross-platform-app-development" element={<CrossPlatformAppDevelopmentPage />} />
            <Route path="services/mobile-app-development/app-store-optimization" element={<AppStoreOptimizationPage />} />
            <Route path="services/digital-marketing" element={<DigitalMarketingPage />} />
            <Route path="services/digital-marketing/seo" element={<SeoPage />} />
            <Route path="services/digital-marketing/sem" element={<SemPage />} />
            <Route path="services/digital-marketing/smm" element={<SmmPage />} />
            <Route path="services/digital-marketing/design" element={<DesignPage />} />
            <Route path="projects" element={<PortfolioPage />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/post/:slug" element={<BlogPost />} />
            <Route path="contact" element={<ContactPage />} />

            <Route path="privacy" element={<PrivacyPolicy />} />
            <Route path="terms" element={<TermsConditions />} />
            <Route path="cookies" element={<CookiePolicy />} />
            <Route path="cookie-preferences" element={<CookiePreferences />} />
          </Route>

          {/* ==================== ADMIN ==================== */}
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="blogs" element={<AdminBlogsList />} />
            <Route path="blogs/new" element={<AdminBlogForm />} />
            <Route path="blogs/:id/edit" element={<AdminBlogForm />} />
            <Route path="portfolio" element={<AdminPortfolioList />} />
            <Route path="portfolio/new" element={<AdminPortfolioForm />} />
            <Route path="portfolio/:id/edit" element={<AdminPortfolioForm />} />
          </Route>

          {/* ==================== 404 ==================== */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </Suspense>
    </AuthProvider>
  );
}
