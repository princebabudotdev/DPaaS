import { rateLimit } from "express-rate-limit";

export const generalRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  message: "Too many request try again after 1 minute",
});

export const postsBaseLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // 300 requests per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

export const createPostLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  keyGenerator: (req) => {
    // Authenticated users are rate-limited by user ID
    return req.user?.id || req.ip;
  },
  message: {
    success: false,
    message: "Post creation limit reached. Try again later.",
  },
});

export const updatePostLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  keyGenerator: (req) => {
    return req.user?.id || req.ip;
  },
  message: {
    success: false,
    message: "Post update limit reached. Try again later.",
  },
});
