import authDao from "./auth.dao.js";

const registerUser = async (userdata) => {
  const existingemail = await authDao.findByEmail(userdata.email);
  if (existingemail) {
    throw new Error("Email already in use");
  }

  const newUser = await authDao.createUser({
    fullname: userdata.fullname,
    email: userdata.email,
    username: userdata.username,
    password: userdata.password,
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
    throw new Error("Invalid email or password ", 401);
  }

  user.password = undefined;
  return { user };
};

export default {
  registerUser,
  loginUser,
};
