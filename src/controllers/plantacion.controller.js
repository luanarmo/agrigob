const refPlantacion = require("../models/plantacion.model");
const plantacion = {};

plantacion.save = async (req, res) => {
    const fecha_plantacion = req.body.fecha_plantacion;
    const id_tipo_cultivo = req.body.id_tipo_cultivo;
    const ubicacion = req.body.ubicacion;
    const descripcion = req.body.descripcion;
    const fecha_cosecha = req.body.fecha_cosecha;
    const nombre = req.body.nombre;
    const id_dispositivo_central = req.body.id_dispositivo_central;

    if (fecha_plantacion === undefined || fecha_plantacion === null) {
        return res.status(400).json({ message: "No fecha_plantacion input" });
    }
    if (id_tipo_cultivo === undefined || id_tipo_cultivo === null) {
        return res.status(400).json({ message: "No id_tipo_cultivo input" });
    }
    if (ubicacion === undefined || ubicacion === null) {
        return res.status(400).json({ message: "No ubicacion input" });
    }
    if (descripcion === undefined || descripcion === null) {
        return res.status(400).json({ message: "No descripcion input" });
    }
    if (fecha_cosecha === undefined || fecha_cosecha === null) {
        return res.status(400).json({ message: "No fecha_cosecha input" });
    }
    if (nombre === undefined || nombre === null) {
        return res.status(400).json({ message: "No nombre input" });
    }
    if (id_dispositivo_central === undefined || id_dispositivo_central === null) {
        return res.status(400).json({ message: "No id_dispositivo_central input" });
    }

    const rTiCultivo = new refPlantacion();
    rTiCultivo.fecha_plantacion = fecha_plantacion;
    rTiCultivo.id_tipo_cultivo = id_tipo_cultivo;
    rTiCultivo.ubicacion = ubicacion;
    rTiCultivo.descripcion = descripcion;
    rTiCultivo.fecha_cosecha = fecha_cosecha;
    rTiCultivo.nombre = nombre;
    rTiCultivo.creacion = new Date();
    rTiCultivo.actualizacion = new Date();
    rTiCultivo.id_dispositivo_central = id_dispositivo_central;
    rTiCultivo.save();

    return res.status(200).json({ message: "guardado correctamente" });
}

plantacion.status = async (req, res) => {
    const rPlantacion = await refPlantacion.find();
    res.json({
        status: true,
        refPlantacion: rPlantacion
    });
}

module.exports = plantacion;