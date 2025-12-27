import crypto from "crypto";

export const generateOTP = (length = 6, expiryMinutes = 10) => {
  // ✅ force valid length
  const safeLength = Number.isInteger(length) && length >= 4 ? length : 6;

  const min = Math.pow(10, safeLength - 1);
  const max = Math.pow(10, safeLength) - 1;

  const otp = crypto.randomInt(min, max + 1).toString();

  const hashedOTP = crypto
    .createHash("sha256")
    .update(otp)
    .digest("hex");

  const expiresAt = Date.now() + expiryMinutes * 60 * 1000;

  return {
    otp,
    hashedOTP,
    expiresAt,
  };
};




/**
 * Hash OTP for comparison
 */
export const hashOTP = (otp) => {
  return crypto
    .createHash("sha256")
    .update(String(otp))
    .digest("hex");
};