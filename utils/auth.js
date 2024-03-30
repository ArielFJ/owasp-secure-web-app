import jwt from "jsonwebtoken";
const { sign, verify } = jwt;

function generateAccessToken(userId) {
  return sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN });
}

function verifyAccessToken(token) {
  try {
    return verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
}

function isAuthenticated(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return false;
  }

  const token = authHeader.split(" ")[1];
  const decoded = verifyAccessToken(token);
  return decoded !== null;
}

function getUnauthorizedResponse(res) {
  return res.status(401).json({ error: "Unauthorized" });
}

export {
  generateAccessToken,
  verifyAccessToken,
  isAuthenticated,
  getUnauthorizedResponse,
};
