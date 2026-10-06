import "dotenv/config";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma.js";

async function TestRunner() {
  const seat = await prisma.seat.findFirst({
    where: {
      status: "available",
    },
  });
  if (!seat) {
    console.log("NO SEAT FOUND");
    return;
  }

  const user = await prisma.user.findFirst();
  if (!user) {
    console.log("NO USER FOUND");
    return;
  }

  const token = jwt.sign(
    {
      id: user.id,
      role: "user",
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  const requests = Array.from({ length: 1000 }, () => {
    return fetch("http://localhost:5000/api/seats/hold", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ seatId: seat.id }),
    });
  });

  const startTime = Date.now();
  const responses = await Promise.all(requests);
  const totalTime = Date.now() - startTime;
  const secured = responses.filter((r) => r.status === 200).length;
  const blocked = responses.filter((r) => r.status === 404).length;
  const rateLimited = responses.filter((r) => r.status === 429).length;

  console.log("Starting... ", startTime);
  console.log(`Total Time: ${totalTime}ms`);
  console.log("Secured Seat count... ", secured);
  console.log("Blocked Count... ", blocked);
  console.log("Rate Limited (429) Count... ", rateLimited);
}

TestRunner();
