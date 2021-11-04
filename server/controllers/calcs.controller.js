const calcsModel = require('../models/calcs.model');
const HttpException = require('../utils/HttpException.utils');
// const { validationResult } = require('express-validator');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

class CalcsController {

    getCalcsByProductId = async (req, res, next) => {
        const calcList = await calcsModel.findCalcs({ product_id: req.params.id });
        if (!calcList.length) {
            throw new HttpException(404, 'Calcs not found');
        }
        res.send(calcList);
    };

    getAllCalcs = async (req, res, next) => {
        const calcList = await calcsModel.findCalcsAll();
        res.send(calcList);
    };

    //getall the rows for a particular item.
    //conduct formula
    //save math in its own table to reduce calc.
}

module.exports = new CalcsController;