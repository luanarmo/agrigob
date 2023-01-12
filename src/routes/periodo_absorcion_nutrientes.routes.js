const express = require('express');
const periodoSchema = require('../models/periodo_absorcion_nutrientes.model');
const ctrlPeriodo = require('../controllers/periodo_absorcion_nutrientes.controller');
const router = express.Router()

router.get('/periodo/:id', async (req, res) => {
    const { id } = req.params
    //
    if (!id) {
        return res.status(400).json({ message: "Id param is required" })
    }
    //
    const periodo = await periodoSchema.findById(id)
    return res.status(200).json(periodo)
});

router.post("/", ctrlPeriodo.save);
router.get("/", ctrlPeriodo.status);

module.exports = router;