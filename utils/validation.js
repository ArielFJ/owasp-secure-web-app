import { body, param, query } from "express-validator";

export const registerValidator = [
  body("email", "Email cannot be empty").not().isEmpty(),
  body("email", "Invalid email").isEmail(),
  body("password", "The minimum password length is 9 characters").isLength({
    min: 8,
  }),
  body(
    "password",
    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
  ).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i"),
];

export const loginValidator = [
  body("email", "Email cannot be empty").not().isEmpty(),
  body("email", "Invalid email").isEmail(),
  body("password", "Password cannot be empty").not().isEmpty(),
];

export const getUserValidator = [param("id", "Invalid user ID").isUUID()];
