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

  async getAllProducts(req, res, next) {
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

  async getProductById(req, res, next) {
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

  async getProductBySlug(req, res, next) {
    try {
      const { slug } = req.params;
      const product = await ProductService.getProductBySlug(slug);
      res.status(200).json({
        message: "Get product detail by slug successfully",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  async addVariant(req, res, next) {
    try {
      const { id } = req.params;
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

  async activateProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await ProductService.activateProduct(id);
      res.status(200).json({
        message: "Product activated successfully",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  async deactivateProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await ProductService.deactivateProduct(id);
      res.status(200).json({
        message: "Product deactivated successfully",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  async restoreProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await ProductService.restoreProduct(id);
      res.status(200).json({
        message: "Product restored successfully",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  async softDelete(req, res, next) {
    try {
      const { id } = req.params;
      const product = await ProductService.softDeleteProduct(id);
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
