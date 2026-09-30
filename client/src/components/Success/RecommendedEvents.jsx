import { ChevronRight } from "lucide-react";
import { useBooking } from "../../context/BookingContext";
const RecommendedEvents = () => {
  const { events } = useBooking();
  const displayEvents = events.slice(0, 4);

  return (
    <section className="w-full bg-white border-t border-neutral-200 py-20 mt-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* 1. HEADER ROW */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-[#1D1F23] mb-2 tracking-tight">
              Don't stop the rhythm
            </h2>
            <p className="text-neutral-500">
              Hand-picked events you might also enjoy.
            </p>
          </div>
          <button className="hidden sm:flex items-center gap-1 text-[#6365f1] font-semibold hover:text-[#4f51e9] transition cursor-pointer">
            Explore Everything <ChevronRight size={18} />
          </button>
        </div>

        {/* 2. RESPONSIVE EVENT GRID (1 col mobile, 2 col tablet, 4 col desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayEvents.map((event) => (
            <div key={event.id} className="group cursor-pointer">
              {/* Image Container with hover zoom effect */}
              <div className="w-full h-64 rounded-2xl overflow-hidden mb-4 bg-neutral-100">
                <img
                  src={event.img}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  // Fallback to an Unsplash image if local image isn't found
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=400";
                  }}
                />
              </div>

              {/* Text */}
              <h3 className="font-bold text-[#1D1F23] text-lg mb-1 group-hover:text-[#6365f1] transition-colors truncate">
                {event.title}
              </h3>
              <p className="text-sm font-medium text-neutral-500">
                From ${event.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendedEvents;
