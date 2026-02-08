import ApiError from "../utils/appError.js";

const errorMiddleware = (err, req, res, next) => {
  let error = err;

  // Normalize unknown errors
  if (!(error instanceof ApiError)) {
    error = new ApiError(
      error.statusCode || 500,
      error.message || "Internal Server Error"
    );
  }

  const statusCode = error.statusCode || 500;

  const response = {
    success: false, // ✅ fixed typo
    message: error.message,
    ...(error.errors?.length && { errors: error.errors }),
    ...(process.env.NODE_ENV === "development" && {
      stack: error.stack,
    }),
  };

  res.status(statusCode).json(response);
};

export default errorMiddleware;
