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

  const liveRatio =
    totalEvents > 0 ? Math.round((liveEventsCount / totalEvents) * 100) : 0;

  const metrics = [
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString("en-IN")}`,
      delta: totalRevenue > 0 ? `${ticketsSoldCount} sold` : null,
      isPositive: totalRevenue > 0,
      icon: TrendingUp,
      iconBg: "bg-emerald-50 text-emerald-600 border border-emerald-100/60",
      context: "Lifetime earnings across all events",
      statusText: totalRevenue > 0 ? "Active" : "No sales yet",
      delay: "0ms",
    },
    {
      title: "Tickets Issued",
      value: ticketsSoldCount.toLocaleString("en-IN"),
      delta: ticketsSoldCount > 0 ? `+${ticketsSoldCount}` : null,
      isPositive: ticketsSoldCount > 0,
      icon: Ticket,
      iconBg: "bg-indigo-50 text-[#6365f1] border border-indigo-100/60",
      context: "Confirmed attendee seats booked",
      statusText: ticketsSoldCount > 0 ? "Booked" : "0 bookings",
      delay: "35ms",
    },
    {
      title: "Active Events",
      value: liveEventsCount.toString(),
      delta: liveEventsCount > 0 ? `${liveEventsCount} live` : null,
      isPositive: liveEventsCount > 0,
      icon: Calendar,
      iconBg: "bg-sky-50 text-sky-600 border border-sky-100/60",
      context: "Currently live and booking seats",
      statusText: liveEventsCount > 0 ? "Live" : "Inactive",
      delay: "70ms",
    },
    {
      title: "Total Portfolio",
      value: totalEvents.toString(),
      delta: totalEvents > 0 ? `${liveRatio}% live` : null,
      isPositive: totalEvents > 0 && liveEventsCount > 0,
      icon: Layers,
      iconBg: "bg-purple-50 text-purple-600 border border-purple-100/60",
      context:
        totalEvents > 0
          ? `${totalEvents - draftEventsCount} published, ${draftEventsCount} draft`
          : "0 in draft, 0 published",
      statusText: totalEvents > 0 ? `${totalEvents} events` : "Empty",
      delay: "105ms",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-5 mb-6 sm:mb-8 lg:mb-10">
      {metrics.map((metric, i) => (
        <article
          key={i}
          style={{ animationDelay: metric.delay }}
          className="group relative bg-white border border-neutral-200/80 rounded-xl p-3.5 sm:p-4.5 lg:p-5 shadow-xs hover:border-neutral-300 hover:shadow-sm active:scale-[0.99] transition-[transform,box-shadow,border-color] duration-150 ease-out flex flex-col justify-between cursor-default animate-in fade-in slide-in-from-bottom-2 fill-mode-both"
        >
          {/* Card Header: Label on left, subtle icon on right */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-semibold text-neutral-500 uppercase tracking-wider truncate mr-1.5">
              {metric.title}
            </span>
            <div
              className={`w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 ease-out group-hover:scale-105 ${metric.iconBg}`}
            >
              <metric.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2.2} />
            </div>
          </div>

          {/* Metric Value & Inline Trend */}
          <div className="mt-2 sm:mt-3.5 mb-0.5 sm:mb-1 flex items-baseline gap-1.5 sm:gap-2.5 flex-wrap">
            <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#1D1F23] tracking-tight tabular-nums">
              {metric.value}
            </span>

            {metric.delta && (
              <span className="inline-flex items-center gap-0.5 rounded-full px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs font-semibold tabular-nums bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                <ArrowUpRight size={11} className="sm:w-3 sm:h-3" strokeWidth={2.5} />
                {metric.delta}
              </span>
            )}
          </div>

          {/* Hairline Divider & Footer Context */}
          <div className="mt-2 sm:mt-3.5 pt-2 sm:pt-3 border-t border-neutral-100 flex items-center justify-between text-[10px] sm:text-[11px] text-neutral-400">
            <span className="truncate pr-1">{metric.context}</span>
            <span
              className={`hidden sm:inline-block shrink-0 font-medium ${
                metric.isPositive ? "text-emerald-600" : "text-neutral-400"
              }`}
            >
              {metric.statusText}
            </span>
          </div>
        </article>
      ))}
    </div>
  );
};

export default MetricsCards;
