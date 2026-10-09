import { useState } from "react";
import { BellRing, CalendarDays, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const FinancialPerformance = ({ myEvents = [] }) => {
  const [timeRange, setTimeRange] = useState("Last 6 Months");

  // Select top events for performance breakdown
  const displayEvents = myEvents.slice(0, 4);

  // Pick top active event for Selling Fast alert
  const topLiveEvent = myEvents.find((e) => e.status === "Live") || myEvents[0];

  const totalRev = myEvents.reduce((acc, e) => {
    const sold = typeof e.soldCount === "number" ? e.soldCount : 0;
    return acc + (Number(e.price) || 0) * sold;
  }, 0);

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const currentMonth = new Date().getMonth();
  const past6Months = Array.from({ length: 6 }, (_, i) => {
    const idx = (currentMonth - 5 + i + 12) % 12;
    return monthNames[idx];
  });

  return (
    <div className="flex flex-col lg:flex-row gap-6 mb-6">
      {/* Revenue Trends Chart */}
      <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm flex-1 p-5 sm:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-[#1D1F23]">Revenue Trends</h3>
            <p className="text-neutral-500 text-xs sm:text-sm mt-1">
              Monthly breakdown of ticketing performance
            </p>
          </div>
          <div className="flex flex-wrap gap-1 bg-neutral-100 p-1 rounded-xl">
            {["Last 30 Days", "Last 6 Months", "All Time"].map((range) => (
              <button
                key={range}
                type="button"
                onClick={() => setTimeRange(range)}
                className={`text-xs font-bold px-2.5 sm:px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  timeRange === range
                    ? "bg-white text-[#6365f1] shadow-xs"
                    : "text-neutral-500 hover:text-neutral-800"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        <div className="relative h-64 w-full mt-4">
          {/* Y Axis Labels */}
          <div className="absolute left-0 top-0 bottom-6 w-14 flex flex-col justify-between text-xs text-neutral-400 font-medium">
            <span>{totalRev > 0 ? `₹${Math.round(totalRev * 1.2).toLocaleString("en-IN")}` : "₹10,000"}</span>
            <span>{totalRev > 0 ? `₹${Math.round(totalRev * 0.9).toLocaleString("en-IN")}` : "₹7,500"}</span>
            <span>{totalRev > 0 ? `₹${Math.round(totalRev * 0.6).toLocaleString("en-IN")}` : "₹5,000"}</span>
            <span>{totalRev > 0 ? `₹${Math.round(totalRev * 0.3).toLocaleString("en-IN")}` : "₹2,500"}</span>
            <span>₹0</span>
          </div>

          {/* Grid Lines */}
          <div className="absolute left-16 right-0 top-2 bottom-6 flex flex-col justify-between">
            <div className="border-b border-neutral-100 w-full h-px"></div>
            <div className="border-b border-neutral-100 w-full h-px"></div>
            <div className="border-b border-neutral-100 w-full h-px"></div>
            <div className="border-b border-neutral-100 w-full h-px"></div>
            <div className="border-b border-neutral-100 w-full h-px"></div>
          </div>

          {/* SVG Area Chart / Zero State */}
          {totalRev === 0 ? (
            <div className="absolute left-16 right-0 top-2 bottom-6 flex flex-col items-center justify-center text-center p-4">
              <p className="text-sm font-semibold text-neutral-600">No revenue data yet</p>
              <p className="text-xs text-neutral-400 mt-1 max-w-xs">
                Ticket sales will generate monthly revenue trend curves here.
              </p>
            </div>
          ) : (
            <div className="absolute left-16 right-0 top-2 bottom-6 overflow-hidden">
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="w-full h-full"
              >
                <defs>
                  <linearGradient
                    id="financialGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#6365f1" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#6365f1" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M 0,80 C 20,70 40,55 60,40 C 75,30 90,20 100,10 L 100,100 L 0,100 Z"
                  fill="url(#financialGradient)"
                />
                <path
                  d="M 0,80 C 20,70 40,55 60,40 C 75,30 90,20 100,10"
                  fill="none"
                  stroke="#6365f1"
                  strokeWidth="2.5"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>
          )}

          {/* X Axis Labels */}
          <div className="absolute left-16 right-0 bottom-0 flex justify-between text-xs text-neutral-400 font-medium px-4">
            {past6Months.map((m, idx) => (
              <span key={idx}>{m}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Ticket Breakdown */}
      <div className="w-full lg:w-96 shrink-0 flex flex-col gap-6">
        <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-5 sm:p-7">
          <h3 className="text-xl font-bold text-[#1D1F23]">Event Capacity</h3>
          <p className="text-neutral-500 text-sm mt-1 mb-6">
            Occupancy rate of your listings
          </p>

          {displayEvents.length > 0 ? (
            <div className="flex flex-col gap-5">
              {displayEvents.map((event) => {
                const capacity = Number(event.capacity) || 100;
                const sold =
                  typeof event.soldCount === "number" ? event.soldCount : 0;
                const percent = Math.min(
                  100,
                  Math.round((sold / capacity) * 100),
                );

                return (
                  <div key={event.id}>
                    <div className="flex justify-between items-center text-sm font-semibold mb-1.5">
                      <span
                        className="text-[#1D1F23] truncate max-w-42.5"
                        title={event.title}
                      >
                        {event.title}
                      </span>
                      <span className="text-neutral-500 text-xs font-mono">
                        {sold} / {capacity} sold ({percent}%)
                      </span>
                    </div>
                    <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#6365f1] rounded-full transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-6 bg-neutral-50 rounded-xl border border-dashed border-neutral-200">
              <Sparkles size={24} className="mx-auto text-[#6365f1] mb-2" />
              <p className="text-sm font-semibold text-neutral-700">
                No events yet
              </p>
              <p className="text-xs text-neutral-400 mt-1 mb-3">
                List an event to see capacity analytics.
              </p>
              <Link
                to="/organizer/create"
                className="inline-block text-xs font-bold text-[#6365f1] hover:underline"
              >
                + Create Event
              </Link>
            </div>
          )}
        </div>

        {/* Dynamic Selling Fast Alert */}
        {topLiveEvent ? (
          <div className="bg-[#F8F9FA] border border-neutral-200 rounded-2xl p-5">
            <div className="flex items-center gap-2 text-[#6365f1] text-xs font-bold tracking-wider uppercase mb-2">
              <BellRing size={14} />
              Performance Insight
            </div>
            <p className="text-sm text-neutral-600 leading-relaxed">
              "
              <strong className="text-neutral-900">{topLiveEvent.title}</strong>
              " is currently{" "}
              <span className="text-emerald-600 font-semibold">
                {topLiveEvent.status}
              </span>{" "}
              priced at{" "}
              <strong className="text-neutral-900">
                ₹{topLiveEvent.price}
              </strong>
              . Review your seat allocations or update details anytime.
            </p>
          </div>
        ) : (
          <div className="bg-[#F8F9FA] border border-neutral-200 rounded-2xl p-5 flex items-center gap-3">
            <CalendarDays size={20} className="text-neutral-400 shrink-0" />
            <p className="text-xs text-neutral-500">
              Your listings will show live capacity recommendations here once
              published.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialPerformance;
