import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CheckoutStepBar from "../components/Checkout/CheckoutStepBar";
import CheckoutEventCard from "../components/Checkout/CheckoutEventCard";
import ContactInfo from "../components/Checkout/ContactInfo";
import PaymentMethod from "../components/Checkout/PaymentMethod";
import OrderSummary from "../components/Checkout/OrderSummary";
import PaymentStatus from "../components/Checkout/PaymentStatus";
import TrustCards from "../components/Checkout/TrustCards";
import StateSwitcher from "../components/Checkout/StateSwitcher";
import { API_BASE } from "../utils/api";

const Checkout = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    currentEvent,
    setCurrentEvent,
    getEventById,
    selectedSeats,
    setCompletedOrder,
    setSelectedSeats,
  } = useBooking();
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState("initiating");
  const [idempotencyKey] = useState(() => crypto.randomUUID());

  // Restore currentEvent from URL if we reloaded or went back
  useEffect(() => {
    if (!currentEvent?.id) {
      const event = getEventById(id);
      if (event) setCurrentEvent(event);
    }
    if (selectedSeats.length === 0 && !isProcessing) {
      void navigate(`/events/${id}/seats`, { replace: true });
    }
  }, [
    id,
    currentEvent,
    getEventById,
    setCurrentEvent,
    selectedSeats,
    navigate,
    isProcessing,
  ]);

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

  // 1. COUNTDOWN TIMER LOGIC
  const [timeLeft, setTimeLeft] = useState(600);

  useEffect(() => {
    if (isProcessing) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsProcessing(true);
          setStatus("timeout");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isProcessing]);

  // Helper to format seconds (e.g. 599 -> "09:59")
  const formattedTime = `${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, "0")}`;

  // 3. HANDLE FORM SUBMISSION
  const handlePaymentSubmit = async (data) => {
    setIsProcessing(true);
    setStatus("initiating");

    try {
      const token = localStorage.getItem("evently_token");

      const seatIds = [];

      selectedSeats.map((s) => seatIds.push(s.id));

      const totalPaid = currentEvent.price * selectedSeats.length + 19;

      const response = await fetch(`${API_BASE}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ seatIds, idempotencyKey, totalPaid }),
      });

      const result = await response.json();

      // 1. Bundle up the order data
      if (response.ok) {
        const finalOrder = {
          customer: data,
          event: currentEvent,
          seats: selectedSeats,
          totalPaid: totalPaid,
          orderId: result.order.id,
        };

        setCompletedOrder(finalOrder);
        setSelectedSeats([]);
        setStatus("success");
        setTimeout(() => {
          void navigate("../success", { relative: "path" });
        }, 1500);
      } else {
        alert(result.error || "Payment failed");
        setStatus("failed");
      }
    } catch (error) {
      console.error(error);
      setStatus("failed");
    }
  };

  // 4. RENDERING THE LOADING SCREEN
  if (isProcessing) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <CheckoutStepBar timeLeft={formattedTime} />
        <div className="px-30 py-20 flex flex-col items-center gap-16 grow">
          <PaymentStatus
            status={status}
            onAction={() => {
              if (status === "timeout") {
                void navigate(`/events/${currentEvent?.id}/seats`);
              } else {
                setIsProcessing(false);
                setStatus("initiating");
              }
            }}
          />
          <TrustCards />
        </div>
        <Footer />
        <StateSwitcher status={status} onChange={setStatus} />
      </div>
    );
  }

  // 5. RENDERING THE MAIN FORM
  return (
    <div className="min-h-screen bg-[#F6F7F9]">
      <Header />

      <CheckoutStepBar timeLeft={formattedTime} />

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
