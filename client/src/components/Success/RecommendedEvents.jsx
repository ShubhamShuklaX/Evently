import React from "react";
import { ChevronRight } from "lucide-react";
import img1 from "../../assets/7b99fda3-8fb3-4566-aaaa-198850298360.webp";
import img2 from "../../assets/7cd4cbd7-d18a-44e7-927d-ddc166223295.webp";
import img3 from "../../assets/d433d6cc-8a12-414e-b525-e789c91fd416.webp";
import img4 from "../../assets/ecc129ee-2d9b-48cc-a560-b282c7b79676.webp";

// Dummy data (You will replace this with real API data later)
const events = [
  { id: 1, title: "SOMA Electronic Expo", price: "$65", img: img1 },
  { id: 2, title: "Jazz in the Garden", price: "$40", img: img2 },
  {
    id: 3,
    title: "Brooklyn Skyline Series",
    price: "$55",
    img: img3,
  },
  { id: 4, title: "Indie Rock Night Live", price: "$35", img: img4 },
];

const RecommendedEvents = () => {
  return (
    <section className="w-full bg-white border-t border-neutral-200 py-20 mt-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* 1. HEADER ROW */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-[#1D1F23] mb-2 tracking-tight">
              Don't stop the rhythm
            </h2>
            <p className="text-neutral-500">
              Hand-picked events you might also enjoy.
            </p>
          </div>
          <button className="hidden sm:flex items-center gap-1 text-[#6365f1] font-semibold hover:text-[#4f51e9] transition cursor-pointer">
            Explore Everything <ChevronRight size={18} />
          </button>
        </div>

        {/* 2. RESPONSIVE EVENT GRID (1 col mobile, 2 col tablet, 4 col desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <div key={event.id} className="group cursor-pointer">
              {/* Image Container with hover zoom effect */}
              <div className="w-full h-64 rounded-2xl overflow-hidden mb-4 bg-neutral-100">
                <img
                  src={event.img}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  // Fallback to an Unsplash image if local image isn't found
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=400";
                  }}
                />
              </div>

              {/* Text */}
              <h3 className="font-bold text-[#1D1F23] text-lg mb-1 group-hover:text-[#6365f1] transition-colors">
                {event.title}
              </h3>
              <p className="text-sm font-medium text-neutral-500">
                From {event.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendedEvents;
