const mongoose = require('mongoose')

const plantacion = mongoose.Schema({
    fecha_plantacion: Date,
    id_tipo_cultivo: String,
    ubicacion: String,
    descripcion: String,
    fecha_cosecha: Date,
    nombre: String,
    creacion: Date,
    actualizacion: Date,
    id_dispositivo_central: String
})

module.exports = mongoose.model('plantacion', plantacion, 'plantacion')