const express = require('express');
const router = express.Router();

const {
    createMunicipality,
    getMunicipalities,
    getMunicipalityById,
    updateMunicipality,
    deleteMunicipality
} = require('../controllers/municipality.controller');

router.post('/', createMunicipality);
router.get('/', getMunicipalities);
router.get('/:id', getMunicipalityById);
router.put('/:id', updateMunicipality);
router.delete('/:id', deleteMunicipality);

module.exports = router;