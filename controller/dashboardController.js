const department = require('../models/departmentModel');
const JobOpenig = require('../models/jobOpeningModel');
const createProfile = require('../models/createProfileModel');
const businessEnquiryModel = require('../models/businessEnquiryModel');

const getHrDashboard = async (req, res, next) => {
    try {
        const department = await getDepartment();
        const jobOpenings = await getJobOpening();
        const totalJB = await totalJob();
        res.render('userDashboard/dashboard', {
            department,
            jobOpenings,
            isLogin: false,
            totalJB,
        });
    } catch (error) {
        console.log('Error show the 404  in this page', error);
        res.status(500).send('Error show the 404  in this page');
    }
};
const getBusinessDash = async (req, res, next) => {
    try {
        const totalJB = await getBusinessData();
        res.render('userDashboard/customerDelightDashboard', {
            totalJB,
        });
    } catch (error) {
        console.log('Error show the 404  in this page', error);
        res.status(500).send('Error show the 404  in this page');
    }
};

async function getBusinessData() {
    const data = {};
    data.totalBusiness = await businessEnquiryModel.count();
    return data.totalBusiness;
}

async function getDepartment() {
    const data = {};
    data.totalSymptoms = await department.count();

    return data.totalSymptoms;
}

async function getJobOpening() {
    const data = {};
    data.totalSymptoms = await JobOpenig.count();

    return data.totalSymptoms;
}
async function totalJob() {
    const data = {};
    data.total = await createProfile.count();

    return data.total;
}

module.exports = { getHrDashboard, getBusinessDash };
