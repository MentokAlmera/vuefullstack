import express from 'express';
import commentController from '../controllers/commentController.js';
import { commentValidationRules, commentIdValidation, validateResults } from '../validators/commentValidators.js';

const router = express.Router();

// Get all comments
router.get('/', commentController.getAllComments);

// Create a new comment
router.post('/', 
    commentValidationRules,
    validateResults,
    commentController.createComment
);

// Update a comment
router.put('/:id', 
    [...commentIdValidation, ...commentValidationRules],
    validateResults,
    commentController.updateComment
);

// Delete a comment
router.delete('/:id',
    commentIdValidation,
    validateResults,
    commentController.deleteComment
);

export default router; 