import { validationResult } from "express-validator";

const printRequest = (req, res, next) => {
  console.log(
    `[${new Date().toUTCString()}] ${req.method} ${
      req.path
    } 🔨 ${JSON.stringify(req.body)}`
  );
  next();
};

const validateRequest = (endpoint) => (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }
  return endpoint(req, res, next);
};

export { printRequest, validateRequest };
