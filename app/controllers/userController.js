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

		const isValidPassword = user.comparePassword(password);
		if (!isValidPassword) throw new Error('Password is not valid');

		req.session.user = user;
		res.redirect('/');
	} catch (e) {
		res.render('pages/auth/login', {
			errors: true,
			form: req.body,
		});
	}
};

const logout = (req, res) => {
	req.session.destroy();
	res.redirect('/');
};

const showProfileForm = (req, res) => {
	res.render('pages/auth/profile', {
		form: req.session.user,
	});
};

const update = async (req, res) => {
	const { firstName, lastName, email, password } = req.body;

	const user = await User.findOne(req.session.user.id);
	user.firstName = firstName;
	user.lastName = lastName;
	user.email = email;
	if (password) user.password = password;

	try {
		await user.save();
		req.session.user = user;
		res.redirect('/admin/profile');
	} catch (e) {
		res.render('pages/auth/profile', {
			errors: e.errors,
			form: req.body,
		});
	}
};

module.exports = {
	showRegisterForm,
	register,
	showLoginForm,
	login,
	logout,
	showProfileForm,
	update,
};
