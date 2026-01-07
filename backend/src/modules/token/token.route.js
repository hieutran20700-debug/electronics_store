const express = require("express");
const router = express.Router();
const TokenController = require("./token.controller");

const verifyAccessToken = require("../../middlewares/auth.middleware");

router.post("/refresh", TokenController.refresh);

router.post("/revoke", TokenController.revoke);

// POST /api/tokens/revoke-all (Logout all devices)
// Cần login mới logout all được -> verifyAccessToken
router.post("/revoke-all", verifyAccessToken, TokenController.revokeAll);

module.exports = router;
