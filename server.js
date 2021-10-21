// const express = require('express');
import Express from "express";
import Cors from "cors";
import dotenv from 'dotenv';
import { conectarBD, getDB } from './db/db.js';
import rutasProductos from "./views/productos/rutas.js";
import rutasUsuarios from "./views/usuarios/rutas.js";
import rutasVentas from "./views/ventas/rutas.js";

dotenv.config({ path: './.env'});

//let conexion;

const app = Express();

app.use(Express.json());
app.use(Cors());
app.use(rutasProductos);
app.use(rutasUsuarios);
app.use(rutasVentas);

const main = () => {
    return app.listen(process.env.PORT, () => {
        console.log(`escuchando puerto ${process.env.PORT}`);
    });
}

conectarBD(main);