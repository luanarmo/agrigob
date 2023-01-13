const express = require('express')
const mongoose = require('mongoose')
require("dotenv").config()

const medicionRoutes = require('./routes/medicion.routes')

const usRoutes = require("./routes/usuario.routes");
const disRoutes = require("./routes/dispositivos.router");
const emisorRoutes = require("./routes/emisor.routes");
const culRoutes = require("./routes/plantacion.routes");
const tipoRoutes = require("./routes/tipoCultivo.routes");
const perAbsorcionRoutes = require("./routes/periodo_absorcion_nutrientes.routes");
const duracionRoutes = require("./routes/tiempo_duracion_periodo.router");


const app = express()
const port = process.env.PORT || 9000

app.set('view engine', 'ejs');
app.set('views', __dirname);
app.use(express.json());

const path = '/spi';

app.use(path + '/api', medicionRoutes);

app.use(path + '/us', usRoutes);
app.use(path + '/dis', disRoutes);
app.use(path + '/emi', emisorRoutes);
app.use(path + '/cul', culRoutes);
app.use(path + '/tipo', tipoRoutes);
app.use(path + '/per', perAbsorcionRoutes);
app.use(path + '/dur', duracionRoutes);

app.get('/', (req, res) => {
    res.json("Welcome to my API")
})

mongoose.set('strictQuery', true);

const URI = "mongodb+srv://user1:1234@cluster0.nobo6.mongodb.net/agrigob";

mongoose.connect(URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((error) => console.log(error));

app.listen(port, () => console.log('sever listening on port', port))