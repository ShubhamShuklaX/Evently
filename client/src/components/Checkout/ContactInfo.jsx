import Field from "./Field";
import { useFormContext } from "react-hook-form";

const ContactInfo = () => {
  const { register } = useFormContext(); // Reach up and grab the form tools

  return (
    <section>
      <div className="flex items-center gap-3 mb-5">
        <span className="w-8 h-8 rounded-full bg-[#EEF0FF] text-[#6365f1] text-sm font-semibold flex items-center justify-center">
          1
        </span>
        <h2 className="text-xl font-bold text-[#1D1F23]">
          Contact Information
        </h2>
      </div>

      <div className="bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-5">
          {/* We attach {...register("fieldName")} to connect it to the state */}
          <Field label="First Name" type="text" {...register("firstName")} />
          <Field label="Last Name" type="text" {...register("lastName")} />
        </div>
        <Field
          label="Email Address"
          type="email"
          hint="Tickets will be delivered to this address instantly after purchase."
          {...register("email")}
        />
      </div>
    </section>
  );
};

export default ContactInfo;
