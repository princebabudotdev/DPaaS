import express from "express";
import http from "http";
import CookieParser from 'cookie-parser'
import helmet from 'helmet'


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



// route handlers can be added here
import authRoutes from './modules/auth/auth.route.js'
import errorMiddleware from "./middlewares/error.middleware.js";


app.use("/api/auth" ,  authRoutes);


// error middleware
app.use(errorMiddleware);

export default httpServer;
