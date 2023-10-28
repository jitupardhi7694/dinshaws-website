const { Op } = require('sequelize');
const { validationResult } = require('express-validator');

const Department = require('../models/departmentModel');
const logger = require('../helpers/winston');

// Language Add Form Page
const getDepartment = async (req, res) => {
    const rows = await Department.findAll();
    res.render('masterDashboard/department', {
        rows,
        isLogin: false,
    });
};

const postDepartment = async (req, res, next) => {
    // Check for errors in submitted data
    const { name, id } = req.body;
    const errors = validationResult(req).array();
    if (errors.length > 0) {
        // return to form with errors

        return res.render('masterDashboard/department', {
            errors,
            id,
            name,
        });
    }
    // check for duplicate Language name before inserting/updating
    const department = await Department.findOne({
        where: { name: name, id: { [Op.ne]: id } },
    });
    if (department) {
        // Already Exists, return back to form
        errors.push({ msg: 'This department is already saved' });

        return res.render('masterDashboard/department', {
            errors,
            name,
            id,
        });
    }
    //   data validated now check if insert or update is needed.
    try {
        const newRecord = await Department.create({
            name,
        });
        if (newRecord) {
            req.flash('success_msg', 'Data Successfully saved.');
        }
        return res.redirect('/department');
    } catch (error) {
        logger.error(error);
        return next(error);
    }
};

const DepartmentTable = async (req, res) => {
    const registerDepartment = await getDepartmentTable();
    res.render('masterDashboard/departmentTable', {
        registerDepartment,
    });
};

const updateDepartment = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const rows = await Department.findAll();
    const errors = validationResult(req).array();

    if (errors.length > 0) {
        return res.render('masterDashboard/department', {
            errors,
            name,
            rows: req.body,
        });
    }

    const department = await Department.findOne({
        where: { name },
    });

    if (department) {
        errors.push({ msg: 'This Department is already saved' });
        return res.render('masterDashboard/department', {
            errors,
            id,

            rows: req.body,
        });
    }

    try {
        const updateDepartment = await Department.update(
            {
                name,
            },
            { where: { id } }
        );

        if (updateDepartment) {
            req.flash('success_msg', 'Data successfully updated.');
        }

        return res.redirect('/department/departmentTable');
    } catch (err) {
        logger.error(err);
    }
};

const editDepartment = async (req, res) => {
    const { id } = req.params;

    try {
        const rows = await Department.findByPk(id);

        if (rows === null) {
            req.flash('error_msg', 'No record found for editing');
            return res.redirect('/department/departmentTable');
        }

        res.render('masterDashboard/department', {
            id,
            rows,
        });
    } catch (error) {
        logger.error(error);
    }
};

const deleteDepartment = async (req, res) => {
    await deleteDepartmentData(req, res);
};

// Delete Department Opening from Database
async function deleteDepartmentData(req, res) {
    const { id } = req.params;
    try {
        await Department.destroy({
            where: {
                id,
            },
        });

        req.flash('success_msg', 'Data deleted successfully.');
        return res.redirect('/department/departmentTable');
    } catch (error) {
        if (error) {
            if (
                error.message.includes(
                    'Cannot delete or update a parent row: a foreign key constraint fails'
                )
            ) {
                req.flash(
                    'error_msg',
                    'Cannot delete this record as it is already in use.'
                );
                return res.redirect('/department/departmentTable');
            }
            logger.error("Can't delete User Roles from the database ->", error);
        }
        return null;
    }
}

async function getDepartmentTable() {
    try {
        const rows = await Department.findAll();

        console.log('rows =>', rows);
        return rows;
    } catch (error) {
        logger.error("Can't fetch Department  from the database", error);
    }
}

module.exports = {
    getDepartment,
    postDepartment,
    deleteDepartment,
    updateDepartment,
    editDepartment,
    DepartmentTable,
};
