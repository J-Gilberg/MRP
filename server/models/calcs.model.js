const query = require('../config/conn');
const { multipleColumnSetWithDateRange } = require('../utils/common.utils');

class CalcsModel {
    tableName = 'order_calcs';

    getCalcs = async (body) => {
        const { columnSet, values } = multipleColumnSetWithDateRange(body);
        let sql = `SELECT product_id, SUM(quantity) xsum, SUM(order_unix) ysum, SUM(xy) xysum, SUM(xsqr) xsqrsum, SUM(ysqr) ysqrsum, ((UNIX_TIMESTAMP(MAX(order_date))-1262325600)/86400) - ((UNIX_TIMESTAMP(MIN(order_date))-1262325600)/86400) n FROM ${this.tableName} WHERE ${columnSet}`;
        console.log(sql);
        console.log(values);
        return await query(sql, [...values]);
    }
}

module.exports = new CalcsModel;
