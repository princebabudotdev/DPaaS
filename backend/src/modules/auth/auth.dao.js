import ApiError from "../../utils/appError.js";
import User from "./user.model.js";

const createUser = async (userdata) => {
  return await User.create(userdata);
};

const findByEmail = async (email) => {
  return await User.findOne({ email }).select("+password");
};

const findById = async (id, feild) => {
  if (!id) {
    throw new ApiError(404, "userId not found");
  }
  return await User.findById(id);
};

const findByGoogleId = async (googleId) => {
  return await User.findOne({ googleId });
};

const findByGithubId = async (githubId) => {
  return await User.findOne({ githubId });
};

const findByUsername = async (username) => {
  return await User.findOne({ username });
};

const findByCustomData = async ({
  email,
  resetPasswordOTP,
  resetPasswordOTPExpiry,
}) => {
  return await User.findOne({
    email,
    resetPasswordOTP,
    resetPasswordOTPExpiry,
  });
};

export default {
  createUser,
  findByEmail,
  findById,
  findByGoogleId,
  findByGithubId,
  findByUsername,
  findByCustomData,
};
