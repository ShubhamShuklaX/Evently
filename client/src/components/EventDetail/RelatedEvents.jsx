import { ChevronRight } from "lucide-react";

const relatedEvents = [
  {
    category: "Music",
    date: "Dec 05",
    title: "Jazz Under the Stars",
    price: "$45",
    img: "/music.jpg",
  },
  {
    category: "Theatre",
    date: "Dec 20",
    title: "The Nutcracker Ballet",
    price: "$89",
    img: "/theatre.jpg",
  },
  {
    category: "Comedy",
    date: "Nov 22",
    title: "Comedy Night Live",
    price: "$25",
    img: "/comedy.jpg",
  },
  {
    category: "Sports",
    date: "May 15",
    title: "Premier League Final",
    price: "$299",
    img: "/sports.jpg",
  },
];

const RelatedEvents = () => {
  return (
    <div className="border-t border-neutral-200 px-30 py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-[#1D1F23]">
          You Might Also Like
        </h2>
        <button
          type="button"
          className="flex items-center gap-1 text-sm font-semibold text-[#6365f1] hover:underline cursor-pointer"
        >
          View all
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {relatedEvents.map((event) => (
          <div
            key={event.title}
            className="bg-white border border-neutral-200 rounded-2xl overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-black/5"
          >
            <div className="relative">
              <img
                src={event.img}
                alt={event.title}
                className="w-full h-44 object-cover"
              />
              <span className="absolute top-3 left-3 bg-[#F6F7F9E6] px-2 text-xs font-medium rounded-full h-5 flex items-center">
                {event.category}
              </span>
            </div>
            <div className="p-4">
              <p className="text-xs font-bold uppercase text-[#6365f1]">
                {event.date}
              </p>
              <h3 className="font-semibold text-[#1D1F23] mt-1">
                {event.title}
              </h3>
              <p className="text-sm font-medium text-[#1D1F23] mt-3">
                from {event.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedEvents;
