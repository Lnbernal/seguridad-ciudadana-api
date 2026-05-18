const express = require('express');
const router = express.Router();
const { autenticar, autorizar } = require('../middlewares/auth'); // ruta según tu estructura

const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  changePassword
} = require('../controllers/user.controller');

router.post('/', autenticar, autorizar('ADMIN'), createUser);
router.get('/', autenticar, autorizar('ADMIN'), getUsers);
router.get('/:id/role', autenticar, autorizar('ADMIN'), getUserById);
router.put('/:id/role', autenticar, autorizar('ADMIN'), updateUser);
router.delete('/:id/role', autenticar, autorizar('ADMIN'), deleteUser);
router.put('/:id/password', autenticar, changePassword);

module.exports = router;