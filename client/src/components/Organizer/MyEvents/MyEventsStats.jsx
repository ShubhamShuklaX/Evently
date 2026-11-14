import { CalendarCheck, DollarSign, Ticket, Layers, ArrowUpRight } from "lucide-react";

const MyEventsStats = ({ myEvents = [] }) => {
  const liveCount = myEvents.filter((e) => e.status === "Live").length;
  const draftCount = myEvents.filter((e) => e.status === "Draft").length;

  const totalTickets = myEvents.reduce((acc, e) => {
    const sold =
      typeof e.soldCount === "number"
        ? e.soldCount
        : Math.round((e.capacity || 100) * 0.35);
    return acc + sold;
  }, 0);

  const totalRevenue = myEvents.reduce((acc, e) => {
    const sold =
      typeof e.soldCount === "number"
        ? e.soldCount
        : Math.round((e.capacity || 100) * 0.35);
    return acc + (Number(e.price) || 0) * sold;
  }, 0);

  const stats = [
    {
      label: "Live Events",
      value: liveCount.toString(),
      icon: CalendarCheck,
      iconBg: "bg-indigo-50 text-[#6365f1] border border-indigo-100/60",
      context: "Active and selling tickets",
      status: liveCount > 0 ? "Live" : "None",
      isPositive: liveCount > 0,
      delay: "0ms",
    },
    {
      label: "Confirmed Bookings",
      value: totalTickets.toLocaleString("en-IN"),
      icon: Ticket,
      iconBg: "bg-emerald-50 text-emerald-600 border border-emerald-100/60",
      context: "Seats reserved across catalog",
      status: totalTickets > 0 ? "Booked" : "0 seats",
      isPositive: totalTickets > 0,
      delay: "35ms",
    },
    {
      label: "Gross Sales",
      value: `₹${totalRevenue.toLocaleString("en-IN")}`,
      icon: DollarSign,
      iconBg: "bg-amber-50 text-amber-600 border border-amber-100/60",
      context: "Estimated ticketing volume",
      status: totalRevenue > 0 ? "Active" : "₹0 sales",
      isPositive: totalRevenue > 0,
      delay: "70ms",
    },
    {
      label: "Drafts / Review",
      value: draftCount.toString(),
      icon: Layers,
      iconBg: "bg-purple-50 text-purple-600 border border-purple-100/60",
      context: "Pending publication",
      status: draftCount > 0 ? `${draftCount} draft` : "None",
      isPositive: false,
      delay: "105ms",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-5 mb-6 sm:mb-8">
      {stats.map((stat, i) => (
        <article
          key={stat.label}
          style={{ animationDelay: stat.delay }}
          className="group relative bg-white border border-neutral-200/80 rounded-xl p-3.5 sm:p-4.5 lg:p-5 shadow-xs hover:border-neutral-300 hover:shadow-sm active:scale-[0.99] transition-[transform,box-shadow,border-color] duration-150 ease-out flex flex-col justify-between cursor-default animate-in fade-in slide-in-from-bottom-2 fill-mode-both"
        >
          {/* Card Header */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-semibold text-neutral-500 uppercase tracking-wider truncate mr-1.5">
              {stat.label}
            </span>
            <div
              className={`w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 ease-out group-hover:scale-105 ${stat.iconBg}`}
            >
              <stat.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2.2} />
            </div>
          </div>

          {/* Metric Value */}
          <div className="mt-2 sm:mt-3.5 mb-0.5 sm:mb-1 flex items-baseline gap-1.5 sm:gap-2.5 flex-wrap">
            <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#1D1F23] tracking-tight tabular-nums">
              {stat.value}
            </span>

            {stat.isPositive && (
              <span className="hidden xl:inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] sm:text-xs font-semibold tabular-nums bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                <ArrowUpRight size={11} strokeWidth={2.5} />
                Live
              </span>
            )}
          </div>

          {/* Hairline Divider & Context */}
          <div className="mt-2 sm:mt-3.5 pt-2 sm:pt-3 border-t border-neutral-100 flex items-center justify-between text-[10px] sm:text-[11px] text-neutral-400">
            <span className="truncate pr-1">{stat.context}</span>
            <span
              className={`hidden sm:inline-block shrink-0 font-medium ${
                stat.isPositive ? "text-emerald-600" : "text-neutral-400"
              }`}
            >
              {stat.status}
            </span>
          </div>
        </article>
      ))}
    </div>
  );
};

export default MyEventsStats;
