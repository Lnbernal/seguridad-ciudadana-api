// src/routes/user.routes.js

const express = require('express');
const router = express.Router();

const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  changePassword
} = require('../controllers/user.controller');

const verifyToken = require('../middlewares/auth.middleware');
const authorizeRoles = require('../middlewares/role.middleware');

// Solo ADMIN puede administrar usuarios
router.post(
  '/',
  verifyToken,
  authorizeRoles('ADMIN'),
  createUser
);

router.get(
  '/',
  verifyToken,
  authorizeRoles('ADMIN'),
  getUsers
);

router.get(
  '/:id/role',
  verifyToken,
  authorizeRoles('ADMIN'),
  getUserById
);

router.put(
  '/:id/role',
  verifyToken,
  authorizeRoles('ADMIN'),
  updateUser
);

router.delete(
  '/:id/role',
  verifyToken,
  authorizeRoles('ADMIN'),
  deleteUser
);

// ── Cualquier usuario autenticado puede cambiar SU propia contraseña ──
router.put('/:id/password', verifyToken, changePassword);

module.exports = router;