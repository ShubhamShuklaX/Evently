import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function seed() {
  await prisma.event.deleteMany();

  await prisma.event.createMany({
    data: [
      {
        title: "Midnight Sun Music Festival",
        location: "Delhi, India",
        price: 1999,
        date: "Sep 14, 2026",
        time: "8:00 PM",
        img: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1000&auto=format&fit=crop",
        category: "Music",
        description:
          "Experience the ultimate summer music festival featuring top international artists, stunning visual effects, and a night you won't forget.",
      },
      {
        title: "Global Tech Summit 2026",
        location: "Bangalore, India",
        price: 4999,
        date: "Aug 14, 2026",
        time: "10:00 AM",
        img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop",
        category: "Technology",
        description:
          "Join industry leaders and innovators for a three-day conference exploring the future of artificial intelligence, web3, and cloud computing.",
      },
      {
        title: "Championship Finals: City vs United",
        location: "Mumbai, India",
        price: 2500,
        date: "Oct 22, 2026",
        time: "7:30 PM",
        img: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=1000&auto=format&fit=crop",
        category: "Sports",
        description:
          "The most anticipated football match of the season. Watch the two biggest rivals battle it out for the championship trophy.",
      },
      {
        title: "Hamilton: The Musical",
        location: "London, UK",
        price: 8500,
        date: "Nov 05, 2026",
        time: "6:00 PM",
        img: "https://images.unsplash.com/photo-1507676184212-d0330a151f84?q=80&w=1000&auto=format&fit=crop",
        category: "Theater",
        description:
          "The multi-award-winning masterpiece hits the stage. A revolutionary story of passion, ambition, and the birth of a nation.",
      },
      {
        title: "Standup Comedy Special: Live",
        location: "New York, USA",
        price: 1200,
        date: "Dec 12, 2026",
        time: "9:00 PM",
        img: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?q=80&w=1000&auto=format&fit=crop",
        category: "Comedy",
        description:
          "Get ready for a night of non-stop laughter with a surprise lineup of the best comedians in the industry.",
      },
    ],
  });
  console.log("Database seeded successfully!");
}

seed();
