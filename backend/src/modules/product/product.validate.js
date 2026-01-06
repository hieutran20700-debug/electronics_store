module.exports = {
  // --- RULE TẠO MỚI SẢN PHẨM ---
  createProduct: {
    name: {
      required: true,
      type: "string",
      minLength: 2,
    },
    slug: {
      required: true,
      type: "string",
      pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/, // Regex check slug chuẩn (vd: iphone-15-pro)
    },
    brand: {
      required: true,
      type: "string",
    },
    categoryId: {
      required: true,
      type: "string",
      pattern: /^[0-9a-fA-F]{24}$/, // Regex check chuẩn ObjectId của Mongo
    },
    description: {
      type: "string",
      optional: true, // Không bắt buộc
    },
    thumbnail: {
      type: "string",
      optional: true,
    },
    images: {
      type: "array",
      optional: true,
      items: "string", // Mảng các đường dẫn ảnh
    },
    // Validate mảng Specs (Thông số kỹ thuật)
    specs: {
      type: "array",
      optional: true,
      items: {
        type: "object",
        props: {
          key: { type: "string", required: true },
          value: { type: "string", required: true },
        },
      },
    },
    // Validate mảng Variants ngay lúc tạo
    variants: {
      type: "array",
      optional: true,
      items: {
        type: "object",
        props: {
          sku: { type: "string", required: true },
          price: { type: "number", min: 0, required: true },
          discountPrice: { type: "number", min: 0, optional: true },
          stock: { type: "number", min: 0, default: 0 },
          options: {
            type: "array",
            items: {
              type: "object",
              props: {
                key: { type: "string", required: true }, // Vd: Color
                value: { type: "string", required: true }, // Vd: Red
              },
            },
          },
        },
      },
    },
  },

  // --- RULE UPDATE THÔNG TIN CHUNG (PATCH) ---
  // (Tất cả đều optional vì người dùng chỉ update trường họ cần)
  updateProduct: {
    name: {
      type: "string",
      minLength: 2,
      optional: true,
    },
    slug: {
      type: "string",
      pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      optional: true,
    },
    brand: {
      type: "string",
      optional: true,
    },
    categoryId: {
      type: "string",
      pattern: /^[0-9a-fA-F]{24}$/,
      optional: true,
    },
    description: {
      type: "string",
      optional: true,
    },
    thumbnail: {
      type: "string",
      optional: true,
    },
    images: {
      type: "array",
      items: "string",
      optional: true,
    },
    specs: {
      type: "array",
      optional: true,
      items: {
        type: "object",
        props: {
          key: { type: "string", required: true },
          value: { type: "string", required: true },
        },
      },
    },
  },

  // --- RULE THÊM BIẾN THỂ (ADD VARIANT) ---
  // API: POST /products/:id/variants
  addVariant: {
    sku: {
      required: true,
      type: "string",
    },
    price: {
      required: true,
      type: "number",
      min: 0,
    },
    discountPrice: {
      type: "number",
      min: 0,
      optional: true,
    },
    stock: {
      type: "number",
      min: 0,
      optional: true, // Nếu không truyền thì mặc định 0 (xử lý ở Service/Entity)
    },
    thumbnail: {
      type: "string",
      optional: true,
    },
    // Options bắt buộc phải có để phân biệt (Vd: Màu Đỏ, 64GB)
    options: {
      required: true,
      type: "array",
      min: 1, // Ít nhất phải có 1 option
      items: {
        type: "object",
        props: {
          key: { type: "string", required: true },
          value: { type: "string", required: true },
        },
      },
    },
  },
};
