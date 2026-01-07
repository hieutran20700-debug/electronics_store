const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const ACCESS_EXPIRES_IN = "3m";
const REFRESH_EXPIRES_IN = "7d";

if (!JWT_REFRESH_SECRET || !JWT_SECRET) {
  throw new Error("JWT secrets are not defined");
}

class JwtUtils {
  createAccessToken(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_EXPIRES_IN });
  }

  createRefreshToken(payload) {
    return jwt.sign(payload, JWT_REFRESH_SECRET, {
      expiresIn: REFRESH_EXPIRES_IN,
    });
  }

  verifyAccessToken(token) {
    return jwt.verify(token, JWT_SECRET);
  }

  verifyRefreshToken(token) {
    return jwt.verify(token, JWT_REFRESH_SECRET);
  }
}

module.exports = new JwtUtils();
