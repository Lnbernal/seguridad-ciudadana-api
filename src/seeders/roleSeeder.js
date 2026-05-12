const Role = require('../models/Role');

const roleSeeder = async () => {

    const roles = [
        'CIUDADANO',
        'OPERADOR',
        'ADMIN',
        'ALCALDIA'
    ];

    for (const rol of roles) {

        await Role.findOrCreate({
            where: {
                nombre_rol: rol
            }
        });

    }

    console.log('Roles cargados');

};

module.exports = roleSeeder;