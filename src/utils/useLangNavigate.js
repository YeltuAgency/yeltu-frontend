import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

function stripLangPrefix(pathname) {
  return pathname.replace(/^\/(az|ru)(?=\/|$)/, "") || "/";
}

export function useLangNavigate() {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguage();

  return (path, options = {}) => {
    // admin routes must stay untouched
    if (location.pathname.startsWith("/admin")) {
      navigate(path, options);
      return;
    }

    const cleanPath = path.startsWith("/")
      ? path
      : `/${path}`;

    const finalPath =
      language === "en"
        ? cleanPath
        : `/${language}${cleanPath === "/" ? "" : cleanPath}`;

    navigate(finalPath, options);
  };
}
