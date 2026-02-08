import ApiError from "../../utils/appError.js";
import { generateOTP, hashOTP } from "../../utils/otp.js";
import { sendEmail } from "../../utils/sendEmail.js";
import authDao from "./auth.dao.js";
import crypto from "crypto";
import User from "./user.model.js";

const registerUser = async (userdata) => {
  if (userdata.email) {
    const existingemail = await authDao.findByEmail(userdata.email);
    if (existingemail) {
      throw new Error("Email already in use");
    }
  }

  // const userPayLoad = {
  //   fullname: userdata.fullname,
  //   username: userdata.username,
  //   email: userdata.email,
  //   password: userdata.password,
  // };

  // // add only if present

  // if (userdata.googleId) {
  //   userPayLoad.googleId = userdata.googleId;
  // }

  // if (userdata.githubId) {
  //   userPayLoad.githubId = userdata.githubId;
  // }


  const newUser = await User.create(userdata);
 
  return newUser

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

const updateProfileUser = async ({
  email,
  fullname,
  username,
  location,
  bio,
  skills,
  SocialLinks,
}) => {
  const user = await authDao.findByEmail(email);
  if (!user) throw new ApiError(404, "UsernotFound");

  user.username = username || user.username;
  user.fullname = fullname || user.fullname;
  user.location = location || user.location;
  user.bio = bio || user.bio;
  user.SocialLinks = SocialLinks || user.SocialLinks;

  await user.save();
  user.password = undefined;
  return user;
};

// add more feature and sequrity

const forgotPasswordSendOtpUser = async (email) => {
  const user = await authDao.findByEmail(email);

  if (!user) {
    throw new ApiError(404, "Email not not found please enter a email");
  }

  if (
    user.resetPasswordOTPSentAt &&
    Date.now() - user.resetPasswordOTPSentAt < 2 * 60 * 1000
  ) {
    throw new ApiError(429, "Resend OTP after 2 minutes");
  }

  user.resetPasswordOTPAttempt = (user.resetPasswordOTPAttempt || 0) + 1;

  if (user.resetPasswordOTPAttempt > 5) {
    throw new ApiError(429, "Too many OTP requests");
  }

  const { otp, hashedOTP, expiresAt } = generateOTP();

  user.resetPasswordOTP = hashedOTP;
  user.resetPasswordOTPExpiry = expiresAt;
  user.resetPasswordOTPAttempt = Date.now();

  await user.save();

  await sendEmail({
    to: user.email,
    subject: "Reset Password OTP",
    html: `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Password Reset</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, Helvetica, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:40px 0;">
          <table
            width="100%"
            style="max-width:500px; background:#ffffff; border-radius:12px; box-shadow:0 10px 25px rgba(0,0,0,0.08); padding:30px;"
            cellpadding="0"
            cellspacing="0"
          >

            <!-- Header -->
            <tr>
              <td align="center" style="padding-bottom:20px;">
                <h2 style="margin:0; color:#1f2937;">🔐 Password Reset</h2>
                <p style="margin:8px 0 0; color:#6b7280; font-size:14px;">
                  DPaaS Security Verification
                </p>
              </td>
            </tr>

            <!-- Message -->
            <tr>
              <td style="color:#374151; font-size:15px; line-height:22px;">
                <p>Hello,</p>
                <p>
                  We received a request to reset your password.
                  Please use the OTP below to continue.
                </p>
              </td>
            </tr>

            <!-- OTP -->
            <tr>
              <td align="center" style="padding:25px 0;">
                <div
                  style="
                    display:inline-block;
                    padding:15px 30px;
                    background:#f3f4f6;
                    border-radius:10px;
                    font-size:28px;
                    letter-spacing:6px;
                    font-weight:bold;
                    color:#111827;
                  "
                >
                  ${otp}
                </div>
              </td>
            </tr>

            <!-- Info -->
            <tr>
              <td style="color:#6b7280; font-size:14px;">
                <p style="margin:0;">⏱️ This OTP is valid for <strong>10 minutes</strong>.</p>
                <p style="margin:8px 0 0;">
                  If you didn’t request this, please ignore this email.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding-top:30px; border-top:1px solid #e5e7eb; text-align:center;">
                <p style="margin:0; font-size:13px; color:#9ca3af;">
                  © ${new Date().getFullYear()} DPaaS. All rights reserved.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
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
  user.resetPasswordOTPSentAt = undefined;
  user.resetPasswordOTPAttempt = 0;

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
