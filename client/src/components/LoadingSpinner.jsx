import { Loader2 } from "lucide-react";

const LoadingSpinner = ({
  message = "Loading...",
  fullScreen = true,
  size = 40,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 bg-[#F8F9FB] ${
        fullScreen ? "min-h-screen" : "py-12"
      } ${className}`}
    >
      <Loader2
        size={size}
        className="animate-spin text-[#6365f1]"
      />
      {message && (
        <p className="text-sm md:text-base font-medium text-neutral-500 animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;

