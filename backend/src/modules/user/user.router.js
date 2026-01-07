const express = require("express");
const router = express.Router();
const UserController = require("./user.controller");
const validate = require("../../middlewares/validate.middleware");
const verifyAdmin = require("../../middlewares/verifyAdmin");
const verifyAccessToken = require("../../middlewares/auth.middleware");
const rules = require("./user.validate");

router.get("/me", verifyAccessToken, UserController.getMyProfile);
router.patch(
  "/me",
  verifyAccessToken,
  validate(rules.updateUser),
  UserController.updateMyProfile
);
router.patch(
  "/change-password",
  verifyAccessToken,
  validate(rules.changePassword),
  UserController.changePassword
);
router.get("/", verifyAccessToken, verifyAdmin, UserController.getAllUsers);
router.post(
  "/",
  verifyAccessToken,
  verifyAdmin,
  validate(rules.adminCreateUser),
  UserController.adminCreateUser
);
router.delete(
  "/:id",
  verifyAccessToken,
  verifyAdmin,
  UserController.softDelete
);

module.exports = router;
