import { TrendingUp, CalendarDays, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useBooking } from "../../context/BookingContext";

const WhatsTrending = ({ events: propEvents }) => {
  const { events: contextEvents } = useBooking();
  const trendingEvents =
    propEvents && propEvents.length > 0
      ? propEvents
      : contextEvents.slice(0, 2);

  return (
    <div className="bg-[#1D1F23] px-30 py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-semibold text-white">
            <TrendingUp className="text-[#6365f1]" size={22} />
            What's Trending
          </h2>
          <p className="text-neutral-400 text-[15px] mt-1 max-w-lg">
            Join thousands of other fans at the most popular events trending
            this week. Real-time availability on all premium seating.
          </p>
        </div>
        <Link
          to="/events"
          className="bg-white text-[#1D1F23] font-semibold text-sm px-6 py-3 rounded-full hover:bg-neutral-200 transition-colors shrink-0 cursor-pointer active:scale-95"
        >
          Browse Trending
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {trendingEvents.map((event) => (
          <Link
            to={event.id ? `/events/${event.id}/seats` : "/events"}
            key={event.id || event.title}
            className="relative rounded-2xl overflow-hidden h-100 group block cursor-pointer transition-transform duration-300 hover:scale-[1.01]"
          >
            <img
              src={event.img}
              alt={event.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

            <div className="relative z-10 h-full flex flex-col justify-end p-6">
              <span className="inline-block w-fit bg-[#6365f1] text-white text-xs font-semibold px-3 py-1 rounded-full mb-3 shadow-xs">
                {event.category}
              </span>
              <h3 className="text-white text-xl font-bold leading-snug group-hover:text-indigo-200 transition-colors">
                {event.title}
              </h3>
              <div className="flex items-center gap-4 text-neutral-300 text-sm mt-2 mb-5">
                <span className="flex items-center gap-1.5">
                  <CalendarDays size={15} />
                  {event.date} · {event.time}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={15} />
                  {event.location}
                </span>
              </div>
              <span className="block text-center bg-white text-[#1D1F23] font-semibold text-sm py-3 rounded-full group-hover:bg-neutral-100 hover:bg-neutral-200 transition-colors shadow-sm">
                Book Your Spot - ₹{event.price}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default WhatsTrending;
