import { CreditCard, Lock } from "lucide-react";
import Field from "./Field";
import { useFormContext } from "react-hook-form";

const PaymentMethod = () => {
  const { register } = useFormContext(); // Grab the form tools

  return (
    <section>
      <div className="flex items-center gap-3 mb-5">
        <span className="w-8 h-8 rounded-full bg-[#EEF0FF] text-[#6365f1] text-sm font-semibold flex items-center justify-center">
          2
        </span>
        <h2 className="text-xl font-bold text-[#1D1F23]">Payment Method</h2>
      </div>

      <div className="bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col gap-6">
        {/* Method tiles (No changes here for now) */}
        <div className="grid grid-cols-3 gap-4">
          <button
            type="button"
            className="h-24 flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-[#6365f1] bg-[#EEF0FF] text-[#1D1F23] text-sm font-semibold cursor-pointer"
          >
            <CreditCard size={20} className="text-[#6365f1]" />
            Credit Card
          </button>
        </div>

        {/* Card fields */}
        <Field
          label="Card Number"
          type="text"
          placeholder="0000 0000 0000 0000"
          icon={CreditCard}
          mono
          {...register("cardNumber")}
        />

        <div className="grid grid-cols-2 gap-5">
          <Field
            label="Expiry Date"
            type="text"
            placeholder="MM / YY"
            mono
            {...register("expiryDate")}
          />
          <Field
            label="CVC"
            type="text"
            placeholder="123"
            icon={Lock}
            mono
            {...register("cvc")}
          />
        </div>

        <label className="flex items-center gap-2.5 text-sm text-neutral-600 cursor-pointer">
          <input
            type="checkbox"
            {...register("saveCard")}
            className="accent-[#6365f1] w-4 h-4"
          />
          Securely save card details for future bookings
        </label>
      </div>
    </section>
  );
};

export default PaymentMethod;
