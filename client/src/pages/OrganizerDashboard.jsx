import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Organizer/Sidebar";
import MetricsCards from "../components/Organizer/MetricsCards";
import FinancialPerformance from "../components/Organizer/FinancialPerformance";
import EventsTable from "../components/Organizer/MyEvents/EventsTable";
import { Download, Plus, CheckCircle2, AlertCircle, Bell, Loader2 } from "lucide-react";
import { API_BASE } from "../utils/api";

const OrganizerDashboard = () => {
  const [activeTab, setActiveTab] = useState("financial");
  const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleDeleteEvent = (eventId) => {
    setMyEvents((prev) => prev.filter((e) => e.id !== eventId));
  };

  const exportData = () => {
    if (myEvents.length === 0) {
      alert("No events to export.");
      return;
    }
    const headers = ["Title", "Category", "Location", "Date", "Price", "Capacity", "Status"];
    const rows = myEvents.map((e) => [
      `"${(e.title || "").replace(/"/g, '""')}"`,
      `"${e.category || ""}"`,
      `"${(e.location || "").replace(/"/g, '""')}"`,
      `"${e.date || ""}"`,
      e.price || 0,
      e.capacity || 100,
      `"${e.status || "Live"}"`,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `organizer_dashboard_events_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Metrics for bottom notification cards
  const totalRevenue = myEvents.reduce((acc, e) => {
    const sold = typeof e.soldCount === "number" ? e.soldCount : Math.round((e.capacity || 100) * 0.35);
    return acc + (Number(e.price) || 0) * sold;
  }, 0);

  const liveEventsCount = myEvents.filter((e) => e.status === "Live").length;
  const draftEventsCount = myEvents.filter((e) => e.status === "Draft").length;

  return (
    <div className="min-h-screen bg-[#F6F7F9] font-sans flex flex-col">
      <Header />

      <div className="flex-1 w-full px-6 lg:px-15 py-8 flex gap-8">
        <Sidebar />

        <main className="flex-1 min-w-0">
          {/* Top Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-[#1D1F23]">
                Organizer Hub
              </h1>
              <p className="text-neutral-500 mt-1">
                Welcome back, {organizerName}. Here's how your events are performing.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={exportData}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors shadow-2xs cursor-pointer active:scale-95"
              >
                <Download size={16} />
                Export Data
              </button>
              <Link
                to="/organizer/create"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#6365f1] text-white text-sm font-semibold hover:bg-[#4f51e9] transition-colors shadow-sm shadow-[#6365f1]/25 active:scale-95"
              >
                <Plus size={16} />
                Create New Event
              </Link>
            </div>
          </div>

          {loading ? (
            <div className="bg-white border border-neutral-200 rounded-2xl p-16 flex flex-col items-center justify-center gap-3 mb-10">
              <Loader2 className="w-8 h-8 text-[#6365f1] animate-spin" />
              <p className="text-sm font-medium text-neutral-500">
                Fetching performance metrics...
              </p>
            </div>
          ) : (
            <MetricsCards myEvents={myEvents} />
          )}

          {/* Interactive Tabs */}
          <div className="flex items-center gap-8 border-b border-neutral-200 mb-6">
            <button
              type="button"
              onClick={() => setActiveTab("financial")}
              className={`pb-3 text-sm font-bold transition-all cursor-pointer ${
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

          {/* Bottom Dynamic Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-10">
            <div className="bg-[#F8FFF9] border border-[#E1F0E5] rounded-2xl p-5 flex items-start gap-4 shadow-2xs">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <h4 className="font-bold text-[#1D1F23] text-sm mb-0.5">
                  Verified Payouts
                </h4>
                <p className="text-sm text-neutral-500">
                  ₹{Math.round(totalRevenue * 0.95).toLocaleString("en-IN")} available for transfer.
                </p>
              </div>
            </div>

            <div className="bg-[#FFFDF5] border border-[#F4EDD3] rounded-2xl p-5 flex items-start gap-4 shadow-2xs">
              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                <AlertCircle size={20} />
              </div>
              <div>
                <h4 className="font-bold text-[#1D1F23] text-sm mb-0.5">
                  Listing Readiness
                </h4>
                <p className="text-sm text-neutral-500">
                  {draftEventsCount > 0
                    ? `${draftEventsCount} draft event${draftEventsCount > 1 ? "s" : ""} pending final review.`
                    : `${liveEventsCount} live event${liveEventsCount !== 1 ? "s" : ""} active and ready.`}
                </p>
              </div>
            </div>

            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-5 flex items-start gap-4 shadow-2xs">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <Bell size={20} />
              </div>
              <div>
                <h4 className="font-bold text-[#1D1F23] text-sm mb-0.5">
                  Live Notifications
                </h4>
                <p className="text-sm text-neutral-500">
                  Real-time seat mapping active across all venues.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default OrganizerDashboard;
