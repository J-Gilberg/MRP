const query = require('../config/conn');
const { multipleColumnSetWithDateRange } = require('../utils/common.utils');

class CalcsModel {
    tableName = 'order_calcs';

    findCalcs = async (params) => {
        const { columnSet, values } = multipleColumnSetWithDateRange(params);
        let sql = `SELECT * FROM ${this.tableName} WHERE ${columnSet}`;
        return await query(sql, [...values]);
    }
}

module.exports = new CalcsModel;
