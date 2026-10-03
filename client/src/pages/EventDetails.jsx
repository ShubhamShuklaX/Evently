import Header from "../components/Header";
import Footer from "../components/Footer";
import EventHero from "../components/EventDetail/EventHero";
import EventInfoBar from "../components/EventDetail/EventInfoBar";
import AboutEvent from "../components/EventDetail/AboutEvent";
import OrganizerCard from "../components/EventDetail/OrganizerCard";
import GettingThere from "../components/EventDetail/GettingThere";
import BookingCard from "../components/EventDetail/BookingCard";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import { useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import NotFound from "./NotFound";
import RecommendedEvents from "@/components/DiscoverEvent/RecommendedEvents";

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setCurrentEvent } = useBooking();

  useEffect(() => {
    async function fetchEvent() {
      try {
        setLoading(true);

        const res = await fetch(`http://localhost:5000/api/events/${id}`);
        const data = await res.json();

        if (data.event) {
          setEvent(data.event);
          setCurrentEvent(data.event);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchEvent();
  }, [id, setCurrentEvent]);

  if (loading) {
    return <LoadingSpinner message="Loading event details..." />;
  }
  if (!event) {
    return <NotFound />;
  }

  return (
    <>
      <Header />
      <EventHero event={event} />
      <div className="grid grid-cols-[1fr_360px] gap-8 px-30 py-12 items-start">
        <div className="flex flex-col gap-10">
          <EventInfoBar event={event} />
          <AboutEvent event={event} />
          <OrganizerCard />
          <GettingThere event={event} />
        </div>
        <BookingCard event={event} />
      </div>
      <RecommendedEvents />
      <Footer />
    </>
  );
};

export default EventDetail;
