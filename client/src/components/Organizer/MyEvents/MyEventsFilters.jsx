import { Search } from "lucide-react";
import { useState } from "react";

const statusFilters = ["All", "Live", "Draft", "Past"];

// Local-only filter state for now - no actual filtering logic wired to the
// table yet, this just tracks which chip is selected visually.
const MyEventsFilters = () => {
  const [activeStatus, setActiveStatus] = useState("All");

  return (
    <div className="flex items-center justify-between">
      <div className="relative w-80">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
        />
        <input
          type="text"
          placeholder="Search your events..."
          className="w-full h-10 pl-9 pr-3 text-sm rounded-lg border border-neutral-300 outline-none focus:border-[#6365f1] text-neutral-800 placeholder:text-neutral-400"
        />
      </div>

      <div className="flex items-center gap-2">
        {statusFilters.map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => setActiveStatus(status)}
            className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
              activeStatus === status
                ? "bg-[#1D1F23] text-white"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
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
