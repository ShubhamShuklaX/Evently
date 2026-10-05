import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 30000,
  idleTimeoutMillis: 30000,
  max: 5,
});

pool.on("error", (err) => {
  console.error("PostgreSQL pool error:", err);
});

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });

const transientDatabaseCodes = new Set([
  "P1001",
  "P1002",
  "P1017",
  "ETIMEDOUT",
  "ECONNRESET",
  "EAI_AGAIN",
]);

export const withDatabaseRetry = async (operation, attempts = 3) => {
  let lastError;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      const message = String(error?.message || "");
      const isTransient =
        transientDatabaseCodes.has(error?.code) ||
        /timed out|can't reach database|connection reset|temporary failure/i.test(message);

      if (!isTransient || attempt === attempts) throw error;
      await new Promise((resolve) => setTimeout(resolve, attempt * 500));
    }
  }

  throw lastError;
};
