const User = require("./user.entity");
const UserSchema = require("./user.schema");

class UserRepository {
  toEntity(doc) {
    if (!doc) return null;
    return new User({
      id: doc._id.toString(),
      fullName: doc.fullName,
      phone: doc.phone,
      address: doc.address,
      password: doc.password,
      roles: doc.roles,
      isActive: doc.isActive,
      isDeleted: doc.isDeleted,
      deletedAt: doc.deletedAt,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  toPersistence(entity) {
    return {
      fullName: entity.fullName,
      phone: entity.phone,
      password: entity.password,
      address: entity.address,
      roles: entity.roles,
      isActive: entity.isActive,
      isDeleted: entity.isDeleted,
      deletedAt: entity.deletedAt,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  async create(userEntity) {
    const data = this.toPersistence(userEntity);
    const doc = await UserSchema.create(data);
    return this.toEntity(doc);
  }

  async findById(id) {
    const doc = await UserSchema.findOne({ _id: id, isDeleted: false });
    return this.toEntity(doc);
  }

  async findByPhone(phone) {
    const doc = await UserSchema.findOne({ phone, isDeleted: false });
    return this.toEntity(doc);
  }

  async findByIdIncludeDeleted(id) {
    const doc = await UserSchema.findById(id);
    return this.toEntity(doc);
  }

  async findByPhoneIncludeDeleted(phone) {
    const doc = await UserSchema.findOne({ phone });
    return this.toEntity(doc);
  }

  async findAll() {
    const docs = await UserSchema.find({ isDeleted: false });
    return docs.map((doc) => this.toEntity(doc));
  }

  async update(userEntity) {
    const data = this.toPersistence(userEntity);

    const doc = await UserSchema.findOneAndUpdate(
      {
        _id: userEntity.id,
        isDeleted: false,
      },
      data,
      { new: true }
    );

    if (!doc) return null;

    return this.toEntity(doc);
  }
}

module.exports = new UserRepository();
