import { CheckCircle2, Clock, ShieldCheck, XCircle } from "lucide-react";

const states = {
  initiating: {
    type: "loading",
    title: "Contacting Bank...",
    desc: "Please do not refresh the page or close your browser. We are securing your tickets with our payment partner.",
  },
  processing: {
    type: "loading",
    title: "Verifying Transaction",
    desc: "Please do not refresh the page or close your browser. We are securing your tickets with our payment partner.",
  },
  success: {
    type: "success",
    icon: CheckCircle2,
    iconStyle: "bg-emerald-50 text-emerald-500 border-emerald-200",
    title: "Payment Successful",
    desc: "Your tickets are confirmed. Taking you to your booking confirmation now.",
  },
  failed: {
    type: "error",
    icon: XCircle,
    iconStyle: "bg-red-50 text-red-500 border-red-200",
    title: "Payment Failed",
    desc: "We couldn't process your payment and you have not been charged. Please try again or use a different payment method.",
    action: "Try Again",
  },
  timeout: {
    type: "error",
    icon: Clock,
    iconStyle: "bg-amber-50 text-amber-500 border-amber-200",
    title: "Session Timed Out",
    desc: "Your seat hold has expired and the seats were released. Please select your seats again to continue.",
    action: "Back to Seat Selection",
  },
};

const PaymentStatus = ({ status = "initiating", onAction }) => {
  const state = states[status];
  const isLoading = state.type === "loading";
  const Icon = state.icon;

  return (
    <div className="flex flex-col items-center text-center">
      {/* Icon / spinner with glow */}
      <div className="relative w-28 h-28 flex items-center justify-center">
        <div className="absolute -inset-20 rounded-full bg-[radial-gradient(circle,rgba(99,101,241,0.14),transparent_65%)]" />
        <div className="relative w-24 h-24 rounded-full bg-white border border-neutral-200 shadow-sm flex items-center justify-center">
          {isLoading ? (
            <div className="w-10 h-10 rounded-full border-[3px] border-[#6365f1] border-t-transparent animate-spin" />
          ) : (
            <span
              className={`w-14 h-14 rounded-full border flex items-center justify-center ${state.iconStyle}`}
            >
              <Icon size={28} />
            </span>
          )}
        </div>
      </div>

      <h1 className="text-2xl sm:text-4xl font-bold text-[#1D1F23] mt-6 sm:mt-10">{state.title}</h1>
      <p className="text-sm sm:text-base text-neutral-500 leading-relaxed sm:leading-8 max-w-md mt-2 sm:mt-4">
        {state.desc}
      </p>

      {/* Progress track (loading) or action button (error) */}
      {isLoading && (
        <div className="w-full max-w-80 h-1 bg-neutral-200 rounded-full overflow-hidden mt-6 sm:mt-8">
          <div className="w-1/3 h-full bg-[#6365f1] rounded-full animate-pulse" />
        </div>
      )}
      {state.action && (
        <button
          onClick={onAction}
          type="button"
          className="mt-8 bg-[#6365f1] hover:bg-[#4f51e9] text-white font-semibold text-sm px-6 h-11 rounded-xl transition-colors cursor-pointer active:scale-95"
        >
          {state.action}
        </button>
      )}

      <div className="flex items-center gap-2 bg-white border border-neutral-200 rounded-full px-4 py-2 text-xs text-neutral-600 mt-8">
        <ShieldCheck size={14} className="text-emerald-600" />
        End-to-End Encrypted via Stripe
      </div>
    </div>
  );
};

export default PaymentStatus;
