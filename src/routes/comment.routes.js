const express = require('express');
const router = express.Router();

const {
    createComment,
    getComments,
    getCommentById,
    updateComment,
    deleteComment
} = require('../controllers/comment.controller');

router.post('/', createComment);
router.get('/', getComments);
router.get('/:id', getCommentById);
router.put('/:id', updateComment);
router.delete('/:id', deleteComment);

module.exports = router;