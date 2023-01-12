const refTiempoDuracion = require("../models/tiempo_duracion_periodo.model");
const tiempoDuracion = {};

tiempoDuracion.save = async (req, res) => {
    const name = req.body.nombre;
    const cant_dias = req.body.cant_dias;
    if (name === undefined || name === null) {
        return res.status(400).json({ message: "No name input" });
    }
    if (cant_dias === undefined || cant_dias === null) {
        return res.status(400).json({ message: "No cant_dias input" });
    }

    const rTiempo = new refTiempoDuracion();
    rTiempo.nombre = name;
    rTiempo.cant_dias = cant_dias;
    rTiempo.creacion = new Date();
    rTiempo.actualizacion = new Date();
    rTiCultivo.save();

    return res.status(200).json({ message: "guardado correctamente" });
}

tiempoDuracion.status = async (req, res) => {
    const rTiempoDuracion = await refTiempoDuracion.find();
    res.json({
        status: true,
        refTiempoDuracion: rTiempoDuracion
    });
}

module.exports = tiempoDuracion;