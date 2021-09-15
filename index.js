const session = require('express-session');
const pgSessionStore = require('connect-pg-simple');
const PG = require('pg');

module.exports = session({
	secret: process.env.SESSION_SECRET,
	name: 'sid',
	store: new (pgSessionStore(session))({
		pool: new PG.Pool,
		tableName: '_session',
		createTableIfMissing: true
	}),
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: 1000 * 60 * 60 * 24, // 1 day
		httpOnly: true,
		secure: true
	}
});
