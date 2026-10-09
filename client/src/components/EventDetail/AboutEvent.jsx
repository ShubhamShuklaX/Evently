import { CheckCircle2 } from "lucide-react";

const features = [
  "VIP Lounge Access",
  "Digital Program",
  "Valet Parking",
  "Immersive Audio",
];

const AboutEvent = ({ event }) => {
  return (
    <div>
      <h2 className="border-l-4 border-[#6365f1] pl-3 text-2xl sm:text-3xl font-bold text-[#1D1F23]">
        About This Event
      </h2>

      <div className="mt-5 flex flex-col gap-5 text-neutral-600 leading-7">
        <p>{event?.description || "No description provided for this event."}</p>
      </div>

      <h3 className="text-xl font-bold text-[#1D1F23] mt-10">Venue Features</h3>
      <div className="flex flex-wrap gap-3 mt-4">
        {features.map((feature) => (
          <span
            key={feature}
            className="flex items-center gap-2 bg-white border border-neutral-200 rounded-lg px-4 py-2.5 text-sm font-medium text-[#1D1F23]"
          >
            <CheckCircle2 size={16} className="text-[#6365f1]" />
            {feature}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AboutEvent;
