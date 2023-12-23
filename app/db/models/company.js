const mongoose = require('mongoose');
const { Schema } = mongoose;
const { checkForbiddenString } = require('../validators');

const companySchema = new Schema({
	slug: {
		type: String,
		required: [true, 'Slug is required'],
		minlength: [3, 'Slug is too short'],
		validate: (value) => checkForbiddenString(value),
		trim: true,
		lowercase: true,
	},
	name: {
		type: String,
		required: [true, 'Name is required'],
	},
	employeesCount: {
		type: Number,
		default: 1,
	},
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
