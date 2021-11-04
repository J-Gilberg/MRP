const express = require('express');
const router = express.Router();
const calcsController = require('../controllers/calcs.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
router.get('/productid/:id/date/:start/:end', awaitHandlerFactory(calcsController.getCalcsByProductId)); // localhost:3000/api//calcs/productid/5
router.get('/all/date/:start/:end', awaitHandlerFactory(calcsController.getAllCalcs)); // localhost:3000/api/calcs/all

module.exports = router;