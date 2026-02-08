import config from "../../config/config.js";
import ApiError from "../../utils/appError.js";
import asyncHandler from "../../utils/asyncHandler.js";
import generateAccessToken from "../../utils/generateAccessToken.js";
import genarateRefreshToken from "../../utils/generateRefreshToken.js";
import authService from "./auth.service.js";

const register = asyncHandler(async (req, res) => {
  const user = await authService.registerUser(req.body);

  const refreshToken = genarateRefreshToken({
    email: user.email,
    id: user._id,
    username: user.username,
  });

  const accessToken = generateAccessToken({
    email: user.email,
    userid: user._id,
    username: user.username,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 15 minutes
  });

  res.status(201).json({
    success: true,
    data: user,
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { user } = await authService.loginUser(email, password);

  const refreshToken = genarateRefreshToken({
    email: user.email,
    id: user._id,
    username: user.username,
  });

  const accessToken = generateAccessToken({
    email: user.email,
    userid: user._id,
    username: user.username,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 15 minutes
  });

  res.status(200).json({
    message:"User Logged in succesfully"
  });
});

const forgotPassword = asyncHandler(async (req, res) => {
  const user = req.user;
  const { newPassword, oldPassword } = req.body;

  const updatedUser = await authService.forgotPasswordUser(
    oldPassword,
    newPassword,
    user.email
  );

  return res.status(201).json({
    message: "Password updated sucessfully",
    user: updatedUser,
  });
});

const updateProfile = asyncHandler(async (req, res) => {
  const { email } = req.user;
  const { fullname, username, location , bio , skills , SocialLinks } = req.body;
  const updateUser = await authService.updateProfileUser({
    email,
    fullname,
    username,
    location,
    skills,
    bio,
    SocialLinks

  });

  return res.status(201).json({
    message: "Profile updated sucessfully",
    updateUser,
  });
});

const googleCallback = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Authentication failed",
    });
  }

  // generate Tokens

  const accessToken = generateAccessToken({
    email: user.email,
    userid: user._id,
    username: user.username || user.name,
  });

  const refreshToken = await genarateRefreshToken({
    email: null,
    userid: user._id,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV === "production", // Secure in production
    sameSite: "none",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: config.NODE_ENV === "production", // Secure in production,
    sameSite: "none",
    maxAge: 60 * 60 * 1000, // 1 hour
  });

  res.status(200).json({
    success: true,
    message: "Authentication successful",
    user: {
      id: user._id,
      name: user.fullname || user.username,
      email: user.email,
    },
  });
});

const githubCallback = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    throw new ApiError(404, "User not founded");
  }

  // generate Tokens

  const accessToken = generateAccessToken({
    email: user.email || null,
    userid: user._id,
    username: user.username || user.name,
  });

  const refreshToken = await genarateRefreshToken({
    email: null,
    userid: user._id,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV === "production", // Secure in production
    sameSite: "none",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: config.NODE_ENV === "production", // Secure in production,
    sameSite: "none",
    maxAge: 60 * 60 * 1000, // 1 hour
  });

  res.status(200).json({
    success: true,
    message: "Authentication successful",
    user: {
      id: user._id,
      name: user.fullname || user.username,
      email: user.email,
    },
  });
});

const forgotPasswordSendOTP = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, "Email is required");
  }
  await authService.forgotPasswordSendOtpUser(email);

  return res.status(200).json({
    message: "OTP Send to your email",
  });
});

const resetPasswordVerifyOtp = asyncHandler(async (req, res) => {
  const { newPassword, otp, email } = req.body;

  if(!email || !otp || !newPassword){
    throw new Error(401 , "Email otp and new Password is required")
  }

  const {message} = await authService.resetPasswordVerifyOtpUser(email, otp, newPassword);

  res.status(200).json({
    message
  })

});

const testd = asyncHandler(async (req, res) => {
  res.json({
    data: req.user
  });
});



export default {
  register,
  login,
  forgotPassword,
  updateProfile,
  googleCallback,
  githubCallback,
  forgotPasswordSendOTP,
  resetPasswordVerifyOtp,
  testd
};
