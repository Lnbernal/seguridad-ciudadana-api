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

        // Crear usuario con rol CIUDADANO (id_rol = 1)
        const user = await User.create({
            nombre,
            apellido,
            correo,
            contraseña: hashedPassword,
            telefono,
            estado: true,   // Por defecto activo
            id_rol: 1       // Rol CIUDADANO
        });

        return res.status(201).json({
            message: 'Usuario registrado correctamente',
            user: {
                id_usuario: user.id_usuario,
                nombre: user.nombre,
                apellido: user.apellido,
                correo: user.correo,
                telefono: user.telefono,
                estado: user.estado,
                id_rol: user.id_rol
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

        // Buscar usuario incluyendo su rol
        const user = await User.findOne({
            where: { correo },
            include: [
                {
                    model: Role,
                    as: 'role',
                    attributes: ['id_rol', 'nombre_rol']
                }
            ]
        });

        if (!user) {
            return res.status(401).json({
                message: 'Credenciales incorrectas'
            });
        }

        // ═══════════════════════════════════════════
        // VALIDAR SI EL USUARIO ESTÁ ACTIVO
        // ═══════════════════════════════════════════
        if (user.estado === false || user.estado === 0 || user.estado === '0') {
            return res.status(403).json({
                message: 'Tu cuenta ha sido desactivada. Contacta al administrador del sistema.',
                code: 'ACCOUNT_DISABLED'
            });
        }

        // Validar contraseña
        const validPassword = await bcrypt.compare(
            contraseña,
            user.contraseña
        );

        if (!validPassword) {
            return res.status(401).json({
                message: 'Credenciales incorrectas'
            });
        }

        // Generar JWT
        const token = jwt.sign(
            {
                id_usuario: user.id_usuario,
                correo: user.correo,
                rol: user.role?.nombre_rol || 'CIUDADANO',
                id_rol: user.id_rol
            },
            process.env.JWT_SECRET || 'secret123',
            {
                expiresIn: '7d'
            }
        );

        // Respuesta
        return res.json({
            message: 'Login exitoso',
            token,
            user: {
                id_usuario: user.id_usuario,
                nombre: user.nombre,
                apellido: user.apellido,
                correo: user.correo,
                telefono: user.telefono,
                estado: user.estado,
                id_rol: user.id_rol,
                rol: user.role
                    ? user.role.nombre_rol
                    : null
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