import { getDB } from '../db/db.js';

const queryAllProductos = async (callback) => {
    const conexion = getDB();
    await conexion
        .collection('productos')
        .find({})
        .limit(50)
        .toArray(callback);
};

const crearProducto = async (datoProducto, callback) => {
        if (
            Object.keys(datoProducto).includes('codigo') && Object.keys(datoProducto).includes('nombre') && Object.keys(datoProducto).includes('valor') && Object.keys(datoProducto).includes('estado')
        ) {
            const conexion = getDB();
            conexion.collection('productos').insertOne(datoProducto, callback);
        } else {
            return 'error';
    }
};

export { queryAllProductos, crearProducto };