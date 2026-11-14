import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLenis } from "lenis/react";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const lenis = useLenis();

  // Reset scroll and recalibrate Lenis on every route change
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
      lenis.resize();

      // Ensure dimensions are re-measured as lazy routes & images load
      const t1 = setTimeout(() => lenis.resize(), 100);
      const t2 = setTimeout(() => lenis.resize(), 400);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, lenis]);

  // Continuously synchronize Lenis with dynamic content expansion on each page
  useEffect(() => {
    if (!lenis || typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(() => {
      lenis.resize();
    });

    if (document.body) {
      observer.observe(document.body);
    }

    return () => observer.disconnect();
  }, [lenis]);

  return null;
};

export default ScrollToTop;
