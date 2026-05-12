const jwt = require('jsonwebtoken');

const generateToken = (user) => {

    return jwt.sign(
        {
            id_usuario: user.id_usuario,
            correo: user.correo,
            id_rol: user.id_rol
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '7d'
        }
    );

};

module.exports = generateToken;