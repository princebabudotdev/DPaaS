import ApiError from "../../utils/appError.js";
import userDao from "./user.dao.js";

const updateProfileService = async (
  { fullname, username, location, gender, bio },
  userId,
) => {
  let user = await userDao.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if ((username && username !== user.username) || username !== undefined) {
    const exists = await userDao.findOne({ username });

    if (exists) {
     throw new ApiError(409 , "Username already taken")
    }

     user.username = username || user.username;
  }

  if (fullname !== undefined) user.fullname = fullname || user.fullname;
  if (bio !== undefined) user.bio = bio || user.bio;
  if (gender !== undefined) user.gender = gender || user.gender;
  if (location !== undefined) user.location = location || user.location;

  await user.save();

  return user ;
};

export default {
  updateProfileService,
};
