import ApiError from "../../utils/appError.js";
import { generateOTP, hashOTP } from "../../utils/otp.js";
import { sendEmail } from "../../utils/sendEmail.js";
import authDao from "./auth.dao.js";
import crypto from "crypto";

const registerUser = async (userdata) => {
  if (userdata.email) {
    const existingemail = await authDao.findByEmail(userdata.email);
    if (existingemail) {
      throw new Error("Email already in use");
    }
  }

  const userPayLoad = {
    fullname: userdata.fullname,
    username: userdata.username,
    email: userdata.email,
    password: userdata.password,
  };

  // add only if present

  if (userdata.googleId) {
    userPayLoad.googleId = userdata.googleId;
  }

  if (userdata.githubId) {
    userPayLoad.githubId = userdata.githubId;
  }

  const newUser = await authDao.createUser(userPayLoad);

  await sendEmail({
    to: newUser.email,
    subject: "Welcome to DPaaS 🎉",
    html: `
      <h2>Welcome ${newUser.fullname}</h2>
      <p>Your account has been created successfully.</p>
    `,
  });

  newUser.password = undefined; // Hide password before returning
  return newUser;
};

const loginUser = async (email, password) => {
  if (!email || !password) {
    throw new Error("Email and password is required");
  }

  const user = await authDao.findByEmail(email);

  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, "Invalid email or password ");
  }

  user.password = undefined;
  return { user };
};

const getMe = async (id) => {
  return await authDao.findById(id);
};

const forgotPasswordUser = async (oldPassword, newPassword, email) => {
  const user = await authDao.findByEmail(email);

  if (!user || !newPassword) {
    throw new ApiError(401, "User not found");
  }

  const isPasswordValid = await user.comparePassword(oldPassword);
  if (!isPasswordValid) {
    throw new ApiError(401, "OldPassword is incorrect ,");
  }

  user.password = newPassword || user.password;
  user.save();
  // user.password = undefined;
  return user;
};

const updateProfileUser = async ({ email, fullname, username, location }) => {
  const user = await authDao.findByEmail(email);
  if (!user) throw new ApiError(404, "UsernotFound");

  user.username = username || user.username;
  user.fullname = fullname || user.fullname;
  user.location = location || user.location;

  user.save();
  user.password = undefined;
  return user;
};




// add more feature and sequrity 

const forgotPasswordSendOtpUser = async (email) => {
  const user = await authDao.findByEmail(email);

  if (!user) {
    throw new ApiError(404, "Email not not found please enter a email");
  }

  const { otp, hashedOTP, expiresAt } = generateOTP();

  user.resetPasswordOTP = hashedOTP;
  user.resetPasswordOTPExpiry = expiresAt;

  await user.save();

  await sendEmail({
    to: user.email,
    subject: "Reset Password Otp",
    html: `
      <h2>Password Reset</h2>
      <p>Your OTP is:</p>
      <h3>${otp}</h3>
      <p>Valid for 10 minutes</p>
    `,
  });

  return { message: "OTP sent to email" };
};

const resetPasswordVerifyOtpUser = async (email, otp, newPassword) => {
  const user = await authDao.findByCustomData({
    email,
    resetPasswordOTP: hashOTP(otp),
    resetPasswordOTPExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return { message: "If the email exists, OTP has been sent" };
  }

  ((user.password = newPassword || user.password),
    (user.resetPasswordOTP = undefined),
    (user.resetPasswordOTPExpiry = undefined));
  await user.save();

  return {
    message: "Password reset sucessfully please Login in DPaaS",
  };
};

export default {
  registerUser,
  loginUser,
  getMe,
  forgotPasswordUser,
  updateProfileUser,
  forgotPasswordSendOtpUser,
  resetPasswordVerifyOtpUser,
};
