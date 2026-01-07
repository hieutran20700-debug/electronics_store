const express = require("express");
const router = express.Router();
const AuthController = require("./auth.controller");

const validate = require("../../middlewares/validate.middleware");
const verifyAccessToken = require("../../middlewares/auth.middleware");
const rules = require("./auth.validate"); 

router.post("/register", validate(rules.register), AuthController.register);


router.post("/login", validate(rules.login), AuthController.Login);

router.post("/refresh", AuthController.refreshToken);


router.post("/logout", AuthController.logout);


router.post("/logout-all", verifyAccessToken, AuthController.logoutAllDevices);

module.exports = router;
