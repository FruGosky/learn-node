const showHome = (req, res) => {
	res.render('pages/home', {
		title: 'Home page',
		user: req.session.user,
	});
};

module.exports = { showHome };
