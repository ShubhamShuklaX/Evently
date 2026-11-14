import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Organizer/Sidebar";
import { API_BASE } from "../utils/api";
import {
  TrendingUp,
  BarChart3,
  Users,
  CreditCard,
  Calendar,
  ArrowUpRight,
  Loader2,
} from "lucide-react";

const OrganizerAnalytics = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const token = localStorage.getItem("evently_token");
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/events/my-events`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setEvents(Array.isArray(data.events) ? data.events : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    void loadData();
  }, []);

  const totalCapacity = events.reduce(
    (acc, e) => acc + (Number(e.capacity) || 100),
    0,
  );
  const totalSold = events.reduce(
    (acc, e) => acc + (Number(e.soldCount) || 0),
    0,
  );
  const totalRevenue = events.reduce((acc, e) => {
    const sold = Number(e.soldCount) || 0;
    return acc + (Number(e.price) || 0) * sold;
  }, 0);
  const sellThroughRate =
    totalCapacity > 0 ? ((totalSold / totalCapacity) * 100).toFixed(1) : "0";
  const avgTicketPrice =
    events.length > 0
      ? Math.round(
          events.reduce((acc, e) => acc + (Number(e.price) || 0), 0) /
            events.length,
        )
      : 0;

  return (
    <div className="min-h-screen bg-[#F6F7F9] font-sans flex flex-col">
      <Header />

      <div className="flex-1 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6 sm:py-8 flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-8">
        <Sidebar />

        <main className="flex-1 min-w-0 flex flex-col gap-6 sm:gap-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1D1F23]">
              Sales Analytics
            </h1>
            <p className="text-neutral-500 text-xs sm:text-sm mt-1">
              Deep dive into ticket velocity, attendance, and revenue
              performance.
            </p>
          </div>

          {loading ? (
            <div className="bg-white rounded-2xl border border-neutral-200 p-10 sm:p-16 flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-8 h-8 text-[#6365f1] animate-spin" />
              <p className="text-sm text-neutral-500 font-medium">
                Computing analytics...
              </p>
            </div>
          ) : (
            <>
              {/* Stat Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-5 mb-6 sm:mb-8">
                <article className="group relative bg-white border border-neutral-200/80 rounded-xl p-3.5 sm:p-4.5 lg:p-5 shadow-xs hover:border-neutral-300 hover:shadow-sm active:scale-[0.99] transition-[transform,box-shadow,border-color] duration-150 ease-out flex flex-col justify-between cursor-default">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] sm:text-xs font-semibold text-neutral-500 uppercase tracking-wider truncate mr-1.5">
                      Gross Sales
                    </span>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100/60 flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105">
                      <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2.2} />
                    </div>
                  </div>
                  <div className="mt-2 sm:mt-3.5 mb-0.5 sm:mb-1 flex items-baseline gap-1.5 sm:gap-2.5 flex-wrap">
                    <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#1D1F23] tracking-tight tabular-nums">
                      ₹{totalRevenue.toLocaleString("en-IN")}
                    </span>
                    {totalSold > 0 && (
                      <span className="inline-flex items-center gap-0.5 rounded-full px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs font-semibold tabular-nums bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                        <ArrowUpRight size={11} strokeWidth={2.5} />
                        Active
                      </span>
                    )}
                  </div>
                  <div className="mt-2 sm:mt-3.5 pt-2 sm:pt-3 border-t border-neutral-100 flex items-center justify-between text-[10px] sm:text-[11px] text-neutral-400">
                    <span className="truncate pr-1">
                      {totalSold > 0 ? `${totalSold} tickets booked` : "No ticket sales yet"}
                    </span>
                    <span className="hidden sm:inline-block font-medium text-emerald-600">
                      {totalSold > 0 ? "Booked" : "0 sales"}
                    </span>
                  </div>
                </article>

                <article className="group relative bg-white border border-neutral-200/80 rounded-xl p-3.5 sm:p-4.5 lg:p-5 shadow-xs hover:border-neutral-300 hover:shadow-sm active:scale-[0.99] transition-[transform,box-shadow,border-color] duration-150 ease-out flex flex-col justify-between cursor-default">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] sm:text-xs font-semibold text-neutral-500 uppercase tracking-wider truncate mr-1.5">
                      Avg Ticket Price
                    </span>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-indigo-50 text-[#6365f1] border border-indigo-100/60 flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105">
                      <CreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2.2} />
                    </div>
                  </div>
                  <div className="mt-2 sm:mt-3.5 mb-0.5 sm:mb-1 flex items-baseline gap-1.5 sm:gap-2.5 flex-wrap">
                    <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#1D1F23] tracking-tight tabular-nums">
                      ₹{avgTicketPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="mt-2 sm:mt-3.5 pt-2 sm:pt-3 border-t border-neutral-100 flex items-center justify-between text-[10px] sm:text-[11px] text-neutral-400">
                    <span className="truncate pr-1">Across all categories</span>
                    <span className="hidden sm:inline-block font-medium text-neutral-500">Tier Avg</span>
                  </div>
                </article>

                <article className="group relative bg-white border border-neutral-200/80 rounded-xl p-3.5 sm:p-4.5 lg:p-5 shadow-xs hover:border-neutral-300 hover:shadow-sm active:scale-[0.99] transition-[transform,box-shadow,border-color] duration-150 ease-out flex flex-col justify-between cursor-default">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] sm:text-xs font-semibold text-neutral-500 uppercase tracking-wider truncate mr-1.5">
                      Seats Listed
                    </span>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-amber-50 text-amber-600 border border-amber-100/60 flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105">
                      <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2.2} />
                    </div>
                  </div>
                  <div className="mt-2 sm:mt-3.5 mb-0.5 sm:mb-1 flex items-baseline gap-1.5 sm:gap-2.5 flex-wrap">
                    <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#1D1F23] tracking-tight tabular-nums">
                      {totalCapacity.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="mt-2 sm:mt-3.5 pt-2 sm:pt-3 border-t border-neutral-100 flex items-center justify-between text-[10px] sm:text-[11px] text-neutral-400">
                    <span className="truncate pr-1">{events.length} active venues</span>
                    <span className="hidden sm:inline-block font-medium text-amber-600">Inventory</span>
                  </div>
                </article>

                <article className="group relative bg-white border border-neutral-200/80 rounded-xl p-3.5 sm:p-4.5 lg:p-5 shadow-xs hover:border-neutral-300 hover:shadow-sm active:scale-[0.99] transition-[transform,box-shadow,border-color] duration-150 ease-out flex flex-col justify-between cursor-default">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] sm:text-xs font-semibold text-neutral-500 uppercase tracking-wider truncate mr-1.5">
                      Sell-Through
                    </span>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-purple-50 text-purple-600 border border-purple-100/60 flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105">
                      <BarChart3 className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2.2} />
                    </div>
                  </div>
                  <div className="mt-2 sm:mt-3.5 mb-0.5 sm:mb-1 flex items-baseline gap-1.5 sm:gap-2.5 flex-wrap">
                    <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#1D1F23] tracking-tight tabular-nums">
                      {sellThroughRate}%
                    </span>
                  </div>
                  <div className="mt-2 sm:mt-3.5 pt-2 sm:pt-3 border-t border-neutral-100 flex items-center justify-between text-[10px] sm:text-[11px] text-neutral-400">
                    <span className="truncate pr-1">{totalSold} / {totalCapacity} seats</span>
                    <span className="hidden sm:inline-block font-medium text-purple-600">Rate</span>
                  </div>
                </article>
              </div>

              {/* Event Performance Breakdown */}
              <div className="bg-white border border-neutral-200 rounded-2xl p-5 sm:p-8 shadow-sm">
                <h3 className="text-lg sm:text-xl font-bold text-[#1D1F23] mb-1">
                  Performance by Event
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500 mb-6">
                  Revenue and attendance breakdown per listed production.
                </p>

                {events.length === 0 ? (
                  <p className="text-sm text-neutral-400">
                    No events listed yet to analyze.
                  </p>
                ) : (
                  <div className="divide-y divide-neutral-100">
                    {events.map((e) => {
                      const capacity = Number(e.capacity) || 100;
                      const sold = Number(e.soldCount) || 0;
                      const revenue = sold * (Number(e.price) || 0);

                      return (
                        <div
                          key={e.id}
                          className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4"
                        >
                          <div className="min-w-0">
                            <h4 className="font-bold text-[#1D1F23] text-sm truncate">
                              {e.title}
                            </h4>
                            <div className="flex items-center gap-3 text-xs text-neutral-400 mt-1">
                              <span className="flex items-center gap-1">
                                <Calendar size={12} /> {e.date || "Upcoming"}
                              </span>
                              <span className="capitalize">
                                {e.category || "General"}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-8 shrink-0">
                            <div className="text-left sm:text-right">
                              <span className="text-xs font-bold text-neutral-400 uppercase">
                                Bookings
                              </span>
                              <p className="text-sm font-semibold text-neutral-800">
                                {sold} / {capacity}
                              </p>
                            </div>
                            <div className="text-right sm:min-w-25">
                              <span className="text-xs font-bold text-neutral-400 uppercase">
                                Gross Revenue
                              </span>
                              <p className="text-sm font-bold text-[#1D1F23]">
                                ₹{revenue.toLocaleString("en-IN")}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default OrganizerAnalytics;
