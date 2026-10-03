import { Loader } from "lucide-react";

const LoadingSpinner = ({ message = "Loading...", fullScreen = true }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 bg-[#F8F9FB] ${
        fullScreen ? "min-h-screen" : "py-12"
      }`}
    >
      <Loader className="w-13 h-13 animate-spin text-[#6365f1]" />
      {message && (
        <p className="text-base font-medium text-neutral-500">{message}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
