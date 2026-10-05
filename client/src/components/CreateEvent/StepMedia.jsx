import {
  UploadCloud,
  CheckCircle2,
  Trash2,
  Image as ImageIcon,
} from "lucide-react";

const StepMedia = ({ formData, handleChange }) => {
  const isFile = formData.img instanceof File;
  const isUrl = typeof formData.img === "string" && formData.img.trim() !== "";

  const previewUrl = isFile
    ? URL.createObjectURL(formData.img)
    : isUrl
      ? formData.img
      : "";

  const fileDetails = isFile
    ? {
        name: formData.img.name,
        size: (formData.img.size / (1024 * 1024)).toFixed(2) + " MB",
      }
    : isUrl
      ? {
          name: "Remote Web Image",
          size: "URL Link",
        }
      : null;

  const handleFile = (file) => {
    if (!file) return;

    // Check size on frontend: Max 2MB
    if (file.size > 2 * 1024 * 1024) {
      alert("File size exceeds 2MB limit. Please upload an image under 2MB.");
      return;
    }

    // Check allowed format
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      alert("Invalid format! Only JPG, PNG, and WEBP image files are allowed.");
      return;
    }

    // Aspect Ratio Validation: enforce landscape banner
    const imgObj = new Image();
    const objectUrl = URL.createObjectURL(file);
    imgObj.src = objectUrl;
    imgObj.onload = () => {
      URL.revokeObjectURL(objectUrl);
      if (imgObj.naturalWidth < imgObj.naturalHeight) {
        alert(
          "Invalid orientation! Please upload a landscape image (recommended 16:9 ratio, width must be greater than height). Portrait images distort event flyer banners.",
        );
        return;
      }
      handleChange({ target: { name: "img", value: file } });
    };
    imgObj.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      alert(
        "Unable to read image dimensions. Please select a valid image file.",
      );
    };
  };

  const clearImage = () => {
    handleChange({ target: { name: "img", value: "" } });
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-[#1D1F23]">Media Assets</h2>
      <p className="text-neutral-500 text-sm mt-1 mb-8">
        High-quality visuals are crucial for selling tickets.
      </p>

      {/* Show Live Preview when Image is selected */}
      {previewUrl ? (
        <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider">
              <CheckCircle2 size={16} />
              Banner Selected
            </div>
            <button
              type="button"
              onClick={clearImage}
              className="flex items-center gap-1.5 text-xs font-semibold text-rose-500 hover:text-rose-700 cursor-pointer"
            >
              <Trash2 size={14} />
              Remove Image
            </button>
          </div>

          <div className="relative h-60 w-full rounded-xl overflow-hidden border border-neutral-200 bg-black/5 mb-4">
            <img
              src={previewUrl}
              alt="Uploaded Banner Preview"
              className="w-full h-full object-cover"
            />
          </div>

          {fileDetails && (
            <div className="flex items-center justify-between text-xs text-neutral-500 bg-white border border-neutral-200 rounded-lg p-3">
              <span className="font-semibold text-neutral-800 truncate max-w-xs">
                {fileDetails.name}
              </span>
              <span className="font-mono text-neutral-400">
                {fileDetails.size}
              </span>
            </div>
          )}
        </div>
      ) : (
        /* Empty Upload Dropzone */
        <label className="border-2 border-dashed border-neutral-300 rounded-2xl bg-neutral-50 p-10 flex flex-col items-center justify-center cursor-pointer hover:bg-neutral-100 transition-colors">
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 text-[#6365f1]">
            <UploadCloud size={24} />
          </div>
          <h3 className="text-base font-bold text-[#1D1F23] mb-1">
            Upload Event Banner
          </h3>
          <p className="text-sm text-neutral-500 mb-4">
            Click to browse or drag and drop your flyer
          </p>
          <p className="text-xs text-neutral-400 font-medium bg-white px-3 py-1 rounded-full border border-neutral-200">
            PNG, JPG, or WEBP (Max 2MB)
          </p>
          <input
            className="hidden"
            type="file"
            accept="image/png, image/jpeg, image/webp"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </label>
      )}

      {/* Alternative URL Input */}
      <div className="mt-6">
        <label className=" text-sm font-bold text-[#1D1F23] mb-2 flex items-center gap-1.5">
          <ImageIcon size={16} className="text-neutral-400" />
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
