const express = require('express'),
	app = express(),
	cors = require('cors');
const mysql = require('mysql')
db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: 'root',
	database: 'mrp_schema'
})
const PORT = 4040;
const ordersRouter = require('./server/routes/orders.routes');

app.use(cors());
app.use(express.json());
app.use('', ordersRouter);

//should be on the bottom
app.listen(PORT, () => {
	console.log(`Server is running on ${PORT}`);
})