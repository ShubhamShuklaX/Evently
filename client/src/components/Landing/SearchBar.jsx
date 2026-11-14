import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      void navigate(`/events?search=${encodeURIComponent(query.trim())}`);
    } else {
      void navigate("/events");
    }
  };

  return (
    <div className="flex flex-row items-center gap-2 sm:gap-3 border border-neutral-200/90 bg-white rounded-2xl sm:rounded-3xl p-1.5 sm:p-2.5 md:p-3 w-full shadow-lg shadow-neutral-900/5">
      <div className="flex items-center flex-1 min-w-0 gap-2 sm:gap-2.5 px-3 sm:px-4 bg-neutral-50/70 border border-neutral-200 rounded-xl sm:rounded-2xl h-12 sm:h-13 md:h-14 focus-within:bg-white focus-within:border-[#6365f1] focus-within:ring-2 focus-within:ring-[#6365f1]/15 transition-all">
        <Search size={18} className="text-neutral-400 shrink-0 hidden xs:block" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="search"
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search events, artists, or venues..."
          className="w-full h-full text-xs xs:text-sm sm:text-base text-neutral-800 placeholder:text-neutral-400 bg-transparent outline-none truncate"
        />
      </div>

      <div className="hidden sm:block w-px h-6 bg-neutral-200 mr-0.5" />

      <button
        type="button"
        onClick={handleSearch}
        aria-label="Search events"
        className="bg-[#6365f1] hover:bg-[#4f51e9] text-white font-semibold w-12 h-12 sm:w-auto sm:h-13 md:h-14 px-0 sm:px-6 md:px-8 rounded-xl sm:rounded-2xl transition-all shadow-sm hover:shadow-md active:scale-95 shrink-0 cursor-pointer flex items-center justify-center gap-2"
      >
        <Search size={18} className="sm:hidden" />
        <span className="hidden sm:inline text-sm sm:text-base">Search Now</span>
      </button>
    </div>
  );
};

export default SearchBar;
