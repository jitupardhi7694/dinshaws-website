const { Op } = require('sequelize');
const { validationResult } = require('express-validator');
const logger = require('../helpers/winston');
const createProfile = require('../models/createProfileModel');
const sendActivationLinkEmail = require('../helpers/profileMailSend');
const axios = require('axios');
const { SECRETE_CAPTCHA_KEY } = process.env;

const profileRegister = async (req, res) => {
    res.render('create_your_profile');
};

// save
const saveProfile = async (req, res, next) => {
    const {
        first_name,
        middle_name,
        last_name,
        dob,
        marital_status,
        gender,
        email,
        mobile_number,
        local_address,
        permanent_address,
        ssc_school,
        ssc_pass_year,
        ssc_grade,
        hsc_school,
        hsc_pass_year,
        hsc_grade,
        graduate_school,
        graduate_pass_year,
        graduate_grade,
        pgraduate_school,
        pgraduate_pass_year,
        pgraduate_grade,
        company_name1,
        position1,
        doj1,
        dol1,
        reason_fjc1,
        company_name2,
        position2,
        doj2,
        dol2,
        reason_fjc2,
        company_name3,
        position3,
        doj3,
        dol3,
        reason_fjc3,
        company_name4,
        position4,
        doj4,
        dol4,
        reason_fjc4,
        company_name5,
        position5,
        doj5,
        dol5,
        reason_fjc5,
        person_name1,
        contact_number1,
        email1,
        remarks1,
        person_name2,
        contact_number2,
        email2,
        remarks2,
    } = req.body;

    const errors = validationResult(req).array(); // Retrieve validation errors

    if (errors.length > 0) {
        return res.render('create_your_profile', {
            errors,
            first_name,
            middle_name,
            last_name,
            dob,
            marital_status,
            gender,
            email,
            mobile_number,
            local_address,
            permanent_address,
            ssc_school,
            ssc_pass_year,
            ssc_grade,
            hsc_school,
            hsc_pass_year,
            hsc_grade,
            graduate_school,
            graduate_pass_year,
            graduate_grade,
            pgraduate_school,
            pgraduate_pass_year,
            pgraduate_grade,
            company_name1,
            position1,
            doj1,
            dol1,
            reason_fjc1,
            company_name2,
            position2,
            doj2,
            dol2,
            reason_fjc2,
            company_name3,
            position3,
            doj3,
            dol3,
            reason_fjc3,
            company_name4,
            position4,
            doj4,
            dol4,
            reason_fjc4,
            company_name5,
            position5,
            doj5,
            dol5,
            reason_fjc5,
            person_name1,
            contact_number1,
            email1,
            remarks1,
            person_name2,
            contact_number2,
            email2,
            remarks2,
        });
    }

    // re captcha

    const userResponse = req.body['g-recaptcha-response'];
    const secretKey = SECRETE_CAPTCHA_KEY;
    // console.log('userResponse:', userResponse);

    // Verify reCAPTCHA response
    try {
        const response = await axios.post(
            'https://www.google.com/recaptcha/api/siteverify',
            null,
            {
                params: {
                    secret: secretKey,
                    response: userResponse,
                },
            }
        );

        if (!response.data.success) {
            // reCAPTCHA verification failed
            req.flash(
                'error_msg',
                'reCAPTCHA verification failed. Please try again.'
            );
            return res.redirect('/career/create-profile');
        }
        // console.log('reCAPTCHA response:', response.data);

        // save data in database
        const newProfile = new createProfile({
            first_name,
            middle_name,
            last_name,
            dob,
            marital_status,
            gender,
            email,
            mobile_number,
            local_address,
            permanent_address,
            ssc_school,
            ssc_pass_year,
            ssc_grade,
            hsc_school,
            hsc_pass_year,
            hsc_grade,
            graduate_school,
            graduate_pass_year,
            graduate_grade,
            pgraduate_school,
            pgraduate_pass_year,
            pgraduate_grade,
            company_name1: company_name1 || null,
            position1: position1 || null,
            doj1: doj1 || null,
            dol1: dol1 || null,

            reason_fjc1: reason_fjc1 || null,
            company_name2,
            position2,
            doj2: doj2 || null,
            dol2: dol2 || null,
            reason_fjc2,
            company_name3,
            position3,
            doj3: doj3 || null,
            dol3: dol3 || null,
            reason_fjc3,
            company_name4,
            position4,
            doj4: doj4 || null,
            dol4: dol4 || null,
            reason_fjc4,
            company_name5,
            position5,
            doj5: doj5 || null,
            dol5: dol5 || null,
            reason_fjc5,
            person_name1,
            contact_number1,
            email1,
            remarks1,
            person_name2,
            contact_number2,
            email2,
            remarks2,
        });
        const savedCareerProfile = await newProfile.save();
        sendActivationLinkEmail(
            req,
            res,
            next,
            savedCareerProfile.email,
            savedCareerProfile.id
        );

        console.log('successfully submitted your application =>');
        req.flash(
            'success_msg',
            'Successfully submitted your application please check your email .'
        );
        return res.redirect(`/career`);
    } catch (error) {
        logger.error(error);
        return next(error);
    }
};

const deleteJob = async (req, res) => {
    await deleteJobOpening(req, res);
};

// Delete Job Opening from Database
async function deleteJobOpening(req, res) {
    const { id } = req.params;
    try {
        await createProfile.destroy({
            where: {
                id,
            },
        });

        req.flash('success_msg', 'Data deleted successfully.');
        return res.redirect('/career/job-profile-list');
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
                return res.redirect('/career/job-profile-list');
            }
            logger.error("Can't delete User Roles from the database ->", error);
        }
        return null;
    }
}

// Function to fetch all data
const jobProfileList = async (req, res) => {
    try {
        const { allData, fromDate, toDate } = req.query;
        let row = [];
        if (allData) {
            row = await getAllJobProfiles();
        } else if (fromDate && toDate) {
            row = await getJobOpeningByDateRange(fromDate, toDate);
        }

        // console.log('main data fetch complete => ' + row);
        // Now render the data to your view
        res.render('masterDashboard/jobProfileTable', { row }); // Make sure your view renders the data
    } catch (error) {
        console.error("Can't fetch Job Opening from the database", error);
        res.status(500).json({ error: 'An error occurred' });
    }
};

async function getAllJobProfiles() {
    try {
        const rows = await createProfile.findAll();
        // console.log('rows 1 =>', rows.length);
        return rows;
    } catch (error) {
        console.error("Can't fetch Job Profiles from the database", error);
        return []; // Return an empty array on error
    }
}

async function getJobOpeningByDateRange(fromDate, toDate) {
    try {
        const endOfDay = new Date(toDate);
        endOfDay.setHours(23, 59, 59, 999); // Set time to the end of the day
        const rows = await createProfile.findAll({
            where: {
                created_at: {
                    [Op.between]: [fromDate, endOfDay],
                },
            },
        });
        // console.log('rows 2 =>', rows.length);
        return rows;
    } catch (error) {
        console.error("Can't fetch profiles from the database", error);
        return []; // Return an empty array on error
    }
}

module.exports = {
    profileRegister,
    saveProfile,
    jobProfileList,
    deleteJob,
};
