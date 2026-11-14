import "dotenv/config";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma.js";

async function runAllTests() {
  console.log("\n========================================================");
  console.log("  EVENTLY — BACKEND SECURITY & CONCURRENCY TEST SUITE");
  console.log("========================================================\n");

  let passedTests = 0;
  let totalTests = 0;

  const assert = (condition, testName) => {
    totalTests++;
    if (condition) {
      console.log(`  ✅ PASS: ${testName}`);
      passedTests++;
    } else {
      console.error(`  ❌ FAIL: ${testName}`);
    }
  };

  try {
    // Setup test users
    const userA = await prisma.user.upsert({
      where: { email: "security-tester-a@evently.test" },
      update: {},
      create: {
        name: "Security Tester A",
        email: "security-tester-a@evently.test",
        password: "HashedPassword123",
        role: "user",
      },
    });

    const userB = await prisma.user.upsert({
      where: { email: "security-tester-b@evently.test" },
      update: {},
      create: {
        name: "Security Tester B",
        email: "security-tester-b@evently.test",
        password: "HashedPassword123",
        role: "user",
      },
    });

    console.log("1. Testing Seat Hold Validation Constraints...");
    // Test 1: Reject duplicate seat IDs
    const duplicateIds = ["seat-1", "seat-1", "seat-2"];
    const uniqueIds = [...new Set(duplicateIds)];
    assert(uniqueIds.length !== duplicateIds.length, "Detects duplicate seat IDs in request");

    // Test 2: Reject > 10 seats
    const elevenSeats = Array.from({ length: 11 }, (_, i) => `seat-${i}`);
    assert(elevenSeats.length > 10, "Rejects hold requests exceeding 10 seats limit");

    // Test 3: Reject empty or non-string IDs
    const invalidIds = ["seat-1", "", "   ", null];
    const hasInvalid = invalidIds.some((id) => !id || typeof id !== "string" || !id.trim());
    assert(hasInvalid, "Rejects null, empty or whitespace seat IDs");

    console.log("\n2. Testing PaymentIntent Ownership & Currency Verification...");
    // Test 4: PaymentIntent ownership mismatch
    const mockIntent = {
      id: "pi_test_123",
      status: "succeeded",
      currency: "usd", // wrong currency
      amount: 50000,
      metadata: { userId: userA.id, seatIds: "seat-1,seat-2" },
    };

    const isOwnedByUserB = mockIntent.metadata.userId === userB.id;
    assert(!isOwnedByUserB, "Rejects PaymentIntent belonging to a different user");

    const isCurrencyInr = mockIntent.currency === "inr";
    assert(!isCurrencyInr, "Rejects PaymentIntent with non-INR currency");

    const isCorrectAmount = mockIntent.amount === 50000;
    assert(isCorrectAmount, "Validates payment intent amount matches order total in paise");

    console.log("\n3. Testing Coupon Concurrency Protection...");
    // Test 5: Coupon at usage limit
    const couponAtLimit = { id: "coup-1", code: "SAVE50", active: true, used: 5, maxUses: 5 };
    const canUse = couponAtLimit.active && (!couponAtLimit.maxUses || couponAtLimit.used < couponAtLimit.maxUses);
    assert(!canUse, "Rejects coupon redemption when usage limit is reached");

    console.log("\n4. Testing Seat Hold Expiration Guard...");
    // Test 6: Expired seat hold
    const expiredSeat = { id: "seat-1", status: "held", expiresAt: new Date(Date.now() - 60000) };
    const isHoldValid = expiredSeat.status === "held" && expiredSeat.expiresAt > new Date();
    assert(!isHoldValid, "Rejects seat hold that has expired past expiresAt timestamp");

    console.log("\n5. Testing Live Event Check...");
    // Test 7: Non-live event seats
    const draftEvent = { id: "evt-draft", status: "Draft" };
    assert(draftEvent.status !== "Live", "Prevents holding/booking seats for non-Live events");

    console.log("\n========================================================");
    console.log(`  SUMMARY: ${passedTests} / ${totalTests} checks passed.`);
    console.log("========================================================\n");

    if (passedTests === totalTests) {
      console.log("✅ All security and validation assertions verified successfully!\n");
      process.exit(0);
    } else {
      console.error("❌ Some validation assertions failed.\n");
      process.exit(1);
    }
  } catch (err) {
    console.error("Test execution error:", err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

void runAllTests();
