import Header from "../components/Header";
import Footer from "../components/Footer";
import EventHero from "../components/EventDetail/EventHero";
import EventInfoBar from "../components/EventDetail/EventInfoBar";
import AboutEvent from "../components/EventDetail/AboutEvent";
import OrganizerCard from "../components/EventDetail/OrganizerCard";
import GettingThere from "../components/EventDetail/GettingThere";
import BookingCard from "../components/EventDetail/BookingCard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import LoadingSpinner from "@/components/LoadingSpinner";
import NotFound from "./NotFound";
import RecommendedEvents from "@/components/DiscoverEvent/RecommendedEvents";
import { API_BASE } from "@/utils/api";

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setCurrentEvent } = useBooking();

  useEffect(() => {
    async function fetchEvent() {
      try {
        setLoading(true);

        const res = await fetch(`${API_BASE}/api/events/${id}`);
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
    void fetchEvent();
  }, [id, setCurrentEvent]);

  if (loading) {
    return <LoadingSpinner message="Loading event details..." />;
  }
  if (!event) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F7F9]">
      <Header />
      <EventHero event={event} />
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_380px] gap-8 items-start">
        <div className="flex flex-col gap-8 sm:gap-10 min-w-0">
          <EventInfoBar event={event} />
          <AboutEvent event={event} />
          <OrganizerCard organizer={event.organizer} />
          <GettingThere event={event} />
        </div>
        <div className="w-full">
          <BookingCard event={event} />
        </div>
      </div>
      <RecommendedEvents />
      <Footer />
    </div>
  );
};

export default EventDetail;
