import Express from 'express';
import { queryAllProductos, crearProducto, editarProducto } from '../controllers/controllers.js';
import { getDB } from '../db/db.js';

const rutasProductos = Express.Router();

const callbackGenerico = (res) => (err, result) => {
        if (err) {
            res.sendStatus(500).send("Error de consulta");
        } else {
            res.json(result);
        };
    };

rutasProductos.route('/productos').get((req, res) => {
    console.log('alguien hizo get en la ruta /productos');
    queryAllProductos(callbackGenerico(res));
});

rutasProductos.route('/productos/nuevo').post((req, res) => {
    crearProducto(req.body, callbackGenerico(res));
});

rutasProductos.route('/productos/editar').patch ((req, res) => {
    editarProducto(req.body, callbackGenerico(res))
})

rutasProductos.route('/productos/eliminar').delete ((req, res) => {
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

export default rutasProductos;