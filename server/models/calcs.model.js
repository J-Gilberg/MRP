const query = require('../config/conn');
const { multipleColumnSet } = require('../utils/common.utils');

class CalcsModel {
    tableName = 'order_calcs';
    findCalcs = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)
        let sql = `SELECT * FROM ${tableName} WHERE ${columnSet}`;
        return await query(sql, [...values]);
    }

    findCalcsAll = async (params) => {
        let sql = `SELECT * FROM ${tableName}`;
        return await query(sql);
    }
}

module.exports = new CalcsModel;
