import express from "express";
import authController from "./auth.controller.js";

const router = express.Router();

// valiators and middlewares
import authValidator from "./auth.validator.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { protect } from "../../middlewares/auth.middleware.js";
import passport from "passport";

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

router.route("/updateProfile").put(protect, authController.updateProfile);

// google auth routes here

router.route("/google").get(
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.route("/google/callback").get(
  passport.authenticate("google", {  // this url send the user to the googleCallback controller
    failureRedirect: "/login-failed", //Redirect to failure page if authentication fails
    session: false,
  }),
  authController.googleCallback
);


// github OAuth routes here 

router.route("/github").get(
  passport.authenticate("github" , {scope : ["user:email" , "read:user"]})
)

router.route("/github/callback").get(
  passport.authenticate("github" , {
    session:false,
    failureRedirect:"/login-failed"
  }),
  authController.githubCallback
)

export default router;
