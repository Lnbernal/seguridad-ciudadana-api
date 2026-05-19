const express = require('express');
const router = express.Router();
const { autenticar, autorizar } = require('../middlewares/auth');

const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  changePassword
} = require('../controllers/user.controller');

// Crear usuario
router.post('/', autenticar, autorizar('ADMIN'), createUser);

// Obtener todos los usuarios
router.get('/', autenticar, autorizar('ADMIN'), getUsers);

// Obtener un usuario por ID
router.get('/:id', autenticar, autorizar('ADMIN'), getUserById);

// Actualizar datos del usuario (nombre, apellido, estado, etc.)
router.put('/:id', autenticar, autorizar('ADMIN'), updateUser);

// Cambiar rol del usuario
router.put('/:id/role', autenticar, autorizar('ADMIN'), updateUser);

// Cambiar contraseña
router.put('/:id/password', autenticar, changePassword);

// Eliminar usuario
router.delete('/:id', autenticar, autorizar('ADMIN'), deleteUser);

module.exports = router;