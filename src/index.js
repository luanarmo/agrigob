const express = require('express')
const mongoose = require('mongoose')
require("dotenv").config()

const medicionRoutes = require('./routes/medicion.routes')


const app = express()
const port = process.env.PORT || 9000

app.set('view engine', 'ejs');
app.set('views', __dirname);
app.use(express.json());

app.use('/api', medicionRoutes);

app.get('/', (req, res) => {
    res.json("Welcome to my API")
})

mongoose.set('strictQuery', true);

const URI = "mongodb+srv://user1:1234@cluster0.nobo6.mongodb.net/agrigob";

mongoose.connect(URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((error) => console.log(error));

app.listen(port, () => console.log('sever listening on port', port))