const { Op } = require('sequelize');
const { QueryTypes } = require('sequelize');
const departmentModel = require('../models/departmentModel');
const JobOpening = require('../models/JobMasterModel');
const { validationResult } = require('express-validator');
const db = require('../helpers/init-mysql');
const logger = require('../helpers/winston');

const getJobOpening = async (req, res) => {
    try {
        const departments = await departmentModel.findAll();
        const rows = await JobOpening.findAll();

        res.render('masterDashboard/jobOpening', {
            rows,
            departments,
            selectedDepartment: null,
            isLogin: false,
        });
    } catch (error) {
        console.log(error);
    }
};

const postJobOpenig = async (req, res) => {
    const { department_id, description, location, job_id } = req.body;

    try {
        const departments = await departmentModel.findAll();
        const rows = await JobOpening.findAll();
        const errors = validationResult(req).array();

        if (errors.length > 0) {
            return res.render('masterDashboard/jobOpening', {
                errors,
                departments,
                rows,
                selectedDepartment: null,
            });
        }

        const Job = await JobOpening.findOne({
            where: { description },
        });

        if (Job) {
            errors.push({ msg: 'This Job is already saved' });
            return res.render('masterDashboard/jobOpening', {
                errors,
                job_id,
                rows,
                departments,
                selectedDepartment: rows.department_id,
            });
        }

        const saveJob = await JobOpening.create({
            department_id,
            description,
            location,
        });

        req.flash('success_msg', `Job ${saveJob.description} is saved.`);
        return res.redirect('/job-opening');
    } catch (error) {
        console.log(error);
    }
};

// Controller

const jobOpeningTable = async (req, res) => {
    const registerJob = await getJobOpeningTable();
    res.render('masterDashboard/jobOpeningTable', {
        registerJob,
    });
};

const updateJobOpening = async (req, res) => {
    const { job_id } = req.params;
    const { department_id, description, location } = req.body;
    const rows = await JobOpening.findAll();

    const departments = await departmentModel.findAll();

    const errors = validationResult(req).array();

    if (errors.length > 0) {
        return res.render('masterDashboard/jobOpening', {
            errors,
            departments,
            rows: req.body,
            selectedDepartment: rows.department_id,
        });
    }

    const job = await JobOpening.findOne({
        where: { description },
    });

    if (job) {
        errors.push({ msg: 'This Job is already saved' });
        return res.render('masterDashboard/jobOpening', {
            errors,
            job_id,
            rows: req.body,
            departments,
            selectedDepartment: rows.department_id,
        });
    }

    try {
        const updateJob = await JobOpening.update(
            {
                department_id,
                description,
                location,
            },
            { where: { job_id } }
        );

        if (updateJob) {
            req.flash('success_msg', 'Data successfully updated.');
        }

        return res.redirect('/job-opening/jobOpeningTable');
    } catch (err) {
        logger.error(err);
    }
};

const editJobOpening = async (req, res) => {
    const { job_id } = req.params;

    try {
        const rows = await JobOpening.findByPk(job_id);

        if (rows === null) {
            req.flash('error_msg', 'No record found for editing');
            return res.redirect('/job-opening/jobOpeningTable');
        }

        const departments = await departmentModel.findAll();

        res.render('masterDashboard/jobOpening', {
            job_id,
            rows,
            departments,
            selectedDepartment: rows.department_id,
        });
    } catch (error) {
        logger.error(error);
    }
};

const deleteJob = async (req, res) => {
    await deleteJobOpening(req, res);
};

// Delete Job Opening from Database
async function deleteJobOpening(req, res) {
    const { job_id } = req.params;
    try {
        await JobOpening.destroy({
            where: {
                job_id,
            },
        });

        req.flash('success_msg', 'Data deleted successfully.');
        return res.redirect('/job-opening/jobOpeningTable');
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
                return res.redirect('/job-opening/jobOpeningTable');
            }
            logger.error("Can't delete User Roles from the database ->", error);
        }
        return null;
    }
}

async function getJobOpeningTable() {
    try {
        const rows = await db.query('SELECT * FROM jobOpeningTableView', {
            type: QueryTypes.SELECT,
        });

        console.log('rows =>', rows);
        return rows;
    } catch (error) {
        logger.error("Can't fetch Job Opening from the database", error);
    }
}

module.exports = {
    getJobOpening,
    postJobOpenig,
    deleteJob,
    jobOpeningTable,
    updateJobOpening,
    editJobOpening,
};
