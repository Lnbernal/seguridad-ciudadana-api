// Reemplaza TODO el contenido de:
// src/middlewares/role.middleware.js

module.exports = function (...allowedRoles) {
  return (req, res, next) => {
    const user = req.user || {};



    // Mapa id_rol -> nombre del rol
    // Ajusta estos valores según tu base de datos:
    // 1 = CIUDADANO
    // 2 = FUNCIONARIO
    // 3 = ADMIN
    const roleMap = {
      1: 'CIUDADANO',
      2: 'FUNCIONARIO',
      3: 'ADMIN'
    };

    // Intentar obtener rol por nombre
    let currentRole =
      user.rol ||
      user.role ||
      user.nombre_rol ||
      user.rol_nombre ||
      user?.rol?.nombre_rol ||
      user?.rol?.nombre ||
      user?.role?.nombre_rol ||
      user?.role?.nombre ||
      '';

    // Si no viene el nombre del rol, usar id_rol
    if (!currentRole && user.id_rol) {
      currentRole = roleMap[user.id_rol] || '';
    }

    currentRole = currentRole
      .toString()
      .trim()
      .toUpperCase();

    const allowed = allowedRoles.map((role) =>
      role.toString().trim().toUpperCase()
    );


    if (!currentRole) {
      return res.status(403).json({
        message: 'No se pudo determinar el rol del usuario'
      });
    }

    if (!allowed.includes(currentRole)) {
      return res.status(403).json({
        message: 'No tienes permisos para realizar esta acción'
      });
    }

    next();
  };
};