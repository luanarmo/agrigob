const express = require('express')
const medicionSchema = require('../models/medicion.model')
const router = express.Router()

router.get('/medicion/humedad', async (req, res) => {
    const { id_plantacion, id_dispositivo_central } = req.body
    //
    if(!id_plantacion) {
        return res.status(400).json({message : "Id param is required"})
    }
    //
    const medicion = await medicionSchema.findOne({id_plantacion : id_plantacion, id_dispositivo_central: id_dispositivo_central})
    return res.status(200).json(medicion)
})

router.post('/medicion',async (req,res) => {
    const {
        medicion_N, medicion_P, medicion_K,
        medicion_PH, medicion_Humedad, fecha_medicion,
        nombre_sensor, id_dispositivo_central, creacion,
        id_plantacion 
    } = req.body

    if(!(medicion_N && medicion_P && medicion_K &&
        medicion_PH && medicion_Humedad && fecha_medicion &&
        nombre_sensor && id_dispositivo_central && creacion &&
        id_plantacion )){
        return res.status(400).json({ message : "All input is required"})
    }

    const medicion = await medicionSchema.create({
        medicion_N: req.body.medicion_N,
        medicion_P: req.body.medicion_P,
        medicion_K: req.body.medicion_K,
        medicion_PH: req.body.medicion_PH,
        medicion_Humedad: req.body.medicion_Humedad,
        fecha_medicion: req.body.fecha_medicion,
        nombre_sensor: req.body.nombre_sensor,
        id_dispositivo_central: req.body.id_dispositivo_central,
        creacion: req.body.creacion,
        id_platacion: req.body.id_platacion
    })

    return res.status(200).json(medicion)

})

module.exports = router;