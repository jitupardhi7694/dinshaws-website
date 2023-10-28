const express = require('express');
const router = express.Router();
const businessEnquiryController = require('../controller/businesEnquiryController');
const {
    businessEnquiryValidationRules,
    validate,
    validationResult,
} = require('../helpers/validators/businessEnquiryValidation');
const { checkRoles } = require('../helpers/auth-helper');
const Roles = require('../config/roles.json');

router.get(
    '/',

    async (req, res) => {
        await businessEnquiryController.getBusinessEnquiry(req, res);
    }
);
router.get(
    '/customer-application-list',
    checkRoles([Roles.CUSTEMER_DELIGHT, Roles.USER]),
    async (req, res) => {
        await businessEnquiryController.getBusinessEnquiryApplication(req, res);
    }
);

router.post(
    '/',
    businessEnquiryValidationRules(),
    validate,
    async (req, res) => {
        await businessEnquiryController.postBusinessEnquiry(req, res);
    }
);

module.exports = router;
