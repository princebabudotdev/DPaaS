import { rateLimit } from "express-rate-limit";

export const generalRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10,
  message: "Too many request try again after 1 minute",
});
