const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');
const companyController = require('../controllers/companyController');
const errorController = require('../controllers/errorController');

router.get('/', homeController.showHome);
router.get('/companies', companyController.showCompanies);
router.get('/companies/:name', companyController.showCompany);
router.get('/admin/companies/create', companyController.showCreateCompanyForm);
router.post('/admin/companies/create', companyController.createCompany);
router.get('*', errorController.showError(404));

module.exports = router;
