const express = require('express');
const router = express.Router();
const createProfile = require('../controller/createProfileController');
const careerController = require('../controller/careerController');
const ensureAuthenticated =
    require('../helpers/auth-helper').ensureAuthenticated;

router.get('/', async (req, res) => {
    await careerController.getCareer(req, res);
});

router.get('/create-profile', async (req, res) => {
    await createProfile.profileRegister(req, res);
});

router.post(
    '/create-profile',

    async (req, res) => {
        await createProfile.saveProfile(req, res);
    }
);

module.exports = router;
