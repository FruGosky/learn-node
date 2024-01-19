const Company = require('../db/models/Company');

const showCompanies = async (req, res) => {
	const { q } = req.query;

	const companies = await Company.find({
		name: {
			$regex: q,
			$options: 'i',
		},
	});

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
			form: req.body,
		});
	}
};

const showEditCompanyForm = async (req, res) => {
	const { name } = req.params;
	const company = await Company.findOne({ slug: name });

	res.render('pages/companies/edit', {
		form: company,
	});
};

const editCompany = async (req, res) => {
	const { name } = req.params;
	const company = await Company.findOne({ slug: name });

	company.name = req.body.name;
	company.slug = req.body.slug;
	company.employeesCount = req.body.employeesCount;

	try {
		await company.save();
		res.redirect('/companies');
	} catch (e) {
		res.render('pages/companies/edit', {
			errors: e.errors,
			form: req.body,
		});
	}
};

const deleteCompany = async (req, res) => {
	const { name } = req.params;

	try {
		await Company.deleteOne({ slug: name });
		res.redirect('/companies');
	} catch (e) {
		console.error(e);
	}
};

module.exports = {
	showCompany,
	showCompanies,
	showCreateCompanyForm,
	createCompany,
	showEditCompanyForm,
	editCompany,
	deleteCompany,
};
