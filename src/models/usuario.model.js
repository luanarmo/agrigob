const mongoose = require('mongoose')

const usuario = mongoose.Schema({
    usuario: String,
    nombre_completo: String,
    constrasena: String,
    email: String,
    telefono: String,
    nombre: String,
    id_dispositivo_central: String
})

module.exports = mongoose.model('usuario', usuario, 'usuario')