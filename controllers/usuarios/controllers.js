import { getDB } from '../../db/db.js';
import { ObjectId } from 'mongodb';

const queryAllUsuarios = async (callback) => {
    const conexion = getDB();
    await conexion
        .collection('usuarios')
        .find({})
        .limit(50)
        .toArray(callback);
};

const crearUsuario = async (datoUsuario, callback) => {
        const conexion = getDB();
        await conexion
            .collection('usuarios')
            .insertOne(datoUsuario, callback);
};

const consultarUsuario = async (id, callback) => {
    const conexion = getDB();
    await conexion
        .collection('usuarios')
        .findOne({ _id: new ObjectId(id) }, callback);
};

const editarUsuario = async (id, edicion, callback) => {
    const filtroUsuario = { _id: new ObjectId(edicion.id) };
    const operacion = {
        $set: edicion,
    };
    const conexion = getDB();
    await conexion
        .collection('usuarios')
        .findOneAndUpdate(filtroUsuario, operacion, { upsert: true, returnOriginal: true }, callback);
}

const eliminarUsuario = async (id, callback) => {
    const filtroUsuario = { _id: new ObjectId(id) };
    const conexion = getDB();
    await conexion.collection('usuarios').deleteOne(filtroUsuario, callback);
}

export { queryAllUsuarios, crearUsuario, editarUsuario, eliminarUsuario, consultarUsuario };