const ProductVariant = require("./product-variant.entity");

class Product {
  constructor({
    id,
    name,
    slug,
    brand,
    categoryId,
    description = "",
    thumbnail = "",
    images = [],
    specs = [], // [{ key: "Screen", value: "6.7 inch" }]
    variants = [], // Mảng các object variant raw data
    isActive = true,
    isDeleted = false,
    deletedAt = null,
    createdAt = new Date(),
    updatedAt = new Date(),
  }) {
    this.id = id;
    this.name = name;
    this.slug = slug;
    this.brand = brand;
    this.categoryId = categoryId;
    this.description = description;
    this.thumbnail = thumbnail;
    this.images = images;
    this.specs = specs;
    this.variants = variants.map((v) => new ProductVariant(v));
    this.isActive = isActive;
    this.isDeleted = isDeleted;
    this.deletedAt = deletedAt;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.minPrice = 0;
    this.maxPrice = 0;
    this.calculatePriceRange();
  }

  calculatePriceRange() {
    if (this.variants.length === 0) {
      this.minPrice = 0;
      this.maxPrice = 0;
      return;
    }
    const prices = this.variants.map((v) => v.getFinalPrice());
    this.minPrice = Math.min(...prices);
    this.maxPrice = Math.max(...prices);
  }

  activate() {
    this.isActive = true;
    this.updatedAt = new Date();
  }

  deactivate() {
    this.isActive = false;
    this.updatedAt = new Date();
  }

  addVariant(variantData) {
    const isExist = this.variants.find((v) => v.sku === variantData.sku);
    if (isExist) throw new Error("SKU already exists in this product");

    const newVariant = new ProductVariant(variantData);
    this.variants.push(newVariant);

    this.calculatePriceRange();
    this.updatedAt = new Date();
  }

  updateInfo({ name, description, specs, thumbnail }) {
    if (name) this.name = name;
    if (description) this.description = description;
    if (specs) this.specs = specs;
    if (thumbnail) this.thumbnail = thumbnail;
    this.updatedAt = new Date();
  }

  softDelete() {
    this.isDeleted = true;
    this.isActive = false;
    this.updatedAt = new Date();
    this.deletedAt = new Date();
  }

  restore() {
    this.isDeleted = false;
    this.deletedAt = null;
    this.updatedAt = new Date();
    this.isActive = true;
  }
}

module.exports = Product;
