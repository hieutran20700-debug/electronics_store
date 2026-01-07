// src/modules/auth/auth.validate.js

module.exports = {
  // Validate cho route Đăng ký (Register)
  register: {
    fullName: {
      required: true,
      type: "string",
      minLength: 2,
    },
    phone: {
      required: true,
      type: "string",
      minLength: 10,
      maxLength: 12, // Giới hạn độ dài số điện thoại
    },
    password: {
      required: true,
      type: "string",
      minLength: 6, // Mật khẩu tối thiểu 6 ký tự
    },
    address: {
      required: false, // Không bắt buộc
      type: "string",
    },
  },

  // Validate cho route Đăng nhập (Login)
  login: {
    phone: {
      required: true,
      type: "string",
      minLength: 10,
    },
    password: {
      required: true,
      type: "string",
      minLength: 6,
    },
  },
};
