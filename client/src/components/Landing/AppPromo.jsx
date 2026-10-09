import { Star } from "lucide-react";
import promoImg from "../../assets/d433d6cc-8a12-414e-b525-e789c91fd416.webp";

const AppPromo = () => {
  return (
    <div className="bg-white">
      <div className="w-full px-4 sm:px-8 lg:px-15 xl:px-25 py-12 md:py-16">
        <div className="relative bg-linear-to-r from-[#6365f1] to-[#4338ca] rounded-3xl md:rounded-[32px] overflow-hidden flex flex-col lg:flex-row items-center justify-between p-6 sm:p-10 lg:p-14 gap-8 min-h-[380px]">
          {/* Left text content */}
          <div className="w-full lg:max-w-xl text-center lg:text-left flex flex-col items-center lg:items-start">
            <h2 className="text-white font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight">
              Experience More
              <br />
              on the Evently App
            </h2>
            <p className="text-indigo-100 text-sm sm:text-base lg:text-[17px] leading-relaxed mt-4 max-w-lg">
              Get exclusive access to pre-sale tickets, real-time venue maps, and
              digital tickets directly on your phone.
            </p>

            <div className="flex items-center gap-4 mt-6 sm:mt-8">
              <span className="bg-white text-[#4338ca] font-semibold text-xs sm:text-sm px-6 py-3 rounded-full shadow-sm">
                Coming Soon
              </span>
            </div>
          </div>

          {/* Right phone mockup */}
          <div className="relative w-56 sm:w-64 md:w-70 h-80 sm:h-96 md:h-100 shrink-0 rounded-[30px] md:rounded-[36px] border-[5px] md:border-[6px] border-[#1D1F23] overflow-hidden shadow-2xl mx-auto lg:mr-4">
            <img
              src={promoImg}
              alt="Venue"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />

            <div className="relative z-10 h-full flex flex-col items-center justify-center gap-3 px-6">
              <div className="w-12 h-12 bg-[#6365f1] rounded-2xl flex items-center justify-center shadow-lg">
                <Star size={22} className="text-white fill-white" />
              </div>
              <h3 className="text-white font-bold text-base sm:text-lg text-center">
                Exclusive VIP Access
              </h3>
              <div className="w-24 h-1 bg-[#6365f1] rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppPromo;
