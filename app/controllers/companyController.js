const Company = require('../db/models/Company');

const showCompanies = async (req, res) => {
	const { q, sort, sortDirection, employeeCountMin, employeeCountMax } =
		req.query;

	const page = req.query.page || 1;
	const perPage = 2;

	// create where object for query
	const where = {};

	// search by name
	if (q) where.name = { $regex: q, $options: 'i' };

	// filter by employee count min/max
	if (employeeCountMin || employeeCountMax) {
		where.employeesCount = {};
		if (employeeCountMin) {
			where.employeesCount.$gte = Number(employeeCountMin);
		}
		if (employeeCountMax) {
			where.employeesCount.$lte = Number(employeeCountMax);
		}
	}

	// create query
	let query = Company.find(where);

	// get total count of results
	const resultsCount = await query.clone().count();

	// get total pages count
	const pageCount = Math.ceil(resultsCount / perPage);

	// pagination
	query = query.skip((page - 1) * perPage);
	query = query.limit(perPage);

	// sort by asc/desc
	if (sort && sortDirection) {
		query = query.sort({ [sort]: sortDirection });
	}

	// exec query
	const companies = await query.populate('user').exec();

	// render view
	res.render('pages/companies/companies', {
		companies,
		page,
		pageCount,
		resultsCount,
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
	const { user } = req.session;

	const company = new Company({
		name,
		slug,
		employeesCount,
		user: user._id,
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
