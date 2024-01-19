const Company = require('../db/models/Company');

const showCompanies = async (req, res) => {
	const companies = await Company.find({});

	res.render('pages/companies/companies', {
		companies,
	});
};

const showCompany = async (req, res) => {
	const { name } = req.params;

	const company = await Company.findOne({ slug: name });

	res.render('pages/companies/company', {
		name: company?.name,
		title: company?.name,
	});
};

const showCreateCompanyForm = (req, res) => {
	res.render('pages/companies/create');
};

const createCompany = async (req, res) => {
	const { name, slug, employeesCount } = req.body;

	const company = new Company({
		name,
		slug,
		employeesCount,
	});

	try {
		await company.save();
		res.redirect('/companies');
	} catch (e) {
		res.render('pages/companies/create', {
			errors: e.errors,
		});
	}
};

module.exports = {
	showCompany,
	showCompanies,
	showCreateCompanyForm,
	createCompany,
};
