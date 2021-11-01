const express = require('express');
const cors = require('cors');
const app = module.exports = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cors());
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const options = {
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'root',
	database: 'mrp_schema'
};

const sessionStore = new MySQLStore(options);

app.use(session({
	key: 'session_cookie_name',
	secret: 'session_cookie_secret',
	store: sessionStore,
	resave: false,
	saveUninitialized: false
}));