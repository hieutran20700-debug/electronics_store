const bcrypt = require("bcrypt");

class User {
  constructor({
    id,
    fullName,
    email,
    phone,
    password,
    roles,
    status,
    isDeleted = false,
    deletedAt = null,
    createdAt = new Date(),
    updatedAt = new Date(),
  }) {
    this.id = id;
    this.fullName = fullName;
    this.email = email;
    this.phone = phone;
    this.password = password;
    this.roles = roles || ["User"];
    this.status = status || "active";
    this.deletedAt = deletedAt;
    this.isDeleted = isDeleted;
    this.updatedAt = updatedAt;
    this.createdAt = createdAt;
  }

  async comparePassword(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  }

  isActive() {
    return this.status === "active" && !this.isDeleted;
  }

  softDelete() {
    this.isDeleted = true;
    this.deletedAt = new Date();
    this.updatedAt = new Date();
  }

  restore() {
    this.isDeleted = false;
    this.deletedAt = null;
    this.updatedAt = new Date();
  }
}
