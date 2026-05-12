const express = require('express');
const router = express.Router();

const {
    createReport,
    getReports,
    getReportById,
    getReportsByUser,
    updateReport,
    deleteReport
} = require('../controllers/report.controller');

router.post('/', createReport);
router.get('/', getReports);
router.get('/user/:id_usuario', getReportsByUser);
router.get('/:id', getReportById);
router.put('/:id', updateReport);
router.delete('/:id', deleteReport);

module.exports = router;