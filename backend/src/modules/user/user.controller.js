import ApiError from "../../utils/appError.js";
import asyncHandler from "../../utils/asyncHandler.js";

const getMe = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

export default { getMe };
