import { getDB } from '../../db/db.js';
import { ObjectId } from 'mongodb';

const queryAllVentas = async (callback) => {
    const conexion = getDB();
    await conexion
        .collection('ventas')
        .find({})
        .limit(50)
        .toArray(callback);
};

const crearVenta = async (datoVenta, callback) => {
    const conexion = getDB();
    await conexion
        .collection('ventas')
        .insertOne(datoVenta, callback);
};

const consultarVenta = async (id, callback) => {
    const conexion = getDB();
    await conexion
        .collection('ventas')
        .findOne({ _id: new ObjectId(id) }, callback);
};

const editarVenta = async (id, edicion, callback) => {
    const filtroVenta = { _id: new ObjectId(id) };
    const operacion = {
        $set: edicion,
    };
    const conexion = getDB();
    await conexion
        .collection('ventas')
        .findOneAndUpdate(filtroVenta, operacion, { upsert: true, returnOriginal: true }, callback);
}

const eliminarVenta = async (id, callback) => {
    const filtroVenta = { _id: new ObjectId(id) };
    const conexion = getDB();
    await conexion.collection('ventas').deleteOne(filtroVenta, callback);
}

export { queryAllVentas, crearVenta, editarVenta, eliminarVenta, consultarVenta };