module.exports = {
  // --- RULE ĐĂNG KÝ (REGISTER) ---
  register: {
    fullName: {
      type: "string",
      required: true,
      min: 2,
      max: 100,
      messages: {
        stringMin: "Tên phải có ít nhất 2 ký tự",
      },
    },
    phone: {
      type: "string",
      required: true,
      // Regex check số điện thoại VN (bắt đầu bằng 03, 05, 07, 08, 09 + 8 số nữa)
      pattern: /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
      messages: {
        stringPattern: "Số điện thoại không hợp lệ (phải là số VN 10 số)",
      },
    },
    password: {
      type: "string",
      required: true,
      min: 6, // Độ dài tối thiểu an toàn
      messages: {
        stringMin: "Mật khẩu phải có ít nhất 6 ký tự",
      },
    },
    address: {
      type: "string",
      optional: true,
      max: 255,
    },
    // Roles thường optional, nếu không truyền thì Service tự set là ["USER"]
    roles: {
      type: "array",
      optional: true,
      items: "string",
      // Có thể thêm enum để chặn role linh tinh
      // enum: ["USER", "ADMIN", "STAFF"]
    },
  },

  // --- RULE ĐĂNG NHẬP (LOGIN) ---
  login: {
    phone: {
      type: "string",
      required: true,
      pattern: /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
    },
    password: {
      type: "string",
      required: true,
      min: 6,
    },
  },

  // --- RULE CẬP NHẬT PROFILE (UPDATE USER) ---
  // Dùng cho: PUT /api/users/me
  updateUser: {
    fullName: {
      type: "string",
      optional: true,
      min: 2,
      max: 100,
    },
    phone: {
      type: "string",
      optional: true,
      pattern: /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
    },
    address: {
      type: "string",
      optional: true,
      max: 255,
    },
    // Lưu ý: KHÔNG cho phép update password hay role ở đây
  },

  // --- RULE ĐỔI MẬT KHẨU (CHANGE PASSWORD) ---
  // Dùng cho: PATCH /api/users/change-password
  changePassword: {
    oldPassword: {
      type: "string",
      required: true,
      min: 6,
    },
    newPassword: {
      type: "string",
      required: true,
      min: 6,
      // Có thể thêm custom validator để check newPassword != oldPassword
    },
    // confirmPassword thường check ở Frontend, Backend check cũng được nhưng không bắt buộc nếu logic service không dùng
    confirmPassword: {
      type: "string",
      optional: true,
      equalField: "newPassword", // Nếu thư viện hỗ trợ check 2 field giống nhau
    },
  },

  // --- RULE QUẢN TRỊ VIÊN TẠO USER (ADMIN CREATE) ---
  // (Nếu Admin muốn tạo user thủ công và set role luôn)
  adminCreateUser: {
    fullName: { type: "string", required: true, min: 2 },
    phone: {
      type: "string",
      required: true,
      pattern: /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
    },
    password: { type: "string", required: true, min: 6 },
    roles: {
      type: "array",
      required: true, // Admin tạo thì bắt buộc chọn quyền
      items: "string",
      min: 1,
    },
  },
};
