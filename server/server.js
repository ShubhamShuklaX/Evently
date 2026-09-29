const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const events = [
  {
    id: 1,
    title: "Rock Concert",
    location: "Delhi, India",
    price: 1999,
    date: "Sep 14, 2026",
    time: "8:00 PM",
    img: "/7cd4cbd7-d18a-44e7-927d-ddc166223295.webp",
    category: "Music",
  },
  {
    id: 2,
    title: "Tech Conference",
    location: "Bangalore, India",
    price: 499,
    date: "Aug 14, 2026",
    time: "10:00 AM",
    img: "/d433d6cc-8a12-414e-b525-e789c91fd416.webp",
    category: "Technology",
  },
];

app.get("/api/events", (req, res) => {
  res.json({ events });
});

app.get("/api/events/:id", (req, res) => {
  const eventID = req.params.id;

  const event = events.find((e) => e.id == eventID);
  if (!event) {
    res.status(404).json({ error: "Event not found" });
  } else {
    res.json({ event });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
