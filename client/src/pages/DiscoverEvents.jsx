import Header from "../components/Header";
import Footer from "../components/Footer";
import SideBar from "../components/DiscoverEvent/FilterBar";
import RecommendedEvents from "../components/DiscoverEvent/RecommendedEvents";
import EventList from "../components/DiscoverEvent/EventList";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const DiscoverEvents = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const urlCategory = searchParams.get("category") || "";

  const [activeCategory, setActiveCategory] = useState(urlCategory);
  const [locationQuery, setLocationQuery] = useState("");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync activeCategory when category in URL changes (e.g., browser Back button)
  const [prevUrlCategory, setPrevUrlCategory] = useState(urlCategory);
  if (urlCategory !== prevUrlCategory) {
    setPrevUrlCategory(urlCategory);
    setActiveCategory(urlCategory);
  }

  const handleCategoryChange = (newCategory) => {
    setActiveCategory(newCategory);
    const nextParams = new URLSearchParams(searchParams);
    if (newCategory) {
      nextParams.set("category", newCategory);
    } else {
      nextParams.delete("category");
    }
    setSearchParams(nextParams, { replace: true });
  };

  const handleReset = () => {
    setActiveCategory("");
    setLocationQuery("");
    setSearchParams({});
  };

  const activeFilterCount =
    (activeCategory ? 1 : 0) + (locationQuery.trim() ? 1 : 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F7F9]">
      <Header />

      <div className="flex-1 w-full flex flex-col md:flex-row md:items-start">
        <SideBar
          activeCategory={activeCategory}
          setActiveCategory={handleCategoryChange}
          locationQuery={locationQuery}
          setLocationQuery={setLocationQuery}
          onReset={handleReset}
          mobileOpen={mobileFilterOpen}
          setMobileOpen={setMobileFilterOpen}
        />

        <EventList
          activeCategory={activeCategory}
          locationQuery={locationQuery}
          searchQuery={searchQuery}
          onOpenMobileFilter={() => setMobileFilterOpen(true)}
          activeFilterCount={activeFilterCount}
        />
      </div>

      <RecommendedEvents />
      <Footer />
    </div>
  );
};

export default DiscoverEvents;
