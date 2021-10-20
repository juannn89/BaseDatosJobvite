import Express from 'express';
import { queryAllProductos, crearProducto, editarProducto, eliminarProducto } from '../controllers/controllers.js';

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
    eliminarProducto(req.body.id, callbackGenerico(res));
})

export default rutasProductos;