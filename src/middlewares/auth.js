// src/middlewares/auth.js
const jwt = require('jsonwebtoken');

const autenticar = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token requerido' });
    }

    const cleanToken = token.replace('Bearer ', '');
    const decoded = jwt.verify(cleanToken, process.env.JWT_SECRET || 'secret123');

    // El token debe contener id_usuario y rol (string)
    if (!decoded.id_usuario || !decoded.rol) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    req.user = decoded; // { id_usuario, rol, correo, ... }
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

const autorizar = (...rolesPermitidos) => (req, res, next) => {
  if (!req.user || !rolesPermitidos.includes(req.user.rol)) {
    return res.status(403).json({ error: 'No autorizado' });
  }
  next();
};

module.exports = { autenticar, autorizar };