const query = require('../config/conn');
const { multipleColumnSet } = require('../utils/common.utils');
// const Role = require('../utils/userRoles.utils');
class OrdersModel {
    tableName = 'orders';

    find = async (params) => {
        let sql = `SELECT * FROM ${this.tableName}`;
        return await query(sql);
    }

    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // return back the first row (Order)
        return result[0];
    }

    findAll = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        return result;
    }
    
    //UPDATE orders SET order_day = DAYOFYEAR(order_date), order_month = MONTH(order_date), order_year = YEAR(order_date), order_week = WEEKOFYEAR(order_date);

}

module.exports = new OrdersModel;

// class UserModel {
//     tableName = 'user';

//     find = async (params = {}) => {
//         let sql = `SELECT * FROM ${this.tableName}`;

//         if (!Object.keys(params).length) {
//             return await query(sql);
//         }

//         const { columnSet, values } = multipleColumnSet(params)
//         sql += ` WHERE ${columnSet}`;

//         return await query(sql, [...values]);
//     }

//     findOne = async (params) => {
//         const { columnSet, values } = multipleColumnSet(params)

//         const sql = `SELECT * FROM ${this.tableName}
//         WHERE ${columnSet}`;

//         const result = await query(sql, [...values]);

//         // return back the first row (user)
//         return result[0];
//     }

//     create = async ({ username, password, first_name, last_name, email, role = Role.SuperUser, age = 0 }) => {
//         const sql = `INSERT INTO ${this.tableName}
//         (username, password, first_name, last_name, email, role, age) VALUES (?,?,?,?,?,?,?)`;

//         const result = await query(sql, [username, password, first_name, last_name, email, role, age]);
//         const affectedRows = result ? result.affectedRows : 0;

//         return affectedRows;
//     }

//     update = async (params, id) => {
//         const { columnSet, values } = multipleColumnSet(params)

//         const sql = `UPDATE user SET ${columnSet} WHERE id = ?`;

//         const result = await query(sql, [...values, id]);

//         return result;
//     }

//     delete = async (id) => {
//         const sql = `DELETE FROM ${this.tableName}
//         WHERE id = ?`;
//         const result = await query(sql, [id]);
//         const affectedRows = result ? result.affectedRows : 0;

//         return affectedRows;
//     }
// }