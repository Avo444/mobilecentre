const { PagesController } = require('../controllers');

const express = require('express');
const router = express.Router();

const pagesController = new PagesController();

router.get("/", pagesController.home);
router.get("/category/:categorySlug", pagesController.category)
router.get("/category/:categorySlug/:productSlug", pagesController.viewProduct)
router.get("/search", pagesController.search)

router.get("/cart", pagesController.cart)

module.exports = router;
