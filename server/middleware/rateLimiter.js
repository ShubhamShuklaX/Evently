import { rateLimit } from "express-rate-limit";

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 150,
  message: { error: "Too many attempts at api requests" },
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  message: { error: "Too many login attempts. Please try again after 15 mins" },
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

export const holdLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 10,
  message: { error: "Too many hold attempts. Please try again later" },
  standardHeaders: "draft-8",
  legacyHeaders: false,
});
