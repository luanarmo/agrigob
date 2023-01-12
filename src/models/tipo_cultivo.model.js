const mongoose = require('mongoose')

const tipo_cultivo = mongoose.Schema({
    nombre: String,
    creacion: Date,
    actualizacion: Date,
})

module.exports = mongoose.model('tipo_cultivo', tipo_cultivo, 'tipo_cultivo')