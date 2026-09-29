import {
  Balloon,
  Cpu,
  MicVocal,
  Music,
  PencilSparkles,
  Theater,
  Trophy,
  UsersRound,
} from "lucide-react";

const CategoryBar = () => {
  return (
    <div>
      <div className="px-30 pt-10 pb-3 flex  items-center justify-between">
        <h2 className="text-2xl font-semibold">Browse by Category</h2>
        <button className="px-3 py-2 text-[14px] cursor-pointer bg-transparent text-indigo-600 hover:bg-[#4f51e9] hover:text-[#DFE1E4FF] border-2 rounded-full transition ease-in-out">
          View All Categories
        </button>
      </div>
      <div className="pl-30 pr-30 flex items-center justify-between py-8">
        <button className="group w-34 h-34 bg-transparent border-2 rounded-2xl flex flex-col items-center justify-center hover:border-[#4f51e9] transition duration-300 shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]">
          <div className=" rounded-full p-2 bg-neutral-100 group-hover:bg-[#4f51e9] group-hover:text-[#F4F6FF] text-neutral-600">
            <Music size={23} />
          </div>
          <h3 className="pt-1 text-neutral-600 group-hover:text-[#4f51e9]">
            Music
          </h3>
        </button>
        <button className="group w-34 h-34 bg-transparent border-2 rounded-2xl flex flex-col items-center justify-center hover:border-[#4f51e9] transition duration-300 shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]">
          <div className=" rounded-full p-2 bg-neutral-100 group-hover:bg-[#4f51e9] group-hover:text-[#F4F6FF] text-neutral-600">
            <Trophy size={23} />
          </div>
          <h3 className="pt-1 text-neutral-600 group-hover:text-[#4f51e9]">
            Sports
          </h3>
        </button>
        <button className="group w-34 h-34 bg-transparent border-2 rounded-2xl flex flex-col items-center justify-center hover:border-[#4f51e9] transition duration-300 shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]">
          <div className=" rounded-full p-2 bg-neutral-100 group-hover:bg-[#4f51e9] group-hover:text-[#F4F6FF] text-neutral-600">
            <Theater size={23} />
          </div>
          <h3 className="pt-1 text-neutral-600 group-hover:text-[#4f51e9]">
            Theater
          </h3>
        </button>
        <button className="group w-34 h-34 bg-transparent border-2 rounded-2xl flex flex-col items-center justify-center hover:border-[#4f51e9] transition duration-300 shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]">
          <div className=" rounded-full p-2 bg-neutral-100 group-hover:bg-[#4f51e9] group-hover:text-[#F4F6FF] text-neutral-600">
            <MicVocal size={23} />
          </div>
          <h3 className="pt-1 text-neutral-600 group-hover:text-[#4f51e9]">
            Comedy
          </h3>
        </button>
        <button className="group w-34 h-34 bg-transparent border-2 rounded-2xl flex flex-col items-center justify-center hover:border-[#4f51e9] transition duration-300 shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]">
          <div className=" rounded-full p-2 bg-neutral-100 group-hover:bg-[#4f51e9] group-hover:text-[#F4F6FF] text-neutral-600">
            <UsersRound size={23} />
          </div>
          <h3 className="pt-1 text-neutral-600 group-hover:text-[#4f51e9]">
            Conference
          </h3>
        </button>
        <button className="group w-34 h-34 bg-transparent border-2 rounded-2xl flex flex-col items-center justify-center hover:border-[#4f51e9] transition duration-300 shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]">
          <div className=" rounded-full p-2 bg-neutral-100 group-hover:bg-[#4f51e9] group-hover:text-[#F4F6FF] text-neutral-600">
            <Balloon size={23} />
          </div>
          <h3 className="pt-1 text-neutral-600 group-hover:text-[#4f51e9]">
            Festival
          </h3>
        </button>
        <button className="group w-34 h-34 bg-transparent border-2 rounded-2xl flex flex-col items-center justify-center hover:border-[#4f51e9] transition duration-300 shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]">
          <div className=" rounded-full p-2 bg-neutral-100 group-hover:bg-[#4f51e9] group-hover:text-[#F4F6FF] text-neutral-600">
            <PencilSparkles size={23} />
          </div>
          <h3 className="pt-1 text-neutral-600 group-hover:text-[#4f51e9]">
            Art
          </h3>
        </button>
      </div>
    </div>
  );
};

export default CategoryBar;
