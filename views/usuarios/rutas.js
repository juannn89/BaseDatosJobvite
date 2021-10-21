import Express from 'express';
import { queryAllUsuarios, crearUsuario, editarUsuario, eliminarUsuario, consultarUsuario } from '../../controllers/usuarios/controllers.js';

const rutasUsuarios = Express.Router();

const callbackGenerico = (res) => (err, result) => {
    if (err) {
        res.sendStatus(500).send("Error de consulta");
    } else {
        res.json(result);
    };
};

rutasUsuarios.route('/usuarios').get((req, res) => {
    console.log('alguien hizo get en la ruta /usuarios');
    queryAllUsuarios(callbackGenerico(res));
});

rutasUsuarios.route('/usuarios').post((req, res) => {
    crearUsuario(req.body, callbackGenerico(res));
});

rutasUsuarios.route('/usuarios/:id').get((req, res) => {
    console.log('alguien hizo get en la ruta /usuarios');
    consultarUsuario(req.params.id, callbackGenerico(res));
});

rutasUsuarios.route('/usuarios/:id').patch((req, res) => {
    editarUsuario(req.params.id, req.body, callbackGenerico(res))
})

rutasUsuarios.route('/usuarios/:id').delete((req, res) => {
    eliminarUsuario(req.params.id, callbackGenerico(res));
})

export default rutasUsuarios;