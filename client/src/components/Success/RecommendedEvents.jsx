import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useBooking } from "../../context/BookingContext";

const RecommendedEvents = () => {
  const { events } = useBooking();
  const displayEvents = events.slice(0, 4);

  return (
    <section className="w-full bg-white border-t border-neutral-200 py-12 sm:py-16 md:py-20 mt-8 sm:mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. HEADER ROW */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-8 sm:mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1D1F23] mb-1.5 sm:mb-2 tracking-tight">
              Don't stop the rhythm
            </h2>
            <p className="text-sm sm:text-base text-neutral-500">
              Hand-picked events you might also enjoy.
            </p>
          </div>
          <Link
            to="/events"
            className="flex items-center gap-1 text-[#6365f1] font-semibold text-sm hover:text-[#4f51e9] transition cursor-pointer w-fit"
          >
            <span>Explore Everything</span>
            <ChevronRight size={18} />
          </Link>
        </div>

        {/* 2. RESPONSIVE EVENT GRID (1 col mobile, 2 col tablet, 4 col desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayEvents.map((event) => (
            <Link
              to={`/events/${event.id}`}
              key={event.id}
              className="group cursor-pointer block"
            >
              {/* Image Container with hover zoom effect */}
              <div className="w-full h-64 rounded-2xl overflow-hidden mb-4 bg-neutral-100">
                <img
                  src={event.img}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  // Fallback to an Unsplash image if local image isn't found
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=400";
                  }}
                />
              </div>

              {/* Text */}
              <h3 className="font-bold text-[#1D1F23] text-lg mb-1 group-hover:text-[#6365f1] transition-colors truncate">
                {event.title}
              </h3>
              <p className="text-sm font-medium text-neutral-500">
                From ₹{event.price}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendedEvents;
