module.exports = function(schema){
    const mysql = require('mysql')
    const db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: 'root',
        database: schema
    })
}
