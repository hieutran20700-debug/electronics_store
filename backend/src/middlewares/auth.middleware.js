const jwt = require("jsonwebtoken");
const CreateError = require("../utils/create.error");

const verifyAccessToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return next(
          CreateError.createError(
            401,
            "You are not authenticated! (Missing or invalid token format)"
          )
        );
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return next(CreateError.createError(401, "Token not found!"));
    }

    jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, user) => {
      if (err) {
        // Token hết hạn, sai chữ ký, hoặc bị chỉnh sửa
        // Trả về 403 Forbidden để client biết mà đi refresh token
        return next(
          CreateError.createError(403, "Token is not valid or expired!")
        );
      }

      // 5. Nếu ngon lành -> Gán payload (id, roles...) vào req.user
      // Để các controller phía sau có thể dùng (ví dụ: req.user.id)
      req.user = user;

      next();
    });
}

module.exports = verifyAccessToken