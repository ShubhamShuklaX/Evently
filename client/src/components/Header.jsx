import {
  Heart,
  ShoppingBag,
  Search,
  LogOut,
  Menu,
  X,
  LayoutDashboard,
} from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/Logo.png";
import { useState } from "react";

const Header = () => {
  const [searchParams] = useSearchParams();
  const urlSearch = searchParams.get("search") || "";
  const [query, setQuery] = useState(urlSearch);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("evently_token");
  const user = JSON.parse(localStorage.getItem("evently_user") || "null");
  const isOrganizer = user?.role === "organizer" || user?.role === "admin";

  // Sync query when urlSearch changes externally (e.g. Reset All)
  const [prevUrlSearch, setPrevUrlSearch] = useState(urlSearch);
  if (urlSearch !== prevUrlSearch) {
    setPrevUrlSearch(urlSearch);
    setQuery(urlSearch);
  }

  const handleSignOut = () => {
    localStorage.removeItem("evently_token");
    localStorage.removeItem("evently_user");
    setIsMobileMenuOpen(false);
    void navigate("/");
  };

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    setIsMobileSearchOpen(false);
    setIsMobileMenuOpen(false);
    if (query.trim()) {
      void navigate(`/events?search=${encodeURIComponent(query.trim())}`);
    } else {
      void navigate("/events");
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100 shadow-xs"
    >
      <div className="w-full px-4 sm:px-8 lg:px-12 py-3 flex items-center justify-between gap-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <img
            className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
            src={logo}
            alt="Evently"
          />
          <span className="text-[#1D1F23] font-bold text-xl sm:text-2xl tracking-tight">
            Evently
          </span>
        </Link>

        {/* Desktop / Tablet Search */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 max-w-md lg:max-w-lg mx-2 lg:mx-4 items-center"
        >
          <div className="relative w-full">
            <Search
              strokeWidth={1.7}
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
            />
            <input
              className="h-10 w-full pl-9 pr-3 bg-[#F6F7F9] text-sm text-[#1D1F23] placeholder:text-neutral-400 rounded-xl border border-neutral-200 outline-none transition-all focus:border-[#6365f1] focus:bg-white focus:ring-2 focus:ring-[#6365f1]/10"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="search"
              placeholder="Search concerts, sports, theater..."
            />
          </div>
        </form>

        {/* Right side controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Mobile search trigger */}
          <button
            type="button"
            title="Search"
            aria-label="Search"
            onClick={() => setIsMobileSearchOpen((prev) => !prev)}
            className="md:hidden p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-xl transition-colors cursor-pointer active:scale-95"
          >
            <Search size={20} strokeWidth={1.8} />
          </button>

          {/* Quick Icons */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              title="Saved Events"
              aria-label="Saved Events"
              onClick={() => navigate("/events")}
              className="relative p-2 text-neutral-600 hover:text-indigo-600 hover:bg-neutral-100 rounded-xl transition-all duration-200 cursor-pointer active:scale-95"
            >
              <Heart size={20} strokeWidth={1.8} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-pink-500 rounded-full ring-2 ring-white" />
            </button>
            <button
              type="button"
              title="My Bookings & Cart"
              aria-label="My Bookings & Cart"
              onClick={() => navigate("/bookings")}
              className="relative p-2 text-neutral-600 hover:text-indigo-600 hover:bg-neutral-100 rounded-xl transition-all duration-200 cursor-pointer active:scale-95"
            >
              <ShoppingBag size={20} strokeWidth={1.8} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full ring-2 ring-white" />
            </button>
          </div>

          {/* Organizer portal shortcut if authorized */}
          {isOrganizer && (
            <Link
              to="/organizer"
              className="hidden lg:flex items-center gap-1.5 px-3 h-9 rounded-xl text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4" /> Hub
            </Link>
          )}

          <div className="hidden sm:block w-px h-6 bg-neutral-200" />

          {/* Desktop Auth Controls */}
          {token ? (
            <div className="hidden sm:flex items-center gap-3">
              <button
                type="button"
                onClick={handleSignOut}
                className="bg-neutral-100 flex items-center justify-center gap-1.5 text-neutral-600 font-medium px-3.5 h-9 rounded-xl cursor-pointer hover:bg-rose-50 hover:text-rose-600 active:scale-95 transition-colors text-sm"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="hidden sm:flex items-center justify-center bg-[#6365f1] text-white font-medium px-4 h-9 rounded-xl cursor-pointer hover:bg-[#4f51e9] active:scale-95 transition-colors text-sm shadow-xs"
            >
              Sign In
            </button>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="sm:hidden p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-xl transition-colors cursor-pointer"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Expandable Mobile Search Bar */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-neutral-100 bg-neutral-50/90 px-4 py-3"
          >
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search
                  strokeWidth={1.7}
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                />
                <input
                  autoFocus
                  className="h-10 w-full pl-9 pr-3 bg-white text-sm text-[#1D1F23] placeholder:text-neutral-400 rounded-xl border border-neutral-200 outline-none focus:border-[#6365f1]"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  type="search"
                  placeholder="Search events..."
                />
              </div>
              <button
                type="submit"
                className="px-4 h-10 bg-[#6365f1] text-white text-sm font-semibold rounded-xl"
              >
                Go
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="sm:hidden overflow-hidden border-t border-neutral-100 bg-white px-4 py-4 flex flex-col gap-3 shadow-lg"
          >
            <Link
              to="/events"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 rounded-lg"
            >
              Discover Events
            </Link>
            <Link
              to="/bookings"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 rounded-lg flex items-center justify-between"
            >
              <span>My Bookings</span>
              <span className="w-2 h-2 bg-indigo-600 rounded-full" />
            </Link>
            {isOrganizer && (
              <Link
                to="/organizer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-semibold text-indigo-600 hover:bg-indigo-50 rounded-lg flex items-center gap-2"
              >
                <LayoutDashboard size={16} /> Organizer Hub
              </Link>
            )}

            <div className="pt-2 border-t border-neutral-100">
              {token ? (
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="w-full flex items-center justify-center gap-2 text-rose-600 bg-rose-50 font-semibold px-4 py-2.5 rounded-xl text-sm"
                >
                  <LogOut size={16} /> Sign Out
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate("/login");
                  }}
                  className="w-full flex items-center justify-center text-white bg-[#6365f1] font-semibold px-4 py-2.5 rounded-xl text-sm shadow-xs"
                >
                  Sign In / Register
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
