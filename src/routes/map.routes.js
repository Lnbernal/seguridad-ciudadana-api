const express = require('express');

const router = express.Router();

const {

    getMapReports

} = require('../controllers/map.controller');

router.get(
    '/',
    getMapReports
);

module.exports = router;