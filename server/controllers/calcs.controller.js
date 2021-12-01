const calcsModel = require('../models/calcs.model');
const HttpException = require('../utils/HttpException.utils');
// const { validationResult } = require('express-validator');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

class CalcsController {

    getLRCalcsByProductId = async (req, res, next) => {
        //{ product_id: req.params.id , start: req.params.start , end: req.params.end}

        const calcList = await calcsModel.getLRCalcs(req.body);
        if (!calcList.length) {
            throw new HttpException(404, 'Calcs not found');
        }
        res.send(calcList);
    };

    getAllLRCalcs = async (req, res, next) => {
        const calcList = await calcsModel.getLRCalcs(req.body);
        res.send(calcList);
    };

    getCRCalcsByProductId = async (req, res, next) => {
        //{ product_id: req.params.id , start: req.params.start , end: req.params.end}
        console.log(`req ${Object.keys(req.headers)}`)
        const calcList = await calcsModel.getCRCalcs({start:req.headers.start, end:req.headers.end, product_id:req.headers.product_id});
        if (!calcList.length) {
            throw new HttpException(404, 'Calcs not found');
        }
        res.send(calcList);
    };

    getAllCRCalcs = async (req, res, next) => {
        
        const calcList = await calcsModel.getCRCalcs(req.body);
        res.send(calcList);
    };

    getPlanningByProductId = async (req, res, next) => {
        //{ product_id: req.params.id , start: req.params.start , end: req.params.end}
        console.log(`req ${Object.keys(req.headers)}`)
        const data = await calcsModel.getPlanningData({start:req.headers.start, end:req.headers.end, product_id:req.headers.product_id});
        if (!calcList.length) {
            throw new HttpException(404, 'no orders found');
        }
        res.send(data);
    };

    //getall the rows for a particular item.
    //conduct formula
    //save math in its own table to reduce calc.
}

module.exports = new CalcsController;