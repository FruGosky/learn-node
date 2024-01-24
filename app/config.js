require('dotenv').config({ path: '.env.local' });

module.exports = {
	port: process.env.PORT || 3000,
	databaseUrl:
		process.env.DATABASE || 'mongodb://127.0.0.1:27017/course-node',
	sessionKeySecret: process.env.SESSION_KEY_SECRET,
};
