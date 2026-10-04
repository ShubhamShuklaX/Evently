import "dotenv/config";
import bcrypt from "bcryptjs";
import { prisma } from "../config/prisma.js";

async function main() {
  const adminPassword = await bcrypt.hash(
    process.env.ADMIN_PASSWORD || "Admin@123",
    10,
  );
  const organizerPassword = await bcrypt.hash(
    process.env.ORGANIZER_PASSWORD || "Organizer@123",
    10,
  );

  const admin = await prisma.user.upsert({
    where: { email: "admin@evently.com" },
    update: { role: "admin" },
    create: {
      name: "System Admin",
      email: "admin@evently.com",
      password: adminPassword,
      role: "admin",
    },
  });

  const organizer = await prisma.user.upsert({
    where: { email: "organizer@evently.com" },
    update: { role: "organizer" },
    create: {
      name: "Default Organizer",
      email: "organizer@evently.com",
      password: organizerPassword,
      role: "organizer",
    },
  });

  console.log("Seeding completed successfully!");
  console.log(`Admin: ${admin.email}`);
  console.log(`Organizer: ${organizer.email}`);
}

try {
  await main();
} catch (error) {
  console.error("Seeding failed:", error);
  process.exit(1);
} finally {
  await prisma.$disconnect();
}
