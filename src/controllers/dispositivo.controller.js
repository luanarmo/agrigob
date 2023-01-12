const refDis = require("../models/dispositivo_central.model");
const dispositivo = {};

dispositivo.save = async (req, res) => {
    const nombre = req.body.nombre;
    const id_plantacion = req.body.id_plantacion;
    const id_usuario = req.body.id_usuario;
    const activo = req.body.activo;

    if (nombre === undefined || nombre === null) {
        return res.status(400).json({ message: "No nombre input" });
    }
    if (id_plantacion === undefined || id_plantacion === null) {
        return res.status(400).json({ message: "No id_plantacion input" });
    }
    if (id_usuario === undefined || id_usuario === null) {
        return res.status(400).json({ message: "No id_usuario input" });
    }
    if (activo === undefined || activo === null) {
        return res.status(400).json({ message: "No activo input" });
    }

    const rDis = new refDis();
    rDis.nombre = nombre;
    rDis.id_plantacion = id_plantacion;
    rDis.id_usuario = id_usuario;
    rDis.activo = activo;
    rDis.creacion = new Date();
    rDis.actualizacion = new Date();
    rDis.save();

    return res.status(200).json({ message: "guardado correctamente" });
}

dispositivo.status = async (req, res) => {
    const rDis = await refDis.find();
    res.json({
        status: true,
        refDis: rDis
    });
}

module.exports = dispositivo;