import ApiError from "../../utils/appError.js";
import User from "./user.model.js";

const createUser = async (userdata) => {
  return await User.create(userdata);
};

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const findById = async (id, feild) => {
  if (!id) {
    throw new ApiError(404, "userId not found");
  }
  return await User.findById(id);
};

export default {
  createUser,
  findByEmail,
  findById,
};
