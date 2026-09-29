import { CheckCircle2, Info, Lock, ShieldCheck } from "lucide-react";
import { useBooking } from "../../context/BookingContext";

const fees = [
  { label: "Service Fee", value: "$12.50" },
  { label: "Facility Charge", value: "$4.00" },
  { label: "Processing Fee", value: "$2.50" },
];

const cards = ["VISA", "MC", "AMEX"];

const OrderSummary = () => {
  // Grab the fake data from context!
  const { currentEvent, selectedSeats } = useBooking();

  // Calculate dynamic totals
  const ticketTotal = currentEvent.pricePerTicket * selectedSeats.length;
  const processingFee = 19.0;
  const finalTotal = ticketTotal + processingFee;

  return (
    <div className="sticky top-24 flex flex-col gap-4">
      {/* Summary card */}
      <div className="bg-white border border-neutral-200 rounded-2xl shadow-lg shadow-black/5 overflow-hidden">
        <div className="flex items-center justify-between bg-neutral-100 px-6 py-5">
          <h2 className="font-semibold text-[#1D1F23]">Order Summary</h2>
          <span className="bg-white border border-neutral-200 rounded-full px-2.5 py-1 font-mono text-[10px] text-neutral-600">
            #BK-2941
          </span>
        </div>

        <div className="p-6">
          {/* Dynamic Ticket line */}
          <div className="flex items-start justify-between">
            <div>
              <p className="flex items-center gap-2 font-semibold text-[#1D1F23]">
                {currentEvent.title}
              </p>
              <p className="text-sm text-neutral-500 mt-1">
                {selectedSeats.length}x General Admission
              </p>
            </div>
            <span className="font-mono font-semibold text-[#1D1F23]">
              ${ticketTotal.toFixed(2)}
            </span>
          </div>

          {/* Fees list */}
          <div className="mt-5 pt-5 border-t border-neutral-100 flex flex-col gap-3">
            {fees.map((fee, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-neutral-500 flex items-center gap-1.5 cursor-help">
                  {fee.label} <Info size={14} className="opacity-50" />
                </span>
                <span className="font-mono text-neutral-700">{fee.value}</span>
              </div>
            ))}
          </div>

          {/* Dynamic Total box */}
          <div className="mt-6 pt-5 border-t border-neutral-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-[#1D1F23] text-lg">Total</span>
              <span className="font-mono font-bold text-[#6365f1] text-2xl">
                ${finalTotal.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Dynamic Button */}
          <button
            type="submit"
            className="w-full h-14 mt-5 flex items-center justify-center gap-2 bg-[#6365f1] hover:bg-[#4f51e9] text-white font-bold uppercase tracking-wide rounded-xl transition-colors cursor-pointer active:scale-[0.98]"
          >
            <Lock size={17} />
            Confirm & Pay ${finalTotal.toFixed(2)}
          </button>

          <p className="text-center text-[11px] text-neutral-400 mt-4 leading-relaxed">
            By clicking Confirm & Pay, you agree to Evently's{" "}
            <a href="#" className="underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 text-neutral-400">
        {cards.map((card, idx) => (
          <span key={idx} className="text-[10px] font-bold tracking-widest">
            {card}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 text-neutral-500 text-xs mt-2">
        <ShieldCheck size={14} className="text-emerald-500" />
        Secure 256-bit encrypted payment
      </div>
    </div>
  );
};

export default OrderSummary;
