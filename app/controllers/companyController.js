const Company = require('../db/models/Company');

const showCompanies = async (req, res) => {
	const companies = await Company.find({});

	res.render('pages/companies', {
		companies,
		url: req.url,
	});
};

const showCompany = async (req, res) => {
	const { name } = req.params;

	const company = await Company.findOne({ slug: name });

	res.render('pages/company', {
		name: company?.name,
		title: company?.name,
		url: req.url,
	});
};

module.exports = { showCompany, showCompanies };
