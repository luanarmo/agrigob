const mongoose = require('mongoose')

const tiempo_duracion_periodo = mongoose.Schema({
    nombre: String,
    cant_dias: Number
})

module.exports = mongoose.model('tiempo_duracion_periodo', tiempo_duracion_periodo, 'tiempo_duracion_periodo')