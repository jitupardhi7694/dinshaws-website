const { body, validationResult } = require('express-validator');

const profileValidationRules = () => [
    // username must be an email
    body('first_name').notEmpty().withMessage('Name is required'),

    body('last_name').notEmpty().withMessage('Last Name is required'),

    body('dob').isDate().notEmpty().withMessage('DOB is required'),
    body('marital_status').notEmpty().withMessage('Marital status is required'),
    body('gender').notEmpty().withMessage('Gender is required'),
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Not a Valid Email')
        .trim()
        .normalizeEmail(),
    body('mobile_number')
        .isLength({ max: 10 })
        .withMessage('Mobile Number is required.'),
    body('local_addresss')
        .notEmpty()
        .withMessage('Local address is mandatory to fill  '),
    body('ssc_school').notEmpty().withMessage('SSC school name is required'),
    body('ssc_pass_year').notEmpty().withMessage('SSC pass year is required'),
    body('ssc_grade').notEmpty().withMessage('SSC garde is required'),
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    const extractedErrors = [];
    errors.array().map((error) => extractedErrors.push({ msg: error.msg }));
    req.ValidateErrors = extractedErrors;
    return next();
};

module.exports = {
    profileValidationRules,
    validate,
};
