import { CalendarDays, MoreVertical } from "lucide-react";

// One badge style per status, kept in a lookup so the table row JSX
// doesn't need repeated ternaries for color logic.
const statusStyles = {
  Live: "bg-emerald-50 text-emerald-600",
  Draft: "bg-neutral-100 text-neutral-500",
  Past: "bg-neutral-100 text-neutral-400",
};

// Hardcoded rows - shape matches what a real API response would likely look
// like (id, title, date, ticketsSold/total, revenue, status) so swapping in
// real data later just means replacing this array with fetched events.
const events = [
  {
    id: 1,
    title: "Midnight Sun Music Festival",
    date: "Oct 24, 2024",
    sold: 842,
    capacity: 1000,
    revenue: "$42,100",
    status: "Live",
  },
  {
    id: 2,
    title: "Jazz in the Garden",
    date: "Nov 05, 2024",
    sold: 120,
    capacity: 300,
    revenue: "$4,800",
    status: "Live",
  },
  {
    id: 3,
    title: "Brooklyn Skyline Series",
    date: "Dec 12, 2024",
    sold: 0,
    capacity: 500,
    revenue: "$0",
    status: "Draft",
  },
  {
    id: 4,
    title: "Indie Rock Night Live",
    date: "Aug 18, 2024",
    sold: 480,
    capacity: 480,
    revenue: "$16,800",
    status: "Past",
  },
];

const EventsTable = () => {
  return (
    <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden">
      {/* Column headers */}
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_40px] gap-4 px-6 py-3 bg-neutral-50 border-b border-neutral-200 text-xs font-semibold uppercase tracking-wide text-neutral-500">
        <span>Event</span>
        <span>Date</span>
        <span>Tickets Sold</span>
        <span>Revenue</span>
        <span>Status</span>
        <span />
      </div>

      {/* Rows */}
      {events.map((event) => (
        <div
          key={event.id}
          className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_40px] gap-4 px-6 py-4 items-center border-b border-neutral-100 last:border-b-0 hover:bg-neutral-50 transition-colors"
        >
          <span className="font-semibold text-[#1D1F23]">{event.title}</span>

          <span className="flex items-center gap-1.5 text-sm text-neutral-600">
            <CalendarDays size={14} className="text-neutral-400" />
            {event.date}
          </span>

          <span className="text-sm text-neutral-600">
            {event.sold} / {event.capacity}
          </span>

          <span className="text-sm font-medium text-[#1D1F23]">
            {event.revenue}
          </span>

          <span
            className={`w-fit px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyles[event.status]}`}
          >
            {event.status}
          </span>

          <button
            type="button"
            aria-label="Event options"
            className="text-neutral-400 hover:text-neutral-600 cursor-pointer justify-self-end"
          >
            <MoreVertical size={18} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default EventsTable;
