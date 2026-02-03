import { body } from "express-validator";



const createPostValidator = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 100 })
    .withMessage("Title can be maximum 100 characters long"),

  body("content").notEmpty().withMessage("Content is required"),

  body("type")
    .notEmpty()
    .withMessage("Post type is required")
    .isIn(["QUESTION", "DISCUSSION", "RESOURCE"])
    .withMessage("Invalid post type"),

//   body("file").optional().isURL().withMessage("File must be a valid URL"),
];

export default {
  createPostValidator,
};
