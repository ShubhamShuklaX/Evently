import SearchBar from "./SearchBar";
import heroSection1 from "../../assets/heroSection1.jpg";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <div className="relative mb-16">
      <div>
        <div className=" w-full h-150 overflow-hidden">
          <img
            className=" object-cover object-[center_75%] w-full h-full"
            src={heroSection1}
            alt=""
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#1D1F23]/90 via-black/50 to-transparent" />
          <div className=" absolute top-20 left-[8%] flex flex-col gap-7">
            <div className=" text-white flex flex-col gap-6">
              <h2 className="px-1.5 bg-indigo-800/60  rounded-full w-47 h-8 flex items-center justify-center text-base">
                Live Events are Back
              </h2>
              <h1 className="max-w-170 text-[60px] font-extrabold text-[#F6F7F9FF] leading-16 flex flex-col">
                Discover Unforgetable{" "}
                <span className="text-indigo-600 italic font-serif">
                  Live Experience
                </span>
              </h1>
              <p className="max-w-136 leading-6 text-[16px] text-[#DFE1E4FF]">
                From world-class concerts to heart-pounding sports matches, find
                your next adventure on Evently. Secure your seats in seconds
                with our premium booking experience.
              </p>
            </div>
            <div>
              <button
                onClick={() => {
                  void navigate("/events");
                }}
                className="bg-indigo-600 text-[#F4F6FF] font-medium px-5 h-10 rounded-full cursor-pointer hover:bg-indigo-700 active:scale-95 mr-5 transition ease-in-out"
              >
                Explore Events
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("categories")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-transparent border text-[#F4F6FF] font-medium px-5 h-10 rounded-full cursor-pointer  active:scale-95"
              >
                Learn More
              </button>
            </div>
            <div className="w-135 h-px bg-neutral-300" />
            <div className="w-135 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-mono font-bold text-[#F4F6FF]">
                  50k+
                </h2>
                <h3 className="text-base font-medium text-[#C8CBCFFF]">
                  Active Users
                </h3>
              </div>
              <div>
                <h2 className="text-2xl font-mono font-bold text-[#F4F6FF]">
                  1.2k+
                </h2>
                <h3 className="text-base font-medium text-[#C8CBCFFF]">
                  Global Venues
                </h3>
              </div>
              <div>
                <h2 className="text-2xl font-mono font-bold text-[#F4F6FF]">
                  24/7
                </h2>
                <h3 className="text-base font-medium text-[#C8CBCFFF]">
                  Customer Support
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-140 left-[10%] w-[80%]">
        <SearchBar />
      </div>
    </div>
  );
};

export default HeroSection;
