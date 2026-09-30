import { Plus } from "lucide-react";

// Simple heading row - title/subtitle on the left, primary action on the right.
const MyEventsHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-[#1D1F23]">Events Management</h1>
        <p className="text-neutral-500 text-sm mt-1">
          Create, edit, and track all of your events in one place.
        </p>
      </div>

      <button
        type="button"
        className="flex items-center gap-2 bg-[#6365f1] hover:bg-[#4f51e9] text-white font-semibold text-sm px-5 h-11 rounded-xl transition-colors cursor-pointer active:scale-95"
      >
        <Plus size={18} />
        Create Event
      </button>
    </div>
  );
};

export default MyEventsHeader;
