const express = require('express');
const router = express.Router();
const calcsController = require('../controllers/calcs.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
router.get('/cr/one', awaitHandlerFactory(calcsController.getCRCalcsByProductId)); // localhost:3000/api/calcs/one
router.get('/cr/all', awaitHandlerFactory(calcsController.getAllCRCalcs)); // localhost:3000/api/calcs/all
router.get('/lr/one', awaitHandlerFactory(calcsController.getLRCalcsByProductId)); // localhost:3000/api/calcs/one
router.get('/lr/all', awaitHandlerFactory(calcsController.getAllLRCalcs)); // localhost:3000/api/calcs/all

module.exports = router;