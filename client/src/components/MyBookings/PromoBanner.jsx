import { Crown } from 'lucide-react';
import img1 from "../../assets/7b99fda3-8fb3-4566-aaaa-198850298360.webp";
import img2 from "../../assets/7cd4cbd7-d18a-44e7-927d-ddc166223295.webp";

const PromoBanner = () => {
  return (
    <div className="bg-[#2A2B36] rounded-3xl overflow-hidden relative shadow-xl">
      <div className="absolute inset-0 bg-linear-to-r from-[#2A2B36] via-[#2A2B36]/90 to-transparent z-10" />
      <img
        src={img1}
        alt="Promo"
        className="absolute inset-0 w-full h-full object-cover opacity-30 object-right"
      />

      <div className="relative z-20 p-6 sm:p-10 md:p-14 flex flex-col md:flex-row items-center gap-8 md:gap-10">
        <div className="flex-1">
          <span className="bg-[#6365f1] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4 sm:mb-6 inline-block">
            Evently Gold
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white mb-3 sm:mb-4 tracking-tight leading-tight">
            Unlock Early Access <br /> to Global Tours
          </h2>
          <p className="text-neutral-300 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-md leading-relaxed">
            Join Evently Gold and get 48-hour pre-sale access to world-class
            concerts, zero service fees on your first 3 bookings, and VIP
            lounge entry at select venues.
          </p>
          <button className="bg-white hover:bg-neutral-100 text-[#1D1F23] font-bold py-3 px-6 sm:py-3.5 sm:px-8 text-sm sm:text-base rounded-xl transition-colors cursor-pointer w-fit">
            Join Gold Membership
          </button>
        </div>

        {/* Right Side Visual Graphic */}
        <div className="hidden md:block w-80 h-55 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-4 relative overflow-hidden">
          <img
            src={img2}
            alt="Backdrop"
            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <Crown
              size={32}
              className="text-[#6365f1] mb-2 drop-shadow-lg"
            />
            <p className="text-white font-bold text-lg drop-shadow-md">
              VIP Pre-sale Active
            </p>
            <div className="h-1 w-24 bg-linear-to-r from-[#6365f1] to-purple-500 rounded-full mt-2" />
            <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mt-2">
              Exclusive to Gold Members
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
