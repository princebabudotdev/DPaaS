import ApiError from "../../utils/appError.js";
import { sendEmail } from "../../utils/sendEmail.js";
import authDao from "./auth.dao.js";

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

  // await sendEmail({
  //   to: newUser.email,
  //   subject: "Welcome to DPaaS 🎉",
  //   html: `
  //     <h2>Welcome ${newUser.fullname}</h2>
  //     <p>Your account has been created successfully.</p>
  //   `,
  // });

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

export default {
  registerUser,
  loginUser,
  getMe,
  forgotPasswordUser,
  updateProfileUser,
};
