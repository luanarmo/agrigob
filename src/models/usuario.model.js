const mongoose = require('mongoose')
const { Schema } = mongoose;

const usuario = mongoose.Schema({
    usuario: String,
    nombre_completo: String,
    constrasena: String,
    email: String,
    telefono: String,
    nombre: String,
    id_dispositivo_central: Schema.Types.Mixed,
    creacion: Date,
    actualizacion: Date
})

module.exports = mongoose.model('usuario', usuario, 'usuario')