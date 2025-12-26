import express from "express";
import authController from "./auth.controller.js";

const router = express.Router();

// valiators and middlewares
import authValidator from "./auth.validator.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { protect } from "../../middlewares/auth.middleware.js";

// routes here

router
  .route("/register")
  .post(validate(authValidator.registerValidator), authController.register);

router
  .route("/login")
  .post(validate(authValidator.loginValidator), authController.login);

router.route("/test").get(protect, async (req, res) => {
  const user = req.user;
  res.send(user);
});

router
  .route("/forgotPassword")
  .put(
    validate(authValidator.forgotPasswordValidator),
    protect,
    authController.forgotPassword
  );


  router
  .route("/updateProfile")
  .put(protect , authController.updateProfile);

export default router;
