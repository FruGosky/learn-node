module.exports = (req, res, next) => {
	res.locals.url = req.url;
	next();
};
