const express = require('express');
const router = express.Router();
const UserRoleCotroller = require('../controller/userRoleController');
router.get('/', async (req, res) => {
    await UserRoleCotroller.getUserRole(req, res);
});

router.post(
    '/',

    async (req, res) => {
        await UserRoleCotroller.postUserRole(req, res);
    }
);
module.exports = router;
