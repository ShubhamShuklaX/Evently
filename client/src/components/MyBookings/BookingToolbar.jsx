import { Search, Filter } from 'lucide-react';

const BookingToolbar = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-8">
      <div className="flex p-1 bg-neutral-100 rounded-xl w-full lg:w-auto overflow-x-auto scrollbar-none">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
              activeTab === tab
                ? "bg-white text-[#1D1F23] shadow-sm"
                : "text-neutral-500 hover:text-[#1D1F23]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 w-full lg:w-auto">
        <div className="relative w-full lg:w-72">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search events or order IDs..."
            className="w-full bg-white border border-neutral-200 text-sm rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-[#6365f1] focus:ring-1 focus:ring-[#6365f1] transition-all"
          />
        </div>
        <button className="bg-white border border-neutral-200 p-3 rounded-xl hover:bg-neutral-50 transition-colors text-neutral-600">
          <Filter size={18} />
        </button>
      </div>
    </div>
  );
};

export default BookingToolbar;
