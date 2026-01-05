class Category {
  constructor({
    id,
    name,
    slug,
    description = "",
    parentId = null,
    isActive = true,
    createdAt = new Date(),
    updatedAt = new Date(),
  }) {
    this.id = id;
    this.name = name;
    this.slug = slug;
    this.description = description;
    this.parentId = parentId;
    this.isActive = isActive;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  activate() {
    this.isActive = true;
  }

  deactivate() {
    this.isActive = false;
  }

  updateInfo({ name, description }) {
    if (name) this.name = name;
    if (description) this.description = description;
    this.updatedAt = new Date();
  }

  isRoot() {
    return this.parentId === null;
  }
}

module.exports = Category;
