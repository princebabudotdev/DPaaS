import { rateLimit } from "express-rate-limit";

export const generalRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  message: "Too many request try again after 1 minute",
});
