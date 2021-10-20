// const express = require('express');
import Express from "express";
import { MongoClient, ObjectId } from "mongodb";
import Cors from "cors";
import dotenv from 'dotenv';
import { conectarBD, getDB } from './db/db.js';

dotenv.config({ path: './.env'});

//let conexion;

const app = Express();

app.use(Express.json());
app.use(Cors());

app.get('/productos', (req, res) => {
    console.log('alguien hizo get en la ruta /productos');
    const conexion = getDB();
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
            const conexion = getDB();
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

app.patch('/productos/editar', (req, res) => {
    const edicion = req.body;
    const filtroProducto = { _id: new ObjectId(edicion.id) };
    delete edicion.id;
    const operacion = {
        $set: edicion,
    };
    const conexion = getDB();
    conexion.collection('productos').findOneAndUpdate(filtroProducto, operacion, { upsert: true, returnOriginal: true }, (err, serult) => {
        if (err) {
            console.error('Error de actualización', err);
            res.sendStatus(500);
        } else {
            console.log('Actualizado con exito');
            res.sendStatus(200);
        }
    });
})

app.delete('/productos/eliminar', (req, res) => {
    const filtroProducto = { _id: new ObjectId(req.body.id) };
    const conexion = getDB();
    conexion.collection('productos').deleteOne(filtroProducto, (err, result) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    })
})

const main = () => {
    return app.listen(process.env.PORT, () => {
        console.log(`escuchando puerto ${process.env.PORT}`);
    });
}

conectarBD(main);