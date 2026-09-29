import { ChevronDown, MapPin, Sparkles } from "lucide-react";

// Step 4: Accept the state and setters as props
const FilterBar = ({ activeCategory, setActiveCategory, locationQuery, setLocationQuery }) => {
  return (
    <div className="w-70 shrink-0 bg-white border border-neutral-200 p-6 h-fit">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-[#1D1F23] text-lg">Filters</h3>
        <button
          type="button"
          className="text-sm cursor-pointer active:scale-95 text-[#6365f1] hover:underline"
        >
          Reset All
        </button>
      </div>

      {/* Date & Time */}
      <div className="border-t border-neutral-200 pt-4 pb-2">
        <button
          type="button"
          className="flex items-center justify-between w-full mb-3"
        >
          <h4 className="font-semibold text-[#1D1F23] text-sm">
            Date &amp; Time
          </h4>
          <ChevronDown size={16} className="text-neutral-500" />
        </button>

        <div className="flex flex-col gap-2.5">
          <label className="flex items-center gap-2 cursor-pointer text-sm text-neutral-700">
            <input
              type="checkbox"
              className="accent-[#6365f1] cursor-pointer w-4 h-4"
            />
            Today
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-sm text-neutral-700">
            <input
              type="checkbox"
              className="accent-[#6365f1] cursor-pointer w-4 h-4"
            />
            Tomorrow
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-sm text-neutral-700">
            <input
              type="checkbox"
              className="accent-[#6365f1] cursor-pointer w-4 h-4"
            />
            This Weekend
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-sm text-neutral-700">
            <input
              type="checkbox"
              className="accent-[#6365f1] cursor-pointer w-4 h-4"
            />
            Next Week
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-sm text-neutral-700">
            <input
              type="checkbox"
              className="accent-[#6365f1] cursor-pointer w-4 h-4"
            />
            Pick a Date
          </label>
        </div>
      </div>

      {/* Categories */}
      <div className="border-t border-neutral-200 pt-4 pb-2">
        <button
          type="button"
          className="flex items-center justify-between w-full mb-3"
        >
          <h4 className="font-semibold text-[#1D1F23] text-sm">Categories</h4>
          <ChevronDown size={16} className="text-neutral-500" />
        </button>

        <div className="flex flex-col gap-2.5">
          {/* We can dynamically render these check boxes instead of writing them out 8 times! */}
          {["Music", "Sports", "Theatre", "Comedy", "Art", "Tech", "Food", "Yoga"].map(cat => (
            <label key={cat} className="flex items-center gap-2 cursor-pointer text-sm text-neutral-700">
              <input
                type="checkbox"
                className="accent-[#6365f1] cursor-pointer w-4 h-4"
                checked={activeCategory === cat}
                onChange={() => setActiveCategory(activeCategory === cat ? "" : cat)}
              />
              {cat}
            </label>
          ))}
        </div>
      </div>

      {/* Location */}
      <div className="border-t border-neutral-200 pt-4 pb-2">
        <button
          type="button"
          className="flex items-center justify-between w-full mb-3"
        >
          <h4 className="font-semibold text-[#1D1F23] text-sm">Location</h4>
          <ChevronDown size={16} className="text-neutral-500" />
        </button>

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

        <div className="flex flex-col gap-2.5">
          <label className="flex items-center gap-2 cursor-pointer text-sm text-neutral-700">
            <input
              type="checkbox"
              className="accent-[#6365f1] cursor-pointer w-4 h-4"
            />
            Within 5 miles
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-sm text-neutral-700">
            <input
              type="checkbox"
              className="accent-[#6365f1] cursor-pointer w-4 h-4"
            />
            Within 10 miles
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-sm text-neutral-700">
            <input
              type="checkbox"
              className="accent-[#6365f1] cursor-pointer w-4 h-4"
            />
            Within 25 miles
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-sm text-neutral-700">
            <input
              type="checkbox"
              className="accent-[#6365f1] cursor-pointer w-4 h-4"
            />
            Within 50 miles
          </label>
        </div>
      </div>

      {/* Price Range */}
      <div className="border-t border-neutral-200 pt-4 pb-2">
        <button
          type="button"
          className="flex items-center justify-between w-full mb-3"
        >
          <h4 className="font-semibold text-[#1D1F23] text-sm">Price Range</h4>
          <ChevronDown size={16} className="text-neutral-500" />
        </button>

        <input
          type="range"
          min="0"
          max="500"
          className="w-full accent-[#6365f1] cursor-pointer"
        />
        <div className="flex items-center justify-between text-sm text-neutral-600 mt-1">
          <span>$0</span>
          <span>$500+</span>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-3">
          <button
            type="button"
            className="border border-neutral-300 rounded-full py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100 transition-colors"
          >
            Free Only
          </button>
          <button
            type="button"
            className="border border-neutral-300 rounded-full py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100 transition-colors"
          >
            Under $50
          </button>
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
  );
};

export default FilterBar;
