import express from "express";
import http from "http";
import CookieParser from 'cookie-parser'

export const app = express();
const httpServer = http.createServer(app);



// Additional middleware and route configurations can be added here
app.use(express.json());
app.use(CookieParser());


// route handlers can be added here
import authRoutes from './modules/auth/auth.route.js'


app.use("/api/auth" ,  authRoutes);

export default httpServer;
