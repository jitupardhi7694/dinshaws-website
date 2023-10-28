const { body, validationResult } = require('express-validator');

const businessEnquiryValidationRules = () => [
    body('name')
        .notEmpty()
        .withMessage(' Name is required')
        .isLength({ min: 2, max: 60 })
        .withMessage('Should have minimum 2 and maximum 50 characters'),
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Not a Valid Email')
        .trim()
        .normalizeEmail(),
    body('mobile')
        .notEmpty()
        .withMessage('Mobile Number is required')
        .isLength({ max: 10 })
        .withMessage('Should have maximum 10 numbers'),
    body('purpose').notEmpty().withMessage('Purpose is required'),

    body('location')
        .notEmpty()
        .withMessage('Location is required')
        .isLength({ min: 2, max: 50 })
        .withMessage('Should have minimum 2 and maximum 50 characters'),
    body('message')
        .notEmpty()
        .withMessage('Message is required')
        .isLength({ min: 2, max: 250 })
        .withMessage('Should have minimum 2 and maximum 250 characters'),
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    const extractedErrors = [];
    errors.array().map((error) => extractedErrors.push({ msg: error.msg }));
    req.ValidateErrors = extractedErrors;
    return next();
};

module.exports = {
    businessEnquiryValidationRules,
    validate,
};
