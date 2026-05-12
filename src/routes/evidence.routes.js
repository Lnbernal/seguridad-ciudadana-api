const express = require('express');
const router = express.Router();

const multer = require('multer');
const path = require('path');

const {
    uploadEvidence,
    getEvidences,
    getEvidenceById,
    getEvidencesByReport,
    deleteEvidence
} = require('../controllers/evidence.controller');

/*
|--------------------------------------------------------------------------
| CONFIGURACIÓN MULTER
|--------------------------------------------------------------------------
*/
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },

    filename: (req, file, cb) => {
        const uniqueName =
            Date.now() +
            '-' +
            Math.round(Math.random() * 1e9) +
            path.extname(file.originalname);

        cb(null, uniqueName);
    }
});

const upload = multer({ storage });

/*
|--------------------------------------------------------------------------
| RUTAS
|--------------------------------------------------------------------------
*/

// Subir evidencia
router.post('/upload', upload.single('archivo'), uploadEvidence);

// Obtener todas las evidencias
router.get('/', getEvidences);

// Obtener evidencia por ID
router.get('/:id', getEvidenceById);

// Obtener evidencias por reporte
router.get('/report/:id_reporte', getEvidencesByReport);

// Eliminar evidencia
router.delete('/:id', deleteEvidence);

module.exports = router;