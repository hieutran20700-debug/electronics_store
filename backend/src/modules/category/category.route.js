const express = require("express");
const router = express.Router();
const CategoryController = require("./category.controller");
const validate = require("../../middlewares/validate.middleware");
const rules = require("./category.validate");

router.post("/", validate(rules.createCategory), CategoryController.create);

router.get("/", CategoryController.getAll);

router.put("/:id", validate(rules.updateCategory), CategoryController.update);

router.delete("/:id", CategoryController.delete);

module.exports = router;
