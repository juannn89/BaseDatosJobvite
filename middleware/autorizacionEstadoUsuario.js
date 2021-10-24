import { getDB } from '../db/db.js';
import { ObjectId } from 'mongodb';
import jwt_decode from 'jwt-decode';

const autorizacionEstadoUsuario = async (req, res, next) => {
    //1. Obtener el usuario del token.
    const token = req.headers.authorization.split('Bearer ')[1];
    const user = jwt_decode(token)['http://localhost/userData'];
    console.log(user);
    //2. Consultar usuario en bd.
    const baseDeDatos = getDB();
    await baseDeDatos.collection('usuarios').findOne({ email: user.email }, async (err, response) => {
        if (response) {
            console.log(response);
            //3. Verificar el estado del usuario.
            if (response.estado === 'rechazado') {
                res.senEstatus(401);
            //4. Si el usuario es rechazado devolver error de autenticación.
            }
            else {
                console.log('habilitado');
            }
            console.log('soy un middleware');
            //5. Si el usuario esta pendiente o habilidato, ejecutar next.
            next();
        };
    });
}

export default autorizacionEstadoUsuario;