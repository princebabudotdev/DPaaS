import express from "express";

const router = express.Router();

// import middlewares
import { protect } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";

import upload from "../../config/multer.config.js";

// import controllers
import postController from "./post.controller.js";
import postValidator from "./post.validator.js";
import {
  createPostLimiter,
  postsBaseLimiter,
} from "../../middlewares/rateLimter.Middleware.js";

// Define routes here

router.use(postsBaseLimiter);

router.route("/create").post(
  protect, // 1️⃣ auth,
  createPostLimiter, // rate limiter
  upload.single("file"), // 2️⃣ parse form-data (VERY IMPORTANT)
  validate(postValidator.createPostValidator), // 3️⃣ validate parsed body
  postController.createPost, // 4️⃣ controller
);

// get all posts route
router.route("/").get(protect, postController.getAllPosts);

// get single post route

router.route("/:postId").get(protect, postController.singlePost);

export default router;
