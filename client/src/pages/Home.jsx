import Header from "../components/Header";
import HeroSection from "../components/Landing/HeroSection";
import CategoryBar from "../components/Landing/CategoryBar";
import FeaturedEvents from "../components/Landing/FeaturedEvents";
import Footer from "../components/Footer";
import MarkYourCalendars from "../components/Landing/MarkYourCalendars";
import WhatsTrending from "../components/Landing/WhatsTrending";
import AppPromo from "../components/Landing/AppPromo";
import Reveal from "../components/Reveal";
import { useMemo } from "react";
import { useBooking } from "../context/BookingContext";

const Home = () => {
  const { events } = useBooking();

  const { upcomingEvents, trendingEvents } = useMemo(() => {
    if (!events || events.length === 0) {
      return { upcomingEvents: [], trendingEvents: [] };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Filter for future events
    const future = events.filter((e) => {
      const d = new Date(e.date);
      return !Number.isNaN(d.getTime()) ? d >= today : false;
    });

    // Upcoming: Next 2 events happening chronologically closest to today
    const sortedUpcoming = [...future].sort(
      (a, b) => new Date(a.date) - new Date(b.date),
    );
    const upcoming = sortedUpcoming.slice(0, 2);
    const upcomingIds = new Set(upcoming.map((e) => e.id));

    // Trending: Top 2 premium experiences (excluding upcoming to avoid duplicates)
    const remaining = events.filter((e) => !upcomingIds.has(e.id));
    const pool = remaining.length >= 2 ? remaining : events;
    const sortedTrending = [...pool].sort(
      (a, b) => (b.price || 0) - (a.price || 0),
    );
    const trending = sortedTrending.slice(0, 2);

    return { upcomingEvents: upcoming, trendingEvents: trending };
  }, [events]);

  return (
    <div>
      <Header />
      <Reveal>
        <HeroSection />
      </Reveal>
      <Reveal>
        <CategoryBar />
      </Reveal>
      <Reveal>
        <FeaturedEvents />
      </Reveal>
      <Reveal>
        <MarkYourCalendars events={upcomingEvents} />
      </Reveal>
      <Reveal>
        <WhatsTrending events={trendingEvents} />
      </Reveal>
      <Reveal>
        <AppPromo />
      </Reveal>
      <Footer />
    </div>
  );
};

export default Home;
