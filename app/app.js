const express = require('express');
const path = require('path');
const ejsLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { sessionKeySecret } = require('./config');

const app = express();

// init database
require('./db/mongoose');

app.use(
	session({
		secret: sessionKeySecret,
		saveUninitialized: true,
		cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
		resave: false,
	})
);

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + '/../views'));

// set layout
app.use(ejsLayouts);
app.set('layout', 'layouts/main');
app.use(express.static('public'));

// body parser // application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// cookie parser
app.use(cookieParser());

// middleware
app.use('/', require('./middleware/viewVariables-middleware'));
app.use('/', require('./middleware/user-middleware'));
app.use('/admin', require('./middleware/isAuth-middleware'));

// mount routes
app.use(require('./routes/web'));

module.exports = app;
