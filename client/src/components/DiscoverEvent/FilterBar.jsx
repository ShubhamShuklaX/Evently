import { ChevronDown, MapPin, Sparkles, Filter, X } from "lucide-react";
import { useState } from "react";

// Step 4: Accept the state and setters as props
const FilterBar = ({
  activeCategory,
  setActiveCategory,
  locationQuery,
  setLocationQuery,
  onReset,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeCount = (activeCategory ? 1 : 0) + (locationQuery.trim() ? 1 : 0);

  return (
    <div className="w-full md:w-70 shrink-0 bg-white border-b md:border-b-0 md:border-r border-neutral-200 p-6 h-fit">
      {/* Mobile Toggle Bar */}
      <div className="flex items-center justify-between md:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center gap-2 text-sm font-semibold text-neutral-900 bg-neutral-100 hover:bg-neutral-200 px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
        >
          <Filter size={16} className="text-indigo-600" />
          <span>Filters</span>
          {activeCount > 0 && (
            <span className="bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
              {activeCount}
            </span>
          )}
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${mobileOpen ? "rotate-180" : ""}`}
          />
        </button>

        {activeCount > 0 && (
          <button
            onClick={onReset}
            type="button"
            className="text-xs font-semibold text-indigo-600 hover:underline cursor-pointer"
          >
            Reset All
          </button>
        )}
      </div>

      {/* Filter Body - always on desktop, toggleable on mobile */}
      <div className={`${mobileOpen ? "block mt-4 pt-4 border-t border-neutral-200" : "hidden"} md:block`}>
        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-[#1D1F23] text-lg">Filters</h3>
            {activeCount > 0 && (
              <span className="bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                {activeCount}
              </span>
            )}
          </div>
          <button
            onClick={onReset}
            type="button"
            className="text-sm cursor-pointer active:scale-95 text-[#6365f1] hover:underline"
          >
            Reset All
          </button>
        </div>

        {/* Categories */}
        <div className="border-t border-neutral-200 pt-4 pb-2">
          <div className="flex items-center justify-between w-full mb-3">
            <h4 className="font-semibold text-[#1D1F23] text-sm">Categories</h4>
          </div>

          <div className="flex flex-col gap-2.5">
            {[
              "Music",
              "Sports",
              "Theater",
              "Comedy",
              "Conference",
              "Festival",
              "Art",
            ].map((cat) => (
              <label
                key={cat}
                className="flex items-center gap-2 cursor-pointer text-sm text-neutral-700"
              >
                <input
                  type="checkbox"
                  className="accent-[#6365f1] cursor-pointer w-4 h-4 rounded"
                  checked={activeCategory.toLowerCase() === cat.toLowerCase()}
                  onChange={() =>
                    setActiveCategory(
                      activeCategory.toLowerCase() === cat.toLowerCase()
                        ? ""
                        : cat,
                    )
                  }
                />
                <span className="truncate">{cat}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="border-t border-neutral-200 pt-4 pb-2">
          <div className="flex items-center justify-between w-full mb-3">
            <h4 className="font-semibold text-[#1D1F23] text-sm">Location</h4>
          </div>

          <div className="relative mb-3">
            <MapPin
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
            />
            <input
              type="text"
              placeholder="Search by venue..."
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              className="w-full h-9 pl-8 pr-3 text-sm rounded-lg border border-neutral-300 outline-none focus:border-[#6365f1] text-neutral-800 placeholder:text-neutral-400"
            />
          </div>
        </div>

        {/* Smart Insights */}
        <div className="mt-5 bg-[#EEF0FF] border border-[#D8DAFF] rounded-xl p-4">
          <div className="flex items-center gap-1.5 text-[#4338ca] text-sm font-semibold mb-1.5">
            <Sparkles size={15} />
            Smart Insights
          </div>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Based on your activity, ticket prices for
            <span className="font-semibold text-[#1D1F23]"> Concerts</span> are
            trending lower this week in
            <span className="font-semibold text-[#1D1F23]"> New York</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
