const bcrypt = require("bcrypt");

class User {
  constructor({
    id,
    fullName,
    phone,
    address,
    password,
    roles,
    isActive = true,
    isDeleted = false,
    deletedAt = null,
    createdAt = new Date(),
    updatedAt = new Date(),
  }) {
    this.id = id;
    this.fullName = fullName;
    this.phone = phone;
    this.address = address;
    this.password = password;
    this.roles = roles || ["user"];
    this.isActive = isActive;
    this.deletedAt = deletedAt;
    this.isDeleted = isDeleted;
    this.updatedAt = updatedAt;
    this.createdAt = createdAt;
  }

  async comparePassword(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
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
    this.deletedAt = new Date();
    this.updatedAt = new Date();
    this.isActive = false;
  }

  restore() {
    this.isDeleted = false;
    this.deletedAt = null;
    this.updatedAt = new Date();
    this.isActive = true;
  }

  updateInfo({ fullName, phone, address }) {
    if (fullName) this.fullName = fullName;
    if (phone) this.phone = phone;
    if(address !== undefined) this.address = address;
    this.updatedAt = new Date();
  }

  changePassword(newPasswordHash) {
    this.password = newPasswordHash;
    this.updatedAt = new Date();
  }

  hasRole(role) {
    return this.roles.includes(role);
  }
}

module.exports = User;
