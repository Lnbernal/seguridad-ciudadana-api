// src/seeders/adminSeeder.js

const bcrypt = require('bcryptjs');
const User = require('../models/User');

const adminSeeder = async () => {
  try {
    // Verificar si ya existe el administrador
    const existingAdmin = await User.findOne({
      where: {
        correo: 'admin@test.com'
      }
    });

    if (existingAdmin) {
      console.log('El usuario administrador ya existe.');
      return;
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash('Admin123*', 10);

    // Crear administrador
    await User.create({
      nombre: 'Administrador',
      apellido: 'Sistema',
      correo: 'admin@test.com',
      contraseña: hashedPassword,
      telefono: '3000000000',
      direccion: 'Sistema',
      estado: true,
      id_rol: 3 // ADMIN
    });

    console.log('Usuario administrador creado correctamente.');
    console.log('Correo: admin@test.com');
    console.log('Contraseña: Admin123*');
  } catch (error) {
    console.error('Error creando administrador:', error);
  }
};

module.exports = adminSeeder;