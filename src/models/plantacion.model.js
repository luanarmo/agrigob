const mongoose = require('mongoose')
const { Schema } = mongoose;

const plantacion = mongoose.Schema({
    fecha_plantacion: String,
    id_tipo_cultivo: String,
    ubicacion: String,
    descripcion: String,
    fecha_cosecha: String,
    nombre: String,
    creacion: Date,
    actualizacion: Date,
    id_dispositivo_central: Schema.Types.Mixed
})

module.exports = mongoose.model('plantacion', plantacion, 'plantacion')