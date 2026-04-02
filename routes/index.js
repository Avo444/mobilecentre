const { PagesController } = require('../controllers');

const express = require('express');
const router = express.Router();

const pagesController = new PagesController();

router.get("/", pagesController.home);
router.get("/:categorySlug/:productSlug", pagesController.viewProduct)

module.exports = router;
