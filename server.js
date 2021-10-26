// const express = require('express');
import Express from "express";
import Cors from "cors";
import dotenv from 'dotenv';
import { conectarBD, getDB } from './db/db.js';
import rutasProductos from "./views/productos/rutas.js";
import rutasUsuarios from "./views/usuarios/rutas.js";
import rutasVentas from "./views/ventas/rutas.js";
import jwt from "express-jwt";
import jwks from 'jwks-rsa';
import autorizacionEstadoUsuario from "./middleware/autorizacionEstadoUsuario.js";

dotenv.config({ path: './.env'});

//let conexion;

const port = process.env.PORT || 5000;

const app = Express();

app.use(Express.json());
app.use(Cors());

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://jobvite.us.auth0.com/.well-known/jwks.json'
    }),
    audience: 'api-auth-jobvite',
    issuer: 'https://jobvite.us.auth0.com/',
    algorithms: ['RS256']
});

app.use(jwtCheck);

app.use(autorizacionEstadoUsuario);

app.use(rutasProductos);
app.use(rutasUsuarios);
app.use(rutasVentas);

const main = () => {
    return app.listen(port, () => {
        console.log(`escuchando puerto ${port}`);
    });
}

conectarBD(main);