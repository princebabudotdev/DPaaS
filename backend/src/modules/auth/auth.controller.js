import config from "../../config/config.js";
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
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000, // 15 minutes
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
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  res.status(200).json({
    user,
    refreshToken,
    accessToken,
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
  const { fullname, username, location } = req.body;
  const updateUser = await authService.updateProfileUser({
    email,
    fullname,
    username,
    location,
  });

  return res.status(201).json({
    message: "Profile updated sucessfully",
    updateUser,
  });
});

export default {
  register,
  login,
  forgotPassword,
  updateProfile,
};
