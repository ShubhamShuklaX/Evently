import "dotenv/config";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma.js";

async function runConcurrencyTest() {
  console.log("\n========================================================");
  console.log("  EVENTLY — HIGH-CONTENTION SEAT CONCURRENCY TEST");
  console.log("========================================================\n");

  try {
    // 1. Find a test seat that is currently available
    const seat = await prisma.seat.findFirst({
      where: { status: "available" },
      include: { event: true },
    });

    if (!seat) {
      console.error("❌ No available seat found in database. Create an event first.");
      process.exit(1);
    }

    console.log(`🎯 Target Seat: Row ${seat.row} - Col ${seat.col} (ID: ${seat.id})`);
    console.log(`🎪 Event: "${seat.event.title}" (Status: ${seat.event.status})\n`);

    // 2. Ensure two real test users exist in DB to satisfy Foreign Key constraints
    const userA = await prisma.user.upsert({
      where: { email: "tester-alpha@evently.test" },
      update: {},
      create: {
        name: "Test User Alpha",
        email: "tester-alpha@evently.test",
        password: "hashedpassword123",
        role: "user",
      },
    });

    const userB = await prisma.user.upsert({
      where: { email: "tester-beta@evently.test" },
      update: {},
      create: {
        name: "Test User Beta",
        email: "tester-beta@evently.test",
        password: "hashedpassword123",
        role: "user",
      },
    });

    const tokenA = jwt.sign(
      { id: userA.id, role: userA.role },
      process.env.JWT_SECRET || "evently-super-secret-key-2026",
      { expiresIn: "5m" }
    );

    const tokenB = jwt.sign(
      { id: userB.id, role: userB.role },
      process.env.JWT_SECRET || "evently-super-secret-key-2026",
      { expiresIn: "5m" }
    );

    const serverPort = process.env.PORT || 5000;
    const url = `http://localhost:${serverPort}/api/seats/hold`;

    console.log("⚡ Firing 2 simultaneous hold requests for the EXACT same seat...");
    const startTime = Date.now();

    // 3. Fire both requests concurrently using Promise.all()
    const [resA, resB] = await Promise.all([
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenA}`,
        },
        body: JSON.stringify({ seatIds: [seat.id] }),
      }),
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenB}`,
        },
        body: JSON.stringify({ seatIds: [seat.id] }),
      }),
    ]);

    const duration = Date.now() - startTime;
    const jsonA = await resA.json();
    const jsonB = await resB.json();

    console.log(`⏱ Completed in: ${duration}ms\n`);
    console.log(`  User A HTTP Response: ${resA.status} -> ${JSON.stringify(jsonA)}`);
    console.log(`  User B HTTP Response: ${resB.status} -> ${JSON.stringify(jsonB)}\n`);

    // 4. Evaluate concurrency guarantees
    const statuses = [resA.status, resB.status];
    const successCount = statuses.filter((s) => s === 200).length;
    const conflictCount = statuses.filter((s) => s === 409).length;

    console.log("📊 Results Analysis:");
    console.log(`   - Successful Reservations (200 OK): ${successCount}`);
    console.log(`   - Rejected Conflicts (409 Conflict): ${conflictCount}`);

    if (successCount === 1 && conflictCount === 1) {
      console.log("\n✅ SUCCESS: Zero double-booking detected!");
      console.log("   Prisma conditional transaction safely granted exactly 1 hold and rejected the race collision.\n");
    } else {
      console.error("\n❌ FAILED: Concurrency violation detected!");
      console.error(`   Expected 1 success & 1 conflict, got ${successCount} success & ${conflictCount} conflict.\n`);
    }

    // 5. Cleanup: release the test seat back to available
    await prisma.seat.update({
      where: { id: seat.id },
      data: { status: "available", userId: null, expiresAt: null },
    });
    console.log("🧹 Cleanup: Restored test seat back to 'available'.\n");

    process.exit(successCount === 1 && conflictCount === 1 ? 0 : 1);
  } catch (error) {
    console.error("Test error:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

void runConcurrencyTest();
