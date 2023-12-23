const showError = (code) => (req, res) => {
	res.render(`errors/${code}`, {
		title: `Error ${code}`,
		layout: 'layouts/minimalistic',
		url: req.url,
	});
};

module.exports = { showError };
