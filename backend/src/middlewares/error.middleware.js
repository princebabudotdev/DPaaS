import ApiError from "../utils/appError.js";

const errorMiddleware = (err, req, res, next) => {
  // create variable error
  let error = err;

  // If the error is NOT our custom ApiError, convert it into ApiError.
  if (!(error instanceof ApiError)) {
    error = new ApiError(
      error.statusCode || 500,
      error.message || "Internal Server Error"
    );
  }

  const response = {
    sucess: false,
    message: error.message,
    ...(error.errors?.length && { errors: error.errors }),
    ...(process.env.NODE_ENV === "development" && {
      stack: error.stack,
    }),
  };

  // send response error
  res.status(error.statusCode).json(response);
};

export default errorMiddleware;
