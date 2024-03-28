import fs from "fs";
import { validationResult } from "express-validator";
import { verifyAccessToken } from "./auth.js";
import db from "../db.js";

const getMessage = async (req) => {
  const token = req.headers.authorization?.split(" ")[1];
  const decodedToken = verifyAccessToken(token);
  let userMessage = "Unauthorized";
  if (!decodedToken) {
    userMessage = "Unauthorized";
  } else {
    const user = await db.user.findById(decodedToken.userId);
    userMessage = `${decodedToken.userId} ${user.username}`;
  }

  return (
    `[${new Date().toUTCString()}]\n` +
    `\t${req.method} ${req.path} 🔨 ${JSON.stringify(req.body)}\n` +
    `\tUser: ${userMessage}\n`
  );
};

const logRequest = async (req, res, next) => {
  const message = await getMessage(req);

  const today = new Date();
  const date = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;
  if (!fs.existsSync("logs")) {
    fs.mkdirSync("logs");
  }

  fs.appendFile(`logs/${date}.log`, `${message}\n`, (err) => {
    if (err) {
      console.error(err);
    }
  });

  next();
};

const validateRequest = (endpoint) => (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }
  return endpoint(req, res, next);
};

export { logRequest, validateRequest };
