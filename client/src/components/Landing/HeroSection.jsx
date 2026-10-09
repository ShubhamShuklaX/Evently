import SearchBar from "./SearchBar";
import heroSection1 from "../../assets/heroSection1.jpg";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <div className="relative mb-12 sm:mb-16">
      <div className="relative w-full min-h-[560px] sm:min-h-[620px] lg:h-[640px] overflow-hidden flex items-center">
        <img
          className="absolute inset-0 object-cover object-[center_75%] w-full h-full"
          src={heroSection1}
          alt="Live events crowd"
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#1D1F23]/95 via-black/75 to-black/35 lg:to-transparent" />

        <div className="relative z-10 w-full px-4 sm:px-8 lg:px-15 xl:px-25 py-14 sm:py-18 flex flex-col justify-center">
          <div className="text-white flex flex-col gap-5 sm:gap-6 max-w-2xl">
            <h2 className="px-3 bg-indigo-800/80 rounded-full w-fit h-7 sm:h-8 flex items-center justify-center text-xs sm:text-sm font-medium text-indigo-100">
              Live Events are Back
            </h2>
            <h1 className="text-3xl sm:text-5xl lg:text-[56px] xl:text-[60px] font-extrabold text-[#F6F7F9FF] leading-[1.15] sm:leading-tight lg:leading-[1.1] flex flex-col">
              Discover Unforgettable{" "}
              <span className="text-indigo-400 sm:text-indigo-500 italic font-serif">
                Live Experience
              </span>
            </h1>
            <p className="max-w-xl leading-relaxed text-sm sm:text-base text-[#DFE1E4FF]">
              From world-class concerts to heart-pounding sports matches, find
              your next adventure on Evently. Secure your seats in seconds
              with our premium booking experience.
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
              <button
                onClick={() => {
                  void navigate("/events");
                }}
                className="bg-indigo-600 text-[#F4F6FF] font-medium px-5 sm:px-6 h-10 sm:h-11 rounded-full cursor-pointer hover:bg-indigo-700 active:scale-95 transition ease-in-out text-sm sm:text-base"
              >
                Explore Events
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("categories")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-transparent border border-white/50 text-[#F4F6FF] font-medium px-5 sm:px-6 h-10 sm:h-11 rounded-full cursor-pointer hover:bg-white/10 active:scale-95 transition ease-in-out text-sm sm:text-base"
              >
                Learn More
              </button>
            </div>

            <div className="w-full max-w-lg h-px bg-neutral-700/80 my-1" />

            <div className="w-full max-w-lg grid grid-cols-3 gap-2 sm:gap-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-mono font-bold text-[#F4F6FF]">
                  50k+
                </h3>
                <p className="text-xs sm:text-sm font-medium text-[#C8CBCFFF]">
                  Active Users
                </p>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-mono font-bold text-[#F4F6FF]">
                  1.2k+
                </h3>
                <p className="text-xs sm:text-sm font-medium text-[#C8CBCFFF]">
                  Global Venues
                </p>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-mono font-bold text-[#F4F6FF]">
                  24/7
                </h3>
                <p className="text-xs sm:text-sm font-medium text-[#C8CBCFFF]">
                  Customer Support
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="-mt-8 sm:-mt-10 relative z-20 max-w-5xl mx-auto px-4 sm:px-6">
        <SearchBar />
      </div>
    </div>
  );
};

export default HeroSection;
