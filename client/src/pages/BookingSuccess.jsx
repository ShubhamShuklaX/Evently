import Header from "../components/Header";
import Footer from "../components/Footer";
import { CheckCircle2 } from "lucide-react";

import { useBooking } from "../context/BookingContext";

import DigitalTicket from "../components/Success/DigitalTicket";
import SuccessSummary from "../components/Success/SuccessSummary";
import RecommendedEvents from "../components/Success/RecommendedEvents";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const BookingSuccess = () => {
  const { completedOrder } = useBooking();
  const navigate = useNavigate();

  const name = completedOrder?.customer?.firstName || "Guest";
  const email = completedOrder?.customer?.email || "your email";

  useEffect(() => {
    if (!completedOrder) {
      void navigate("/events", { replace: true });
    }
  }, [completedOrder, navigate]);

  if (!completedOrder) return null;

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F7F9]">
      <Header />

      <main className="grow flex flex-col items-center pt-16 pb-20">
        <div className="text-center max-w-3xl mx-auto px-6 mb-12">
          <div className="flex justify-center mb-6">
            <span className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
              <CheckCircle2 size={24} className="text-emerald-600" />
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#1D1F23] mb-4 tracking-tight">
            You're all set, {name}!
          </h1>
          <p className="text-neutral-500 text-lg">
            Your tickets are confirmed and ready. We've sent a copy to <br />
            <span className="font-semibold text-[#1D1F23]">{email}</span>.
          </p>
        </div>

        <div className="w-full max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
            <DigitalTicket />

            <div className="grid grid-cols-2 gap-4 mt-2">
              <button
                onClick={() => navigate("/bookings")}
                className="h-14 bg-neutral-200 hover:bg-neutral-300 text-[#1D1F23] font-bold rounded-xl transition-colors cursor-pointer"
              >
                Manage My Bookings
              </button>
              <button
                onClick={() => void navigate("/events")}
                className="h-14 bg-[#6365f1] hover:bg-[#4f51e9] text-white font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                Browse More Events &rarr;
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
            <SuccessSummary />
          </div>
        </div>
      </main>

      <RecommendedEvents />

      <Footer />
    </div>
  );
};

export default BookingSuccess;
