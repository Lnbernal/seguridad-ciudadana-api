const Municipality = require('../models/Municipality');

const municipalitySeeder = async () => {

    const municipalities = [

        'Chía',
        'Cajicá',
        'Zipaquirá',
        'Tocancipá',
        'Sopó',
        'Cota',
        'Cogua',
        'Nemocón',
        'Tabio',
        'Gachancipá'

    ];

    for (const municipio of municipalities) {

        await Municipality.findOrCreate({
            where: {
                nombre: municipio
            }
        });

    }

    console.log('Municipios cargados');

};

module.exports = municipalitySeeder;