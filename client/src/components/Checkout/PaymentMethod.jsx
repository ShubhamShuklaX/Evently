import { CreditCard, ShieldCheck } from "lucide-react";
import { PaymentElement } from "@stripe/react-stripe-js";

const PaymentMethod = () => {
  return (
    <section>
      <div className="flex items-center gap-3 mb-5">
        <span className="w-8 h-8 rounded-full bg-[#EEF0FF] text-[#6365f1] text-sm font-semibold flex items-center justify-center">
          2
        </span>
        <h2 className="text-xl font-bold text-[#1D1F23]">Payment Method</h2>
      </div>

      <div className="bg-white border border-neutral-200 rounded-2xl p-4 sm:p-6 flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-100 pb-4">
          <div className="flex items-center gap-2">
            <CreditCard size={18} className="text-[#6365f1]" />
            <span className="font-semibold text-sm text-[#1D1F23]">
              Credit or Debit Card
            </span>
          </div>
          <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium bg-emerald-50 px-2.5 py-1 rounded-full">
            <ShieldCheck size={14} />
            Encrypted by Stripe
          </span>
        </div>

        {/* Real Stripe Payment Element iframe */}
        <div className="py-2">
          <PaymentElement options={{ layout: "tabs" }} />
        </div>
      </div>
    </section>
  );
};

export default PaymentMethod;
