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

// A cryptographically secure random float between 0 and 1
const secureRandom = () => {
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  return array[0] / (0xffffffff + 1);
};

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

    // Pick 2 random for upcoming
    const shuffledFuture = [...future].sort(() => 0.5 - secureRandom());
    const upcoming = shuffledFuture.slice(0, 2);
    const upcomingIds = new Set(upcoming.map((e) => e.id));

    // Pick 2 random for trending (excluding upcoming to avoid duplicates)
    const remaining = events.filter((e) => !upcomingIds.has(e.id));
    const pool = remaining.length >= 2 ? remaining : events;
    const shuffledTrending = [...pool].sort(() => 0.5 - secureRandom());
    const trending = shuffledTrending.slice(0, 2);

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
