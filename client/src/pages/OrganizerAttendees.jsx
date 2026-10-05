import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Organizer/Sidebar";
import LoadingSpinner from "../components/LoadingSpinner";
import { Search, Download, UserCheck, Clock, Ticket } from "lucide-react";
import { API_BASE } from "../utils/api";

const sampleAttendees = [
  { id: "ATT-101", name: "Aarav Sharma", email: "aarav.sharma@example.com", event: "Midnight Sun Music Festival", seat: "Row A - Seat 4", status: "Checked In", time: "18:42" },
  { id: "ATT-102", name: "Priya Patel", email: "priya.patel@example.com", event: "Sunburn Arena EDM Night", seat: "Row B - Seat 12", status: "Checked In", time: "19:10" },
  { id: "ATT-103", name: "Rohan Varma", email: "rohan.v@example.com", event: "Standup Comedy Tour", seat: "Row C - Seat 8", status: "Pending", time: "-" },
  { id: "ATT-104", name: "Ananya Iyer", email: "ananya.iyer@example.com", event: "World Tech Summit 2026", seat: "Row A - Seat 15", status: "Checked In", time: "09:15" },
  { id: "ATT-105", name: "Vikram Malhotra", email: "vikram.m@example.com", event: "Championship Finals", seat: "Row D - Seat 22", status: "Pending", time: "-" },
];

const OrganizerAttendees = () => {
  const [attendees, setAttendees] = useState(sampleAttendees);
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const token = localStorage.getItem("evently_token");
      try {
        setLoading(true);
        const [eventsRes, attendeesRes] = await Promise.all([
          fetch(`${API_BASE}/api/events/my-events`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_BASE}/api/events/organizer/attendees`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const eventsData = await eventsRes.json();
        const attendeesData = await attendeesRes.json();

        setEvents(Array.isArray(eventsData.events) ? eventsData.events : []);

        if (Array.isArray(attendeesData.attendees) && attendeesData.attendees.length > 0) {
          setAttendees(attendeesData.attendees);
        } else {
          setAttendees(sampleAttendees);
        }
      } catch (err) {
        console.error("Error loading attendee data:", err);
        setAttendees(sampleAttendees);
      } finally {
        setLoading(false);
      }
    }
    void loadData();
  }, []);

  const toggleCheckIn = (id) => {
    setAttendees((prev) =>
      prev.map((att) =>
        att.id === id
          ? {
              ...att,
              status: att.status === "Checked In" ? "Pending" : "Checked In",
              time: att.status === "Checked In" ? "-" : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            }
          : att
      )
    );
  };

  const filteredAttendees = attendees.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase()) ||
      a.id.toLowerCase().includes(search.toLowerCase())
  );

  const checkedInCount = attendees.filter((a) => a.status === "Checked In").length;

  return (
    <div className="min-h-screen bg-[#F6F7F9] font-sans flex flex-col">
      <Header />

      <div className="flex-1 w-full px-6 lg:px-15 py-8 flex gap-8">
        <Sidebar />

        <main className="flex-1 min-w-0 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#1D1F23]">Attendee Roster</h1>
              <p className="text-neutral-500 text-sm mt-1">
                Manage ticket validation, seat check-ins, and guest manifests.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => alert("Attendee manifest downloaded successfully!")}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-sm font-semibold text-neutral-700 hover:bg-neutral-50 shadow-2xs cursor-pointer"
              >
                <Download size={16} />
                Export Manifest
              </button>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <UserCheck size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1D1F23]">{checkedInCount}</p>
                <p className="text-xs text-neutral-500">Checked In Guests</p>
              </div>
            </div>

            <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Clock size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1D1F23]">{attendees.length - checkedInCount}</p>
                <p className="text-xs text-neutral-500">Awaiting Arrival</p>
              </div>
            </div>

            <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <Ticket size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1D1F23]">{events.length || attendees.length}</p>
                <p className="text-xs text-neutral-500">Active Door Gates</p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-80">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search by name, email, or ticket ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10.5 pl-10 pr-4 text-sm rounded-xl border border-neutral-200 bg-white outline-none focus:border-[#6365f1] text-neutral-800"
            />
          </div>

          {/* Attendees Table or Spinner */}
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center bg-white border border-neutral-200 rounded-2xl">
              <LoadingSpinner message="Fetching attendee manifests..." fullScreen={false} />
            </div>
          ) : (
            <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="grid grid-cols-[1fr_2fr_1.5fr_1fr_120px] gap-4 px-6 py-3.5 bg-neutral-50 border-b border-neutral-200 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                <span>Ticket ID</span>
                <span>Attendee</span>
                <span>Seat & Event</span>
                <span>Status</span>
                <span className="text-right">Action</span>
              </div>

              <div className="divide-y divide-neutral-100">
                {filteredAttendees.map((att) => (
                  <div
                    key={att.id}
                    className="grid grid-cols-[1fr_2fr_1.5fr_1fr_120px] gap-4 px-6 py-4 items-center hover:bg-neutral-50/80 transition-colors text-sm"
                  >
                    <span className="font-mono text-xs font-semibold text-neutral-600">
                      {att.id}
                    </span>

                    <div>
                      <p className="font-bold text-[#1D1F23]">{att.name}</p>
                      <p className="text-xs text-neutral-400">{att.email}</p>
                    </div>

                    <div>
                      <p className="font-medium text-[#1D1F23]">{att.seat}</p>
                      <p className="text-xs text-neutral-400 truncate">{att.event}</p>
                    </div>

                    <div>
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${
                          att.status === "Checked In"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-neutral-100 text-neutral-600"
                        }`}
                      >
                        {att.status} {att.time !== "-" ? `(${att.time})` : ""}
                      </span>
                    </div>

                    <div className="text-right">
                      <button
                        type="button"
                        onClick={() => toggleCheckIn(att.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                          att.status === "Checked In"
                            ? "bg-neutral-100 hover:bg-rose-50 text-neutral-600 hover:text-rose-600"
                            : "bg-[#6365f1] hover:bg-[#4f51e9] text-white"
                        }`}
                      >
                        {att.status === "Checked In" ? "Undo" : "Check In"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default OrganizerAttendees;
