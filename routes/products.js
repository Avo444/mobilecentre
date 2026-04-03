const { ProductsController } = require("../controllers");

const express = require("express");
const router = express.Router();

const productsController = new ProductsController();

router.get("/", productsController.getAllProducts);
router.get("/:category", productsController.getProductsByCategory);

module.exports = router;
