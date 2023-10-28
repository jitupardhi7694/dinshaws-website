const { body, validationResult } = require('express-validator');

const careerValidationRules = () => [
    // username must be an email
    body('name')
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 2, max: 45 })
        .withMessage('name has to be min 2 chars and max 45 char long.'),
    body('age').notEmpty().withMessage('Age is required'),
    body('gender').notEmpty().withMessage('Gender is required'),
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Not a Valid Email')
        .trim()
        .normalizeEmail(),
    body('mobile')
        .isLength({ max: 10 })
        .withMessage('Mobile Number is required.'),
    body('department').notEmpty().withMessage('Department is required'),
    body('education').notEmpty().withMessage('Gender is required'),
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    const extractedErrors = [];
    errors.array().map((error) => extractedErrors.push({ msg: error.msg }));
    req.ValidateErrors = extractedErrors;
    return next();
};

module.exports = {
    careerValidationRules,
    validate,
};
