// const express = require('express');
import Express from "express";

const app = Express();
app.use(Express.json());

app.get('/productos', (req, res) => {
    console.log('alguien hizo get en la ruta /productos');
    const productos = [
        { nombre: 'portatil', marca: 'asus', modelo: '2021' },
        { nombre: 'pc escritorio', marca: 'lenovo', modelo: '2020' },
    ];
    res.send(productos);
});

app.post('/productos/nuevo', (req, res) => {
    const datoProducto = req.body;
    console.log('llaves: ', Object.keys(datoProducto));
    try {
        if (
            Object.keys(datoProducto).includes('name') && Object.keys(datoProducto).includes('brand') && Object.keys(datoProducto).includes('model')
        ) {
            res.sendStatus(200);
        } else {
            res.sendStatus(500);
        }
    } catch {
            res.sendStatus(500);
        }
});


app.listen(5000, () => {
    console.log('escuchando puerto 5000');
});