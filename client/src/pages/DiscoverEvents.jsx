import Header from "../components/Header";
import Footer from "../components/Footer";
import SideBar from "../components/DiscoverEvent/FilterBar";
import CategoryBar from "./../components/Landing/CategoryBar";
import RecommendedEvents from "../components/DiscoverEvent/RecommendedEvents";
import EventList from "../components/DiscoverEvent/EventList";
import { useState } from "react";

const DiscoverEvents = () => {
  // Step 1: Lift state up to the parent!
  const [activeCategory, setActiveCategory] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

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
        />
      </div>
      <RecommendedEvents />
      <CategoryBar />
      <Footer />
    </div>
  );
};

export default DiscoverEvents;
