const express = require('express');
const router = express.Router();
const { autenticar } = require('../middlewares/auth'); // ajusta la ruta si es necesario

const {
    createReport,
    getReports,
    getReportById,
    getReportsByUser,
    updateReport,
    deleteReport,
    changeStatus  // <- nuevo
} = require('../controllers/report.controller');

router.post('/', autenticar, createReport);
router.get('/', getReports);
router.get('/user/:id_usuario', autenticar, getReportsByUser);
router.get('/:id', getReportById);
router.put('/:id', autenticar, updateReport);
router.delete('/:id', autenticar, deleteReport);

// Nueva ruta de cambio de estado
router.patch('/:id/estado', autenticar, changeStatus);

module.exports = router;