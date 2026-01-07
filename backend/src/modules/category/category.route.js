const express = require("express");
const router = express.Router();
const CategoryController = require("./category.controller");

const validate = require("../../middlewares/validate.middleware");
const rules = require("./category.validate");

const verifyAccessToken = require("../../middlewares/auth.middleware");
const verifyAdmin = require("../../middlewares/verifyAdmin");

router.get("/", CategoryController.getAll);

router.get("/:id", CategoryController.getById);

router.post("/", verifyAccessToken, verifyAdmin, validate(rules.createCategory), CategoryController.create);

router.patch(
  "/:id",
  verifyAccessToken,
  verifyAdmin,
  validate(rules.updateCategory),
  CategoryController.update
);

router.patch(
  "/:id/activate",
  verifyAccessToken,
  verifyAdmin,
  CategoryController.activate
);

router.patch(
  "/:id/deactivate",
  verifyAccessToken,
  verifyAdmin,
  CategoryController.deactivate
);

router.patch(
  "/:id/restore",
  verifyAccessToken,
  verifyAdmin,
  CategoryController.restore
);

router.delete(
  "/:id",
  verifyAccessToken,
  verifyAdmin,
  CategoryController.softDelete
);

module.exports = router;
