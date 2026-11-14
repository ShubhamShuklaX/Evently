import { Search } from "lucide-react";
import { useRef, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useMotionValue } from "framer-motion";
import { useLenis } from "lenis/react";
import { useSearch } from "../../context/SearchContext";

const SearchBar = () => {
  const { query, setQuery, setIsHeroSearchPast } = useSearch();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const isPastRef = useRef(false);

  const scale = useMotionValue(1);
  const opacity = useMotionValue(1);
  const y = useMotionValue(0);

  const handleSearch = () => {
    if (query.trim()) {
      void navigate(`/events?search=${encodeURIComponent(query.trim())}`);
    } else {
      void navigate("/events");
    }
  };

  const updateScrollTransform = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const headerHeight = 72;
    const startMorphAt = 380;
    const endMorphAt = headerHeight;

    if (rect.top > startMorphAt) {
      scale.set(1);
      opacity.set(1);
      y.set(0);
      if (isPastRef.current) {
        isPastRef.current = false;
        setIsHeroSearchPast(false);
      }
      return;
    }

    // Normalized progress (0 at startMorphAt, 1 at endMorphAt)
    const rawProgress = (startMorphAt - rect.top) / (startMorphAt - endMorphAt);
    const progress = Math.min(1, Math.max(0, rawProgress));

    // Smooth cubic easing for high-end feel
    const easeProgress =
      progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    // Scale from 1.0 down to 0.82 to match header search bar size
    const currentScale = 1 - easeProgress * 0.18;
    scale.set(currentScale);

    // Subtle upward lift towards the header
    y.set(-easeProgress * 16);

    // Fade out right as it docks into the header (last 28% of travel)
    if (progress < 0.72) {
      opacity.set(1);
    } else {
      const fadeProgress = (progress - 0.72) / 0.28;
      opacity.set(Math.max(0, 1 - fadeProgress));
    }

    // Seamless handoff to sticky header search bar
    const isPast = rect.top <= headerHeight + 6;
    if (isPast !== isPastRef.current) {
      isPastRef.current = isPast;
      setIsHeroSearchPast(isPast);
    }
  }, [scale, opacity, y, setIsHeroSearchPast]);

  // Hook into Lenis smooth-scroll (avoids duplicate native scroll events)
  useLenis(updateScrollTransform);

  useEffect(() => {
    updateScrollTransform();
    window.addEventListener("resize", updateScrollTransform);
    return () => {
      window.removeEventListener("resize", updateScrollTransform);
    };
  }, [updateScrollTransform]);

  return (
    <motion.div
      ref={containerRef}
      style={{
        scale,
        opacity,
        y,
        transformOrigin: "center top",
      }}
      className="w-full flex justify-center"
    >
      <div className="flex flex-row items-center gap-2 sm:gap-3 border border-neutral-200/90 bg-white rounded-2xl sm:rounded-3xl p-1.5 sm:p-2.5 md:p-3 w-full shadow-lg shadow-neutral-900/5 transition-shadow">
        <div className="flex items-center flex-1 min-w-0 gap-2 sm:gap-2.5 px-3 sm:px-4 bg-neutral-50/70 border border-neutral-200 rounded-xl sm:rounded-2xl h-12 sm:h-13 md:h-14 focus-within:bg-white focus-within:border-[#6365f1] focus-within:ring-2 focus-within:ring-[#6365f1]/15 transition-all">
          <Search size={18} className="text-neutral-400 shrink-0 hidden xs:block" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="search"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search events, artists, or venues..."
            className="w-full h-full text-xs xs:text-sm sm:text-base text-neutral-800 placeholder:text-neutral-400 bg-transparent outline-none truncate"
          />
        </div>

        <div className="hidden sm:block w-px h-6 bg-neutral-200 mr-0.5" />

        <button
          type="button"
          onClick={handleSearch}
          aria-label="Search events"
          className="bg-[#6365f1] hover:bg-[#4f51e9] text-white font-semibold w-12 h-12 sm:w-auto sm:h-13 md:h-14 px-0 sm:px-6 md:px-8 rounded-xl sm:rounded-2xl transition-all shadow-sm hover:shadow-md active:scale-95 shrink-0 cursor-pointer flex items-center justify-center gap-2"
        >
          <Search size={18} className="sm:hidden" />
          <span className="hidden sm:inline text-sm sm:text-base">Search Now</span>
        </button>
      </div>
    </motion.div>
  );
};

export default SearchBar;