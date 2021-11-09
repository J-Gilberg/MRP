const query = require('../config/conn');
const { multipleColumnSetWithDateRange } = require('../utils/common.utils');

class CalcsModel {
    tableName = 'order_calcs';

    getLRCalcs = async (body) => {
        const { columnSet, values } = multipleColumnSetWithDateRange(body);
        let sql = `SELECT product_id, SUM(quantity) xsum, SUM(order_unix) ysum, SUM(xy) xysum, SUM(xsqr) xsqrsum, SUM(ysqr) ysqrsum, ((UNIX_TIMESTAMP(MAX(order_date))-1262325600)/86400) - ((UNIX_TIMESTAMP(MIN(order_date))-1262325600)/86400) n FROM ${this.tableName} WHERE ${columnSet} ORDER BY order_date ASC`;
        console.log(sql);
        console.log(values);
        return await query(sql, [...values]);
    }

    getCRCalcs = async (body) => {
        console.log(`body ${Object.keys(body)}`)
        const { columnSet, values } = multipleColumnSetWithDateRange(body);
        let sql = `SELECT * FROM ${this.tableName} WHERE ${columnSet} ORDER BY order_date ASC`;
        console.log(sql);
        console.log(values);
        return await query(sql, [...values]);
    }
}

module.exports = new CalcsModel;
