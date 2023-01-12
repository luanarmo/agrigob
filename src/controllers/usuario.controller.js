const refUser = require("../models/usuario.model");
const usuario = {};

usuario.save = async (req, res) => {
    const usuario = req.body.usuario;
    const nombre_completo = req.body.nombre_completo;
    const constrasena = req.body.constrasena;
    const email = req.body.email;
    const telefono = req.body.telefono;
    const nombre = req.body.nombre;

    if (usuario === undefined || usuario === null) {
        return res.status(400).json({ message: "No usuario input" });
    }
    if (nombre_completo === undefined || nombre_completo === null) {
        return res.status(400).json({ message: "No nombre_completo input" });
    }
    if (constrasena === undefined || constrasena === null) {
        return res.status(400).json({ message: "No constrasena input" });
    }
    if (email === undefined || email === null) {
        return res.status(400).json({ message: "No email input" });
    }
    if (telefono === undefined || telefono === null) {
        return res.status(400).json({ message: "No telefono input" });
    }
    if (nombre === undefined || nombre === null) {
        return res.status(400).json({ message: "No nombre input" });
    }

    const rUser = new refUser();
    rUser.usuario = usuario;
    rUser.nombre_completo = nombre_completo;
    rUser.constrasena = constrasena;
    rUser.email = email;
    rUser.telefono = telefono;
    rUser.nombre = nombre;
    rUser.creacion = new Date();
    rUser.actualizacion = new Date();
    rUser.save();

    return res.status(200).json({ message: "guardado correctamente" });
}

usuario.addDispo = async (req, res) => {
    const id_dispositivo_central = req.body.id_dispositivo_central;
    const us = req.body.US;

    if (id_dispositivo_central === undefined || id_dispositivo_central === null || Object.keys(id_dispositivo_central).length === 0) {
        return res.status(400).json({ message: "No id_dispositivo_central input" });
    }

    const u = await refUser.findOne({ 'id': us });
    if (u === undefined || u === null) {
        return res.status(400).json({ message: "No US input" });
    } else {
        const editUs = {
            id_dispositivo_central: id_dispositivo_central
        };

        await refUs.findByIdAndUpdate(u._id, { $set: editUs }, { new: true });
        return res.status(200).json({ message: "guardado correctamente" });
    }
}

usuario.status = async (req, res) => {
    const rUser = await refUser.find();
    res.json({
        status: true,
        rUser: rUser
    });
}

module.exports = usuario;