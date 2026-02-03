import multer from "multer";
import ApiError from "../utils/appError.js";


const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new ApiError(400, "Only image files are allowed"), false);
    }
    cb(null, true);
  },
});

export default upload;
