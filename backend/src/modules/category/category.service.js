const CategoryRepository = require("./category.repository");
const Category = require("./category.entity");
const CreateError = require("../../utils/create.error");

class CategoryService {
  async createCategory({ name, slug, description, parentId }) {
    const existed = await CategoryRepository.findBySlug(slug);
    if (existed) {
      throw CreateError.createError(400, "Category slug already exists");
    }

    if (parentId) {
      const parent = await CategoryRepository.findById(parentId);
      if (!parent) {
        throw CreateError.createError(404, "Parent category not found");
      }
    }

    const category = new Category({
      name,
      slug,
      description,
      parentId,
    });

    return CategoryRepository.create(category);
  }
  
  async getAllCategories() {
    return CategoryRepository.findAll();
  }

  async getCategoryById(id) {
    const category = await CategoryRepository.findById(id);
    if (!category) {
      throw CreateError.createError(404, "Category not found");
    }
    return category;
  }

  async updateCategory(id, payload) {
    const category = await CategoryRepository.findById(id);
    if (!category) {
      throw CreateError.createError(404, "Category not found");
    }

    if (payload.slug && payload.slug !== category.slug) {
      const duplicate = await CategoryRepository.findBySlug(payload.slug);
      if (duplicate) {
        throw CreateError.createError(400, "Category slug already exists");
      }
    }
    if (
      payload.parentId &&
      payload.parentId !== category.parentId?.toString()
    ) {
      if (payload.parentId === id) {
        throw CreateError.createError(400, "Category cannot be its own parent");
      }
      const parent = await CategoryRepository.findById(payload.parentId);
      if (!parent) {
        throw CreateError.createError(404, "Parent category not found");
      }
    }

    category.updateInfo(payload);
    return CategoryRepository.update(category);
  }

  async activateCategory(id) {
    const category = await CategoryRepository.findById(id);
    if (!category) throw CreateError.createError(404, "Category not found");

    category.activate();
    return await CategoryRepository.update(category);
  }

  async deactivateCategory(id) {
    const category = await CategoryRepository.findById(id);
    if (!category) throw CreateError.createError(404, "Category not found");

    category.deactivate();
    return await CategoryRepository.update(category);
  }

  async softDeleteCategory(id) {
    const category = await CategoryRepository.findById(id);
    if (!category) {
      throw CreateError.createError(404, "Category not found");
    }

    const childrenCount = await CategoryRepository.countChildren(id);
    if (childrenCount > 0) {
      throw CreateError.createError(
        400,
        "Cannot delete category containing sub-categories. Please move or delete sub-categories first."
      );
    }

    category.softDelete();
    return CategoryRepository.update(category);
  }

  async restoreCategory(id) {
    const category = await CategoryRepository.findByIdIncludeDeleted(id);
    if (!category) {
      throw CreateError.createError(404, "Category not found in trash");
    }

    if (category.parentId) {
      const parent = await CategoryRepository.findById(category.parentId);
      if (!parent) {
        throw CreateError.createError(
          400,
          "Cannot restore: Parent category no longer exists/active"
        );
      }
    }

    category.restore();
    return await CategoryRepository.update(category);
  }
}

module.exports = new CategoryService();
