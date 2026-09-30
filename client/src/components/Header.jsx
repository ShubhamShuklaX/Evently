import {
  MapPin,
  Heart,
  ShoppingBag,
  CalendarDays,
  Search,
  ChevronDown,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/Logo.png";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("evently_token");
  const user = JSON.parse(localStorage.getItem("evently_user") || null);

  const handleSignOut = () => {
    localStorage.removeItem("evently_token");
    localStorage.removeItem("evently_user");
    navigate("/");
  };

  return (
    <motion.header
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="sticky top-0 z-50"
    >
      <div className="relative px-15 py-3 flex items-center justify-between shadow bg-white/60 backdrop-blur-md">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img className="w-8 h-8" src={logo} alt="" />
          <h1 className="text-[#1D1F23FF] font-bold text-2xl">Evently</h1>
        </Link>

        {/* Search + Location */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search
              strokeWidth={1.7}
              size={17}
              color="#696D72FF"
              className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            />
            <input
              className="h-10 w-full min-w-90 pl-9 pr-3 bg-[#F6F7F9] text-[14px] leading-5.5 font-normal text-[#1D1F23] placeholder:text-[#696D72] rounded-[10px] border border-[#D4D6DA] outline-none hover:text-[#696D72] hover:border-[#D4D6DA] focus:text-[#696D72] focus:border-[#D4D6DA] disabled:text-[#696D72] disabled:bg-[#F6F7F9] disabled:border-[#D4D6DA]"
              type="search"
              placeholder="Search for concerts, sports, theater..."
              onKeyDown={(e) => {
                if (e.key === "Enter") navigate("/events");
              }}
            />
          </div>

          <div className="relative flex items-center gap-1.5 hover:bg-neutral-100 py-2 px-2 rounded-lg transition-all duration-200">
            <MapPin
              strokeWidth={1.7}
              size={19}
              className="text-neutral-800 pointer-events-none shrink-0"
            />
            <select className="appearance-none bg-transparent pr-6 text-sm font-medium text-neutral-800 outline-none cursor-pointer">
              <option value="ny">New York</option>
              <option value="delhi">Delhi</option>
              <option value="bangalore">Bangalore</option>
              <option value="mumbai">Mumbai</option>
            </select>
            <ChevronDown
              size={14}
              className="absolute left-25 top-1/2 -translate-y-1/2 text-neutral-700 pointer-events-none"
            />
          </div>
        </div>

        {/* Right side: categories, icons, sign in */}
        <div className="flex items-center gap-5">
          <div className="relative hover:bg-neutral-100 py-1.5 pl-2 rounded-lg transition-all duration-200">
            <select
              className="appearance-none bg-transparent pr-6 text-sm font-medium text-neutral-800 outline-none cursor-pointer"
              onChange={() => navigate("/events")}
            >
              <option value="">Categories</option>
              <option value="music">Music</option>
              <option value="Movie">Movie</option>
              <option value="theater">Theater</option>
              <option value="concert">Concert</option>
            </select>
            <ChevronDown
              size={14}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-700 pointer-events-none"
            />
          </div>

          <div className="flex items-center gap-7">
            <button
              title="Saved Events"
              aria-label="Saved Events"
              onClick={() => navigate("/events")}
              className="relative p-2 text-neutral-700 hover:text-indigo-600 hover:bg-neutral-100 rounded-xl transition-all duration-200 cursor-pointer active:scale-95"
            >
              <CalendarDays size={20} strokeWidth={1.8} />
            </button>
            <button
              title="Saved Events"
              aria-label="Saved Events"
              onClick={() => navigate("/events")}
              className="relative p-2 text-neutral-700 hover:text-indigo-600 hover:bg-neutral-100 rounded-xl transition-all duration-200 cursor-pointer active:scale-95"
            >
              <Heart size={20} strokeWidth={1.8} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-pink-500 rounded-full ring-2 ring-white" />
            </button>
            <button
              title="My Bookings & Cart"
              aria-label="My Bookings & Cart"
              onClick={() => navigate("/bookings")}
              className="relative p-2 text-neutral-700 hover:text-indigo-600 hover:bg-neutral-100 rounded-xl transition-all duration-200 cursor-pointer active:scale-95"
            >
              <ShoppingBag size={20} strokeWidth={1.8} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full ring-2 ring-white" />
            </button>
          </div>

          <div className="w-px h-6 bg-neutral-300" />

          {token ? (
            <div className="flex items-center gap-4">
              <button
                onClick={handleSignOut}
                className="bg-neutral-100 flex items-center justify-center gap-1 text-neutral-600 font-medium px-3 h-9 rounded-xl cursor-pointer hover:bg-rose-50 hover:text-rose-600 active:scale-95 transition-colors"
              >
                <LogOut className="w-4 h-4 mt-0.5" /> Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-[#6365f1] text-[#F4F6FF] font-medium px-3 h-9 rounded-xl cursor-pointer hover:bg-[#4f51e9] active:scale-95 transition-colors"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
