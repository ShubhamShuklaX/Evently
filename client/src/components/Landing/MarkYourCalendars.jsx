import { CalendarDays, MapPin, ArrowRight } from "lucide-react";
import { useBooking } from "../../context/BookingContext";
import { Link } from "react-router-dom";

const MarkYourCalendars = ({ events: propEvents }) => {
  const { events: contextEvents } = useBooking();
  const upcomingEvents = propEvents || contextEvents.slice(0, 2);

  return (
    <div className="px-30 pt-5 pb-17">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-semibold text-[#1D1F23]">
            <CalendarDays className="text-[#6365f1]" size={22} />
            Mark Your Calendars
          </h2>
          <p className="text-neutral-500 text-[15px] mt-1">
            Be the first to get tickets for these highly anticipated events.
          </p>
        </div>
        <Link
          to="/events"
          className="flex items-center gap-1 px-2 text-[15px] py-2 cursor-pointer bg-transparent text-indigo-600 hover:bg-[#4f51e9] hover:text-[#DFE1E4FF] border-2 rounded-full transition ease-in-out"
        >
          View Calendar
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {upcomingEvents.map((event) => (
          <Link
            to={`/events/${event.id}/seats`}
            key={event.id || event.title}
            className="group flex bg-white rounded-2xl border border-neutral-200 overflow-hidden h-75 transition-transform duration-300 hover:scale-[1.03] hover:shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] cursor-pointer"
          >
            <img
              src={event.img}
              alt={event.title}
              className="w-70 h-full object-cover shrink-0"
            />
            <div className="flex flex-col justify-between p-6 flex-1">
              <div>
                <span className="inline-block bg-[#6365f1] text-white text-xs font-medium px-3 py-1 rounded-full">
                  {event.category}
                </span>
                <h3 className="text-lg font-bold text-[#1D1F23] mt-3 leading-snug">
                  {event.title}
                </h3>
                <div className="flex items-center gap-2 text-neutral-500 text-sm mt-3">
                  <CalendarDays size={15} />
                  {event.date} · {event.time}
                </div>
                <div className="flex items-center gap-2 text-neutral-500 text-sm mt-1.5">
                  <MapPin size={15} />
                  {event.location}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-neutral-200 flex items-center justify-between">
                <p className="text-[#6365f1] font-bold text-lg">
                  ₹{event.price}
                </p>
                <span
                  aria-hidden="true"
                  className="text-[#6365f1] group-hover:translate-x-1 transition-transform"
                >
                  <ArrowRight size={20} />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MarkYourCalendars;
