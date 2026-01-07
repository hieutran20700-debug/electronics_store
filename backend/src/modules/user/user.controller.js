const UserService = require("./user.service");

class UserController {
  // --- USER CÁ NHÂN (ME) ---

  async adminCreateUser(req, res, next) {
    try {
      const { fullName, phone, password, roles, address } = req.body;
      const newUser = await UserService.adminCreateUser({
        fullName,
        phone,
        password,
        roles,
        address,
      });
      res.status(201).json({
        message: "User created successfully",
        user: newUser,
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/users/me
  async getMyProfile(req, res, next) {
    try {
      // req.user được tạo ra từ middleware verifyAccessToken
      const userId = req.user.id;
      const user = await UserService.getMyProfile(userId);

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  // PUT /api/users/me
  async updateMyProfile(req, res, next) {
    try {
      const userId = req.user.id;
      // Chỉ lấy các trường cho phép update từ body để bảo mật
      const { fullName, phone, address } = req.body;

      const updatedUser = await UserService.updateUser(userId, {
        fullName,
        phone,
        address,
      });

      res.status(200).json({
        message: "Profile updated successfully",
        user: updatedUser,
      });
    } catch (error) {
      next(error);
    }
  }

  // PATCH /api/users/change-password
  async changePassword(req, res, next) {
    try {
      const userId = req.user.id;
      const { oldPassword, newPassword } = req.body;

      // Service đã lo việc check pass cũ, hash pass mới và revoke token
      await UserService.changePassword(userId, { oldPassword, newPassword });

      res.status(200).json({
        message: "Password changed successfully. Please login again.",
      });
    } catch (error) {
      next(error);
    }
  }

  // --- QUẢN TRỊ VIÊN (ADMIN) ---

  // GET /api/users
  async getAllUsers(req, res, next) {
    try {
      // Truyền query params (page, limit) xuống service nếu có làm phân trang
      const users = await UserService.getAllUsers(req.query);

      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  // DELETE /api/users/:id
  async softDelete(req, res, next) {
    try {
      // Admin xóa người khác dựa trên ID trên URL
      const userId = req.params.id;

      await UserService.softDeleteUser(userId);

      res.status(200).json({
        message: "User deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
