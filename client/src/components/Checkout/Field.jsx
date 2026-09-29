const Field = ({ label, icon: Icon, hint, mono = false, ...inputProps }) => {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wide text-neutral-500 mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          {...inputProps}
          className={`w-full h-11 rounded-lg border border-neutral-200 bg-neutral-50 px-3 text-sm text-[#1D1F23] placeholder:text-neutral-400 outline-none focus:border-[#6365f1] focus:bg-white transition-colors ${
            mono ? "font-mono" : ""
          } ${Icon ? "pr-10" : ""}`}
        />
        {Icon && (
          <Icon
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400"
          />
        )}
      </div>
      {hint && <p className="text-xs italic text-neutral-500 mt-2">{hint}</p>}
    </div>
  );
};

export default Field;
