// const express = require('express');
import Express from "express";
import Cors from "cors";
import dotenv from 'dotenv';
import { conectarBD, getDB } from './db/db.js';
import rutasProductos from "./views/rutas.js";

dotenv.config({ path: './.env'});

//let conexion;

const app = Express();

app.use(Express.json());
app.use(Cors());
app.use(rutasProductos);

const main = () => {
    return app.listen(process.env.PORT, () => {
        console.log(`escuchando puerto ${process.env.PORT}`);
    });
}

conectarBD(main);