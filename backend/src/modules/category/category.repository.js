const CategorySchema = require("./category.schema");
const Category = require("./category.entity");

class CategoryRepository {
  /**
   * Mongo document -> Domain Entity
   */
  toEntity(doc) {
    if (!doc) return null;

    return new Category({
      id: doc._id.toString(),
      name: doc.name,
      slug: doc.slug,
      description: doc.description,
      parentId: doc.parentId ? doc.parentId.toString() : null,
      isActive: doc.isActive,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  /**
   * Domain Entity -> Mongo data
   */
  toPersistence(entity) {
    return {
      name: entity.name,
      slug: entity.slug,
      description: entity.description,
      parentId: entity.parentId || null,
      isActive: entity.isActive,
    };
  }

  async create(categoryEntity) {
    const data = this.toPersistence(categoryEntity);
    const doc = await CategorySchema.create(data);
    return this.toEntity(doc);
  }

  async findById(id) {
    const doc = await CategorySchema.findById(id);
    return this.toEntity(doc);
  }

  async findBySlug(slug) {
    const doc = await CategorySchema.findOne({ slug });
    return this.toEntity(doc);
  }

  async findAll() {
    const docs = await CategorySchema.find();
    return docs.map((doc) => this.toEntity(doc));
  }

  async update(id, categoryEntity) {
    const data = this.toPersistence(categoryEntity);
    const doc = await CategorySchema.findByIdAndUpdate(id, data, {
      new: true,
    });
    return this.toEntity(doc);
  }

  async delete(id) {
    await CategoryModel.findByIdAndDelete(id);
    return true;
  }
}

module.exports = new CategoryRepository();
