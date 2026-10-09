import { useState } from "react";
import { Info, Lock, Loader2, ShieldCheck, Tag, X, AlertCircle, CheckCircle2 } from "lucide-react";
import { useBooking } from "../../context/BookingContext";
import { useToast } from "../../context/ToastContext";
import { API_BASE } from "../../utils/api";

const fees = [
  { label: "Service Fee", value: "₹12.50" },
  { label: "Facility Charge", value: "₹4.00" },
  { label: "Processing Fee", value: "₹2.50" },
];

const cards = ["VISA", "MC", "AMEX"];

const OrderSummary = ({
  isProcessing = false,
  appliedCoupon = null,
  setAppliedCoupon = () => {},
  discountAmount = 0,
  updatingDiscount = false,
}) => {
  const { currentEvent, selectedSeats } = useBooking();
  const [couponInput, setCouponInput] = useState("");
  const [validating, setValidating] = useState(false);
  const [couponError, setCouponError] = useState("");
  const { toast } = useToast();

  const seatCount = selectedSeats?.length || 0;
  const ticketPrice = currentEvent?.price || 0;
  const ticketTotal = ticketPrice * seatCount;
  const processingFee = 19.0;
  const finalTotal =
    ticketTotal > 0
      ? Math.max(0, ticketTotal - discountAmount + processingFee)
      : 0;

  const handleApplyCoupon = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!couponInput.trim() || validating) return;

    try {
      setValidating(true);
      setCouponError("");
      const token = localStorage.getItem("evently_token");

      const res = await fetch(`${API_BASE}/api/coupons/validate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ code: couponInput.trim() }),
      });

      const data = await res.json();
      if (!res.ok) {
        const errText = data.error || "Invalid promo code";
        setCouponError(errText);
        toast.error("Invalid Code", errText);
        return;
      }

      if (data.coupon) {
        setAppliedCoupon(data.coupon);
        setCouponInput("");
        setCouponError("");
        const discountLabel =
          data.coupon.type === "percentage"
            ? `${data.coupon.discount}% off`
            : `₹${data.coupon.discount} off`;
        toast.success(
          "Promo Code Applied!",
          `Code ${data.coupon.code} applied (${discountLabel}).`
        );
      }
    } catch (err) {
      console.error(err);
      const errText = "Network error while validating coupon";
      setCouponError(errText);
      toast.error("Network Error", errText);
    } finally {
      setValidating(false);
    }
  };

  const handleRemoveCoupon = () => {
    const code = appliedCoupon?.code;
    setAppliedCoupon(null);
    setCouponError("");
    toast.info("Promo Code Removed", code ? `Code ${code} removed.` : "Discount removed.");
  };

  return (
    <div className="sticky top-24 flex flex-col gap-4">
      {/* Summary card */}
      <div className="bg-white border border-neutral-200 rounded-2xl shadow-lg shadow-black/5 overflow-hidden">
        <div className="flex items-center justify-between bg-neutral-100 px-4 sm:px-6 py-4 sm:py-5">
          <h2 className="font-semibold text-[#1D1F23]">Order Summary</h2>
          <span className="bg-white border border-neutral-200 rounded-full px-2.5 py-1 font-mono text-[10px] text-neutral-600">
            STRIPE SECURE
          </span>
        </div>

        <div className="p-4 sm:p-6">
          {/* Dynamic Ticket line */}
          <div className="flex items-start justify-between">
            <div>
              <p className="flex items-center gap-2 font-semibold text-[#1D1F23]">
                {currentEvent?.title || "Event"}{" "}
              </p>
              <p className="text-sm text-neutral-500 mt-1">
                {selectedSeats?.length || 0}x General Admission
              </p>
            </div>
            <span className="font-mono font-semibold text-[#1D1F23]">
              ₹{ticketTotal.toFixed(2)}
            </span>
          </div>

          {/* Fees list */}
          <div className="mt-5 pt-5 border-t border-neutral-100 flex flex-col gap-3">
            {fees.map((fee) => (
              <div
                key={fee.label}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-neutral-500 flex items-center gap-1.5 cursor-help">
                  {fee.label} <Info size={14} className="opacity-50" />
                </span>
                <span className="font-mono text-neutral-700">{fee.value}</span>
              </div>
            ))}
          </div>

          {/* Promo Code Voucher Section */}
          <div className="mt-5 pt-5 border-t border-neutral-100">
            {appliedCoupon ? (
              <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                <div className="flex items-center gap-2.5 min-w-0">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  <div className="min-w-0">
                    <span className="font-mono font-bold text-xs text-emerald-800 tracking-wider">
                      {appliedCoupon.code}
                    </span>
                    <span className="text-[11px] text-emerald-600 truncate block">
                      {appliedCoupon.type === "percentage"
                        ? `${appliedCoupon.discount}% discount applied`
                        : `₹${appliedCoupon.discount} flat off applied`}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveCoupon}
                  className="p-1 text-emerald-700 hover:text-rose-600 transition-colors cursor-pointer shrink-0"
                  title="Remove Promo Code"
                >
                  <X size={15} />
                </button>
              </div>
            ) : (
              <div>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                    />
                    <input
                      type="text"
                      placeholder="Promo / Voucher Code"
                      value={couponInput}
                      onChange={(e) => {
                        setCouponInput(e.target.value.toUpperCase());
                        setCouponError("");
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          e.stopPropagation();
                          void handleApplyCoupon(e);
                        }
                      }}
                      className="w-full pl-9 pr-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs uppercase font-mono font-semibold focus:outline-none focus:border-[#6365f1]"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    disabled={validating || !couponInput.trim()}
                    className="px-4 py-2 bg-[#1D1F23] hover:bg-[#34373D] text-white text-xs font-semibold rounded-xl transition-colors disabled:opacity-40 cursor-pointer inline-flex items-center gap-1.5 active:scale-95"
                  >
                    {validating ? (
                      <Loader2 size={13} className="animate-spin" />
                    ) : (
                      "Apply"
                    )}
                  </button>
                </div>
                {couponError && (
                  <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1">
                    <AlertCircle size={12} className="shrink-0" /> {couponError}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Discount amount line if applied */}
          {discountAmount > 0 && (
            <div className="flex items-center justify-between text-sm text-emerald-600 font-semibold mt-3">
              <span>Discount ({appliedCoupon?.code})</span>
              <span className="font-mono">
                -₹{discountAmount.toFixed(2)}
              </span>
            </div>
          )}

          {/* Dynamic Total box */}
          <div className="mt-6 pt-5 border-t border-neutral-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-[#1D1F23] text-lg flex items-center gap-2">
                Total
                {updatingDiscount && (
                  <Loader2 size={14} className="animate-spin text-[#6365f1]" />
                )}
              </span>
              <span className="font-mono font-bold text-[#6365f1] text-2xl">
                ₹{finalTotal.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Dynamic Button */}
          <button
            type="submit"
            disabled={isProcessing || seatCount === 0 || updatingDiscount}
            className="w-full h-14 mt-5 flex items-center justify-center gap-2 bg-[#6365f1] hover:bg-[#4f51e9] text-white font-bold uppercase tracking-wide rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-[0.98]"
          >
            {isProcessing ? (
              <>
                <Loader2 size={18} className="animate-spin text-white" />
                Processing Payment...
              </>
            ) : updatingDiscount ? (
              <>
                <Loader2 size={18} className="animate-spin text-white" />
                Updating Total...
              </>
            ) : (
              <>
                <Lock size={17} />
                Confirm & Pay ₹{finalTotal.toFixed(2)}
              </>
            )}
          </button>

          <p className="text-center text-[11px] text-neutral-400 mt-4 leading-relaxed">
            By clicking Confirm & Pay, you agree to Evently's terms and purchase policies.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 text-neutral-400">
        {cards.map((card) => (
          <span key={card} className="text-[10px] font-bold tracking-widest">
            {card}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 text-neutral-500 text-xs mt-2">
        <ShieldCheck size={14} className="text-emerald-500" />
        Secure Encrypted Transaction
      </div>
    </div>
  );
};

export default OrderSummary;
