import express from "express";
import http from "http";
import CookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";

// import passport from "passport";
import passport from "./config/passport.js";

// general-rate-limter
import { generalRateLimiter } from "./middlewares/rateLimter.Middleware.js";

// server creation
export const app = express();
const httpServer = http.createServer(app);

// Additional middleware and route configurations can be added here
app.use(express.json());
app.use(CookieParser());
app.use(helmet());
app.use(generalRateLimiter);
app.use(passport.initialize());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// route handlers can be added here
import authRoutes from "./modules/auth/auth.route.js";
import errorMiddleware from "./middlewares/error.middleware.js";

import userRoute from "./modules/user/user.route.js";
import postRoute from "./modules/posts/post.route.js";

// auth routes
app.use("/api/auth", authRoutes);

// user routes
app.use("/api/users", userRoute);

// post routes
app.use("/api/posts", postRoute);

// error middleware
app.use(errorMiddleware);

export default httpServer;
