const mongoose = require("mongoose");

const productVariantSchema = new mongoose.Schema(
  {
    sku: {
      type: String,
      required: true,
      trim: true,
    },
    price: { type: Number, required: true, min: 0 },
    discountPrice: { type: Number, min: 0, default: null },
    stock: { type: Number, default: 0, min: 0 },
    thumbnail: { type: String, default: "" },

    // Mảng options (Color: Gold, RAM: 8GB...)
    options: [
      {
        key: { type: String, required: true },
        value: { type: String, required: true },
        _id: false,
      },
    ],
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },

    brand: { type: String, required: true, index: true }, // Index để lọc theo hãng nhanh

    // Liên kết với bảng Category
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },

    description: { type: String, default: "" },
    thumbnail: { type: String, default: "" },
    images: [{ type: String }], // Mảng url ảnh

    // Thông số kỹ thuật (Chỉ đọc)
    specs: [
      {
        key: { type: String, required: true },
        value: { type: String, required: true },
        _id: false,
      },
    ],

    // Mảng các biến thể (Nhúng trực tiếp Schema con vào)
    variants: [productVariantSchema],

    // Các trường được tính toán (Computed fields) từ Entity
    // Lưu vào DB để phục vụ Sort & Filter nhanh (thay vì phải tính toán lại mỗi lần query)
    minPrice: { type: Number, default: 0, index: true }, // Index để sort giá rẻ nhất
    maxPrice: { type: Number, default: 0 },

    isActive: { type: Boolean, default: true, index: true },
    isDeleted: { type: Boolean, index: true, default: false }, // Soft delete
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    collection: "products",
  }
);

productSchema.index({ name: "text", description: "text" });

module.exports = mongoose.model("Product", productSchema);
