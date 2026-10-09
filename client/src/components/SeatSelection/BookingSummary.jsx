import { useState } from "react";
import { Armchair, ChevronRight, Loader2, ShieldCheck, Ticket } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useBooking } from "../../context/BookingContext";
import { useToast } from "../../context/ToastContext";
import { API_BASE } from "../../utils/api";

const BookingSummary = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { selectedSeats, currentEvent } = useBooking();
  const [isHolding, setIsHolding] = useState(false);
  const { toast, showModal } = useToast();

  async function handleConfirm() {
    const token = localStorage.getItem("evently_token");
    if (!token) {
      toast.warning("Sign In Required", "Please log in to reserve your seats and complete checkout.");
      void navigate("/login");
      return;
    }

    try {
      setIsHolding(true);
      const response = await fetch(`${API_BASE}/api/seats/hold`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ seatIds: selectedSeats.map((s) => s.id) }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        showModal({
          type: "warning",
          title: "Seats No Longer Available",
          message:
            data.error ||
            "One or more selected seats were reserved by another buyer just now. Please pick alternative seats.",
          confirmText: "Change Selection",
          showCancel: false,
        });
        return;
      }

      toast.success(
        "Seats Reserved!",
        `Holding ${selectedSeats.length} seat${selectedSeats.length > 1 ? "s" : ""} for checkout.`
      );
      void navigate(`/events/${id}/seats/checkout`);
    } catch (err) {
      console.error("Hold seats error:", err);
      toast.error(
        "Reservation Error",
        "Unable to hold seats. Please check your connection and try again."
      );
    } finally {
      setIsHolding(false);
    }
  }

  return (
    <div className="lg:sticky lg:top-24 flex flex-col gap-4">
      <div className="bg-white border border-neutral-200 rounded-2xl shadow-lg shadow-black/5 overflow-hidden">
        <div className="h-1.5 bg-[#6365f1]" />

        <div className="p-5 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-[#1D1F23]">Booking Summary</h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Review your selection before proceeding
          </p>

          {selectedSeats.length === 0 ? (
            <div className="flex flex-col items-center text-center py-16">
              <div className="w-12 h-12 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center">
                <Armchair size={22} />
              </div>
              <p className="font-semibold text-sm text-[#1D1F23] mt-4">
                No seats selected
              </p>
              <p className="text-xs text-neutral-500 mt-1 max-w-52.5 leading-relaxed">
                Select available seats from the map to start your booking.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3 mt-5">
              {selectedSeats.map((seat) => (
                <div
                  key={seat.id}
                  className="flex justify-between items-center bg-neutral-50 p-3 rounded-lg border border-neutral-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 text-[#6365f1] flex items-center justify-center">
                      <Armchair size={14} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1D1F23]">
                        Sec {seat.section}, Row {seat.row}
                      </p>
                      <p className="text-xs text-neutral-500">
                        Seat {seat.seat}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono font-medium text-[#1D1F23]">
                    ₹{currentEvent?.price?.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-neutral-200 p-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-600">
              Total Payable
            </span>
            <span className="text-2xl font-mono font-bold text-[#6365f1]">
              ₹{(currentEvent?.price * selectedSeats.length || 0).toFixed(2)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={selectedSeats.length === 0 || isHolding}
            className={`w-full h-13 mt-5 flex items-center justify-center gap-2 font-semibold rounded-xl transition-colors ${selectedSeats.length === 0 || isHolding ? "bg-[#6365f1]/50 text-white/90 cursor-not-allowed" : "bg-[#6365f1] hover:bg-[#4f51e9] text-white cursor-pointer active:scale-95"}`}
          >
            {isHolding ? (
              <>
                <Loader2 size={18} className="animate-spin text-white" />
                Holding Seats...
              </>
            ) : (
              <>
                Confirm Selection
                <ChevronRight size={16} />
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-4 mt-4 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
            <span className="flex items-center gap-1">
              <Ticket size={12} />
              Mobile Entry
            </span>
            <span className="w-px h-3 bg-neutral-300" />
            <span className="flex items-center gap-1">
              <ShieldCheck size={12} />
              Verified
            </span>
          </div>
        </div>
      </div>

      {/* Venue card */}
      <div className="flex items-center gap-3 bg-white border border-neutral-200 rounded-xl p-4">
        <img
          src={
            currentEvent?.img ||
            "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?"
          }
          alt={currentEvent?.location || "Venue"}
          className="w-12 h-12 rounded-lg object-cover shrink-0"
        />
        <div>
          <p className="font-semibold text-sm text-[#1D1F23]">
            {currentEvent?.location || "Grand Arena"}
          </p>
          <p className="text-xs text-neutral-500 mt-0.5">
            Capacity : {currentEvent?.capacity?.toLocaleString() || "100"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
