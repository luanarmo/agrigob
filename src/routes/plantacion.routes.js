const express = require('express')
const plantacionSchema = require('../models/plantacion.model')
const router = express.Router()

const ctrlUser = require('../controllers/usuario.controller');

router.get('/plantacion/:id', async (req, res) => {
    const { id } = req.params
    //
    if(!id) {
        return res.status(400).json({message : "Id param is required"})
    }
    //
    const plantacion = await plantacionSchema.findById(id)
    return res.status(200).json(plantacion)
});

router.post('/', ctrlUser.save);
router.get('/', ctrlUser.status);

module.exports = router;

