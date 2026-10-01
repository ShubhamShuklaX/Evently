import { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import MyEventsHeader from "../../components/Organizer/MyEvents/MyEventsHeader";
import MyEventsStats from "../../components/Organizer/MyEvents/MyEventsStats";
import MyEventsFilters from "../../components/Organizer/MyEvents/MyEventsFilters";
import EventsTable from "../../components/Organizer/MyEvents/EventsTable";
import Sidebar from "./Sidebar";

const EventsManagement = () => {
  const [myEvents, setMyEvents] = useState([]);

  useEffect(() => {
    async function getMyEvents() {
      const token = localStorage.getItem("evently_token");
      try {
        const response = await fetch(
          "http://localhost:5000/api/events/my-events",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        const data = await response.json();
        setMyEvents(data.events);
      } catch (error) {
        console.error(error);
      }
    }
    getMyEvents();
  }, []);
  return (
    <div className="min-h-screen bg-[#F6F7F9] font-sans flex flex-col">
      <Header />

      <div className="flex-1 w-full px-15 py-8 flex gap-8">
        <Sidebar />

        <main className="flex-1 min-w-0 flex flex-col gap-8">
          <MyEventsHeader />
          <MyEventsStats />
          <MyEventsFilters />
          <EventsTable myEvents={myEvents} />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default EventsManagement;
