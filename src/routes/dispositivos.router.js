const express = require('express')
const router = express.Router()

const ctrlDispositivo = require('../controllers/dispositivo.controller');

router.post('/', ctrlDispositivo.save);
router.get('/', ctrlDispositivo.status);

module.exports = router;