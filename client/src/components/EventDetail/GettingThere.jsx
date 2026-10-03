import { ChevronRight, Info } from "lucide-react";

const GettingThere = ({ event }) => {
  return (
    <div>
      <h3 className="text-xl font-bold text-[#1D1F23]">Getting There</h3>

      <div className="bg-white border border-neutral-200 rounded-2xl p-6 mt-4">
        <div className="flex items-start gap-3">
          <Info size={18} className="text-[#6365f1] mt-1 shrink-0" />
          <div>
            <p className="font-semibold text-[#1D1F23]">{event.location}</p>
            <p className="text-sm text-neutral-600 mt-0.5">
              The entrance is located on the North-East side of the building
              near the fountain plaza.
            </p>
          </div>
        </div>

        <button
          type="button"
          className="flex items-center gap-1 text-sm font-semibold text-[#6365f1] hover:underline mt-5 cursor-pointer"
        >
          View on Map
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default GettingThere;
