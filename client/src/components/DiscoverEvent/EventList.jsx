import { ArrowUpDown, ChevronDown, LayoutGrid, List, X } from "lucide-react";
import EventCard from "./../EventCard";
import { useState } from "react";
import { useBooking } from "../../context/BookingContext";

const quickFilters = [
  "Recently Viewed",
  "Outdoor Venues",
  "Last Minute Tickets",
  "VIP Experiences",
  "Student Discounts",
];

const EventList = ({ activeCategory, locationQuery }) => {
  const [layout, setLayout] = useState("grid");
  const { events } = useBooking();

  // Step 5: The Magic Filtering Concept
  // We take the full list of events and "filter" out the ones that don't match our criteria
  const filteredEvents = events.filter((event) => {
    // 1. Check category (if a category is selected, ensure it matches)
    if (activeCategory && event.category !== activeCategory) return false;
    
    // 2. Check location (simple text search in the venue name)
    if (locationQuery && !event.venue.toLowerCase().includes(locationQuery.toLowerCase())) return false;

    // If it passes both tests, keep it!
    return true;
  });

  return (
    <div className="flex-1 p-6 md:p-10">
      {/* Header and Controls */}
      <div className="flex flex-col gap-6">
        {/* Title & View Switcher Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900">
              Discover Events
            </h1>
            <p className="text-neutral-600 text-[17px] mt-1">
              Showing{" "}
              <span className="text-neutral-900 font-semibold">{filteredEvents.length} events</span>
            </p>
          </div>

          {/* Sort & Layout Buttons */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex items-center gap-1.5 border border-neutral-200 shadow-sm rounded-xl px-3 py-2 cursor-pointer text-neutral-700 hover:bg-neutral-50 transition-all active:scale-95 focus:outline-none"
            >
              <ArrowUpDown size={16} className="text-neutral-500" />
              <span className="text-[15px] font-medium">Sort: Relevance</span>
              <ChevronDown size={16} className="text-neutral-500" />
            </button>

            <div className="flex items-center gap-1 border border-neutral-200 p-1 shadow-sm rounded-xl bg-white">
              <button
                type="button"
                onClick={() => setLayout("grid")}
                aria-label="Grid view"
                className={`p-1.5 rounded-lg cursor-pointer transition-all ${
                  layout === "grid"
                    ? "bg-neutral-200 text-neutral-900 border border-neutral-300"
                    : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 active:scale-95"
                }`}
              >
                <LayoutGrid strokeWidth={2.1} size={16} />
              </button>

              <button
                type="button"
                onClick={() => setLayout("list")}
                aria-label="List view"
                className={`p-1.5 rounded-lg cursor-pointer transition-all ${
                  layout === "list"
                    ? "bg-neutral-200 text-neutral-900 border border-neutral-300"
                    : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 active:scale-95"
                }`}
              >
                <List strokeWidth={2} size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Filter Tags */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
          <button
            type="button"
            className="flex items-center gap-1.5 bg-neutral-900 text-white text-sm font-medium px-3.5 py-1.5 rounded-full hover:bg-neutral-800 transition-colors cursor-pointer active:scale-95 shrink-0"
          >
            Recently Viewed
            <X size={15} />
          </button>

          {quickFilters.slice(1).map((filter) => (
            <button
              key={filter}
              type="button"
              className="bg-neutral-100 text-neutral-600 text-sm font-medium px-3.5 py-1.5 rounded-full hover:bg-neutral-200 transition-colors cursor-pointer active:scale-95 shrink-0"
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid/List Container */}
      <div
        className={`mt-8 ${
          layout === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            : "flex flex-col gap-4"
        }`}
      >
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <EventCard key={event.id} layout={layout} event={event} />
          ))
        ) : (
          <div className="col-span-full py-20 text-center text-neutral-500">
            No events found matching your criteria.
          </div>
        )}
      </div>
      <div className="flex flex-col items-center gap-3 mt-12 mb-8">
        {/* Count Indicator */}
        <p className="text-sm text-neutral-500 font-medium">
          Showing <span className="font-semibold text-neutral-900">{filteredEvents.length}</span> of{" "}
          <span className="font-semibold text-neutral-900">{events.length}</span> events
        </p>

        {/* Progress Bar */}
        <div className="w-48 h-1.5 bg-neutral-200 rounded-full overflow-hidden my-1">
          <div className="bg-neutral-900 h-full w-[1%]" />
        </div>

        {/* Load More Button */}
        <button
          type="button"
          className="border border-neutral-300 rounded-full px-6 py-2.5 text-sm font-semibold text-neutral-900 hover:bg-neutral-100 transition-all cursor-pointer active:scale-95 focus:outline-none focus:ring-2 focus:ring-neutral-400"
        >
          Load More Events
        </button>
      </div>
    </div>
  );
};

export default EventList;
