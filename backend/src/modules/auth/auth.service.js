const UserRepository = require("../user/user.repository");
const User = require("../user/user.schema");
const CreateError = require("../../utils/create.error");
const HashUtils = require("../../utils/hash");

class AuthService {
  async register(payload) {
    const { fullName, phone, password, roles, address } = payload;
    const existingUser = await UserRepository.findByPhoneIncludeDeleted(phone);
    if (existingUser) {
      throw CreateError.createError(400, "Phone number already exists");
    }

    const hashedPassword = await HashUtils.hashPassword(password);

    const newUser = new User({
      fullName,
      phone,
      address,
      password: hashedPassword,
      roles: roles || ["user"],
    });

    return await UserRepository.create(newUser);
  }

  async login({ phone, password }) {
    const user = await UserRepository.findByPhone(phone);
    if (!user) {
      throw CreateError.createError(400, "Incorrect phone or password");
    }

    const isMatch = await HashUtils.comparePassword(password, user.password);
    if (!isMatch) {
      throw CreateError.createError(400, "Incorrect phone or password");
    }

    if (!user.isActive) {
      throw CreateError.createError(
        403,
        "Your account has been locked. Please contact admin."
      );
    }

    return user;
  }
}

module.exports = new AuthService();
