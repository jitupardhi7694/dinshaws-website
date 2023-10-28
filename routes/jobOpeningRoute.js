const express = require('express');
const router = express.Router();
const JobOpeningController = require('../controller/jobOpeningController');
const logger = require('../helpers/winston');

const {
    JobOpenigValidationRules,
    validate,
} = require('../helpers/validators/masterValidators');
const {
    ensureAuthenticated,
    ensureNotAuthenticated,
} = require('../helpers/auth-helper');

router.get('/', async (req, res) => {
    await JobOpeningController.getJobOpening(req, res);
});
router.post('/', JobOpenigValidationRules(), async (req, res) => {
    await JobOpeningController.postJobOpenig(req, res);
});

// Edit Job Opening
router.get('/edit/:job_id', ensureAuthenticated, async (req, res) => {
    await JobOpeningController.editJobOpening(req, res);
});

router.post(
    '/edit/:job_id',
    ensureAuthenticated,
    validate,
    async (req, res) => {
        await JobOpeningController.updateJobOpening(req, res);
    }
);

// Delete Job Opening
router.get(
    '/jobOpeningTable/:job_id/delete',
    ensureAuthenticated,
    async (req, res) => {
        await JobOpeningController.deleteJob(req, res);
    }
);

// Job Opening Table
router.get('/jobOpeningTable', ensureAuthenticated, async (req, res) => {
    await JobOpeningController.jobOpeningTable(req, res);
});

module.exports = router;
