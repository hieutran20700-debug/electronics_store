const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    token: {
      // Lưu Refresh Token
      type: String,
      required: true,
      index: true,
    },
    userAgent: {
      // Lưu thông tin thiết bị (Chrome/iPhone...)
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: "7d", // Tự động xóa sau 7 ngày (trùng với hạn refresh token)
    },
    revokedAt: {
      type: Date,
      default: null, // Mặc định là null
    },
  },
  { collection: "Tokens" }
);

module.exports = mongoose.model("Token", tokenSchema);
