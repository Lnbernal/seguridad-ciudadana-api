const express = require('express');
const router = express.Router();

const {
    createStatus,
    getStatuses,
    getStatusById,
    updateStatus,
    deleteStatus
} = require('../controllers/status.controller');

router.post('/', createStatus);
router.get('/', getStatuses);
router.get('/:id', getStatusById);
router.put('/:id', updateStatus);
router.delete('/:id', deleteStatus);

module.exports = router;