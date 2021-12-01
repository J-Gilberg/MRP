const query = require('../config/conn');
const { multipleColumnSet } = require('../utils/common.utils');
// const Role = require('../utils/userRoles.utils');
class PlanningModel {
    tableName = 'order_calcs';

    getPlanningData = async (body) => {
        console.log(`body ${Object.keys(body)}`)
        const { columnSet, values } = multipleColumnSetWithDateRange(body);
        let sql = `SELECT * 
        FROM ${this.tableName} o 
        JOIN purchases p ON o.order_unix = p.purchase_unix
        JOIN planned_purchases pp ON o.order_unix = pp.planned_purchase_unix
        JOIN forecasts f ON o.order_unix = f.forecast_unix 
        WHERE ${columnSet} 
        ORDER BY o.order_date ASC`; // get more data probably need to specify the columns to reduce data received
        console.log(sql);
        console.log(values);
        return await query(sql, [...values]);
    }
}

module.exports = new PlanningModel;