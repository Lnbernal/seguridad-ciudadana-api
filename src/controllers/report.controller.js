const Report = require('../models/Report');

const User = require('../models/User');
const Category = require('../models/Category');
const ReportStatus = require('../models/ReportStatus');
const Municipality = require('../models/Municipality');

/*
|--------------------------------------------------------------------------
| CREAR REPORTE
|--------------------------------------------------------------------------
*/

const createReport = async (req, res) => {

    try {

        const {

            titulo,
            descripcion,
            latitud,
            longitud,
            direccion,
            prioridad,
            anonimo,
            id_categoria,
            id_estado,
            id_municipio

        } = req.body;

        const report = await Report.create({

            titulo,
            descripcion,
            latitud,
            longitud,
            direccion,
            prioridad,
            anonimo,

            id_usuario: req.user.id_usuario,

            id_categoria,
            id_estado,
            id_municipio

        });

        res.status(201).json({

            message: 'Reporte creado correctamente',

            report

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: 'Error creando reporte'
        });

    }

};

/*
|--------------------------------------------------------------------------
| LISTAR REPORTES
|--------------------------------------------------------------------------
*/

const getReports = async (req, res) => {

    try {

        const reports = await Report.findAll({

            include: [

                {
                    model: User,
                    attributes: [
                        'id_usuario',
                        'nombre',
                        'apellido',
                        'correo'
                    ]
                },

                {
                    model: Category
                },

                {
                    model: ReportStatus
                },

                {
                    model: Municipality
                }

            ],

            order: [
                ['fecha_reporte', 'DESC']
            ]

        });

        res.json(reports);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: 'Error obteniendo reportes'
        });

    }

};

/*
|--------------------------------------------------------------------------
| OBTENER REPORTE POR ID
|--------------------------------------------------------------------------
*/

const getReportById = async (req, res) => {

    try {

        const { id } = req.params;

        const report = await Report.findByPk(id, {

            include: [

                User,
                Category,
                ReportStatus,
                Municipality

            ]

        });

        if (!report) {

            return res.status(404).json({
                message: 'Reporte no encontrado'
            });

        }

        res.json(report);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: 'Error obteniendo reporte'
        });

    }

};

/*
|--------------------------------------------------------------------------
| ACTUALIZAR ESTADO
|--------------------------------------------------------------------------
*/

const updateReportStatus = async (req, res) => {

    try {

        const { id } = req.params;

        const { id_estado } = req.body;

        const report = await Report.findByPk(id);

        if (!report) {

            return res.status(404).json({
                message: 'Reporte no encontrado'
            });

        }

        report.id_estado = id_estado;

        await report.save();

        res.json({

            message: 'Estado actualizado',

            report

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: 'Error actualizando estado'
        });

    }

};

/*
|--------------------------------------------------------------------------
| ELIMINAR REPORTE
|--------------------------------------------------------------------------
*/

const deleteReport = async (req, res) => {

    try {

        const { id } = req.params;

        const report = await Report.findByPk(id);

        if (!report) {

            return res.status(404).json({
                message: 'Reporte no encontrado'
            });

        }

        await report.destroy();

        res.json({
            message: 'Reporte eliminado'
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: 'Error eliminando reporte'
        });

    }

};

module.exports = {

    createReport,
    getReports,
    getReportById,
    updateReportStatus,
    deleteReport

};