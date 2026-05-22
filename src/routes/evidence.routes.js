const express = require('express');
const router = express.Router();
const multer = require('multer');

const {
    uploadEvidence,
    getEvidences,
    getEvidenceById,
    getEvidencesByReport,
    deleteEvidence
} = require('../controllers/evidence.controller');

/*
|--------------------------------------------------------------------------
| CONFIGURACIÓN MULTER (memoria, sin guardar en disco)
|--------------------------------------------------------------------------
*/
const upload = multer({ storage: multer.memoryStorage() });

/*
|--------------------------------------------------------------------------
| RUTAS
|--------------------------------------------------------------------------
*/
router.post('/upload', upload.single('archivo'), uploadEvidence);
router.get('/', getEvidences);
router.get('/:id', getEvidenceById);
router.get('/report/:id_reporte', getEvidencesByReport);
router.delete('/:id', deleteEvidence);

module.exports = router;