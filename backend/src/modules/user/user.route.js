import express from "express";
const router = express.Router();

import { protect } from "../../middlewares/auth.middleware.js";
import userController from "./user.controller.js";
import upload from "../../config/multer.config.js";
import uploadImage from "../../utils/imageKit.js";

// get profile
router.route("/me").get(protect, userController.getMe);

// update profile-picture
// router
//   .route("/profile-picture")
//   .post(upload.single("avatar"), async (req, res) => {
//     const file = req.file;
//     console.log(file);

//     let result = null;

//     if (file) {
//       result = await uploadImage(file.buffer, file.originalname);
//     }

//     console.log(result);
//   });

export default router;
