import { CalendarCheck, DollarSign, Ticket, Layers } from "lucide-react";

const MyEventsStats = ({ myEvents = [] }) => {
  const liveCount = myEvents.filter((e) => e.status === "Live").length;
  const draftCount = myEvents.filter((e) => e.status === "Draft").length;

  const totalTickets = myEvents.reduce((acc, e) => {
    const sold = typeof e.soldCount === "number" ? e.soldCount : Math.round((e.capacity || 100) * 0.35);
    return acc + sold;
  }, 0);

  const totalRevenue = myEvents.reduce((acc, e) => {
    const sold = typeof e.soldCount === "number" ? e.soldCount : Math.round((e.capacity || 100) * 0.35);
    return acc + (Number(e.price) || 0) * sold;
  }, 0);

  const stats = [
    {
      label: "Live Events",
      value: liveCount.toString(),
      icon: CalendarCheck,
      style: "bg-[#EEF0FF] text-[#6365f1]",
    },
    {
      label: "Confirmed Bookings",
      value: totalTickets.toLocaleString("en-IN"),
      icon: Ticket,
      style: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Gross Sales",
      value: `₹${totalRevenue.toLocaleString("en-IN")}`,
      icon: DollarSign,
      style: "bg-amber-50 text-amber-600",
    },
    {
      label: "Drafts / In Review",
      value: draftCount.toString(),
      icon: Layers,
      style: "bg-rose-50 text-rose-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {stats.map(({ label, value, icon: Icon, style }) => (
        <div
          key={label}
          className="bg-white border border-neutral-200 rounded-2xl p-4 sm:p-5 flex items-center gap-4 shadow-sm"
        >
          <span
            className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${style}`}
          >
            <Icon size={20} />
          </span>
          <div>
            <p className="text-xl font-bold text-[#1D1F23]">{value}</p>
            <p className="text-xs text-neutral-500 font-medium">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyEventsStats;
