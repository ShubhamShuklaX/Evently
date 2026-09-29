import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CheckoutStepBar from "../components/Checkout/CheckoutStepBar";
import CheckoutBar from "../components/Checkout/CheckoutBar";
import CheckoutEventCard from "../components/Checkout/CheckoutEventCard";
import ContactInfo from "../components/Checkout/ContactInfo";
import PaymentMethod from "../components/Checkout/PaymentMethod";
import OrderSummary from "../components/Checkout/OrderSummary";
import PaymentStatus from "../components/Checkout/PaymentStatus";
import TrustCards from "../components/Checkout/TrustCards";
import StateSwitcher from "../components/Checkout/StateSwitcher";

const Checkout = () => {
  const navigate = useNavigate();
  const { currentEvent, selectedSeats, setCompletedOrder } = useBooking();
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState("initiating");

  // Initialize the form with some default values
  const methods = useForm({
    defaultValues: {
      firstName: "Alexander",
      lastName: "Hamilton",
      email: "a.hamilton@vanguard.io",
      cardNumber: "",
      expiryDate: "",
      cvc: "",
      saveCard: false,
    },
  });

  // ==========================================
  // 1. COUNTDOWN TIMER LOGIC (10 mins = 600s)
  // ==========================================
  const [timeLeft, setTimeLeft] = useState(600);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsProcessing(true);
      setStatus("timeout");
      return;
    }
    // Only tick down if we are NOT processing a payment
    if (!isProcessing) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, isProcessing]);

  // Helper to format seconds (e.g. 599 -> "09:59")
  const formattedTime = `${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, "0")}`;

  // ==========================================
  // 2. SIMULATED BACKEND API DELAY
  // ==========================================
  useEffect(() => {
    if (isProcessing && status === "initiating") {
      // Wait 2 seconds (Contacting Bank...)
      const t1 = setTimeout(() => {
        setStatus("processing");

        // Wait 2.5 more seconds (Verifying Transaction...)
        const t2 = setTimeout(() => {
          setStatus("success");

          // Wait 1.5 seconds so they can see the green checkmark,
          // then redirect them to the success page!
          setTimeout(() => navigate("../success", { relative: "path" }), 1500);
        }, 2500);

        return () => clearTimeout(t2);
      }, 2000);
      return () => clearTimeout(t1);
    }
  }, [isProcessing, status, navigate]);

  // ==========================================
  // 3. HANDLE FORM SUBMISSION
  // ==========================================
  const handlePaymentSubmit = (data) => {
    // 1. Bundle up the order data
    const finalOrder = {
      customer: data,
      event: currentEvent,
      seats: selectedSeats,
      totalPaid: currentEvent.pricePerTicket * selectedSeats.length + 19,
    };

    // 2. Save it to our fake backend Context
    setCompletedOrder(finalOrder);

    // 3. Trigger the UI
    setIsProcessing(true);
    setStatus("initiating");
  };

  // ==========================================
  // 4. RENDERING THE LOADING SCREEN
  // ==========================================
  if (isProcessing) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <CheckoutStepBar timeLeft={formattedTime} />
        <div className="px-30 py-20 flex flex-col items-center gap-16 flex-grow">
          <PaymentStatus status={status} />
          <TrustCards />
        </div>
        <Footer />
        <StateSwitcher status={status} onChange={setStatus} />
      </div>
    );
  }

  // ==========================================
  // 5. RENDERING THE MAIN FORM
  // ==========================================
  return (
    <div className="min-h-screen bg-[#F6F7F9]">
      <Header />
      {/* Pass the live timer down to the bars */}
      <CheckoutBar timeLeft={formattedTime} />
      <CheckoutStepBar timeLeft={formattedTime} />

      {/* We wrap everything in FormProvider to share state with child components */}
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handlePaymentSubmit)}
          className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10"
        >
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-10">
            <CheckoutEventCard />
            <ContactInfo />
            <PaymentMethod />
          </div>

          <div className="lg:col-span-5 xl:col-span-4 relative">
            <OrderSummary />
          </div>
        </form>
      </FormProvider>

      <Footer />
    </div>
  );
};

export default Checkout;
