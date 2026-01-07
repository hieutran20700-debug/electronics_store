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

      isDeleted: doc.isDeleted,
      deletedAt: doc.deletedAt,

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

      isDeleted: entity.isDeleted,
      deletedAt: entity.deletedAt,
    };
  }

  async create(categoryEntity) {
    const data = this.toPersistence(categoryEntity);
    const doc = await CategorySchema.create(data);
    return this.toEntity(doc);
  }

  async findById(id) {
    const doc = await CategorySchema.findOne({ _id: id, isDeleted: false });
    return this.toEntity(doc);
  }

  async findByIdIncludeDeleted(id) {
    const doc = await CategorySchema.findById(id);
    return this.toEntity(doc);
  }

  async findBySlug(slug) {
    const doc = await CategorySchema.findOne({ slug, isDeleted: false });
    return this.toEntity(doc);
  }

  async findAll() {
    const docs = await CategorySchema.find({ isDeleted: false });
    return docs.map((doc) => this.toEntity(doc));
  }

  async update(categoryEntity) {
    const data = this.toPersistence(categoryEntity);
    const doc = await CategorySchema.findByIdAndUpdate(
      categoryEntity.id,
      data,
      { new: true }
    );
    return this.toEntity(doc);
  }

  async countChildren(parentId) {
    return CategorySchema.countDocuments({
      parentId,
      isDeleted: false,
    });
  }
}

module.exports = new CategoryRepository();
