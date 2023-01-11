const express = require('express')
const mongoose = require('mongoose')
require("dotenv").config()


const app = express()
const port = process.env.PORT || 9000

app.use(express.json())

app.get('/', (req, res) => {
    res.json("Welcome to my API")
})

mongoose.set('strictQuery', true)

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((error) => console.log(error));

app.listen(port, () => console.log('sever listening on port', port))