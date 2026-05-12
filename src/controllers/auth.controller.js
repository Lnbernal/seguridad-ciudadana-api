const bcrypt = require('bcryptjs');

const User = require('../models/User');
const Role = require('../models/Role');

const generateToken = require('../utils/generateToken');

const register = async (req, res) => {

    try {

        const {
            nombre,
            apellido,
            correo,
            contraseña,
            telefono,
            direccion
        } = req.body;

        const userExists = await User.findOne({
            where: { correo }
        });

        if (userExists) {

            return res.status(400).json({
                message: 'El correo ya existe'
            });

        }

        const hashedPassword = await bcrypt.hash(contraseña, 10);

        const user = await User.create({

            nombre,
            apellido,
            correo,
            contraseña: hashedPassword,
            telefono,
            direccion,
            id_rol: 1

        });

        const token = generateToken(user);

        res.status(201).json({

            message: 'Usuario registrado',

            token,

            user

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: 'Error del servidor'
        });

    }

};

const login = async (req, res) => {

    try {

        const { correo, contraseña } = req.body;

        const user = await User.findOne({
            where: { correo },
            include: Role
        });

        if (!user) {

            return res.status(404).json({
                message: 'Usuario no encontrado'
            });

        }

        const validPassword = await bcrypt.compare(
            contraseña,
            user.contraseña
        );

        if (!validPassword) {

            return res.status(401).json({
                message: 'Contraseña incorrecta'
            });

        }

        const token = generateToken(user);

        res.json({

            message: 'Login exitoso',

            token,

            user

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: 'Error del servidor'
        });

    }

};

module.exports = {
    register,
    login
};