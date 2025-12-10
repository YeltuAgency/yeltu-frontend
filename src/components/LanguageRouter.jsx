import { useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

const supported = ["en", "az", "ru"];

export default function LanguageRouter() {
  const { lang } = useParams();
  const { pathname } = useLocation();
  const { setLanguage } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    // Language must be valid
    if (!supported.includes(lang)) {
      navigate("/404", { replace: true });
      return;
    }

    // Extract the internal path WITHOUT the language prefix
    const newPath = pathname.replace(`/${lang}`, "") || "/";

    // Apply language and redirect to real internal route
    setLanguage(lang);
    navigate(newPath, { replace: true });

  }, [lang, pathname, navigate, setLanguage]);

  return null;
}
