const ReportStatus = require('../models/ReportStatus');

/*
|--------------------------------------------------------------------------
| CREATE
|--------------------------------------------------------------------------
*/
const createStatus = async (req, res) => {
    try {
        const { nombre_estado } = req.body;

        const status = await ReportStatus.create({
            nombre_estado
        });

        res.status(201).json({
            message: 'Estado creado correctamente',
            status
        });
    } catch (error) {
        console.error('Error creando estado:', error);

        res.status(500).json({
            message: 'Error creando estado'
        });
    }
};

/*
|--------------------------------------------------------------------------
| READ ALL
|--------------------------------------------------------------------------
*/
const getStatuses = async (req, res) => {
    try {
        const statuses = await ReportStatus.findAll({
            order: [['id_estado', 'ASC']]
        });

        res.json(statuses);
    } catch (error) {
        console.error('Error obteniendo estados:', error);

        res.status(500).json({
            message: 'Error obteniendo estados'
        });
    }
};

/*
|--------------------------------------------------------------------------
| READ BY ID
|--------------------------------------------------------------------------
*/
const getStatusById = async (req, res) => {
    try {
        const { id } = req.params;

        const status = await ReportStatus.findByPk(id);

        if (!status) {
            return res.status(404).json({
                message: 'Estado no encontrado'
            });
        }

        res.json(status);
    } catch (error) {
        console.error('Error obteniendo estado:', error);

        res.status(500).json({
            message: 'Error obteniendo estado'
        });
    }
};

/*
|--------------------------------------------------------------------------
| UPDATE
|--------------------------------------------------------------------------
*/
const updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_estado } = req.body;

        const status = await ReportStatus.findByPk(id);

        if (!status) {
            return res.status(404).json({
                message: 'Estado no encontrado'
            });
        }

        await status.update({
            nombre_estado
        });

        res.json({
            message: 'Estado actualizado correctamente',
            status
        });
    } catch (error) {
        console.error('Error actualizando estado:', error);

        res.status(500).json({
            message: 'Error actualizando estado'
        });
    }
};

/*
|--------------------------------------------------------------------------
| DELETE
|--------------------------------------------------------------------------
*/
const deleteStatus = async (req, res) => {
    try {
        const { id } = req.params;

        const status = await ReportStatus.findByPk(id);

        if (!status) {
            return res.status(404).json({
                message: 'Estado no encontrado'
            });
        }

        await status.destroy();

        res.json({
            message: 'Estado eliminado correctamente'
        });
    } catch (error) {
        console.error('Error eliminando estado:', error);

        res.status(500).json({
            message: 'Error eliminando estado'
        });
    }
};

module.exports = {
    createStatus,
    getStatuses,
    getStatusById,
    updateStatus,
    deleteStatus
};