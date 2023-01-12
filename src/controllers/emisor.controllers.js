const refMed = require('../model/medicion');
const refDis = require('../model/dispositivo');

const emisor = {};

emisor.status = async (req, res) => {
    const med = await refMed.find();
    const dis = await refDis.find();
    res.json({
        status: true,
        DIS: dis,
        MED: med
    });
}

emisor.save = async (req, res) => {
    // [{ id_gateway: 20, humedad_per: 83.08554, id_end_device: 1 }]
    const jsonString = req.body;
    if (jsonString !== undefined && jsonString !== null && jsonString.length !== 0) {

        const dispositivos = await refDis.find();
        for (let lectura of jsonString) {
            const gateway = {
                id_gateway: lectura.id_gateway,
                humedad_per: lectura.humedad_per,
                id_end_device: lectura.id_end_device,
                ph: 0,
                n: 0,
                p: 0,
                k: 0
            };

            const reg = dispositivos.filter(dis => dis.nombre == gateway.id_gateway && dis.activo == true);
            let idDipositivo = "";
            let cultivo = "";
            if (reg !== undefined && reg !== null && reg.length > 0) {
                const dispo = reg[0];
                idDipositivo = dispo.id;
                cultivo = dispo.cultivo;
            } else {
                const rDis = new refDis();
                rDis.nombre = gateway.id_gateway;
                rDis.cultivo = "Jitomate";
                rDis.US = "Belmont";
                rDis.activo = true;
                rDis.creacion = new Date();
                rDis.actualizacion = new Date();
                rDis.save();

                idDipositivo = rDis.id;
                cultivo = "Belmont";
            }

            const rMed = new refMed();
            rMed.ph = gateway.ph;
            rMed.humedad = gateway.humedad_per;
            rMed.nitrogeno = gateway.n;
            rMed.fosforo = gateway.p;
            rMed.potasio = gateway.k;
            rMed.creacion = new Date();
            rMed.actualizacion = new Date();
            rMed.cultivo = cultivo;
            rMed.dispositivo = idDipositivo;
            rMed.sensor = gateway.id_end_device;
            rMed.save();
        }
    }

    res.json({
        status: true
    });
}

emisor.graficar = async (req, res) => {
    const med = await refMed.find();

    let num = "";
    let paso = "";
    let i = 0;
    for (let rm of med) {
        if (num.length == 0) {
            num = '' + rm.humedad;
            paso = "" + i;
        } else {
            num = num + ',' + rm.humedad;
            paso = paso + ',' + i;
        }
        i++;
    }

    console.log(num);
    console.log("...");
    console.log(paso);
    res.render('./views/graficar', {
        numbers: num,
        tam: paso
    });
}

emisor.eliminar = async (req, res) => {
    const med = await refMed.find();
    const dis = await refDis.find();

    if (med !== undefined && med !== null) {
        await refMed.deleteMany({});
    }
    if (dis !== undefined && dis !== null) {
        await refDis.deleteMany({});
    }
    res.json({
        status: true
    });
}

module.exports = emisor;