const CategoryService = require("./category.service");

class CategoryController {
  async create(req, res, next) {
    try {
      const category = await CategoryService.createCategory(req.body);
      res.status(201).json({
        message: "Category created successfully",
        data: category,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const categories = await CategoryService.getAllCategories();
      res.status(200).json({
        message: "Get all categories successfully",
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const category = await CategoryService.getCategoryById(id);
      res.status(200).json({
        message: "Get category detail successfully",
        data: category,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const category = await CategoryService.updateCategory(id, req.body);
      res.status(200).json({
        message: "Category updated successfully",
        data: category,
      });
    } catch (error) {
      next(error);
    }
  }

  async activate(req, res, next) {
    try {
      const { id } = req.params;
      const category = await CategoryService.activateCategory(id);
      res.status(200).json({
        message: "Category activated successfully",
        data: category,
      });
    } catch (error) {
      next(error);
    }
  }

  async deactivate(req, res, next) {
    try {
      const { id } = req.params;
      const category = await CategoryService.deactivateCategory(id);
      res.status(200).json({
        message: "Category deactivated successfully",
        data: category,
      });
    } catch (error) {
      next(error);
    }
  }

  async restore(req, res, next) {
    try {
      const { id } = req.params;
      const category = await CategoryService.restoreCategory(id);
      res.status(200).json({
        message: "Category restored successfully",
        data: category,
      });
    } catch (error) {
      next(error);
    }
  }

  async softDelete(req, res, next) {
    try {
      const { id } = req.params;

      const category = await CategoryService.softDeleteCategory(id);
      res.status(200).json({
        message: "Category deleted successfully",
        data: category,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CategoryController();
