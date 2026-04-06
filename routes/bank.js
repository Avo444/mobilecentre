const { BankController } = require("../controllers");

const express = require("express");
const router = express.Router();

const bankController = new BankController();


router.get("/", bankController.getAllBanks)
router.post("/aparik", bankController.getAparik);

module.exports = router;
