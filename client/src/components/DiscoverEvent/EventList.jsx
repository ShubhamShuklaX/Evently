import { ArrowUpDown, LayoutGrid, List, Loader2 } from "lucide-react";
import EventCard from "./../EventCard";
import { useState } from "react";
import { useBooking } from "../../context/BookingContext";
import Pagination from "../Pagination";

const ITEMS_PER_PAGE = 12;

const EventList = ({ activeCategory, locationQuery, searchQuery }) => {
  const [layout, setLayout] = useState("grid");
  const [sortBy, setSortBy] = useState("relevance");
  const [currentPage, setCurrentPage] = useState(1);
  const { events, eventsLoading } = useBooking();

  const filteredEvents = events.filter((event) => {
    if (
      activeCategory &&
      event.category?.toLowerCase() !== activeCategory.toLowerCase()
    ) {
      return false;
    }

    if (
      locationQuery &&
      !event.location?.toLowerCase().includes(locationQuery.toLowerCase())
    ) {
      return false;
    }

    if (
      searchQuery &&
      !event.title?.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !event.description?.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // If it passes both tests, keep it!
    return true;
  });

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortBy === "price-low") return (a.price || 0) - (b.price || 0);
    if (sortBy === "price-high") return (b.price || 0) - (a.price || 0);
    if (sortBy === "date") return new Date(a.date) - new Date(b.date);

    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  // Reset to page 1 whenever filters or sorting changes (React recommended render-phase adjustment)
  const filterKey = `${activeCategory}|${locationQuery}|${searchQuery}|${sortBy}`;
  const [prevFilterKey, setPrevFilterKey] = useState(filterKey);

  if (filterKey !== prevFilterKey) {
    setPrevFilterKey(filterKey);
    setCurrentPage(1);
  }

  // Pagination calculations: exactly 12 items per page
  const totalPages = Math.ceil(sortedEvents.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedEvents = sortedEvents.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

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
              <span className="text-neutral-900 font-semibold">
                {eventsLoading ? "..." : `${sortedEvents.length} events`}
              </span>
            </p>
          </div>

          {/* Sort & Layout Buttons */}
          <div className="flex items-center gap-3">
            <div className="flex items-center border border-neutral-200 shadow-sm rounded-xl px-3 py-2 bg-white hover:bg-neutral-50 transition-colors">
              <ArrowUpDown
                size={16}
                className="text-neutral-500 mr-2 pointer-events-none"
              />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort events"
                className="text-[15px] font-medium text-neutral-700 bg-transparent outline-none cursor-pointer pr-1"
              >
                <option value="relevance">Sort: Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="date">Date: Upcoming</option>
              </select>
            </div>

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
      </div>

      {/* Events Grid/List Container */}
      <div
        className={`mt-8 ${
          layout === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            : "flex flex-col gap-4"
        }`}
      >
        {eventsLoading ? (
          <div className="col-span-full py-24 flex flex-col items-center justify-center gap-3">
            <Loader2 size={36} className="text-[#6365f1] animate-spin" />
            <p className="text-neutral-500 font-medium text-sm animate-pulse">
              Discovering upcoming events...
            </p>
          </div>
        ) : sortedEvents.length > 0 ? (
          paginatedEvents.map((event) => (
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
          Showing{" "}
          <span className="font-semibold text-neutral-900">
            {sortedEvents.length > 0 ? startIndex + 1 : 0} –{" "}
            {Math.min(startIndex + ITEMS_PER_PAGE, sortedEvents.length)}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-neutral-900">
            {sortedEvents.length}
          </span>{" "}
          events
        </p>

        {/* Numbered Pagination with sliding window */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 120, behavior: "smooth" });
            }}
          />
        )}
      </div>
    </div>
  );
};

export default EventList;
