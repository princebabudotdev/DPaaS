import express from "express";
import { protect } from "../../middlewares/auth.middleware.js";
import userController from "./user.controller.js";
import { editProfileLimiter } from "../../middlewares/rateLimter.Middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import userValidator from "./user.validator.js";
const router = express.Router();

router
  .route("/update-profile")
  .patch(
    protect,
    editProfileLimiter,
    validate(userValidator.editProfileValidator),
    userController.updateProfile,
  );

export default router;
