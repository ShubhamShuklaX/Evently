// {import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// const EventDetails = () => {
//   const { id } = useParams();

//   const [event, setEvent] = useState(null);

//   console.log("ID:", id);
//   console.log("EVENT:", event);

//   useEffect(() => {
//     async function getEvent() {
//       try {
//         const res = await fetch(`http://localhost:5000/api/events/${id}`);
//         const result = await res.json();
//         setEvent(result.event);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     getEvent();
//   }, [id]);

//   return (
//     // <div>
//     //   <h1> Event Details</h1>
//     //   <h1>Event Title:{event?.title}</h1>
//     //   <h1>Event Location:{event?.location}</h1>
//     //   <h1>Event Date:{event?.date}</h1>
//     //   <h1>Event Time:{event?.time}</h1>
//     //   <h1>Event Category:{event?.category}</h1>
//     //   <h1>Event Price:{event?.price}</h1>
//     // </div>

//     <div>
//       <h1 style={{ color: "black" }}>TEST EVENT DETAILS</h1>
//       <h2 style={{ color: "black" }}>{event?.title}</h2>
//     </div>
//   );
// };

// export default EventDetails;
// }

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
