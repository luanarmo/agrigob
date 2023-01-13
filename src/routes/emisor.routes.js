/** Dependencias o modulos requeridos */
const express = require('express');
const router = express.Router();

/** exportado del controlador de tiendas.Controller */
const emisorCtrl = require('../controllers/emisor.controllers');

router.get('/', emisorCtrl.status);
router.post('/', emisorCtrl.save);

router.get('/grafica/:name', emisorCtrl.graficar);
router.get('/del', emisorCtrl.eliminar);

module.exports = router;