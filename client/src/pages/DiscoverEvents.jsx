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

  // Sync activeCategory when category in URL changes
  const [prevUrlCategory, setPrevUrlCategory] = useState(urlCategory);
  if (urlCategory !== prevUrlCategory) {
    setPrevUrlCategory(urlCategory);
    setActiveCategory(urlCategory);
  }

  const handleReset = () => {
    setActiveCategory("");
    setLocationQuery("");
    setSearchParams({});
  };

  return (
    <div>
      <Header />

      <div className="flex">
        {/* Step 2: Pass down the state SETTERS to the Sidebar so it can change the state */}
        <SideBar
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          locationQuery={locationQuery}
          setLocationQuery={setLocationQuery}
          onReset={handleReset}
        />

        {/* Step 3: Pass down the state VALUES to the List so it can filter the data */}
        <EventList
          activeCategory={activeCategory}
          locationQuery={locationQuery}
          searchQuery={searchQuery}
        />
      </div>
      <RecommendedEvents />
      <Footer />
    </div>
  );
};

export default DiscoverEvents;
