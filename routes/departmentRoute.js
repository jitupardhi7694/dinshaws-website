const express = require('express');
const router = express.Router();
const DepartmentController = require('../controller/departmentController');
const {
    departmentValidationRules,
    validate,
} = require('../helpers/validators/masterValidators');
const {
    ensureAuthenticated,
    ensureNotAuthenticated,
} = require('../helpers/auth-helper');

router.get('/', async (req, res) => {
    await DepartmentController.getDepartment(req, res);
});
router.post('/', departmentValidationRules(), async (req, res) => {
    await DepartmentController.postDepartment(req, res);
});



// Edit Job Opening
router.get('/edit/:id', ensureAuthenticated, async (req, res) => {
    await DepartmentController.editDepartment(req, res);
});

router.post(
    '/edit/:id',
    departmentValidationRules(),
    ensureAuthenticated,
    validate,
    async (req, res) => {
        await DepartmentController.updateDepartment(req, res);
    }
);

// Delete Job Opening
router.get(
    '/departmentTable/:id/delete',
    ensureAuthenticated,
    async (req, res) => {
        await DepartmentController.deleteDepartment(req, res);
    }
);

// Job Opening Table
router.get('/departmentTable', ensureAuthenticated, async (req, res) => {
    await DepartmentController.DepartmentTable(req, res);
});


module.exports = router;
