import { getDB } from '../db/db.js';
import { ObjectId } from 'mongodb';

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
            await conexion
                .collection('productos')
                .insertOne(datoProducto, callback);
        } else {
            return 'error';
    }
};

const editarProducto = async (edicion, callback) => {
    const filtroProducto = { _id: new ObjectId(edicion.id) };
    delete edicion.id;
    const operacion = {
        $set: edicion,
    };
    const conexion = getDB();
    await conexion
        .collection('productos')
        .findOneAndUpdate(filtroProducto, operacion, { upsert: true, returnOriginal: true }, callback);
}

export { queryAllProductos, crearProducto, editarProducto };