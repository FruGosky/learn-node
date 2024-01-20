const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;
const { validateEmail } = require('../validators');

const userSchema = new Schema({
	email: {
		type: String,
		required: [true, 'Email is required'],
		lowercase: true,
		trim: true,
		unique: true,
		validate: [validateEmail, 'Email must be valid'],
	},
	password: {
		type: String,
		required: [true, 'Password is required'],
		minLength: [4, 'Password must be at least 4 characters long'],
	},
});

userSchema.pre('save', (next) => {
	const user = this;
	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(value, salt);
	user.password = hash;
	next();
});

userSchema.post('save', (error, doc, next) => {
	if (error.code === 11000) {
		error.errors = {
			...error.errors,
			email: {
				message: 'Email is already exists',
			},
		};
	}

	next(error);
});

const User = mongoose.model('User', userSchema);

module.exports = User;
