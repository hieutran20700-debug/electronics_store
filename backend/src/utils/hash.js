const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

class HashUtils {
  async hashPassword(password) {
    return await bcrypt.hash(password, SALT_ROUNDS);
  }

  async comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }
}

module.exports = new HashUtils();
