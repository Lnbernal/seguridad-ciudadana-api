// src/controllers/auth.controller.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Role = require('../models/Role');

/*
|--------------------------------------------------------------------------
| REGISTRO
|--------------------------------------------------------------------------
*/
const register = async (req, res) => {
    try {
        const {
            nombre,
            apellido,
            correo,
            contraseña,
            telefono
        } = req.body;

        // Verificar si el correo ya existe
        const existingUser = await User.findOne({
            where: { correo }
        });

        if (existingUser) {
            return res.status(400).json({
                message: 'El correo ya está registrado'
            });
        }

        // Encriptar contraseña
        const hashedPassword = await bcrypt.hash(contraseña, 10);

        // Crear usuario con rol ciudadano (id_rol = 3)
        const user = await User.create({
            nombre,
            apellido,
            correo,
            contraseña: hashedPassword,
            telefono,
            id_rol: 3
        });

        return res.status(201).json({
            message: 'Usuario registrado correctamente',
            user: {
                id_usuario: user.id_usuario,
                nombre: user.nombre,
                apellido: user.apellido,
                correo: user.correo
            }
        });

    } catch (error) {
        console.error('Error en register:', error);

        return res.status(500).json({
            message: 'Error del servidor'
        });
    }
};

/*
|--------------------------------------------------------------------------
| LOGIN
|--------------------------------------------------------------------------
*/
const login = async (req, res) => {
    try {
        const { correo, contraseña } = req.body;

        // Buscar usuario con rol
        const user = await User.findOne({
            where: { correo },
            include: [
                {
                    model: Role,
                    as: 'role'
                }
            ]
        });

        if (!user) {
            return res.status(401).json({
                message: 'Credenciales incorrectas'
            });
        }

        // Comparar contraseña
        const validPassword = await bcrypt.compare(
            contraseña,
            user.contraseña
        );

        if (!validPassword) {
            return res.status(401).json({
                message: 'Credenciales incorrectas'
            });
        }

        // Generar token JWT
        const token = jwt.sign(
            {
                id_usuario: user.id_usuario,
                correo: user.correo,
                id_rol: user.id_rol
            },
            process.env.JWT_SECRET || 'secret123',
            {
                expiresIn: '7d'
            }
        );

        // Respuesta exitosa
        return res.json({
            message: 'Login exitoso',
            token,
            user: {
                id_usuario: user.id_usuario,
                nombre: user.nombre,
                apellido: user.apellido,
                correo: user.correo,
                telefono: user.telefono,
                rol: user.role ? user.role.nombre : null
            }
        });

    } catch (error) {
        console.error('Error en login:', error);

        return res.status(500).json({
            message: 'Error del servidor'
        });
    }
};

/*
|--------------------------------------------------------------------------
| EXPORTS
|--------------------------------------------------------------------------
*/
module.exports = {
    register,
    login
};