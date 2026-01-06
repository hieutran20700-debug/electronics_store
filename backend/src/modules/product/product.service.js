const ProductRepository = require("./product.repository");
const CategoryRepository = require("../category/category.repository");
const Product = require("./product.entity");
const CreateError = require("../../utils/create.error");

class ProductService {
  async createProduct(payload) {
    const {
      name,
      slug,
      brand,
      categoryId,
      description,
      specs,
      variants,
      thumbnail,
      images,
    } = payload;
    const foundSlug = await ProductRepository.findBySlug(slug);
    if (foundSlug) {
      throw CreateError.createError(400, "Product slug already exists");
    }

    const foundCategory = await CategoryRepository.findById(categoryId);
    if (!foundCategory) {
      throw CreateError.createError(400, "Category not found");
    }

    if (variants && variants.length > 0) {
      for (const v of variants) {
        const foundSku = await ProductRepository.findBySku(v.sku);
        if (foundSku) {
          throw CreateError.createError(
            400,
            `SKU '${v.sku}' already exists in system`
          );
        }
      }
    }
    const product = new Product({
      name,
      slug,
      brand,
      categoryId,
      description,
      specs,
      variants: variants || [],
      thumbnail,
      images,
    });
    return await ProductRepository.create(product);
  }

  async getAllProducts() {
    return await ProductRepository.findAll();
  }

  async getProductById(id) {
    const product = await ProductRepository.findById(id);
    if (!product) throw CreateError.createError(404, "Product not found");
    return product;
  }

  async getProductBySlug(slug) {
    const product = await ProductRepository.findBySlug(slug);
    if (!product) throw CreateError.createError(404, "Product not found");
    return product;
  }

  async updateProduct(id, payload) {
    const product = await ProductRepository.findById(id);
    if (!product) throw CreateError.createError(404, "Product not found");

    // Gọi method của Entity
    product.updateInfo(payload);

    return await ProductRepository.update(product);
  }

  async addVariant(id, variantData) {
    const product = await ProductRepository.findById(id);
    if (!product) throw CreateError.createError(404, "Product not found");

    const foundSku = await ProductRepository.findBySku(variantData.sku);
    if (foundSku) {
      throw CreateError.createError(
        400,
        `SKU '${variantData.sku}' already exists in another product`
      );
    }
    // 2. Đẩy vào Entity xử lý (Logic add, check trùng nội bộ, tính lại min/max price)
    // Nếu trùng SKU nội bộ, hàm này sẽ throw Error, ta để global error handler bắt
    product.addVariant(variantData);
    return await ProductRepository.update(product);
  }

  async activateProduct(id) {
    const product = await ProductRepository.findById(id);
    if (!product) {
      throw CreateError.createError(404, "Product not found");
    }
    product.activate();
    return await ProductRepository.update(product);
  }

  async deactivateProduct(id) {
    const product = await ProductRepository.findById(id);
    if (!product) {
      throw CreateError.createError(404, "Product not found");
    }
    product.deactivate();
    return await ProductRepository.update(product);
  }

  async softDeleteProduct(id) {
    const product = await ProductRepository.findById(id);
    if (!product) {
      throw CreateError.createError(404, "Product not found");
    }
    product.softDelete();
    return await ProductRepository.update(product);
  }

  async restoreProduct(id) {
    const product = await ProductRepository.findByIdIncludeDeleted(id);
    if (!product) {
      throw CreateError.createError(404, "Product not found in trash");
    }
    product.restore();
    return await ProductRepository.update(product);
  }
}

module.exports = new ProductService();
