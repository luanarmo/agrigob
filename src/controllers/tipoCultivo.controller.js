const refTipoCultivo = require("../models/tipo_cultivo.model");
const tipoCultivo = {};

tipoCultivo.save = async (req, res) => {
    const name = req.body.nombre;
    if (name === undefined || name === null) {
        return res.status(400).json({ message: "No name input" });
    }
    const rTiCultivo = new refTipoCultivo();
    rTiCultivo.nombre = name;
    rTiCultivo.creacion = new Date();
    rTiCultivo.actualizacion = new Date();
    rTiCultivo.save();

    return res.status(200).json({ message: "guardado correctamente" });
}

tipoCultivo.status = async (req, res) => {
    const refTipoCultivo = await refTipoCultivo.find();
    res.json({
        status: true,
        refTipoCultivo: refTipoCultivo
    });
}

module.exports = tipoCultivo;