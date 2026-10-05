import { UploadCloud } from "lucide-react";

const StepMedia = ({ formData, handleChange }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-[#1D1F23]">Media Assets</h2>
      <p className="text-neutral-500 text-sm mt-1 mb-8">
        High-quality visuals are crucial for selling tickets.
      </p>

      <label className="border-2 border-dashed border-neutral-300 rounded-2xl bg-neutral-50 p-10 flex flex-col items-center justify-center cursor-pointer hover:bg-neutral-100 transition-colors">
        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
          <UploadCloud className="text-[#6365f1]" size={24} />
        </div>
        <h3 className="text-base font-bold text-[#1D1F23] mb-1">
          Upload Event Banner
        </h3>
        <p className="text-sm text-neutral-500 mb-4">
          Drag and drop or click to browse files
        </p>
        <p className="text-xs text-neutral-400 font-medium">
          PNG, JPG, or WEBP (Max 1MB)
        </p>
        <input
          className="hidden"
          type="file"
          accept="image/*"
          onChange={(e) => {
            // Grab the actual binary File object
            const file = e.target.files[0];

            // Fake the event structure so your handleChange function accepts it!
            handleChange({ target: { name: "img", value: file } });
          }}
        />
      </label>
      <div className="mt-6">
        <label className="block text-sm font-bold text-[#1D1F23] mb-2">
          Or paste an image URL
        </label>
        <input
          name="img"
          type="url"
          value={typeof formData.img === "string" ? formData.img : ""}
          onChange={handleChange}
          placeholder="https://images.unsplash.com/..."
          className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#6365f1] focus:ring-1 focus:ring-[#6365f1] transition-all"
        />
      </div>
    </div>
  );
};

export default StepMedia;
