const { CartController } = require('../controllers');

const express = require('express');
const router = express.Router();

const cartController = new CartController();


router.get("/:id", cartController.getCartWithProducts)
router.post("/", cartController.addCartData)
router.patch("/:id", cartController.patchCartData)

module.exports = router;
