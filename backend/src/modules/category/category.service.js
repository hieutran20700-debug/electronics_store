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

  async updateCategory(id, { name, description }) {
    const category = await CategoryRepository.findById(id);
    if (!category) {
      throw CreateError.createError(404, "Category not found");
    }
    category.updateInfo({ name, description });
    return CategoryRepository.update(id, category);
  }

  async deactivateCategory(id) {
    const category = await CategoryRepository.findById(id);
    if (!category) {
      throw CreateError.createError(404, "Category not found");
    }
    category.deactivate();
    return CategoryRepository.update(id, category);
  }
}

module.exports = new CategoryService();
