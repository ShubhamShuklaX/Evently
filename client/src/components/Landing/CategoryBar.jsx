import {
  Balloon,
  MicVocal,
  Music,
  PencilSparkles,
  Theater,
  Trophy,
  UsersRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Music", icon: Music },
  { name: "Sports", icon: Trophy },
  { name: "Theater", icon: Theater },
  { name: "Comedy", icon: MicVocal },
  { name: "Conference", icon: UsersRound },
  { name: "Festival", icon: Balloon },
  { name: "Art", icon: PencilSparkles },
];

const CategoryBar = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div
        id="categories"
        className="w-full px-4 sm:px-8 lg:px-15 xl:px-25 pt-8 sm:pt-10 pb-3 flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap"
      >
        <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900">
          Browse by Category
        </h2>

        <button
          onClick={() => void navigate("/events")}
          className="px-4 py-2 text-xs sm:text-sm cursor-pointer bg-transparent text-indigo-600 hover:bg-[#4f51e9] hover:text-[#DFE1E4FF] border-2 rounded-full transition ease-in-out shrink-0"
        >
          View All Categories
        </button>
      </div>

      <div className="w-full px-4 sm:px-8 lg:px-15 xl:px-25 py-4 sm:py-6">
        <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto no-scrollbar scroll-smooth py-2 justify-start xl:justify-between">
          {categories.map(({ name: categoryName, icon: Icon }) => (
            <button
              key={categoryName}
              onClick={() => void navigate(`/events?category=${categoryName}`)}
              className="group cursor-pointer shrink-0 w-28 h-28 sm:w-32 sm:h-32 lg:w-34 lg:h-34 bg-transparent border-2 rounded-2xl flex flex-col items-center justify-center hover:border-[#4f51e9] transition duration-300 shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]"
            >
              <div className="rounded-full p-2 bg-neutral-100 group-hover:bg-[#4f51e9] group-hover:text-[#F4F6FF] text-neutral-600 transition-colors">
                <Icon size={23} />
              </div>

              <h3 className="pt-2 text-xs sm:text-sm font-medium text-neutral-600 group-hover:text-[#4f51e9]">
                {categoryName}
              </h3>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryBar;
