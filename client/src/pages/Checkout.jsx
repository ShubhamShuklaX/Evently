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
import LoadingSpinner from "../components/LoadingSpinner";
import { API_BASE } from "../utils/api";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements } from "@stripe/react-stripe-js";
import { AlertCircle } from "lucide-react";
import { useToast } from "../context/ToastContext";

const stripePromise = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
  : null;

// Inner form component that has access to useStripe and useElements hooks
const CheckoutFormContent = ({
  methods,
  handlePaymentSubmit,
  isProcessing,
  paymentError,
  appliedCoupon,
  setAppliedCoupon,
  discountAmount,
  updatingDiscount,
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const onSubmit = (data) => {
    void handlePaymentSubmit(data, stripe, elements);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10"
      >
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-10">
          <CheckoutEventCard />
          <ContactInfo />
          <PaymentMethod />

          {paymentError && (
            <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-sm flex items-start gap-3 shadow-sm">
              <AlertCircle size={20} className="shrink-0 text-rose-600 mt-0.5" />
              <div>
                <p className="font-semibold text-rose-800">Payment Issue</p>
                <p className="text-rose-600 mt-0.5">{paymentError}</p>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-5 xl:col-span-4 relative">
          <OrderSummary
            isProcessing={isProcessing}
            appliedCoupon={appliedCoupon}
            setAppliedCoupon={setAppliedCoupon}
            discountAmount={discountAmount}
            updatingDiscount={updatingDiscount}
          />
        </div>
      </form>
    </FormProvider>
  );
};

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
  const { toast } = useToast();

  const [clientSecret, setClientSecret] = useState("");
  const [paymentIntentId, setPaymentIntentId] = useState("");
  const [loadingIntent, setLoadingIntent] = useState(true);
  const [updatingDiscount, setUpdatingDiscount] = useState(false);
  const [intentError, setIntentError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showFulfillment, setShowFulfillment] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [status, setStatus] = useState("initiating");
  const [idempotencyKey] = useState(() => crypto.randomUUID());
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);

  // Restore currentEvent from URL if we reloaded or went back
  useEffect(() => {
    if (!currentEvent?.id) {
      const event = getEventById(id);
      if (event) setCurrentEvent(event);
    }
    if (selectedSeats.length === 0 && !showFulfillment) {
      void navigate(`/events/${id}/seats`, { replace: true });
    }
  }, [
    id,
    currentEvent,
    getEventById,
    setCurrentEvent,
    selectedSeats,
    navigate,
    showFulfillment,
  ]);

  // Request Stripe PaymentIntent on mount or when appliedCoupon changes
  useEffect(() => {
    if (selectedSeats.length === 0) return;
    let isMounted = true;

    async function initPayment() {
      try {
        const isInitialLoad = !clientSecret;
        if (isInitialLoad) {
          setLoadingIntent(true);
        } else {
          setUpdatingDiscount(true);
        }
        setIntentError("");
        const token = localStorage.getItem("evently_token");

        const res = await fetch(`${API_BASE}/api/orders/create-payment-intent`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            seatIds: selectedSeats.map((s) => s.id),
            couponCode: appliedCoupon?.code,
            paymentIntentId: paymentIntentId || undefined,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to initialize payment session");
        }

        if (isMounted) {
          if (data.clientSecret && !clientSecret) {
            setClientSecret(data.clientSecret);
          }
          if (data.paymentIntentId) {
            setPaymentIntentId(data.paymentIntentId);
          }
          setDiscountAmount(data.discount || 0);
        }
      } catch (err) {
        console.error("Payment init error:", err);
        if (isMounted) {
          setIntentError(err.message || "Failed to initialize secure payment.");
        }
      } finally {
        if (isMounted) {
          setLoadingIntent(false);
          setUpdatingDiscount(false);
        }
      }
    }

    void initPayment();

    return () => {
      isMounted = false;
    };
  }, [selectedSeats, appliedCoupon]);

  const storedUser = JSON.parse(localStorage.getItem("evently_user") || "{}");
  const nameParts = (storedUser.name || "Alexander Hamilton").trim().split(" ");
  const defaultFirstName = nameParts[0] || "Alexander";
  const defaultLastName = nameParts.slice(1).join(" ") || "Hamilton";
  const defaultEmail = storedUser.email || "a.hamilton@vanguard.io";

  const methods = useForm({
    defaultValues: {
      firstName: defaultFirstName,
      lastName: defaultLastName,
      email: defaultEmail,
      cardNumber: "",
      expiryDate: "",
      cvc: "",
      saveCard: false,
    },
  });

  // 1. COUNTDOWN TIMER LOGIC
  const [timeLeft, setTimeLeft] = useState(600);

  useEffect(() => {
    if (showFulfillment) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowFulfillment(true);
          setStatus("timeout");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showFulfillment]);

  // Helper to format seconds (e.g. 599 -> "09:59")
  const formattedTime = `${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, "0")}`;

  // 3. HANDLE STRIPE PAYMENT & ORDER CREATION
  const handlePaymentSubmit = async (data, stripe, elements) => {
    if (!stripe || !elements) {
      setPaymentError("Payment system is still initializing. Please wait a moment.");
      return;
    }

    setPaymentError("");
    setIsProcessing(true);

    try {
      // Step A: Trigger client-side validation in Stripe Elements
      const { error: submitError } = await elements.submit();
      if (submitError) {
        console.error("Elements submit error:", submitError);
        setPaymentError(submitError.message || "Please complete payment details.");
        setIsProcessing(false);
        return;
      }

      // Step B: Confirm Payment with Stripe
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/success`,
        },
        redirect: "if_required",
      });

      if (error) {
        console.error("Stripe payment error:", error);
        setPaymentError(error.message || "Payment verification failed. Please try again.");
        setIsProcessing(false);
        return;
      }

      if (!paymentIntent || paymentIntent.status !== "succeeded") {
        setPaymentError("Payment was not completed. Please try again.");
        setIsProcessing(false);
        return;
      }

      // Step C: Payment Succeeded! Transition to fulfillment screen
      setShowFulfillment(true);
      setStatus("processing");

      const token = localStorage.getItem("evently_token");
      const seatIds = selectedSeats.map((s) => s.id);
      const totalPaid = Math.max(
        0,
        currentEvent.price * selectedSeats.length - discountAmount + 19,
      );

      const response = await fetch(`${API_BASE}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          seatIds,
          idempotencyKey,
          totalPaid,
          paymentIntentId: paymentIntent.id,
          couponCode: appliedCoupon?.code,
        }),
      });

      const result = await response.json();

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
        toast.success(
          "Payment Confirmed! 🎉",
          `Order #${result.order.id.slice(0, 8).toUpperCase()} processed successfully.`
        );
        setTimeout(() => {
          void navigate("../success", { relative: "path" });
        }, 1500);
      } else {
        const errorMsg = result.error || "Order booking failed";
        setPaymentError(errorMsg);
        setStatus("failed");
        toast.error("Payment Failed", errorMsg);
      }
    } catch (err) {
      console.error("Checkout submission error:", err);
      const errorMsg = err.message || "An unexpected error occurred during payment.";
      setPaymentError(errorMsg);
      setStatus("failed");
      toast.error("Transaction Error", errorMsg);
    } finally {
      setIsProcessing(false);
    }
  };

  // 4. RENDERING THE PROCESSING / FULFILLMENT SCREEN
  if (showFulfillment) {
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
                setShowFulfillment(false);
                setStatus("initiating");
              }
            }}
          />
          <TrustCards />
        </div>
        <Footer />
      </div>
    );
  }

  // 5. INTENT LOADING OR ERROR STATE
  if (loadingIntent) {
    return (
      <div className="min-h-screen bg-[#F6F7F9] flex flex-col font-sans">
        <Header />
        <CheckoutStepBar timeLeft={formattedTime} />
        <div className="flex-1 flex items-center justify-center">
          <LoadingSpinner message="Securing tickets & initializing Stripe..." fullScreen={false} />
        </div>
        <Footer />
      </div>
    );
  }

  if (intentError) {
    return (
      <div className="min-h-screen bg-[#F6F7F9] flex flex-col font-sans">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="bg-white border border-rose-200 rounded-2xl p-8 max-w-md text-center shadow-sm">
            <h3 className="text-rose-600 font-bold text-lg mb-2">Checkout Error</h3>
            <p className="text-sm text-neutral-600 mb-6">{intentError}</p>
            <button
              type="button"
              onClick={() => navigate(`/events/${id}/seats`)}
              className="px-6 py-2.5 bg-[#6365f1] hover:bg-[#4f51e9] text-white text-sm font-semibold rounded-xl transition cursor-pointer"
            >
              Back to Seat Selection
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // 6. MAIN STRIPE ELEMENTS CHECKOUT FORM
  return (
    <div className="min-h-screen bg-[#F6F7F9]">
      <Header />
      <CheckoutStepBar timeLeft={formattedTime} />

      {clientSecret && stripePromise ? (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            appearance: {
              theme: "stripe",
              variables: {
                colorPrimary: "#6365f1",
                borderRadius: "12px",
              },
            },
          }}
        >
          <CheckoutFormContent
            methods={methods}
            handlePaymentSubmit={handlePaymentSubmit}
            isProcessing={isProcessing}
            paymentError={paymentError}
            appliedCoupon={appliedCoupon}
            setAppliedCoupon={setAppliedCoupon}
            discountAmount={discountAmount}
            updatingDiscount={updatingDiscount}
          />
        </Elements>
      ) : (
        <div className="max-w-md mx-auto p-12 text-center text-neutral-500">
          Stripe publishable key is missing. Please check your client/.env file.
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Checkout;

