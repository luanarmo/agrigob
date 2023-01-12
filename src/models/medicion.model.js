const mongoose = require('mongoose')

const medicion = mongoose.Schema({
    medicion_N: Number,
    medicion_P: Number,
    medicion_K: Number,
    medicion_PH: Number,
    medicion_Humedad: Number,
    fecha_medicion: Date,
    nombre_sensor: Number,
    id_dispositivo_central: String,
    creacion: Date,
    id_platacion: Number
})

module.exports = mongoose.model('medicion', medicion, 'medicion')