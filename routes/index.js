const express = require('express');
const { PagesController } = require('../controllers');
const router = express.Router();


const pagesController = new PagesController();

router.get('/', pagesController.home);

module.exports = router;
