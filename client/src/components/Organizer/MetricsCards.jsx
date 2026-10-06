import {
  TrendingUp,
  Ticket,
  Calendar,
  Layers,
  ArrowUpRight,
} from "lucide-react";

const MetricsCards = ({ myEvents = [] }) => {
  const liveEventsCount = myEvents.filter((e) => e.status === "Live").length;
  const draftEventsCount = myEvents.filter((e) => e.status === "Draft").length;
  const totalEvents = myEvents.length;

  // Compute tickets sold & estimated gross revenue based on organizer events
  const ticketsSoldCount = myEvents.reduce((acc, e) => {
    const sold = typeof e.soldCount === "number" ? e.soldCount : 0;
    return acc + sold;
  }, 0);

  const totalRevenue = myEvents.reduce((acc, e) => {
    const sold = typeof e.soldCount === "number" ? e.soldCount : 0;
    return acc + (Number(e.price) || 0) * sold;
  }, 0);

  const metrics = [
    {
      title: "TOTAL REVENUE",
      value: `₹${totalRevenue.toLocaleString("en-IN")}`,
      change: myEvents.length > 0 ? "+14.8%" : "0%",
      icon: TrendingUp,
      subtitle: "Gross sales across all published events",
    },
    {
      title: "TICKETS ISSUED",
      value: ticketsSoldCount.toLocaleString("en-IN"),
      change: myEvents.length > 0 ? "+8.5%" : "0%",
      icon: Ticket,
      subtitle: "Confirmed attendee seats booked",
    },
    {
      title: "ACTIVE EVENTS",
      value: liveEventsCount.toString(),
      change: liveEventsCount > 0 ? "Live Now" : "0 Active",
      icon: Calendar,
      subtitle: "Currently live and booking seats",
    },
    {
      title: "TOTAL PORTFOLIO",
      value: totalEvents.toString(),
      change: draftEventsCount > 0 ? `${draftEventsCount} Draft` : "100% Live",
      icon: Layers,
      subtitle: `${draftEventsCount} in draft, ${totalEvents - draftEventsCount} published`,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
      {metrics.map((metric, i) => (
        <div
          key={i}
          className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between h-44 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-xl bg-[#F0F2FF] text-[#6365f1] flex items-center justify-center">
              <metric.icon size={20} />
            </div>
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5 bg-emerald-50 px-2 py-0.5 rounded-full">
              <ArrowUpRight size={14} strokeWidth={3} />
              {metric.change}
            </span>
          </div>

          <div className="mt-4">
            <h3 className="text-neutral-400 text-[10px] font-bold uppercase tracking-widest mb-1">
              {metric.title}
            </h3>
            <p className="text-3xl font-bold text-[#1D1F23] tracking-tight">
              {metric.value}
            </p>
          </div>

          <p className="text-[11px] text-neutral-500 mt-2">{metric.subtitle}</p>
        </div>
      ))}
    </div>
  );
};

export default MetricsCards;
