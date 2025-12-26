import ApiError from "../utils/appError.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import authService from "../modules/auth/auth.service.js";

export const protect = async (req, res, next) => {
  try {
    let token;
    if (req?.cookies && req.cookies?.accessToken) {
      token = req.cookies?.accessToken;
    }

    if (!token) {
      throw new ApiError(
        401,
        "You are not logged in. Please log in to get access."
      );
    }

    const decoded = await jwt.verify(token, config.JWT_SECRET);

    const user = await authService.getMe(decoded.id);

    if (!user) {
      throw new Error(404, "User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
