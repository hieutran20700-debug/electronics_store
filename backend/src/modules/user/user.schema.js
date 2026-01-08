const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 150,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/^[0-9]{10,11}$/, "Phone number must be 10-11 digits"],
    },
    address: {
      type: String,
      trim: true,
      default: "", // Mặc định là chuỗi rỗng
    },
    password: {
      type: String,
      required: true,
    },
    roles: {
      type: [String],
      default: ["user"],
      enum: ["user", "admin"], // (Tuỳ chọn) Giới hạn các role hợp lệ
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, 
    collection: "user",
  }
);


userSchema.index({ phone: 1, isDeleted: 1 });

module.exports = mongoose.model("User", userSchema);
