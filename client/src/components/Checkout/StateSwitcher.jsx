const options = ["initiating", "processing", "success", "failed", "timeout"];

// Demo-only control from the design prototype.
// Remove this component once real payment logic drives the status.
const StateSwitcher = ({ status, onChange }) => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 bg-white border border-neutral-200 rounded-full p-2 shadow-xl shadow-black/10">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={`rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide border transition-colors cursor-pointer ${
            status === option
              ? "bg-[#6365f1] border-[#6365f1] text-white"
              : "bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default StateSwitcher;
