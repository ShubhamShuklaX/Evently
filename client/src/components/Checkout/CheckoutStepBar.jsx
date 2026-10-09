import { Check, Clock } from "lucide-react";

const CheckoutStepBar = ({ timeLeft = "10:00" }) => {
  return (
    <div className="border-y border-neutral-200 bg-[#F6F7F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar">
          {/* Step 1: done */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
              <Check size={12} strokeWidth={3} />
            </span>
            <span className="text-xs font-semibold text-[#1D1F23]">
              Details
            </span>
          </div>

          <span className="w-6 sm:w-12 h-px bg-neutral-300 shrink-0" />

          {/* Step 2: active */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#6365f1] text-white text-xs font-semibold flex items-center justify-center shrink-0">
              2
            </span>
            <span className="text-xs font-semibold text-[#1D1F23]">
              Payment
            </span>
          </div>

          <span className="w-6 sm:w-12 h-px bg-neutral-300 shrink-0" />

          {/* Step 3: upcoming */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-neutral-200 text-neutral-500 text-xs font-semibold flex items-center justify-center shrink-0">
              3
            </span>
            <span className="text-xs font-semibold text-neutral-500">
              Confirmation
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-[#EEF0FF] border border-[#D8DAFF] rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-[#6365f1] shrink-0">
          <Clock size={14} />
          <span className="text-[10px] font-semibold uppercase tracking-wider opacity-70">
            Hold expires in
          </span>
          <span className="font-mono font-bold text-xs sm:text-sm">{timeLeft}</span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutStepBar;
