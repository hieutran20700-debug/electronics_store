class Category {
  constructor({
    id,
    name,
    slug,
    description = "",
    parentId = null,
    isActive = true,
    isDeleted = false,
    deletedAt = null,
    createdAt = new Date(),
    updatedAt = new Date(),
  }) {
    this.id = id;
    this.name = name;
    this.slug = slug;
    this.description = description;
    this.parentId = parentId;
    this.isActive = isActive;
    this.isDeleted = isDeleted;
    this.deletedAt = deletedAt;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  activate() {
    this.isActive = true;
    this.updatedAt = new Date();
  }

  deactivate() {
    this.isActive = false;
    this.updatedAt = new Date();
  }

  softDelete() {
    this.isDeleted = true;
    this.isActive = false; // Xóa rồi thì disable luôn cho chắc
    this.deletedAt = new Date();
    this.updatedAt = new Date();
  }

  // Method khôi phục lại nếu lỡ tay xóa nhầm
  restore() {
    this.isDeleted = false;
    // this.isActive = true;
    this.deletedAt = null;
    this.updatedAt = new Date();
  }

  updateInfo({ name, description }) {
    if (name) this.name = name;
    if (description) this.description = description;
    this.updatedAt = new Date();
  }

  isRoot() {
    return !this.parentId;
  }
}

module.exports = Category;
