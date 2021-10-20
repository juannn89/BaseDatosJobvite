// const express = require('express');
import Express from "express";
import { MongoClient } from "mongodb";
import Cors from "cors";

const stringConexion = "mongodb+srv://admin:admin@proyectojobvite.leorl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const client = new MongoClient
(stringConexion, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

let conexion;

const app = Express();

app.use(Express.json());
app.use(Cors());

app.get('/productos', (req, res) => {
    console.log('alguien hizo get en la ruta /productos');
    conexion
        .collection('productos')
        .find({})
        .limit(50)
        .toArray((err, result) => {
        if (err) {
            res.sendStatus(500).send("Error de consulta");
        } else {
            res.json(result);
        }
    });
});

app.post('/productos/nuevo', (req, res) => {
    console.log(req);
    const datoProducto = req.body;
    console.log('llaves: ', Object.keys(datoProducto));
    try {
        if (
            Object.keys(datoProducto).includes('codigo') && Object.keys(datoProducto).includes('nombre') && Object.keys(datoProducto).includes('valor') && Object.keys(datoProducto).includes('estado')
        ) {
            conexion.collection('productos').insertOne(datoProducto, (err, result) => {
                if (err) {
                    console.error(err);
                    res.sendStatus(500);
                } else {
                    console.log(result);
                    res.sendStatus(200);
                }
            });
            res.sendStatus(200);
        } else {
            res.sendStatus(500);
        }
    } catch {
            res.sendStatus(500);
        }
});

const main = () => {
    client.connect((err, db) => {
        if (err) {
            console.error('Error de conexion');
        }
        conexion = db.db('productos');
        console.log('conexión exitosa');
        return app.listen(5000, () => {
        console.log('escuchando puerto 5000');
        });
    });
}

main();