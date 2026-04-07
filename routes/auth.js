const { AuthController } = require("../controllers");
const { authMiddleware } = require("../middleware");

const express = require("express");
const router = express.Router();
const authController = new AuthController();

router.post("/register", authMiddleware, authController.register);
router.post("/login", authMiddleware, authController.login);

module.exports = router;
