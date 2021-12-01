const planningModel = require('../models/planning.model');
const HttpException = require('../utils/HttpException.utils');
// const { validationResult } = require('express-validator');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

class PlanningController {

    getPlanningByProductId = async (req, res, next) => {
        //{ product_id: req.params.id , start: req.params.start , end: req.params.end}
        console.log(`req ${Object.keys(req.headers)}`)
        const data = await planningModel.getPlanningData({start:req.headers.start, end:req.headers.end, product_id:req.headers.product_id});
        if (!calcList.length) {
            throw new HttpException(404, 'no orders found');
        }
        res.send(data);
    };

    //getall the rows for a particular item.
    //conduct formula
    //save math in its own table to reduce calc.
}

module.exports = new PlanningController;