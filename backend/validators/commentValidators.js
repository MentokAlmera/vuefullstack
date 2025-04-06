import { body, param, validationResult } from 'express-validator';

// Middleware to check validation results
export const validateResults = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Validation rules for creating/updating comments
export const commentValidationRules = [
    body('firstname')
        .trim()
        .notEmpty().withMessage('First name is required')
        .isLength({ min: 2, max: 50 }).withMessage('First name must be between 2 and 50 characters'),

    body('lastname')
        .trim()
        .notEmpty().withMessage('Last name is required')
        .isLength({ min: 2, max: 50 }).withMessage('Last name must be between 2 and 50 characters'),

    body('comment')
        .trim()
        .notEmpty().withMessage('Comment is required')
        .isLength({ min: 3, max: 1000 }).withMessage('Comment must be between 3 and 1000 characters'),

    body('relationship_type_id')
        .notEmpty().withMessage('Relationship type is required')
        .isInt().withMessage('Invalid relationship type ID'),

    body('category_id')
        .notEmpty().withMessage('Category is required')
        .isInt().withMessage('Invalid category ID')
];

// Validation rules for comment ID parameter
export const commentIdValidation = [
    param('id')
        .isInt().withMessage('Invalid comment ID')
]; 