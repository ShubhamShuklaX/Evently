import musicIcon from "../../assets/categoryIcons/Music-icon.webp";
import sportsIcon from "../../assets/categoryIcons/Sports-Icon.webp";
import theaterIcon from "../../assets/categoryIcons/Theater-icon.webp";
import comedyIcon from "../../assets/categoryIcons/Comedy-icon.webp";
import conferenceIcon from "../../assets/categoryIcons/Conference-icon.webp";
import festivalIcon from "../../assets/categoryIcons/Festival-icon.webp";
import artIcon from "../../assets/categoryIcons/Art-icon.webp";
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Music", icon: musicIcon },
  { name: "Sports", icon: sportsIcon },
  { name: "Theater", icon: theaterIcon },
  { name: "Comedy", icon: comedyIcon },
  { name: "Conference", icon: conferenceIcon },
  { name: "Festival", icon: festivalIcon },
  { name: "Art", icon: artIcon },
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

      <div className="w-full px-8 sm:px-15 lg:px-25 xl:px-35 py-4 sm:py-6">
        <div className="flex items-center justify-between gap-6 sm:gap-8 overflow-x-auto no-scrollbar scroll-smooth py-2  xl:justify-between">
          {categories.map(({ name: categoryName, icon }) => (
            <button
              key={categoryName}
              onClick={() => void navigate(`/events?category=${categoryName}`)}
              className="group cursor-pointer shrink-0 flex flex-col items-center bg-transparent border-0 p-0 focus:outline-none"
            >
              {/* Squircle mask that crops out the outer checkerboard/white margin */}
              <div className="w-20 h-20 sm:w-30 sm:h-30 rounded-[40px] overflow-hidden shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:shadow-md">
                <img
                  src={icon}
                  alt={categoryName}
                  className="w-full h-full object-cover scale-[1.07]"
                />
              </div>

              <h3 className="pt-3 text-xs sm:text-sm font-medium text-neutral-800 group-hover:text-[#4f51e9] transition-colors">
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
