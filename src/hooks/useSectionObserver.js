import { useEffect, useRef, useState } from "react";

export function useSectionObserver(options = { rootMargin: "200px", threshold: 0 }) {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect(); // only animate once
      }
    }, options);

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}
