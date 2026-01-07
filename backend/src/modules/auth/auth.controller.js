const AuthService = require("./auth.service");
const TokenService = require("../token/token.service");
const CreateError = require("../../utils/create.error");

class AuthController {
  async Login(req, res, next) {
    try {
      const { phone, password } = req.body;
      const user = await AuthService.login({ phone, password });
      const userAgent = req.get("User-Agent");
      const tokens = await TokenService.generateAuthTokens(user, userAgent);

      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      };

      res.cookie("refreshToken", tokens.refreshToken, cookieOptions);

      res.status(200).json({
        message: "Login successful",
        user: {
          id: user.id,
          fullName: user.fullName,
          roles: user.roles,
          phone: user.phone,
          address: user.address,
        },
        accessToken: tokens.accessToken,
      });
    } catch (error) {
      next(error);
    }
  }

  async register(req, res, next) {
    try {
      const newUser = await AuthService.register(req.body);
      res.status(201).json({
        message: "User registered successfully",
        user: newUser,
      });
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req, res, next) {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        throw CreateError.createError(401, "No refresh token provided");
      }
      const newTokens = await TokenService.refreshAuth(refreshToken);

      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      };

      res.cookie("refreshToken", newTokens.refreshToken, cookieOptions);

      res.status(200).json({
        accessToken: newTokens.accessToken,
      });
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (refreshToken) {
        await TokenService.logout(refreshToken);
      }

      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async logoutAllDevices(req, res, next) {
    try {
      // Giả sử middleware đã decode token và gán user vào req.user
      const userId = req.user.id;

      if (!userId) {
        throw CreateError.createError(401, "User not authenticated");
      }

      // Xóa toàn bộ token trong DB của user này
      await TokenService.revokeAllUserTokens(userId);

      // Xóa luôn cookie ở thiết bị hiện tại cho sạch sẽ
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      res.status(200).json({
        message: "Logged out from all devices successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();