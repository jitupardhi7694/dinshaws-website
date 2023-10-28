const express = require('express');
const router = express.Router();
const dashboardController = require('../controller/dashboardController');
const profileController = require('../controller/createProfileController')
const BusinessEneuiryController = require('../controller/businesEnquiryController');
const { checkRoles, ensureAuthenticated } = require('../helpers/auth-helper');
const roles = require('../config/roles.json');

// app Landing page
router.get(['/', '/dashboard'], ensureAuthenticated, async (req, res, next) => {
    if ([roles.ADMIN, roles.USER].includes(req.user.role_id)) {
        return dashboardController.getHrDashboard(req, res);
    }
    if ([roles.CUSTEMER_DELIGHT].includes(req.user.role_id)) {
        return dashboardController.getBusinessDash(req, res);
    }

    return res
        .send('No dashboard available, please check with the developers.')
        .status(404);
});

router.get(
    '/view-table-data',
    checkRoles([roles.ADMIN, roles.USER]),
    async (req, res) => {
        await profileController.jobProfileList(req, res);
    }
);
router.get(
    '/view-table-data/:id/delete',
    checkRoles([roles.ADMIN, roles.USER]),
    async (req, res) => {
        await profileController.deleteJob(req, res);
    }
);
router.get(
    '/customer-application-list',
    checkRoles([roles.CUSTEMER_DELIGHT]),
    async (req, res) => {
        await BusinessEneuiryController.getBusinessEnquiryApplication(req, res);
    }
);
// router.get(
//     '/customer-application-list/:id/delete',
//     checkRoles([Roles.ADMIN, Roles.USER]),
//     async (req, res) => {
//         await BusinessEneuiryController.deleteJob(req, res);
//     }
// );

module.exports = router;
