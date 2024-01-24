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

const showLoginForm = (req, res) => {
	res.render('pages/auth/login');
};

const login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user) throw new Error('User not found');

		const isValidPassword = true;
		if (!isValidPassword) throw new Error('Password is not valid');

		req.session.user = {
			_id: user.id,
			email: user.email,
		};
		res.redirect('/');
	} catch (e) {
		res.render('pages/auth/login', {
			errors: true,
			form: req.body,
		});
	}
};

module.exports = {
	showRegisterForm,
	register,
	showLoginForm,
	login,
};
