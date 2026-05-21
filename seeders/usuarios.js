// seeders/usuarios.js
const bcrypt = require('bcryptjs');
const sequelize = require('../src/config/database');
const User = require('../src/models/User');
const Role = require('../src/models/Role');

const usuarios = [
  {
    nombre: 'Ciudadano',
    apellido: 'Prueba',
    correo: 'ciudadano@test.com',
    contraseña: '123456',
    telefono: '3000000001',
    direccion: 'Calle 1',
    id_rol: 1, // CIUDADANO
    estado: true
  },
  {
    nombre: 'Operador',
    apellido: 'Prueba',
    correo: 'operador@test.com',
    contraseña: '123456',
    telefono: '3000000002',
    direccion: 'Calle 2',
    id_rol: 2, // OPERADOR
    estado: true
  },
  {
    nombre: 'Funcionario',
    apellido: 'Prueba',
    correo: 'funcionario@test.com',
    contraseña: '123456',
    telefono: '3000000003',
    direccion: 'Calle 3',
    id_rol: 6, // FUNCIONARIO
    estado: true
  },
  {
    nombre: 'Alcaldía',
    apellido: 'Prueba',
    correo: 'alcaldia@test.com',
    contraseña: '123456',
    telefono: '3000000004',
    direccion: 'Calle 4',
    id_rol: 4, // ALCALDIA
    estado: true
  }
];

async function seedUsuarios() {
  await sequelize.authenticate();

  for (const u of usuarios) {
    const [instancia, creado] = await User.findOrCreate({
      where: { correo: u.correo },
      defaults: {
        ...u,
        contraseña: await bcrypt.hash(u.contraseña, 10)
      }
    });

    if (creado) {
      console.log(`Usuario creado: ${u.nombre} (${u.correo})`);
    } else {
      console.log(`Usuario ya existe: ${u.correo}`);
    }
  }

  console.log('Seeder de usuarios completado.');
}

seedUsuarios()
  .then(async () => {
    await sequelize.close();
    process.exit(0);
  })
  .catch(async err => {
    console.error('Error en seeder de usuarios:', err);
    await sequelize.close();
    process.exit(1);
  });
