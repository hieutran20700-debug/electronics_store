const ProductSchema = require("./product.schema");
const Product = require("./product.entity");

class ProductRepository {
  toEntity(doc) {
    if (!doc) return null;

    return new Product({
      id: doc._id.toString(),
      name: doc.name,
      slug: doc.slug,
      brand: doc.brand,
      categoryId: doc.category ? doc.category.toString() : null,
      description: doc.description,
      thumbnail: doc.thumbnail,
      images: doc.images,
      specs: doc.specs,
      variants: doc.variants,
      isActive: doc.isActive,
      isDeleted: doc.isDeleted,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      deletedAt: doc.deletedAt,
    });
  }

  toPersistence(entity) {
    return {
      name: entity.name,
      slug: entity.slug,
      brand: entity.brand,
      category: entity.categoryId,
      description: entity.description,
      thumbnail: entity.thumbnail,
      images: entity.images,
      specs: entity.specs,
      variants: entity.variants.map((v) => ({
        sku: v.sku,
        price: v.price,
        discountPrice: v.discountPrice,
        stock: v.stock,
        thumbnail: v.thumbnail,
        options: v.options,
      })),
      minPrice: entity.minPrice,
      maxPrice: entity.maxPrice,
      isActive: entity.isActive,
      isDeleted: entity.isDeleted,
      createdAt: entity.createdAt,
      deletedAt: entity.deletedAt,
      updatedAt: entity.updatedAt,
    };
  }

  async create(productEntity) {
    const data = this.toPersistence(productEntity);
    const doc = await ProductSchema.create(data);
    return this.toEntity(doc);
  }

  async findById(id) {
    const doc = await ProductSchema.findOne({ _id: id, isDeleted: false });
    return this.toEntity(doc);
  }

  async findByIdIncludeDeleted(id){
    const doc = await ProductSchema.findById(id);
    return this.toEntity(doc);
  }

  async findBySlug(slug) {
    const doc = await ProductSchema.findOne({ slug, isDeleted: false });
    return this.toEntity(doc);
  }

  async findBySku(sku) {
    const docs = await ProductSchema.findOne({
      "variants.sku": sku,
      isDeleted: false,
    });
    return this.toEntity(docs);
  }

  async findAll() {
    const docs = await ProductSchema.find({ isDeleted: false });
    return docs.map((doc) => this.toEntity(doc));
  }

  async update(productEntity) {
    const data = this.toPersistence(productEntity);
    const doc = await ProductSchema.findByIdAndUpdate(
      productEntity.id,
      data,
      {new: true}
    );
    return this.toEntity(doc);
  }
}

module.exports = new ProductRepository();
