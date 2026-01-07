const TokenSchema = require("./token.schema");
const Token = require("./token.entity");

class TokenRepository {
  toEntity(doc) {
    if (!doc) return null;
    return new Token({
      token: doc.token,
      userId: doc.userId.toString(),
      userAgent: doc.userAgent,
      createdAt: doc.createdAt,
      revokedAt: doc.revokedAt,
    });
  }

  toPersistence(entity) {
    return {
      token: entity.token,
      userId: entity.userId,
      userAgent: entity.userAgent,
      createdAt: entity.createdAt,
      revokedAt: entity.revokedAt,
    };
  }

  async createToken(tokenEntity) {
    const rawData = this.toPersistence(tokenEntity);
    const saveDoc = await TokenSchema.create(rawData);
    return this.toEntity(saveDoc);
  }

  async findToken(tokenString) {
    const doc = await TokenSchema.findOne({ token: tokenString });
    return this.toEntity(doc);
  }

  async updateToken(tokenEntity) {
    const rawData = this.toPersistence(tokenEntity);

    await TokenSchema.updateOne({ token: rawData.token }, rawData);
    return tokenEntity;
  }

  async deleteToken(tokenString) {
    return await TokenSchema.deleteOne({ token: tokenString });
  }

  async deleteByUserId(userId) {
    return await TokenSchema.deleteMany({ userId });
  }
}

module.exports = new TokenRepository();
