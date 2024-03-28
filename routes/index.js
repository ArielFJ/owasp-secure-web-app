import express from "express";
import {
  getUserValidator,
  loginValidator,
  registerValidator,
} from "../utils/validation.js";
import { register, login } from "./auth.js";
import { validateRequest } from "../utils/request.js";
import { getUser, getUsers } from "./users.js";
import { authenticate } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Hello, world!" });
});

// Auth
router.post("/register", registerValidator, validateRequest(register));
router.post("/login", loginValidator, validateRequest(login));

// Users
router.get("/users", authenticate, getUsers);
router.get(
  "/users/:id",
  authenticate,
  getUserValidator,
  validateRequest(getUser)
);

export default router;
