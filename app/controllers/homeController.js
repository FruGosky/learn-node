const showHome = (req, res) => {
	res.render('pages/home', {
		title: 'Home page',
	});
};

module.exports = { showHome };
