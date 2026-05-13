// src/controllers/user.controller.js

const bcrypt = require('bcryptjs');
const User = require('../models/User');

const createUser = async (req, res) => {
  try {
    // Extraer los datos del body y descartar cualquier id_rol enviado
    const {
      nombre,
      apellido,
      correo,
      contraseña,
      telefono,
      direccion
    } = req.body;

    // Encriptar contraseña (si ya lo haces en otro lugar, puedes omitir esto)
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    // Crear usuario forzando SIEMPRE el rol CIUDADANO (id_rol = 1)
    const user = await User.create({
      nombre,
      apellido,
      correo,
      contraseña: hashedPassword,
      telefono,
      direccion,
      estado: true,
      id_rol: 1
    });

    res.status(201).json({
      message: 'Usuario creado correctamente',
      user
    });
  } catch (error) {
    console.error('Error creando usuario:', error);
    res.status(500).json({
      message: 'Error creando usuario'
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