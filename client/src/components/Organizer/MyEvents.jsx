import { useEffect, useState, useMemo } from "react";
import Header from "../Header";
import Footer from "../Footer";
import MyEventsHeader from "../../components/Organizer/MyEvents/MyEventsHeader";
import MyEventsStats from "../../components/Organizer/MyEvents/MyEventsStats";
import MyEventsFilters from "../../components/Organizer/MyEvents/MyEventsFilters";
import EventsTable from "../../components/Organizer/MyEvents/EventsTable";
import Sidebar from "./Sidebar";
import { API_BASE } from "../../utils/api";
import { Loader2 } from "lucide-react";

const EventsManagement = () => {
  const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [deleteNotice, setDeleteNotice] = useState("");

  useEffect(() => {
    let isMounted = true;
    async function getMyEvents() {
      const token = localStorage.getItem("evently_token");
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE}/api/events/my-events`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (isMounted) {
          setMyEvents(Array.isArray(data.events) ? data.events : []);
        }
      } catch (error) {
        console.error("Failed to load organizer events:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    void getMyEvents();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleDeleteEvent = async (eventId) => {
    // Optimistically update frontend state
    setMyEvents((prev) => prev.filter((e) => e.id !== eventId));
    setDeleteNotice("Event deleted successfully from your listing.");
    setTimeout(() => setDeleteNotice(""), 4000);

    // Prepare DELETE request for when backend is connected
    const token = localStorage.getItem("evently_token");
    try {
      await fetch(`${API_BASE}/api/events/${eventId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {
      // Backend not implemented yet; frontend state is already cleanly updated
    }
  };

  const filteredEvents = useMemo(() => {
    return myEvents.filter((event) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        (event.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (event.location || "")
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        (event.category || "")
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        (event.status || "Live").toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [myEvents, searchQuery, statusFilter]);

  return (
    <div className="min-h-screen bg-[#F6F7F9] font-sans flex flex-col">
      <Header />

      <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col lg:flex-row gap-6 lg:gap-8">
        <Sidebar />

        <main className="flex-1 min-w-0 flex flex-col gap-6">
          <MyEventsHeader myEvents={myEvents} />

          {deleteNotice && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold flex items-center justify-between animate-in fade-in">
              <span>{deleteNotice}</span>
              <button
                type="button"
                onClick={() => setDeleteNotice("")}
                className="text-emerald-500 hover:text-emerald-800 text-xs font-bold"
              >
                Dismiss
              </button>
            </div>
          )}

          <MyEventsStats myEvents={myEvents} />

          <MyEventsFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />

          {loading ? (
            <div className="bg-white border border-neutral-200 rounded-2xl p-16 flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-8 h-8 text-[#6365f1] animate-spin" />
              <p className="text-sm font-medium text-neutral-500">
                Loading your events...
              </p>
            </div>
          ) : (
            <EventsTable
              myEvents={filteredEvents}
              onDeleteEvent={handleDeleteEvent}
              statusFilter={statusFilter}
            />
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default EventsManagement;
