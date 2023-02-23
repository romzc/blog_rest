const { connection} = require('./database/connection');
const express = require("express"); // es necesario expreser para crear la app.
const cors = require('cors');


const puerto = 3000;

console.log("App arrancado");

connection();


// en esta seccion creamos el servidor de node.
const app = express(); // creamos la app.

// configuracion del cors
app.use(cors());

// convertir el body a objeto json
app.use(express.json());


// crear rutas
app.get("/probando", (req, res) => {
    return res.status(200).json({hello:" adasd "})
})

app.get("/", (req, res) => {
    return res.status(200).send("<h1>Hello</h1>")
})


// Crear servidor y escuchar por peticiones http.
app.listen(puerto, () => {
    console.log(`servidor corriendo en el puerto ${puerto}`)
});