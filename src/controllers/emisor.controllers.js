const refMed = require('../models/medicion.model');
const refDis = require('../models/dispositivo_central.model');

const emisor = {};

emisor.status = async (req, res) => {
    const med = await refMed.find();
    res.json({
        status: true,
        MED: med
    });
}

emisor.save = async (req, res) => {
    // RAPERRY1
    // [{ id_gateway: 20, humedad_per: 83.08554, id_end_device: 1 }]
    const jsonString = req.body;
    if (jsonString !== undefined && jsonString !== null && jsonString.length !== 0) {
        let count = 0;
        const dispositivos = await refDis.find();
        for (let lectura of jsonString) {
            const gateway = {
                id_gateway: lectura.id_gateway,
                humedad_per: lectura.humedad_per,
                id_end_device: lectura.id_end_device,
                ph: Math.floor(Math.random() * (9 - 3)) + 3,
                n: Math.floor(Math.random() * (1999 - 0)) + 0,
                p: Math.floor(Math.random() * (1999 - 0)) + 0,
                k: Math.floor(Math.random() * (1999 - 0)) + 0,
            };

            const reg = dispositivos.filter(dis => dis.nombre == gateway.id_gateway && dis.activo == false);
            let idDipositivo = "";
            let cultivo = "";
            if (reg !== undefined && reg !== null && reg.length > 0) {
                const dispo = reg[0];
                idDipositivo = dispo._id;
                cultivo = dispo.id_plantacion;
                // pasar activo = true;
                // pasar lectura = true;
                const edit = {
                    activo: true,
                    lectura: true
                };
                await refDis.findByIdAndUpdate(idDipositivo, { $set: edit }, { new: true });

                const rMed = new refMed();
                rMed.medicion_PH = gateway.ph;
                rMed.medicion_Humedad = gateway.humedad_per;
                rMed.medicion_N = gateway.n;
                rMed.medicion_P = gateway.p;
                rMed.medicion_K = gateway.k;

                rMed.fecha_medicion = new Date();
                rMed.nombre_sensor = gateway.id_end_device;
                rMed.id_dispositivo_central = idDipositivo;
                rMed.id_plantacion = cultivo;

                rMed.creacion = new Date();
                rMed.actualizacion = new Date();

                rMed.save();
                count++;
            } else {
                // buscar dispositivos no activos(ya estan en lectura) y tienen habilitada lectura en true
                const reg2 = dispositivos.filter(dis => dis.nombre == gateway.id_gateway && dis.activo == true);
                if (reg2 !== undefined && reg2 !== null && reg2.length > 0) {
                    const dispo = reg2[0];
                    idDipositivo = dispo._id;
                    cultivo = dispo.id_plantacion;

                    const rMed = new refMed();
                    rMed.medicion_PH = gateway.ph;
                    rMed.medicion_Humedad = gateway.humedad_per;
                    rMed.medicion_N = gateway.n;
                    rMed.medicion_P = gateway.p;
                    rMed.medicion_K = gateway.k;

                    rMed.fecha_medicion = new Date();
                    rMed.nombre_sensor = gateway.id_end_device;
                    rMed.id_dispositivo_central = idDipositivo;
                    rMed.id_plantacion = cultivo;

                    rMed.creacion = new Date();
                    rMed.actualizacion = new Date();

                    rMed.save();
                    count++
                }
            }
        }
        return res.status(200).json({ status: true, reg: jsonString.length, creados: count });
    }
    return res.status(400).json({ status: false });
}

emisor.graficar = async (req, res) => {
    const id = req.params.name;

    const allMed = await refMed.find();
    const med = allMed.filter(dis => dis.id_dispositivo_central == id);

    let num = "";
    let paso = "";
    let i = 0;
    for (let rm of med) {
        if (num.length == 0) {
            num = '' + rm.medicion_Humedad;
            paso = "" + i;
        } else {
            num = num + ',' + rm.medicion_Humedad;
            paso = paso + ',' + i;
        }
        i++;
    }

    res.render('./views/graficar', {
        numbers: num,
        tam: paso
    });
}

emisor.eliminar = async (req, res) => {
    const med = await refMed.find();
    // const dis = await refDis.find();

    if (med !== undefined && med !== null) {
        await refMed.deleteMany({});
    }
    /*
    if (dis !== undefined && dis !== null) {
        await refDis.deleteMany({});
    }*/
    res.json({
        status: true
    });
}

module.exports = emisor;