import { ChevronRight, Clock } from "lucide-react";

const CheckoutBar = ({ timeLeft = "10:00" }) => {
  return (
    <div className="border-y border-neutral-200 bg-[#F6F7F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 min-h-16 flex flex-wrap items-center justify-between gap-3">
        <nav className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-neutral-500 overflow-x-auto">
          <span className="hover:text-[#1D1F23] cursor-pointer whitespace-nowrap">Events</span>
          <ChevronRight size={14} className="shrink-0" />
          <span className="hover:text-[#1D1F23] cursor-pointer whitespace-nowrap truncate max-w-36 sm:max-w-none">
            Midnight Sun Festival
          </span>
          <ChevronRight size={14} className="shrink-0" />
          <span className="font-semibold text-[#1D1F23] whitespace-nowrap">Checkout</span>
        </nav>

        <div className="flex items-center gap-2 bg-[#EEF0FF] border border-[#D8DAFF] rounded-full px-4 py-2 text-[#6365f1]">
          <Clock size={14} />
          <span className="text-[10px] font-semibold uppercase tracking-wider opacity-70">
            Hold ends in
          </span>
          <span className="font-mono font-bold text-sm">{timeLeft}</span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutBar;
