const TokenService = require("./token.service");

class TokenController {
  // 1. Refresh Token (Cấp lại token mới khi cái cũ hết hạn)
  async refresh(req, res, next) {
    try {
      // Lấy refreshToken từ body (hoặc cookie tùy cách bạn setup)
      const { refreshToken } = req.body;

      // Gọi service xử lý logic xoay vòng
      const tokens = await TokenService.refreshAuth(refreshToken);

      res.status(200).json({
        message: "Token refreshed successfully",
        data: tokens,
      });
    } catch (error) {
      next(error);
    }
  }

  // 2. Logout (Hủy token hiện tại)
  async revoke(req, res, next) {
    try {
      const { refreshToken } = req.body;

      // Gọi service để đánh dấu token là đã hủy
      await TokenService.logout(refreshToken);

      res.status(200).json({
        message: "Revoked token successfully (Logged out)",
      });
    } catch (error) {
      next(error);
    }
  }

  // 3. Logout All (Đăng xuất khỏi tất cả thiết bị)
  // API này cần user phải đang đăng nhập (có AccessToken) thì mới gọi được
  async revokeAll(req, res, next) {
    try {
      // Lấy userId từ req.user (được middleware auth gán vào)
      const userId = req.user.id;

      await TokenService.revokeAllUserTokens(userId);

      res.status(200).json({
        message: "All devices logged out successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TokenController();
