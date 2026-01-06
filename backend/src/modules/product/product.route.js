const express = require("express");
const router = express.Router();
const ProductController = require("./product.controller");
const validate = require("../../middlewares/validate.middleware");
const rules = require("./product.validate");

router.post("/", validate(rules.createProduct), ProductController.create);

router.post(
  "/:id/variants",
  validate(rules.addVariant),
  ProductController.addVariant
);

router.get("/", ProductController.getAll);

router.get("/:id", ProductController.getOne);

router.patch("/:id", validate(rules.updateProduct), ProductController.update);

router.delete("/:id", ProductController.delete);

module.exports = router;
