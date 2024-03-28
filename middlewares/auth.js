import db from "../db.js";
import { getUnauthorizedResponse, verifyAccessToken } from "../utils/auth.js";

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return getUnauthorizedResponse(res);
  }

  try {
    const decodedToken = verifyAccessToken(token);
    if (!decodedToken) {
      return getUnauthorizedResponse(res);
    }
    const user = db.user.findById(decodedToken.userId);

    if (!user) {
      return getUnauthorizedResponse(res);
    }

    req.user = user;
    next();
  } catch (error) {
    return getUnauthorizedResponse(res);
  }
};

export { authenticate };
