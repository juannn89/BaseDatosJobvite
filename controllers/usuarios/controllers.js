import { getDB } from '../../db/db.js';
import { ObjectId } from 'mongodb';
import jwt_decode from 'jwt-decode';

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

const consultarOCrearUsuario = async (req, callback) => {
    //1. Obtener datos usuario desde token.
    const token = req.headers.authorization.split('Bearer ')[1];
    const user = jwt_decode(token)['http://localhost/userData'];
    console.log(user);
    //2. con el correo de Auth0 verificar si el usuario esta creado en bd.
    const baseDeDatos = getDB();
    await baseDeDatos.collection('usuarios').findOne({ email: user.email }, async (err, response) => {
    console.log(response);
    if (response) {
    //3. si el usuario esta en bd, devolver info de usuario.
        callback(err, response);
    }
    else {
    //4. si el usuario no esta en la bd, crearlo y devolver info.
        user.auth0ID = user._id;
        delete user._id;
        user.rol = 'sin rol';
        user.estado = 'pendiente';
        await crearUsuario(user, (err, response) => callback(err, user));
        } 
    }); 
   
};

const editarUsuario = async (id, edicion, callback) => {
    const filtroUsuario = { _id: new ObjectId(id) };
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

export {
    queryAllUsuarios, crearUsuario, editarUsuario, eliminarUsuario, consultarUsuario, consultarOCrearUsuario
};