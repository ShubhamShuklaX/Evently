import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Organizer/Sidebar";
import MetricsCards from "../components/Organizer/MetricsCards";
import FinancialPerformance from "../components/Organizer/FinancialPerformance";
import EventsTable from "../components/Organizer/MyEvents/EventsTable";
import { Download, Plus, Loader2 } from "lucide-react";
import { API_BASE } from "../utils/api";
import { useToast } from "../context/ToastContext";

const OrganizerDashboard = () => {
  const [activeTab, setActiveTab] = useState("financial");
  const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const user = JSON.parse(localStorage.getItem("evently_user") || "null");
  const organizerName = user?.name || "Organizer";

  useEffect(() => {
    let isMounted = true;
    async function loadOrganizerEvents() {
      const token = localStorage.getItem("evently_token");
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/events/my-events`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (isMounted) {
          setMyEvents(Array.isArray(data.events) ? data.events : []);
        }
      } catch (err) {
        console.error("Error fetching organizer dashboard events:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    void loadOrganizerEvents();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleDeleteEvent = async (eventId) => {
    try {
      const token = localStorage.getItem("evently_token");
      const res = await fetch(`${API_BASE}/api/events/${eventId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error("Deletion Failed", data.error || "Failed to delete event.");
        return;
      }
      setMyEvents((prev) => prev.filter((e) => e.id !== eventId));
      toast.success("Event Deleted", "The event has been successfully deleted.");
    } catch (err) {
      console.error("Error deleting event:", err);
      toast.error("Network Error", "Network error while deleting event. Please try again.");
    }
  };

  const exportData = () => {
    if (myEvents.length === 0) {
      toast.warning("Export Notice", "No events available to export.");
      return;
    }
    const headers = [
      "Title",
      "Category",
      "Location",
      "Date",
      "Price",
      "Capacity",
      "Status",
    ];
    const rows = myEvents.map((e) => [
      `"${(e.title || "").replaceAll(/"/g, '""')}"`,
      `"${e.category || ""}"`,
      `"${(e.location || "").replaceAll(/"/g, '""')}"`,
      `"${e.date || ""}"`,
      e.price || 0,
      e.capacity || 100,
      `"${e.status || "Live"}"`,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute(
      "download",
      `organizer_dashboard_events_${new Date().toISOString().slice(0, 10)}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Export Complete", "Events exported to CSV successfully.");
  };

  return (
    <div className="min-h-screen bg-[#F6F7F9] font-sans flex flex-col">
      <Header />

      <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col lg:flex-row gap-6 lg:gap-8">
        <Sidebar />

        <main className="flex-1 min-w-0">
          {/* Top Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1D1F23]">
                Organizer Hub
              </h1>
              <p className="text-sm sm:text-base text-neutral-500 mt-1">
                Welcome back, {organizerName}. Here's how your events are
                performing.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={exportData}
                className="flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-neutral-200 bg-white text-xs sm:text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors shadow-2xs cursor-pointer active:scale-95"
              >
                <Download size={16} />
                Export Data
              </button>
              <Link
                to="/organizer/create"
                className="flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[#6365f1] text-white text-xs sm:text-sm font-semibold hover:bg-[#4f51e9] transition-colors shadow-sm shadow-[#6365f1]/25 active:scale-95"
              >
                <Plus size={16} />
                Create New Event
              </Link>
            </div>
          </div>

          {loading ? (
            <div className="bg-white border border-neutral-200 rounded-2xl p-10 sm:p-16 flex flex-col items-center justify-center gap-3 mb-10">
              <Loader2 className="w-8 h-8 text-[#6365f1] animate-spin" />
              <p className="text-sm font-medium text-neutral-500">
                Fetching performance metrics...
              </p>
            </div>
          ) : (
            <MetricsCards myEvents={myEvents} />
          )}

          {/* Interactive Tabs */}
          <div className="flex items-center gap-4 sm:gap-8 border-b border-neutral-200 mb-6 overflow-x-auto no-scrollbar">
            <button
              type="button"
              onClick={() => setActiveTab("financial")}
              className={`pb-3 text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "financial"
                  ? "text-[#1D1F23] border-b-2 border-[#6365f1]"
                  : "text-neutral-500 hover:text-[#1D1F23]"
              }`}
            >
              Financial Performance
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("manage")}
              className={`pb-3 text-sm font-bold transition-all cursor-pointer ${
                activeTab === "manage"
                  ? "text-[#1D1F23] border-b-2 border-[#6365f1]"
                  : "text-neutral-500 hover:text-[#1D1F23]"
              }`}
            >
              Manage Events ({myEvents.length})
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "financial" ? (
            <FinancialPerformance myEvents={myEvents} />
          ) : (
            <div className="mb-8">
              <EventsTable
                myEvents={myEvents}
                onDeleteEvent={handleDeleteEvent}
              />
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default OrganizerDashboard;
