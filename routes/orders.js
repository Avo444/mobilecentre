const { addOrderMiddleware } = require("../middleware");
const { OrdersController } = require("../controllers");

const express = require("express");
const router = express.Router();

const ordersController = new OrdersController();

router.post("/", addOrderMiddleware, ordersController.addOrder);

module.exports = router;
