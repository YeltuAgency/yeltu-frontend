import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { getLangFromPath } from "../utils/getLangFromPath";

export default function ScrollToTop() {
  const location = useLocation();
  const prevPathRef = useRef(null);

  useEffect(() => {
    const stripLang = (path) =>
      path.replace(/^\/(az|ru)(?=\/|$)/, "");

    const currentPath = stripLang(location.pathname);
    const prevPath = prevPathRef.current;

    // Scroll ONLY if real page changed
    if (prevPath && prevPath !== currentPath) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    prevPathRef.current = currentPath;
  }, [location.pathname]);

  return null;
}
