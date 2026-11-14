import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";

let connectionString = process.env.DATABASE_URL;

const getSslConfig = () => {
  if (
    process.env.DB_SSL === "false" ||
    connectionString?.includes("localhost") ||
    connectionString?.includes("127.0.0.1")
  ) {
    return false;
  }

  if (process.env.DB_CA_CERT) {
    return {
      rejectUnauthorized: true,
      ca: process.env.DB_CA_CERT,
    };
  }

  if (process.env.DB_SSL_STRICT === "true") {
    return { rejectUnauthorized: true };
  }

  return { rejectUnauthorized: false };
};

const pool = new Pool({
  connectionString,
  ssl: getSslConfig(),
  connectionTimeoutMillis: 30000,
  idleTimeoutMillis: 30000,
  max: process.env.DB_POOL_MAX ? parseInt(process.env.DB_POOL_MAX, 10) : 10,
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
        /timed out|can't reach database|connection reset|temporary failure/i.test(
          message,
        );

      if (!isTransient || attempt === attempts) throw error;
      await new Promise((resolve) => setTimeout(resolve, attempt * 500));
    }
  }

  throw lastError;
};
