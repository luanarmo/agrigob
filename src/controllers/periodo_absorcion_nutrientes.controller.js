const refPeriodoAN = require("../models/periodo_absorcion_nutrientes.model");
const periodo = {};

periodo.save = async (req, res) => {
    const id_tipo_cultivo = req.body.id_tipo_cultivo;
    const parametro_N = req.body.parametro_N;
    const parametro_P = req.body.parametro_P;
    const parametro_K = req.body.parametro_K;
    const parametro_humedad = req.body.parametro_humedad;
    const id_tiempo_duracion = req.body.id_tiempo_duracion;
    const creacion = new Date();
    const actualizacion = new Date();

    if (id_tipo_cultivo === undefined || id_tipo_cultivo === null) {
        return res.status(400).json({ message: "No id_tipo_cultivo input" });
    }
    if (parametro_N === undefined || parametro_N === null) {
        return res.status(400).json({ message: "No parametro_N input" });
    }
    if (parametro_P === undefined || parametro_P === null) {
        return res.status(400).json({ message: "No parametro_P input" });
    }
    if (parametro_K === undefined || parametro_K === null) {
        return res.status(400).json({ message: "No parametro_K input" });
    }
    if (parametro_humedad === undefined || parametro_humedad === null) {
        return res.status(400).json({ message: "No parametro_humedad input" });
    }
    if (id_tiempo_duracion === undefined || id_tiempo_duracion === null) {
        return res.status(400).json({ message: "No id_tiempo_duracion input" });
    }

    const rPeriodo = new refPeriodoAN();
    rPeriodo.id_tipo_cultivo = id_tipo_cultivo;
    rPeriodo.parametro_N = parametro_N;
    rPeriodo.parametro_P = parametro_P;
    rPeriodo.parametro_K = parametro_K;
    rPeriodo.parametro_humedad = parametro_humedad;
    rPeriodo.id_tiempo_duracion = id_tiempo_duracion;
    rPeriodo.creacion = creacion;
    rPeriodo.actualizacion = actualizacion;

    rPeriodo.save();

    return res.status(200).json({ message: "guardado correctamente" });
}


periodo.status = async (req, res) => {
    const rPeriodoAN = await refPeriodoAN.find();
    res.json({
        status: true,
        refPeriodoAN: rPeriodoAN
    });
}

module.exports = periodo;