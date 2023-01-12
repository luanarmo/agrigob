const express = require('express')
const router = express.Router()

const ctrlTiempo = require('../controllers/tiempo_duracion_periodo.controller');

router.post('/', ctrlTiempo.save);
router.get('/', ctrlTiempo.status);

module.exports = router;