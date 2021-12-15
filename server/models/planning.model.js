const query = require('../config/conn');
const { multipleColumnSet } = require('../utils/common.utils');
// const Role = require('../utils/userRoles.utils');
class PlanningModel {

    getPlanningData = async (body) => {
        let data =  {order: [], purchase: [], planned_purhcase: [], forecast: []}
        console.log(`body ${Object.keys(body)}`)
        const { columnSet, values } = multipleColumnSetWithDateRange(body);
        let sql = `SELECT o.product_id
        ,o.order_date
        ,o.order_day
        ,o.order_week
        ,o.order_month
        ,o.order_year
        ,o.order_unix
        ,o.quantity	order_quantity
        FROM order_calcs o 
        WHERE ${columnSet} 
        ORDER BY o.order_date ASC`; 
        data.order = await query(sql, [...values]);

        sql = `SELECT p.product_id
        ,p.purchase_date
        ,p.purchase_day
        ,p.purchase_week
        ,p.purchase_month
        ,p.purchase_year
        ,p.purchase_unix
        ,p.quantity	purchase_quantity
        FROM purchases p
        WHERE ${columnSet} 
        ORDER BY p.purchase_date ASC`;
        data.purchase = await query(sql, [...values]);

        sql = `SELECT p.product_id
        ,p.planned_purchase_date
        ,p.planned_purchase_day
        ,p.planned_purchase_week
        ,p.planned_purchase_month
        ,p.planned_purchase_year
        ,p.planned_purchase_unix
        ,p.quantity	planned_purchase_quantity
        FROM planned_purchase p 
        WHERE ${columnSet} 
        ORDER BY p.planned_purhcase_date ASC`;
        data.planned_purhcase = await query(sql, [...values]);

        sql = `SELECT f.product_id
        ,f.forecast_date
        ,f.forecast_day
        ,f.forecast_week
        ,f.forecast_month
        ,f.forecast_year
        ,f.forecast_unix
        ,f.quantity	forecast_quantity
        FROM forecasts f  
        WHERE ${columnSet} 
        ORDER BY f.forecast_date ASC`;
        data.planned_purhcase = await query(sql, [...values]);
        return data;
    }
}
module.exports = new PlanningModel;


