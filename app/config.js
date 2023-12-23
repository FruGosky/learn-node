require('dotenv').config();

module.exports = {
	port: process.env.PORT || 3000,
	databaseUrl:
		process.env.DATABASE || 'mongodb://127.0.0.1:27017/course-node',
};
