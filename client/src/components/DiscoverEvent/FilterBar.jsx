import { MapPin, Sparkles, Filter, X } from "lucide-react";

const CATEGORIES = [
  "Music",
  "Sports",
  "Theater",
  "Comedy",
  "Conference",
  "Festival",
  "Art",
];

const FilterBar = ({
  activeCategory,
  setActiveCategory,
  locationQuery,
  setLocationQuery,
  onReset,
  mobileOpen = false,
  setMobileOpen = () => {},
}) => {
  const activeCount = (activeCategory ? 1 : 0) + (locationQuery.trim() ? 1 : 0);

  const filterContent = (
    <>
      {/* Categories */}
      <div className="border-t border-neutral-200 pt-4 pb-2">
        <div className="flex items-center justify-between w-full mb-3">
          <h4 className="font-semibold text-[#1D1F23] text-sm">Categories</h4>
        </div>

        <div className="flex flex-col gap-2.5">
          {CATEGORIES.map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-2.5 cursor-pointer text-sm text-neutral-700 hover:text-neutral-900 transition-colors"
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

        <div className="relative mb-2">
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
      <div className="mt-4 bg-[#EEF0FF] border border-[#D8DAFF] rounded-xl p-4">
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
    </>
  );

  return (
    <>
      {/* 1. Desktop Persistent Sticky Sidebar */}
      <aside className="hidden md:block w-72 shrink-0 bg-white border-r border-neutral-200 p-6 md:sticky md:top-16 z-30 md:self-start md:max-h-[calc(100vh-4rem)] md:overflow-y-auto no-scrollbar">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-[#1D1F23] text-lg">Filters</h3>
            {activeCount > 0 && (
              <span className="bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                {activeCount}
              </span>
            )}
          </div>
          {activeCount > 0 && (
            <button
              onClick={onReset}
              type="button"
              className="text-sm cursor-pointer active:scale-95 text-[#6365f1] hover:underline"
            >
              Reset All
            </button>
          )}
        </div>

        {filterContent}
      </aside>

      {/* 2. Mobile / Small Screen Filter Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex justify-end">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/45 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileOpen(false)}
          />

          {/* Slide-over panel */}
          <div className="relative w-full max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter size={18} className="text-[#6365f1]" />
                <h3 className="font-bold text-[#1D1F23] text-lg">Filters</h3>
                {activeCount > 0 && (
                  <span className="bg-[#6365f1] text-white text-xs px-2 py-0.5 rounded-full font-bold">
                    {activeCount}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                {activeCount > 0 && (
                  <button
                    type="button"
                    onClick={onReset}
                    className="text-xs font-semibold text-[#6365f1] hover:underline cursor-pointer"
                  >
                    Reset All
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
                  aria-label="Close filters"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Scrollable Filters Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5">
              {filterContent}
            </div>

            {/* Sticky Action Footer */}
            <div className="p-4 border-t border-neutral-200 bg-neutral-50/80">
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="w-full py-3 bg-[#6365f1] hover:bg-[#4f51e9] text-white font-semibold text-sm rounded-xl transition-all shadow-xs active:scale-98 cursor-pointer"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterBar;
