// src/controllers/report.controller.js

const Report = require('../models/Report');
const User = require('../models/User');
const Category = require('../models/Category');
const ReportStatus = require('../models/ReportStatus');
const Municipality = require('../models/Municipality');
const Evidence = require('../models/Evidence');
const Comment = require('../models/Comment');

const enviarTelegram = require('../services/telegram');

/*
|--------------------------------------------------------------------------
| CREATE
|--------------------------------------------------------------------------
*/
const createReport = async (req, res) => {
    try {
        console.log('Body recibido:', req.body);

        // Extraer explícitamente todos los campos
        const {
            titulo,
            descripcion,
            fecha_reporte,
            latitud,
            longitud,
            direccion,
            prioridad,
            anonimo,
            id_categoria,
            id_estado,
            id_municipio,
            id_usuario // <- ESTE CAMPO ES CLAVE
        } = req.body;

        // Validación básica
        if (!id_usuario) {
            return res.status(400).json({
                message: 'El id_usuario es obligatorio'
            });
        }

        // Crear reporte incluyendo id_usuario
        const report = await Report.create({
            titulo,
            descripcion,
            fecha_reporte,
            latitud,
            longitud,
            direccion,
            prioridad,
            anonimo,
            id_categoria,
            id_estado,
            id_municipio,
            id_usuario
        });

        // ENVIAR TELEGRAM
        await enviarTelegram({
            titulo,
            descripcion,
            id_municipio,
            longitud,
            latitud,
            prioridad
        });

        res.status(201).json({
            message: 'Reporte creado correctamente',
            report
        });
    } catch (error) {
        console.error('Error creando reporte:', error);

        res.status(500).json({
            message: 'Error creando reporte',
            error: error.message
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
                    as: 'usuario',
                    attributes: [
                        'id_usuario',
                        'nombre',
                        'apellido',
                        'correo'
                    ]
                },
                {
                    model: Category,
                    attributes: [
                        'id_categoria',
                        'nombre_categoria'
                    ]
                },
                {
                    model: ReportStatus,
                    attributes: [
                        'id_estado',
                        'nombre_estado'
                    ]
                },
                {
                    model: Municipality,
                    as: 'municipio',
                    attributes: [
                        'id_municipio',
                        'nombre'
                    ]
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
                    as: 'usuario',
                    attributes: [
                        'id_usuario',
                        'nombre',
                        'apellido',
                        'correo'
                    ]
                },
                {
                    model: Category,
                    attributes: [
                        'id_categoria',
                        'nombre_categoria'
                    ]
                },
                {
                    model: ReportStatus,
                    attributes: [
                        'id_estado',
                        'nombre_estado'
                    ]
                },
                {
                    model: Municipality,
                    as: 'municipio',
                    attributes: [
                        'id_municipio',
                        'nombre'
                    ]
                },
                {
                    model: Evidence
                },
                {
                    model: Comment,
                    include: [
                        {
                            model: User,
                            attributes: [
                                'id_usuario',
                                'nombre',
                                'apellido'
                            ]
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
                    model: User,
                    as: 'usuario',
                    attributes: [
                        'id_usuario',
                        'nombre',
                        'apellido',
                        'correo'
                    ]
                },
                {
                    model: Category,
                    attributes: [
                        'id_categoria',
                        'nombre_categoria'
                    ]
                },
                {
                    model: ReportStatus,
                    attributes: [
                        'id_estado',
                        'nombre_estado'
                    ]
                },
                {
                    model: Municipality,
                    as: 'municipio',
                    attributes: [
                        'id_municipio',
                        'nombre'
                    ]
                },
                {
                    model: Evidence
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