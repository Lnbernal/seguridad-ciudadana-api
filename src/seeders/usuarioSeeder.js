// seeders/userSeeder.js
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const usuarios = [
  {
    nombre: 'Ciudadano',
    apellido: 'Prueba',
    correo: 'ciudadano@test.com',
    contraseña: '123456',
    telefono: '3000000001',
    direccion: 'Calle 1', 
    id_rol: 1,
    estado: true
  },
  {
    nombre: 'Operador',
    apellido: 'Prueba',
    correo: 'operador@test.com',
    contraseña: '123456',
    telefono: '3000000002',
    direccion: 'Calle 2',
    id_rol: 2,
    estado: true
  },
  {
    nombre: 'Funcionario',
    apellido: 'Prueba',
    correo: 'funcionario@test.com',
    contraseña: '123456',
    telefono: '3000000003',
    direccion: 'Calle 3',
    id_rol: 6,
    estado: true
  },
  {
    nombre: 'Alcaldia',
    apellido: 'Prueba',
    correo: 'alcaldia@test.com',
    contraseña: '123456',
    telefono: '3000000004',
    direccion: 'Calle 4',
    id_rol: 4,
    estado: true
  }
];

const userSeeder = async () => {
  for (const u of usuarios) {
    try {
      const hash = await bcrypt.hash(u.contraseña, 10);

      const [instancia, creado] = await User.findOrCreate({
        where: { correo: u.correo },
        defaults: {
          ...u,
          contraseña: hash
        }
      });

      if (creado) {
        console.log(`Usuario creado: ${u.nombre} (${u.correo})`);
      } else {
        console.log(`Ya existe: ${u.correo}`);
      }
    } catch (err) {
      console.error(`Error con ${u.correo}:`, err.message);
    }
  }
};

module.exports = userSeeder;