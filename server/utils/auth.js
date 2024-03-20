const jwt = require('jsonwebtoken');
const secret = 'your_secret_key'; // Reemplazar por una clave secreta fuerte

function generateAccessToken(userId) {
  return jwt.sign({ userId }, secret, { expiresIn: '1h' });
}

function verifyAccessToken(token) {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}

function isAuthenticated(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false;
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyAccessToken(token);
  return decoded !== null;
}

module.exports = {
  generateAccessToken,
  verifyAccessToken,
  isAuthenticated,
};
