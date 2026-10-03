import Header from "../components/Header";
import Footer from "../components/Footer";
import SideBar from "../components/DiscoverEvent/FilterBar";
import CategoryBar from "./../components/Landing/CategoryBar";
import RecommendedEvents from "../components/DiscoverEvent/RecommendedEvents";
import EventList from "../components/DiscoverEvent/EventList";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const DiscoverEvents = () => {
  const [searchParams] = useSearchParams();
  const urlSearch = searchParams.get("search") || "";
  const urlCategory = searchParams.get("category") || "";

  // Step 1: Lift state up to the parent!
  const [activeCategory, setActiveCategory] = useState(urlCategory);
  const [locationQuery, setLocationQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState(urlSearch);

  useEffect(() => {
    if (urlSearch) setSearchQuery(urlSearch);
    if (urlCategory) setActiveCategory(urlCategory);
  }, [urlSearch, urlCategory]);

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
        />

        {/* Step 3: Pass down the state VALUES to the List so it can filter the data */}
        <EventList
          activeCategory={activeCategory}
          locationQuery={locationQuery}
          searchQuery={searchQuery}
        />
      </div>
      <RecommendedEvents />
      <CategoryBar />
      <Footer />
    </div>
  );
};

export default DiscoverEvents;
