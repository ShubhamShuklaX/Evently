import Header from "../components/Header";
import Footer from "../components/Footer";
import EventHero from "../components/EventDetail/EventHero";
import EventInfoBar from "../components/EventDetail/EventInfoBar";
import AboutEvent from "../components/EventDetail/AboutEvent";
import OrganizerCard from "../components/EventDetail/OrganizerCard";
import GettingThere from "../components/EventDetail/GettingThere";
import BookingCard from "../components/EventDetail/BookingCard";
import RelatedEvents from "../components/EventDetail/RelatedEvents";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBooking } from "../context/BookingContext";

const EventDetail = () => {
  const { id } = useParams();
  const { getEventById, setCurrentEvent } = useBooking();

  useEffect(() => {
    const event = getEventById(id);
    if (event) setCurrentEvent(event);
  }, [id, getEventById, setCurrentEvent]);

  return (
    <>
      <Header />
      <EventHero />
      <div className="grid grid-cols-[1fr_360px] gap-8 px-30 py-12 items-start">
        <div className="flex flex-col gap-10">
          <EventInfoBar />
          <AboutEvent />
          <OrganizerCard />
          <GettingThere />
        </div>
        <BookingCard />
      </div>
      <RelatedEvents />
      <Footer />
    </>
  );
};

export default EventDetail;
