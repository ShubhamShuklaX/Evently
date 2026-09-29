import { Check, Clock } from "lucide-react";

const CheckoutStepBar = ({ timeLeft = "10:00" }) => {
  return (
    <div className="border-y border-neutral-200 bg-[#F6F7F9]">
      <div className="px-30 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Step 1: done */}
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center">
              <Check size={13} strokeWidth={3} />
            </span>
            <span className="text-xs font-semibold text-[#1D1F23]">
              Details
            </span>
          </div>

          <span className="w-12 h-px bg-neutral-300" />

          {/* Step 2: active */}
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#6365f1] text-white text-xs font-semibold flex items-center justify-center">
              2
            </span>
            <span className="text-xs font-semibold text-[#1D1F23]">
              Payment
            </span>
          </div>

          <span className="w-12 h-px bg-neutral-300" />

          {/* Step 3: upcoming */}
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-neutral-200 text-neutral-500 text-xs font-semibold flex items-center justify-center">
              3
            </span>
            <span className="text-xs font-semibold text-neutral-500">
              Confirmation
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-[#EEF0FF] border border-[#D8DAFF] rounded-full px-4 py-2 text-[#6365f1]">
          <Clock size={14} />
          <span className="text-[10px] font-semibold uppercase tracking-wider opacity-70">
            Hold expires in
          </span>
          <span className="font-mono font-bold text-sm">{timeLeft}</span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutStepBar;
