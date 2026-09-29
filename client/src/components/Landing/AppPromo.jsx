import { Star } from "lucide-react";
import promoImg from "../../assets/d433d6cc-8a12-414e-b525-e789c91fd416.webp";

const AppPromo = () => {
  return (
    <div className="px-40 py-16 bg-white">
      <div className="relative bg-linear-to-r from-[#6365f1] to-[#4338ca] rounded-[32px] overflow-hidden flex items-center justify-between min-h-107.5">
        {/* Left text content */}
        <div className="pl-16 pr-10 max-w-xl">
          <h2 className="text-white font-extrabold text-5xl leading-tight">
            Experience More
            <br />
            on the Evently App
          </h2>
          <p className="text-indigo-100 text-[17px] leading-relaxed mt-5">
            Get exclusive access to pre-sale tickets, real-time venue maps, and
            digital tickets directly on your phone.
          </p>

          <div className="flex items-center gap-4 mt-8">
            <button className="bg-white text-[#4338ca] font-semibold text-sm px-6 py-3.5 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer active:scale-95">
              Download for iOS
            </button>
            <button className="bg-white text-[#4338ca] font-semibold text-sm px-6 py-3.5 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer active:scale-95">
              Download for Android
            </button>
          </div>
        </div>

        {/* Right phone mockup */}
        <div className="relative w-70 h-107.5 shrink-0 mr-24 rounded-[36px] border-[6px] border-[#1D1F23] overflow-hidden shadow-2xl">
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
            <h3 className="text-white font-bold text-lg text-center">
              Exclusive VIP Access
            </h3>
            <div className="w-24 h-1 bg-[#6365f1] rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppPromo;
