import { ChevronRight, Clock } from "lucide-react";

const CheckoutBar = ({ timeLeft = "10:00" }) => {
  return (
    <div className="border-y border-neutral-200 bg-[#F6F7F9]">
      <div className="px-30 h-16 flex items-center justify-between">
        <nav className="flex items-center gap-2 text-sm text-neutral-500">
          <span className="hover:text-[#1D1F23] cursor-pointer">Events</span>
          <ChevronRight size={14} />
          <span className="hover:text-[#1D1F23] cursor-pointer">
            Midnight Sun Festival
          </span>
          <ChevronRight size={14} />
          <span className="font-semibold text-[#1D1F23]">Checkout</span>
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
