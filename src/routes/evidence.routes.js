const express = require('express');

const router = express.Router();

const authMiddleware = require('../middlewares/auth.middleware');

const upload = require('../middlewares/upload.middleware');

const {

    uploadEvidence

} = require('../controllers/evidence.controller');

/*
|--------------------------------------------------------------------------
| SUBIR EVIDENCIA
|--------------------------------------------------------------------------
*/

router.post(
    '/',
    authMiddleware,
    upload.single('imagen'),
    uploadEvidence
);

module.exports = router;