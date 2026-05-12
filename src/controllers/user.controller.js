const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Role = require('../models/Role');

/*
|--------------------------------------------------------------------------
| CREATE
|--------------------------------------------------------------------------
*/
const createUser = async (req, res) => {
    try {
        const {
            nombre,
            apellido,
            correo,
            contraseña,
            telefono,
            direccion,
            estado,
            id_rol
        } = req.body;

        // Verificar si ya existe el correo
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

        const user = await User.create({
            nombre,
            apellido,
            correo,
            contraseña: hashedPassword,
            telefono,
            direccion,
            estado,
            id_rol
        });

        res.status(201).json({
            message: 'Usuario creado correctamente',
            user: {
                id_usuario: user.id_usuario,
                nombre: user.nombre,
                apellido: user.apellido,
                correo: user.correo,
                telefono: user.telefono,
                direccion: user.direccion,
                estado: user.estado,
                id_rol: user.id_rol
            }
        });
    } catch (error) {
        console.error('Error creando usuario:', error);

        res.status(500).json({
            message: 'Error creando usuario'
        });
    }
};

/*
|--------------------------------------------------------------------------
| READ ALL
|--------------------------------------------------------------------------
*/
const getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: {
                exclude: ['contraseña']
            },
            include: [
                {
                    model: Role,
                    attributes: ['id_rol', 'nombre_rol']
                }
            ],
            order: [['id_usuario', 'ASC']]
        });

        res.json(users);
    } catch (error) {
        console.error('Error obteniendo usuarios:', error);

        res.status(500).json({
            message: 'Error obteniendo usuarios'
        });
    }
};

/*
|--------------------------------------------------------------------------
| READ BY ID
|--------------------------------------------------------------------------
*/
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id, {
            attributes: {
                exclude: ['contraseña']
            },
            include: [
                {
                    model: Role,
                    attributes: ['id_rol', 'nombre_rol']
                }
            ]
        });

        if (!user) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        }

        res.json(user);
    } catch (error) {
        console.error('Error obteniendo usuario:', error);

        res.status(500).json({
            message: 'Error obteniendo usuario'
        });
    }
};

/*
|--------------------------------------------------------------------------
| UPDATE
|--------------------------------------------------------------------------
*/
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        }

        const data = { ...req.body };

        // Si viene nueva contraseña, encriptarla
        if (data.contraseña) {
            data.contraseña = await bcrypt.hash(data.contraseña, 10);
        }

        // Si cambia el correo, validar que no exista
        if (data.correo && data.correo !== user.correo) {
            const existingUser = await User.findOne({
                where: { correo: data.correo }
            });

            if (existingUser) {
                return res.status(400).json({
                    message: 'El correo ya está registrado'
                });
            }
        }

        await user.update(data);

        res.json({
            message: 'Usuario actualizado correctamente',
            user: {
                id_usuario: user.id_usuario,
                nombre: user.nombre,
                apellido: user.apellido,
                correo: user.correo,
                telefono: user.telefono,
                direccion: user.direccion,
                estado: user.estado,
                id_rol: user.id_rol
            }
        });
    } catch (error) {
        console.error('Error actualizando usuario:', error);

        res.status(500).json({
            message: 'Error actualizando usuario'
        });
    }
};

/*
|--------------------------------------------------------------------------
| DELETE
|--------------------------------------------------------------------------
*/
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        }

        await user.destroy();

        res.json({
            message: 'Usuario eliminado correctamente'
        });
    } catch (error) {
        console.error('Error eliminando usuario:', error);

        res.status(500).json({
            message: 'Error eliminando usuario'
        });
    }
};

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
};