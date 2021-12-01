const express = require('express');
const router = express.Router();
const planningController = require('../controllers/planning.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

router.get('/planning/one', awaitHandlerFactory(planningController.getPlanningByProductId)); // localhost:3000/api/orders/one


module.exports = router;