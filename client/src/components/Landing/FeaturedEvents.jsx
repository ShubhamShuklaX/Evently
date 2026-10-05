import { ArrowRight, Loader2 } from "lucide-react";
import EventCard from "../EventCard";
import { Link } from "react-router-dom";
import { useBooking } from "../../context/BookingContext";

const FeaturedEvents = () => {
  const { events, eventsLoading } = useBooking();
  return (
    <div className="px-30 pt-10 pb-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold pb-1">Featured Events</h2>
          <h3 className="text-neutral-500 text-[17px]">
            Hand-picked experience you can't miss this season
          </h3>
        </div>
        <Link
          to="/events"
          className="flex items-center gap-1 px-2.5 text-[15px] py-2 cursor-pointer bg-transparent text-indigo-600 hover:bg-[#4f51e9] hover:text-[#DFE1E4FF] border-2 rounded-full transition ease-in-out"
        >
          Explore All
          <ArrowRight size={16} />
        </Link>
      </div>
      <div className="flex no-scrollbar scroll-smooth gap-6 mt-10 overflow-x-auto pt-2 pb-6">
        {eventsLoading ? (
          <div className="w-full py-16 flex flex-col items-center justify-center gap-2">
            <Loader2 size={30} className="animate-spin text-[#6365f1]" />
            <p className="text-neutral-400 text-sm">Loading featured events...</p>
          </div>
        ) : (
          events.slice(0, 8).map((event) => (
            <div key={event.id} className="w-80 shrink-0">
              <EventCard event={event} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FeaturedEvents;
