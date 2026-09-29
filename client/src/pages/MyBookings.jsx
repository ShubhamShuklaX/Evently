import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BookingCard from "../components/MyBookings/BookingCard";
import BookingStats from "../components/MyBookings/BookingStats";
import BookingToolbar from "../components/MyBookings/BookingToolbar";
import QuickLinks from "../components/MyBookings/QuickLinks";
import PromoBanner from "../components/MyBookings/PromoBanner";
import { useBooking } from "../context/BookingContext";

// Dummy static images if needed
import img1 from "../assets/7b99fda3-8fb3-4566-aaaa-198850298360.webp";
import img2 from "../assets/7cd4cbd7-d18a-44e7-927d-ddc166223295.webp";
import img3 from "../assets/d433d6cc-8a12-414e-b525-e789c91fd416.webp";

const dummyBookings = [
  {
    orderId: "EVT-8829-102",
    status: "upcoming",
    event: {
      title: "Neon Horizon Music Festival 2024",
      date: "Oct 24, 2024",
      time: "7:00 PM",
      venue: "Central Park, New York",
      image: img1,
      category: "Music",
    },
    seats: [{ section: "A2", row: "12", seat: "14" }],
    totalPaid: 85.0,
  },
  {
    orderId: "EVT-1122-334",
    status: "pending",
    event: {
      title: "Symphony in the Park",
      date: "Oct 28, 2024",
      time: "6:00 PM",
      venue: "Millennium Park, Chicago",
      image: img2,
      category: "Music",
    },
    seats: [],
    totalPaid: 45.0,
  },
  {
    orderId: "EVT-4432-887",
    status: "upcoming",
    event: {
      title: "Stand Up Night: MSG Special",
      date: "Oct 30, 2024",
      time: "9:00 PM",
      venue: "Madison Square Garden, NY",
      image: img3,
      category: "Comedy",
    },
    seats: [{ section: "Main Floor", row: "C", seat: "5" }],
    totalPaid: 45.0,
  },
];

const MyBookings = () => {
  const { completedOrder } = useBooking();
  const [activeTab, setActiveTab] = useState("Upcoming");

  // If there's a completed order from our flow, prepend it!
  const liveBookings = completedOrder
    ? [
        {
          orderId: `EVT-${Math.floor(Math.random() * 10000000)}`,
          status: "upcoming",
          event: completedOrder.event,
          seats: completedOrder.seats,
          totalPaid: completedOrder.totalPaid,
        },
        ...dummyBookings,
      ]
    : dummyBookings;

  const tabs = ["Upcoming", "Past", "Cancelled", "All Bookings"];

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col font-sans">
      <Header />

      <main className="grow max-w-7xl w-full mx-auto px-6 py-12">
        <BookingStats liveBookings={liveBookings} />
        
        <BookingToolbar 
          tabs={tabs} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />

        {/* Bookings List */}
        <div className="flex flex-col gap-6 mb-16">
          {liveBookings.map((booking, idx) => (
            <BookingCard key={idx} booking={booking} />
          ))}
        </div>

        <QuickLinks />
        <PromoBanner />
      </main>

      <Footer />
    </div>
  );
};

export default MyBookings;
