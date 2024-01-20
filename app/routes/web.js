const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');
const companyController = require('../controllers/companyController');
const userController = require('../controllers/userController');
const errorController = require('../controllers/errorController');

router.get('/', homeController.showHome);
router.get('/companies', companyController.showCompanies);
router.get('/companies/:name', companyController.showCompany);

router.get('/register', userController.showRegisterForm);
router.post('/register', userController.register);

router.get('/admin/companies/create', companyController.showCreateCompanyForm);
router.post('/admin/companies/create', companyController.createCompany);
router.get(
	'/admin/companies/:name/edit',
	companyController.showEditCompanyForm
);
router.post('/admin/companies/:name/edit', companyController.editCompany);
router.get('/admin/companies/:name/delete', companyController.deleteCompany);

router.get('*', errorController.showError(404));

module.exports = router;
