const express = require('express')
const router = express.Router()

const ctrlUser = require('../controllers/usuario.controller');

router.post('/', ctrlUser.save);
router.get('/', ctrlUser.status);

module.exports = router;