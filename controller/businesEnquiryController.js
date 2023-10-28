const businessEnquiryModel = require('../models/businessEnquiryModel');
const { validationResult } = require('express-validator');
const sendActivationLinkEmail = require('../helpers/businessMailSend');
const logger = require('../helpers/winston');
const axios = require('axios');
const { SECRETE_CAPTCHA_KEY } = process.env;
const { Op } = require('sequelize');

const getBusinessEnquiry = async (req, res) => {
    res.render('businessEnquiry');
};

const postBusinessEnquiry = async (req, res, next) => {
    const { id, name, email, mobile, purpose, location, message } = req.body;

    try {
        const errors = validationResult(req).array();
        if (errors.length > 0) {
            return res.render('businessEnquiry', {
                errors,
                id,
                name,
                email,
                mobile,
                purpose,
                location,
                message,
            });
        }

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
                return res.redirect('/business-enquiry');
            }
            // console.log('reCAPTCHA response:', response.data);

            const saveEnquiry = new businessEnquiryModel({
                name,
                email,
                mobile,
                purpose,
                location,
                message,
            });
            const savedEnquiry = await saveEnquiry.save();
            sendActivationLinkEmail(
                req,
                res,
                savedEnquiry.email,
                savedEnquiry.purpose,
                savedEnquiry.id
            );
            req.flash(
                'success_msg',
                `Successfully submitted your Business Enquiry. Please Check Your Mail.`
            );
            return res.redirect('/business-enquiry');
        } catch (error) {
            logger.error(error);
            return next(error);
        }
    } catch (error) {
        logger.error(error);
        return next(error);
    }
};

// Function to fetch all data
const getBusinessEnquiryApplication = async (req, res) => {
    try {
        const { allData, fromDate, toDate } = req.query;

        let row = [];
        if (allData) {
            row = await getAllBusiness();
        } else if (fromDate && toDate) {
            row = await getBusinessByDateRange(fromDate, toDate);
        }

        // console.log('main data fetch complete => ' + row);
        // Now render the data to your view
        res.render('masterDashboard/businessEnquiryTable', { row }); // Make sure your view renders the data
    } catch (error) {
        console.error("Can't fetch Job Opening from the database", error);
        res.status(500).json({ error: 'An error occurred' });
    }
};

async function getAllBusiness() {
    try {
        const rows = await businessEnquiryModel.findAll();
        // console.log('rows 1 =>', rows.length);
        return rows;
    } catch (error) {
        console.error("Can't fetch Job Profiles from the database", error);
        return []; // Return an empty array on error
    }
}

async function getBusinessByDateRange(fromDate, toDate) {
    try {
        const endOfDay = new Date(toDate);
        endOfDay.setHours(23, 59, 59, 999); // Set time to the end of the day
        const rows = await businessEnquiryModel.findAll({
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
    getBusinessEnquiry,
    postBusinessEnquiry,
    getBusinessEnquiryApplication,
};
