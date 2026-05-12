const ReportStatus = require('../models/ReportStatus');

const statusSeeder = async () => {

    const states = [

        'Pendiente',
        'En revisión',
        'En proceso',
        'Resuelto',
        'Cerrado'

    ];

    for (const estado of states) {

        await ReportStatus.findOrCreate({
            where: {
                nombre_estado: estado
            }
        });

    }

    console.log('Estados cargados');

};

module.exports = statusSeeder;