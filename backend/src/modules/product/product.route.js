const express = require("express");
const router = express.Router();
const ProductController = require("./product.controller");
const validate = require("../../middlewares/validate.middleware");
const verifyAdmin = require("../../middlewares/verifyAdmin");
const verifyAccessToken = require("../../middlewares/auth.middleware");
const rules = require("./product.validate");

router.get("/", ProductController.getAllProducts);

router.get("/slug/:slug", ProductController.getProductBySlug);

router.get("/:id", ProductController.getProductById);

router.post(
  "/:id/variants",
  verifyAccessToken,
  verifyAdmin,
  validate(rules.addVariant),
  ProductController.addVariant
);

router.post(
  "/",
  verifyAccessToken,
  verifyAdmin,
  validate(rules.createProduct),
  ProductController.create
);

router.patch(
  "/:id",
  verifyAccessToken,
  verifyAdmin,
  validate(rules.updateProduct),
  ProductController.update
);

router.patch(
  "/:id/activate",
  verifyAccessToken,
  verifyAdmin,
  ProductController.activateProduct
);

router.patch(
  "/:id/deactivate",
  verifyAccessToken,
  verifyAdmin,
  ProductController.deactivateProduct
);

router.patch(
  "/:id/restore",
  verifyAccessToken,
  verifyAdmin,
  ProductController.restoreProduct
);

router.delete("/:id", verifyAccessToken, verifyAdmin, ProductController.softDelete);


module.exports = router;
