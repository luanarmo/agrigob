const mongoose = require('mongoose')

const dispositivo_central = mongoose.Schema({
    nombre: String,
    creacion: Date,
    actualizacion: Date,
    id_plantacion: String,
    id_usuario: String,
    activo: Boolean
})

module.exports = mongoose.model('dispositivo_central', dispositivo_central, 'dispositivo_central')