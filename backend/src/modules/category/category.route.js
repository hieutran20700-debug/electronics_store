const express = require("express");
const router = express.Router();
const CategoryController = require("./category.controller");

router.post("/", CategoryController.create);

router.get("/", CategoryController.getAll);

router.put("/:id", CategoryController.update);

router.patch("/:id/deactivate", CategoryController.deactivate);

router.get("/me", (req, res) => {
    res.send("ok");
})

module.exports = router