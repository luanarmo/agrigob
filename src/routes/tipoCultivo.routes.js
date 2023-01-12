const express = require('express')
const router = express.Router()

const ctrlTipoCultivo = require('../controllers/tipoCultivo.controller');

router.post('/', ctrlTipoCultivo.save);
router.get('/', ctrlTipoCultivo.status);

module.exports = router;