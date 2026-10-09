import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Organizer/Sidebar";
import LoadingSpinner from "../components/LoadingSpinner";
import { Search, Download, UserCheck, Clock, Ticket, Users } from "lucide-react";
import { API_BASE } from "../utils/api";
import { useToast } from "../context/ToastContext";

const OrganizerAttendees = () => {
  const [attendees, setAttendees] = useState([]);
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

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

        if (Array.isArray(attendeesData.attendees)) {
          // Restore any persisted check-in status from localStorage
          let savedCheckIns = {};
          try {
            savedCheckIns = JSON.parse(
              localStorage.getItem("evently_checked_ins") || "{}"
            );
          } catch {
            savedCheckIns = {};
          }

          const resolvedAttendees = attendeesData.attendees.map((att) => {
            const saved = savedCheckIns[att.id];
            if (saved) {
              return { ...att, status: saved.status, time: saved.time };
            }
            return att;
          });

          setAttendees(resolvedAttendees);
        } else {
          setAttendees([]);
        }
      } catch (err) {
        console.error("Error loading attendee data:", err);
        setAttendees([]);
      } finally {
        setLoading(false);
      }
    }
    void loadData();
  }, []);

  const toggleCheckIn = (id) => {
    setAttendees((prev) => {
      let savedCheckIns = {};
      try {
        savedCheckIns = JSON.parse(
          localStorage.getItem("evently_checked_ins") || "{}"
        );
      } catch {
        savedCheckIns = {};
      }

      const next = prev.map((att) => {
        if (att.id === id) {
          const willBeCheckedIn = att.status !== "Checked In";
          const newTime = willBeCheckedIn
            ? new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "-";

          if (willBeCheckedIn) {
            toast.success("Checked In", `${att.name} (${att.seat}) validated.`);
            savedCheckIns[id] = { status: "Checked In", time: newTime };
          } else {
            toast.info("Status Reset", `${att.name} marked as Pending.`);
            delete savedCheckIns[id];
          }

          return {
            ...att,
            status: willBeCheckedIn ? "Checked In" : "Pending",
            time: newTime,
          };
        }
        return att;
      });

      try {
        localStorage.setItem(
          "evently_checked_ins",
          JSON.stringify(savedCheckIns)
        );
      } catch (err) {
        console.error("Failed to persist check-in state:", err);
      }

      return next;
    });
  };

  const exportManifest = () => {
    if (attendees.length === 0) {
      toast.warning("Export Notice", "No attendee entries to export.");
      return;
    }

    const headers = [
      "Ticket ID",
      "Name",
      "Email",
      "Event",
      "Seat",
      "Status",
      "Arrival Time",
    ];
    const rows = attendees.map((a) => [
      `"${a.id || ""}"`,
      `"${(a.name || "").replaceAll(/"/g, '""')}"`,
      `"${(a.email || "").replaceAll(/"/g, '""')}"`,
      `"${(a.event || "").replaceAll(/"/g, '""')}"`,
      `"${a.seat || ""}"`,
      `"${a.status || ""}"`,
      `"${a.time || ""}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute(
      "download",
      `evently_manifest_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Manifest Exported", "Attendee roster downloaded as CSV.");
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

      <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col lg:flex-row gap-6 lg:gap-8">
        <Sidebar />

        <main className="flex-1 min-w-0 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1D1F23]">Attendee Roster</h1>
              <p className="text-neutral-500 text-xs sm:text-sm mt-1">
                Manage ticket validation, seat check-ins, and guest manifests.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={exportManifest}
                className="flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-neutral-200 bg-white text-xs sm:text-sm font-semibold text-neutral-700 hover:bg-neutral-50 shadow-2xs cursor-pointer active:scale-95 transition-all"
              >
                <Download size={16} />
                Export Manifest
              </button>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            <div className="bg-white border border-neutral-200 rounded-2xl p-4 sm:p-5 shadow-sm flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <UserCheck size={20} />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-[#1D1F23]">{checkedInCount}</p>
                <p className="text-xs text-neutral-500">Checked In Guests</p>
              </div>
            </div>

            <div className="bg-white border border-neutral-200 rounded-2xl p-4 sm:p-5 shadow-sm flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Clock size={20} />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-[#1D1F23]">{attendees.length - checkedInCount}</p>
                <p className="text-xs text-neutral-500">Awaiting Arrival</p>
              </div>
            </div>

            <div className="bg-white border border-neutral-200 rounded-2xl p-4 sm:p-5 shadow-sm flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <Ticket size={20} />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-[#1D1F23]">{events.length || attendees.length}</p>
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
              className="w-full h-10.5 pl-10 pr-4 text-xs sm:text-sm rounded-xl border border-neutral-200 bg-white outline-none focus:border-[#6365f1] text-neutral-800"
            />
          </div>

          {/* Attendees Table or Spinner */}
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center bg-white border border-neutral-200 rounded-2xl">
              <LoadingSpinner message="Fetching attendee manifests..." fullScreen={false} />
            </div>
          ) : (
            <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <div className="min-w-[650px]">
                  <div className="grid grid-cols-[1fr_2fr_1.5fr_1fr_120px] gap-4 px-6 py-3.5 bg-neutral-50 border-b border-neutral-200 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    <span>Ticket ID</span>
                    <span>Attendee</span>
                    <span>Seat & Event</span>
                    <span>Status</span>
                    <span className="text-right">Action</span>
                  </div>

              {filteredAttendees.length === 0 ? (
                <div className="py-16 text-center text-neutral-500">
                  <Users className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
                  <p className="font-semibold text-neutral-700">No attendees found</p>
                  <p className="text-xs text-neutral-400 mt-1">
                    {search
                      ? "No attendees match your search query."
                      : "Booked tickets for your events will appear here."}
                  </p>
                </div>
              ) : (
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
              )}
                </div>
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
