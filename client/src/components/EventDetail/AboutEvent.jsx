import { CheckCircle2 } from "lucide-react";

const features = [
  "VIP Lounge Access",
  "Digital Program",
  "Valet Parking",
  "Immersive Audio",
];

const AboutEvent = () => {
  return (
    <div>
      <h2 className="border-l-4 border-[#6365f1] pl-3 text-3xl font-bold text-[#1D1F23]">
        About This Event
      </h2>

      <div className="mt-5 flex flex-col gap-5 text-neutral-600 leading-7">
        <p>
          Join us for an unforgettable evening where the boundaries between
          space and sound dissolve. The Galactic Symphony brings together a
          90-piece philharmonic orchestra to perform iconic scores from cinema's
          greatest space adventures, alongside original contemporary
          compositions inspired by deep-space imagery.
        </p>
        <p>
          Set in the architecturally stunning Grand Atrium, the performance is
          enhanced by 4K projection mapping that transforms the venue's vaulted
          ceilings into a window to the cosmos.
        </p>
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
