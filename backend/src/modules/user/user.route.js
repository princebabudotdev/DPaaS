import express from "express";
const router = express.Router();

import { protect } from "../../middlewares/auth.middleware.js";
import userController from "./user.controller.js";
import upload from "../../config/multer.config.js";
import uploadImage from "../../utils/imageKit.js";

// get profile
router.route("/me").get(protect, userController.getMe);

router
.route("update-ava")

export default router;
