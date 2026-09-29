import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import Header from "../components/Header";
import HeroSection from "../components/Landing/HeroSection";
import CategoryBar from "../components/Landing/CategoryBar";
import FeaturedEvents from "../components/Landing/FeaturedEvents";
import Footer from "../components/Footer";
import MarkYourCalendars from "../components/Landing/MarkYourCalendars";
import WhatsTrending from "../components/Landing/WhatsTrending";
import AppPromo from "../components/Landing/AppPromo";
import Reveal from "../components/Reveal";

const Home = () => {
  // const [events, setEvents] = useState([]);

  // useEffect(() => {
  //   async function getEvent() {
  //     try {
  //       const res = await fetch("http://localhost:5000/api/events");
  //       const result = await res.json();
  //       setEvents(result.events);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   getEvent();
  // }, []);
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
        <MarkYourCalendars />
      </Reveal>
      <Reveal>
        <WhatsTrending />
      </Reveal>
      <Reveal>
        <AppPromo />
      </Reveal>
      <Footer />
      {/* {events?.map((event) => {
        return <EventCard key={event.id} event={event} />;
      })} */}
    </div>
  );
};

export default Home;
