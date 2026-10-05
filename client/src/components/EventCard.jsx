import { CalendarDays, MapPin, Ticket } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const EventCard = ({ layout = "grid", event }) => {
  const isList = layout === "list";
  const navigate = useNavigate();

  // If there's no event prop, don't crash
  if (!event) return null;

  const fallbackImage =
    "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=600&q=80";

  if (isList) {
    return (
      <div className="group bg-white border border-neutral-200/80 hover:border-neutral-300 rounded-2xl shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row overflow-hidden sm:h-48">
        {/* Image Container */}
        <Link
          to={`/events/${event.id}`}
          className="relative shrink-0 w-full sm:w-64 md:w-72 h-44 sm:h-full bg-neutral-100 overflow-hidden block"
        >
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            src={event.img || fallbackImage}
            alt={event.title}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = fallbackImage;
            }}
          />
          <span className="absolute top-3.5 left-3.5 bg-black/65 backdrop-blur-md text-white text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
            {event.category}
          </span>
        </Link>

        {/* Center Info */}
        <div className="flex-1 p-5 sm:py-5 sm:px-6 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600">
              <CalendarDays size={14} className="shrink-0" />
              <span>
                {event.date} · {event.time}
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-neutral-900 group-hover:text-indigo-600 transition-colors line-clamp-1 mt-1.5">
              <Link to={`/events/${event.id}`}>{event.title}</Link>
            </h2>

            <p className="text-xs sm:text-sm text-neutral-500 line-clamp-2 mt-2 leading-relaxed">
              {event.description ||
                "Join us for an unforgettable live experience. Reserve your seats today."}
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-medium mt-3 sm:mt-0">
            <MapPin size={14} className="text-neutral-400 shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>

        {/* Right CTA & Price Box */}
        <div className="p-5 sm:py-5 sm:px-6 sm:border-l border-neutral-100 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center shrink-0 gap-3 bg-neutral-50/50 sm:bg-transparent">
          <div className="text-left sm:text-right">
            <span className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
              Starting from
            </span>
            <span className="text-xl sm:text-2xl font-mono font-extrabold text-neutral-900">
              ₹{event.price}
            </span>
          </div>

          <button
            type="button"
            onClick={() => void navigate(`/events/${event.id}`)}
            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow-xs hover:shadow-md transition-all active:scale-95 cursor-pointer shrink-0"
          >
            <Ticket size={16} />
            <span>View Details</span>
          </button>
        </div>
      </div>
    );
  }

  // Grid Layout
  return (
    <div className="group bg-white border border-neutral-200/80 hover:border-neutral-300 rounded-2xl shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden">
      <Link
        to={`/events/${event.id}`}
        className="relative w-full h-52 bg-neutral-100 overflow-hidden shrink-0 block"
      >
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={event.img || fallbackImage}
          alt={event.title}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallbackImage;
          }}
        />
        <span className="absolute top-3.5 left-3.5 bg-black/65 backdrop-blur-md text-white text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
          {event.category}
        </span>
      </Link>

      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600">
            <CalendarDays size={14} className="shrink-0" />
            <span>
              {event.date} · {event.time}
            </span>
          </div>

          <h2 className="text-lg font-bold text-neutral-900 group-hover:text-indigo-600 transition-colors line-clamp-1 mt-1.5">
            <Link to={`/events/${event.id}`}>{event.title}</Link>
          </h2>

          <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-medium mt-2">
            <MapPin size={14} className="text-neutral-400 shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>

        <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
          <div>
            <span className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
              From
            </span>
            <span className="text-lg font-mono font-extrabold text-neutral-900">
              ₹{event.price}
            </span>
          </div>

          <button
            type="button"
            onClick={() => void navigate(`/events/${event.id}`)}
            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-3.5 py-2 rounded-xl shadow-xs hover:shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <Ticket size={14} />
            <span>Book</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
