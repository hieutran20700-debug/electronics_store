const UserRepository = require("./user.repository");
const CreateError = require("../../utils/create.error");
const HashUtils = require("../../utils/hash");
const TokenService = require("../token/token.service");
const User = require("./user.entity");


class UserService {
  async adminCreateUser({ fullName, phone, password, roles, address }) {
    const duplicate = await UserRepository.findByPhoneIncludeDeleted(phone);
    if (duplicate) {
      throw CreateError.createError(400, "Phone number already exists");
    }

    const hashedPassword = await HashUtils.hashPassword(password);

    const newUser = new User({
      fullName,
      phone,
      password: hashedPassword,
      roles: roles || ["user"], 
      address,
    });

    return await UserRepository.create(newUser);
  }

  async changePassword(userId, { oldPassword, newPassword }) {
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw CreateError.createError(404, "User not found");
    }

    const isMatch = await HashUtils.comparePassword(oldPassword, user.password);
    if (!isMatch) {
      throw CreateError.createError(400, "Incorrect old password");
    }

    const newPasswordHash = await HashUtils.hashPassword(newPassword);

    user.changePassword(newPasswordHash);

    await TokenService.revokeAllUserTokens(userId);

    return await UserRepository.update(user);
  }

  async updateUser(userId, { fullName, phone, address }) {
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw CreateError.createError(404, "User not found");
    }
    if (phone && phone !== user.phone) {
      const duplicate = await UserRepository.findByPhoneIncludeDeleted(phone);
      if (duplicate) {
        throw CreateError.createError(
          400,
          "Phone number already used by another account"
        );
      }
    }
    user.updateInfo({ fullName, phone, address });
    return await UserRepository.update(user);
  }

  async getMyProfile(userId) {
    const user = await UserRepository.findById(userId);
    if (!user) throw CreateError.createError(404, "User not found");
    return user;
  }

  async getAllUsers() {
    return await UserRepository.findAll();
  }

  async softDeleteUser(userId) {
    const user = await UserRepository.findById(userId);
    if (!user) throw CreateError.createError(404, "User not found");

    user.softDelete();
    await TokenService.revokeAllUserTokens(userId);
    return await UserRepository.update(user);
  }
}

module.exports = new UserService();
