const Municipality = require('../models/Municipality');

/*
|--------------------------------------------------------------------------
| CREATE
|--------------------------------------------------------------------------
*/
const createMunicipality = async (req, res) => {
    try {
        const { nombre } = req.body;

        const municipality = await Municipality.create({
            nombre
        });

        res.status(201).json({
            message: 'Municipio creado correctamente',
            municipality
        });
    } catch (error) {
        console.error('Error creando municipio:', error);

        res.status(500).json({
            message: 'Error creando municipio'
        });
    }
};

/*
|--------------------------------------------------------------------------
| READ ALL
|--------------------------------------------------------------------------
*/
const getMunicipalities = async (req, res) => {
    try {
        const municipalities = await Municipality.findAll({
            order: [['nombre', 'ASC']]
        });

        res.json(municipalities);
    } catch (error) {
        console.error('Error obteniendo municipios:', error);

        res.status(500).json({
            message: 'Error obteniendo municipios'
        });
    }
};

/*
|--------------------------------------------------------------------------
| READ BY ID
|--------------------------------------------------------------------------
*/
const getMunicipalityById = async (req, res) => {
    try {
        const { id } = req.params;

        const municipality = await Municipality.findByPk(id);

        if (!municipality) {
            return res.status(404).json({
                message: 'Municipio no encontrado'
            });
        }

        res.json(municipality);
    } catch (error) {
        console.error('Error obteniendo municipio:', error);

        res.status(500).json({
            message: 'Error obteniendo municipio'
        });
    }
};

/*
|--------------------------------------------------------------------------
| UPDATE
|--------------------------------------------------------------------------
*/
const updateMunicipality = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;

        const municipality = await Municipality.findByPk(id);

        if (!municipality) {
            return res.status(404).json({
                message: 'Municipio no encontrado'
            });
        }

        await municipality.update({
            nombre
        });

        res.json({
            message: 'Municipio actualizado correctamente',
            municipality
        });
    } catch (error) {
        console.error('Error actualizando municipio:', error);

        res.status(500).json({
            message: 'Error actualizando municipio'
        });
    }
};

/*
|--------------------------------------------------------------------------
| DELETE
|--------------------------------------------------------------------------
*/
const deleteMunicipality = async (req, res) => {
    try {
        const { id } = req.params;

        const municipality = await Municipality.findByPk(id);

        if (!municipality) {
            return res.status(404).json({
                message: 'Municipio no encontrado'
            });
        }

        await municipality.destroy();

        res.json({
            message: 'Municipio eliminado correctamente'
        });
    } catch (error) {
        console.error('Error eliminando municipio:', error);

        res.status(500).json({
            message: 'Error eliminando municipio'
        });
    }
};

module.exports = {
    createMunicipality,
    getMunicipalities,
    getMunicipalityById,
    updateMunicipality,
    deleteMunicipality
};