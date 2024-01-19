module.exports = (req, res, next) => {
	res.locals.url = req.url;
	res.locals.errors = null;
	next();
};
