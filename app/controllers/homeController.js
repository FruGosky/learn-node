const showHome = (req, res) => {
	res.render('pages/home', {
		title: 'Home page',
		url: req.url,
	});
};

module.exports = { showHome };
