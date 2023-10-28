const { body, validationResult } = require('express-validator');

const departmentValidationRules = () => [
    body('name')
        .notEmpty()
        .withMessage('Department Name is required')
        .isLength({ min: 2, max: 50 })
        .withMessage('Should have minimum 2 and maximum 50 characters'),
];

const JobOpenigValidationRules = () => [
    body('department_id').notEmpty().withMessage('Department is required'),

    body('description')
        .notEmpty()
        .withMessage('Description is required')
        .isLength({ min: 2, max: 50 })
        .withMessage('Should have minimum 2 and maximum 100 characters'),

    body('location')
        .notEmpty()
        .withMessage('Location is required')
        .isLength({ min: 2, max: 50 })
        .withMessage('Should have minimum 2 and maximum 100 characters'),
];
const validate = (req, res, next) => {
    const errors = validationResult(req);
    const extractedErrors = [];
    errors.array().map((error) => extractedErrors.push({ msg: error.msg }));
    req.ValidateErrors = extractedErrors;
    return next();
};

module.exports = {
    departmentValidationRules,
    validate,
    JobOpenigValidationRules,
};
