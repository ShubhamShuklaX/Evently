import { Plus, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "../../../context/ToastContext";

const MyEventsHeader = ({ myEvents = [] }) => {
  const { toast } = useToast();

  const exportToCSV = () => {
    if (!myEvents || myEvents.length === 0) {
      toast.warning("Export Notice", "No events available to export.");
      return;
    }

    const headers = ["Title", "Category", "Location", "Date", "Time", "Price", "Capacity", "Status"];
    const rows = myEvents.map((e) => [
      `"${(e.title || "").replace(/"/g, '""')}"`,
      `"${e.category || ""}"`,
      `"${(e.location || "").replace(/"/g, '""')}"`,
      `"${e.date || ""}"`,
      `"${e.time || ""}"`,
      e.price || 0,
      e.capacity || 100,
      `"${e.status || "Live"}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `evently_my_events_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Export Complete", "My Events roster exported to CSV.");
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1D1F23]">Events Management</h1>
        <p className="text-neutral-500 text-xs sm:text-sm mt-1">
          Create, edit, and track all your event listings in real time.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={exportToCSV}
          className="flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-neutral-200 bg-white text-xs sm:text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors shadow-2xs cursor-pointer active:scale-95"
        >
          <Download size={16} />
          Export CSV
        </button>

        <Link
          to="/organizer/create"
          className="flex items-center gap-2 bg-[#6365f1] hover:bg-[#4f51e9] text-white font-semibold text-xs sm:text-sm px-4 sm:px-5 h-10 sm:h-10.5 rounded-xl transition-colors cursor-pointer active:scale-95 shadow-sm shadow-[#6365f1]/25"
        >
          <Plus size={18} />
          Create Event
        </Link>
      </div>
    </div>
  );
};

export default MyEventsHeader;
