const mongoose = require('mongoose');
const { databaseUrl } = require('../config');

mongoose.connect(databaseUrl);
// mongoose.connect(databaseUrl, {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// 	useFindAndModify: false,
// 	useCreateIndex: true,
// });
