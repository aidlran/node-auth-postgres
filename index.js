const session = require('express-session');
const pgSessionStore = require('connect-pg-simple');
const PG = require('pg');

const sessionMiddleware = session({
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
		maxAge: process.env.SESSION_MAX_AGE ? Number(process.env.SESSION_MAX_AGE) : 1000 * 60 * 60 * 24, // 1 day
		httpOnly: true,
		secure: true
	}
});

module.exports.load = sessionMiddleware;

module.exports.save = (req, res, next) =>
	sessionMiddleware(req, res, () =>
		req.session.save(next));
