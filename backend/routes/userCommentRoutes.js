import express from 'express';
import userCommentController from '../controllers/userCommentController.js';

const router = express.Router();

router.get("/", userCommentController.getAllComments);
router.post("/", userCommentController.addComment);
router.put("/:id", userCommentController.updateComment);
router.delete("/:id", userCommentController.deleteComment);

export default router;
