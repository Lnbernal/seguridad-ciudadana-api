const Category = require('../models/Category');

const categorySeeder = async () => {

    const categories = [

        {
            nombre_categoria: 'Robo',
            descripcion: 'Reportes de robo'
        },

        {
            nombre_categoria: 'Violencia',
            descripcion: 'Casos de violencia'
        },

        {
            nombre_categoria: 'Vandalismo',
            descripcion: 'Daños a propiedad'
        },

        {
            nombre_categoria: 'Accidente',
            descripcion: 'Accidentes de tránsito'
        },

        {
            nombre_categoria: 'Emergencia',
            descripcion: 'Emergencias generales'
        }

    ];

    for (const category of categories) {

        await Category.findOrCreate({
            where: {
                nombre_categoria: category.nombre_categoria
            },
            defaults: category
        });

    }

    console.log('Categorías cargadas');

};

module.exports = categorySeeder;