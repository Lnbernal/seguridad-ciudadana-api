const express = require('express');

const router = express.Router();

const authMiddleware = require('../middlewares/auth.middleware');

const {

    createReport,
    getReports,
    getReportById,
    updateReportStatus,
    deleteReport

} = require('../controllers/report.controller');

/*
|--------------------------------------------------------------------------
| RUTAS
|--------------------------------------------------------------------------
*/

router.post(
    '/',
    authMiddleware,
    createReport
);

router.get(
    '/',
    authMiddleware,
    getReports
);

router.get(
    '/:id',
    authMiddleware,
    getReportById
);

router.put(
    '/:id/status',
    authMiddleware,
    updateReportStatus
);

router.delete(
    '/:id',
    authMiddleware,
    deleteReport
);

module.exports = router;