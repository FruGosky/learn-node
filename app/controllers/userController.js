const User = require('../db/models/user');

const showRegisterForm = (req, res) => {
	res.render('pages/auth/register');
};

const register = async (req, res) => {
	const { email, password } = req.body;

	const user = new User({
		email,
		password,
	});

	try {
		await user.save();
		res.redirect('/login');
	} catch (e) {
		res.render('pages/auth/register', {
			errors: e.errors,
			form: req.body,
		});
	}
};

module.exports = { showRegisterForm, register };
