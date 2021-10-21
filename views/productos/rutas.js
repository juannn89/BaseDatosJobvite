import Express from 'express';
import { queryAllProductos, crearProducto, editarProducto, eliminarProducto, consultarProducto } from '../../controllers/productos/controllers.js';

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

rutasProductos.route('/productos').post((req, res) => {
    crearProducto(req.body, callbackGenerico(res));
});

rutasProductos.route('/productos/:id').get((req, res) => {
    console.log('alguien hizo get en la ruta /productos');
    consultarProducto(req.params.id, callbackGenerico(res));
});

rutasProductos.route('/productos/:id').patch ((req, res) => {
    editarProducto(req.params.id, req.body, callbackGenerico(res))
})

rutasProductos.route('/productos/:id').delete ((req, res) => {
    eliminarProducto(req.params.id, callbackGenerico(res));
})

export default rutasProductos;