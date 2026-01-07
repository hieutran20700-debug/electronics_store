const CreateError = require("../utils/create.error");

const verifyAdmin = (req, res, next) => {
  // req.user được tạo ra từ auth.middleware.js
  if (!req.user) {
    return next(CreateError.createError(401, "You are not authenticated!"));
  }

  // Kiểm tra trong mảng roles có chứa "ADMIN" không
  // (Giả sử trong DB bạn lưu roles là mảng: ["USER", "ADMIN"])
  if (req.user.roles && req.user.roles.includes("ADMIN")) {
    next(); // Là Admin -> Cho qua
  } else {
    return next(
      CreateError.createError(403, "Access denied! You are not an Admin.")
    );
  }
};

module.exports = verifyAdmin;
