const ProductService = require("./product.service");

class ProductController {
  async create(req, res, next) {
    try {
      const product = await ProductService.createProduct(req.body);
      res.status(201).json({
        message: "Product created successfully",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const products = await ProductService.getAllProducts();
      res.status(200).json({
        message: "Get all products successfully",
        data: products,
      });
    } catch (error) {
      next(error);
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const product = await ProductService.getProductById(id);
      res.status(200).json({
        message: "Get product detail successfully",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  async addVariant(req, res, next) {
    try {
      const { id } = req.params;
      // Body gửi lên là { sku: "IP15-RED", price: 1000, ... }
      const product = await ProductService.addVariant(id, req.body);
      res.status(200).json({
        message: "Add variant successfully",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const product = await ProductService.updateProduct(id, req.body);
      res.status(200).json({
        message: "Product update successfully",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const product = await ProductService.deleteProduct(id);
      res.status(200).json({
        message: "Product deleted successfully",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProductController();
