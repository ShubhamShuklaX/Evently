import { Search, X } from "lucide-react";

const statusFilters = ["All", "Live", "Draft", "Past"];

const MyEventsFilters = ({
  searchQuery = "",
  setSearchQuery,
  statusFilter = "All",
  setStatusFilter,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
      {/* Search Input */}
      <div className="relative w-full sm:w-80">
        <Search
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery?.(e.target.value)}
          placeholder="Search your events by title or venue..."
          className="w-full h-10.5 pl-10 pr-9 text-sm rounded-xl border border-neutral-200 bg-white outline-none focus:border-[#6365f1] focus:ring-1 focus:ring-[#6365f1] text-neutral-800 placeholder:text-neutral-400 shadow-2xs transition-all"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery?.("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 cursor-pointer"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Status Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
        {statusFilters.map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => setStatusFilter?.(status)}
            className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              statusFilter === status
                ? "bg-[#1D1F23] text-white shadow-xs"
                : "bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
            }`}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MyEventsFilters;
