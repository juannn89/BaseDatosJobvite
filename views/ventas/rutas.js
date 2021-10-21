import Express from 'express';
import { queryAllVentas, crearVenta, editarVenta, eliminarVenta, consultarVenta } from '../../controllers/ventas/controllers.js';

const rutasVentas = Express.Router();

const callbackGenerico = (res) => (err, result) => {
    if (err) {
        res.sendStatus(500).send("Error de consulta");
    } else {
        res.json(result);
    };
};

rutasVentas.route('/ventas').get((req, res) => {
    console.log('alguien hizo get en la ruta /ventas');
    queryAllVentas(callbackGenerico(res));
});

rutasVentas.route('/ventas').post((req, res) => {
    crearVenta(req.body, callbackGenerico(res));
});

rutasVentas.route('/ventas/:id').get((req, res) => {
    console.log('alguien hizo get en la ruta /ventas');
    consultarVenta(req.params.id, callbackGenerico(res));
});

rutasVentas.route('/ventas/:id').patch((req, res) => {
    editarVenta(req.params.id, req.body, callbackGenerico(res))
})

rutasVentas.route('/ventas/:id').delete((req, res) => {
    eliminarVenta(req.params.id, callbackGenerico(res));
})

export default rutasVentas;