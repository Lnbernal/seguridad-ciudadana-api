const Report = require('../models/Report');
const User = require('../models/User');
const Category = require('../models/Category');
const ReportStatus = require('../models/ReportStatus');
const Municipality = require('../models/Municipality');
const Evidence = require('../models/Evidence');
const Comment = require('../models/Comment');

/*
|--------------------------------------------------------------------------
| CREATE
|--------------------------------------------------------------------------
*/
const createReport = async (req, res) => {
    try {
        const report = await Report.create(req.body);

        res.status(201).json({
            message: 'Reporte creado correctamente',
            report
        });
    } catch (error) {
        console.error('Error creando reporte:', error);

        res.status(500).json({
            message: 'Error creando reporte'
        });
    }
};

/*
|--------------------------------------------------------------------------
| READ ALL
|--------------------------------------------------------------------------
*/
const getReports = async (req, res) => {
    try {
        const reports = await Report.findAll({
            include: [
                {
                    model: User,
                    attributes: ['id_usuario', 'nombre', 'apellido', 'correo']
                },
                {
                    model: Category,
                    attributes: ['id_categoria', 'nombre_categoria']
                },
                {
                    model: ReportStatus,
                    attributes: ['id_estado', 'nombre_estado']
                },
                {
                    model: Municipality,
                    as: 'municipio',
                    attributes: ['id_municipio', 'nombre']
                },
                {
                    model: Evidence
                },
                {
                    model: Comment
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        res.json(reports);
    } catch (error) {
        console.error('Error obteniendo reportes:', error);

        res.status(500).json({
            message: 'Error obteniendo reportes'
        });
    }
};

/*
|--------------------------------------------------------------------------
| READ BY ID
|--------------------------------------------------------------------------
*/
const getReportById = async (req, res) => {
    try {
        const { id } = req.params;

        const report = await Report.findByPk(id, {
            include: [
                {
                    model: User,
                    attributes: ['id_usuario', 'nombre', 'apellido', 'correo']
                },
                {
                    model: Category,
                    attributes: ['id_categoria', 'nombre_categoria']
                },
                {
                    model: ReportStatus,
                    attributes: ['id_estado', 'nombre_estado']
                },
                {
                    model: Municipality,
                    as: 'municipio',
                    attributes: ['id_municipio', 'nombre']
                },
                {
                    model: Evidence
                },
                {
                    model: Comment,
                    include: [
                        {
                            model: User,
                            attributes: ['id_usuario', 'nombre', 'apellido']
                        }
                    ]
                }
            ]
        });

        if (!report) {
            return res.status(404).json({
                message: 'Reporte no encontrado'
            });
        }

        res.json(report);
    } catch (error) {
        console.error('Error obteniendo reporte:', error);

        res.status(500).json({
            message: 'Error obteniendo reporte'
        });
    }
};

/*
|--------------------------------------------------------------------------
| READ BY USER
|--------------------------------------------------------------------------
*/
const getReportsByUser = async (req, res) => {
    try {
        const { id_usuario } = req.params;

        const reports = await Report.findAll({
            where: { id_usuario },
            include: [
                {
                    model: Category,
                    attributes: ['id_categoria', 'nombre_categoria']
                },
                {
                    model: ReportStatus,
                    attributes: ['id_estado', 'nombre_estado']
                },
                {
                    model: Municipality,
                    as: 'municipio',
                    attributes: ['id_municipio', 'nombre']
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        res.json(reports);
    } catch (error) {
        console.error('Error obteniendo reportes del usuario:', error);

        res.status(500).json({
            message: 'Error obteniendo reportes del usuario'
        });
    }
};

/*
|--------------------------------------------------------------------------
| UPDATE
|--------------------------------------------------------------------------
*/
const updateReport = async (req, res) => {
    try {
        const { id } = req.params;

        const report = await Report.findByPk(id);

        if (!report) {
            return res.status(404).json({
                message: 'Reporte no encontrado'
            });
        }

        await report.update(req.body);

        res.json({
            message: 'Reporte actualizado correctamente',
            report
        });
    } catch (error) {
        console.error('Error actualizando reporte:', error);

        res.status(500).json({
            message: 'Error actualizando reporte'
        });
    }
};

/*
|--------------------------------------------------------------------------
| DELETE
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
            message: 'Reporte eliminado correctamente'
        });
    } catch (error) {
        console.error('Error eliminando reporte:', error);

        res.status(500).json({
            message: 'Error eliminando reporte'
        });
    }
};

module.exports = {
    createReport,
    getReports,
    getReportById,
    getReportsByUser,
    updateReport,
    deleteReport
};