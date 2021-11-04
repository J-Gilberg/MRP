const express = require('express');
const router = express.Router();
const calcsController = require('../controllers/calcs.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
router.get('/calcs/productid/:id', awaitHandlerFactory(calcsController.getCalcsByProductId)); // localhost:3000/api//calcs/productid/5
router.get('/calcs/all', awaitHandlerFactory(calcsController.getAllCalcs)); // localhost:3000/api/calcs/all

module.exports = router;