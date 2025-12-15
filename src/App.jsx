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
