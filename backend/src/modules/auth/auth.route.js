import express from "express";
import authController from "./auth.controller.js";


const router = express.Router();

// valiators and middlewares
import authValidator from "./auth.validator.js";
import { validate } from "../../middlewares/validate.middleware.js";

// routes here

router
  .route("/register")
  .post(validate(authValidator.registerValidator), authController.register);

router
  .route("/login")
  .post(validate(authValidator.loginValidator), authController.login);

export default router;
