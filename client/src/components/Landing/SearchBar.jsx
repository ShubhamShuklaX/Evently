import { Search, MapPin } from "lucide-react";
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
    <div className="flex items-center gap-3 border-2 border-neutral-300 bg-white rounded-2xl px-5 py-3 w-full shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]">
      <div className="flex items-center flex-1 gap-2 px-3 border border-neutral-200 rounded-xl h-14 shadow-[inset_0_1px_1px_rgba(0,0,0,0.05),inset_0_4px_6px_rgba(34,42,53,0.04),inset_0_24px_68px_rgba(47,48,55,0.05),inset_0_2px_3px_rgba(0,0,0,0.04)]">
        <Search size={18} className="text-neutral-500 shrink-0" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="search"
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search events, artists, or venues..."
          className="w-full h-full text-sm text-neutral-800 placeholder:text-neutral-500 outline-none "
        />
      </div>
      <div className="w-px h-6 bg-neutral-300 mr-1 " />

      <div className="flex items-center gap-2 px-3 border border-neutral-200 rounded-xl h-14 w-56 shrink-0 shadow-[inset_0_1px_1px_rgba(0,0,0,0.05),inset_0_4px_6px_rgba(34,42,53,0.04),inset_0_24px_68px_rgba(47,48,55,0.05),inset_0_2px_3px_rgba(0,0,0,0.04)]">
        <MapPin size={18} className="text-neutral-500 shrink-0" />
        <input
          type="text"
          className="w-full h-full text-sm text-neutral-800 outline-none placeholder:text-neutral-500"
          placeholder="New York"
        />
      </div>

      <button
        onClick={handleSearch}
        className="bg-[#6365f1] hover:bg-[#4f51e9] text-white text-sm font-semibold px-8 h-14 rounded-xl transition-colors shrink-0 cursor-pointer"
      >
        Search Now
      </button>
    </div>
  );
};

export default SearchBar;
