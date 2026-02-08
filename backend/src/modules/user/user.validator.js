import { body } from "express-validator";

 const editProfileValidator = [
  body("fullname")
    .optional()
    .isString().withMessage("Fullname must be a string")
    .isLength({ min: 2, max: 50 })
    .withMessage("Fullname must be between 2 and 50 characters")
    .trim(),

  body("username")
    .optional()
    .isString().withMessage("Username must be a string")
    .isLength({ min: 3, max: 20 })
    .withMessage("Username must be between 3 and 20 characters")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Username can contain only letters, numbers, and underscores")
    .trim(),

  body("bio")
    .optional()
    .isString().withMessage("Bio must be a string")
    .isLength({ max: 200 })
    .withMessage("Bio must be at most 200 characters")
    .trim(),

  body("gender")
    .optional()
    .isIn(["male", "female", "other", "prefer_not_to_say"])
    .withMessage("Invalid gender value"),

  body("location")
    .optional()
    .isString().withMessage("Location must be a string")
    .isLength({ max: 100 })
    .withMessage("Location must be at most 100 characters")
    .trim(),
];


export default {
    editProfileValidator
}