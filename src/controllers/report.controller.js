// src/controllers/report.controller.js

const Report = require('../models/Report');
const User = require('../models/User');
const Category = require('../models/Category');
const ReportStatus = require('../models/ReportStatus');
const Municipality = require('../models/Municipality');
const Evidence = require('../models/Evidence');
const Comment = require('../models/Comment');
const TRANSICIONES = require('../config/transiciones'); // ← NUEVO

const enviarTelegram = require('../services/telegram');

const normalizarEstado = (estado) =>
    (estado || '')
        .toString()
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toUpperCase()
        .replace(/\s+/g, '_');

/*
|--------------------------------------------------------------------------
| CREATE
|--------------------------------------------------------------------------
*/
const createReport = async (req, res) => {
    try {
        console.log('Body recibido:', req.body);

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
            id_usuario
        } = req.body;

        if (!id_usuario) {
            return res.status(400).json({
                message: 'El id_usuario es obligatorio'
            });
        }

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
                    attributes: ['id_usuario', 'nombre', 'apellido', 'correo']
                },
                {
                    model: User,
                    as: 'operador',
                    attributes: ['id_usuario', 'nombre', 'apellido', 'correo']
                },
                {
                    model: User,
                    as: 'funcionario',
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
                    as: 'usuario',
                    attributes: ['id_usuario', 'nombre', 'apellido', 'correo']
                },
                {
                    model: User,
                    as: 'operador',
                    attributes: ['id_usuario', 'nombre', 'apellido', 'correo']
                },
                {
                    model: User,
                    as: 'funcionario',
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
                    model: User,
                    as: 'usuario',
                    attributes: ['id_usuario', 'nombre', 'apellido', 'correo']
                },
                {
                    model: User,
                    as: 'operador',
                    attributes: ['id_usuario', 'nombre', 'apellido', 'correo']
                },
                {
                    model: User,
                    as: 'funcionario',
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

/*
|--------------------------------------------------------------------------
| CHANGE STATUS (flujo de revisión)
|--------------------------------------------------------------------------
*/
const changeStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { nuevo_estado } = req.body;

        console.log('Estado recibido:', nuevo_estado);

        // 1. Obtener reporte actual
        const reporte = await Report.findByPk(id, {
            include: [
                {
                    model: ReportStatus,
                    attributes: ['id_estado', 'nombre_estado']
                },
                {
                    model: User,
                    as: 'funcionario',
                    attributes: ['id_usuario']
                }
            ]
        });

        if (!reporte) {
            return res.status(404).json({
                message: 'Reporte no encontrado'
            });
        }

        // 2. Obtener estado actual
        const estadoActualNombre =
            reporte.estados_reporte?.nombre_estado ||
            reporte.ReportStatus?.nombre_estado ||
            reporte.estado?.nombre_estado;

        const estadoActual = normalizarEstado(estadoActualNombre);

        console.log('Estado actual:', estadoActual);

        if (!estadoActual) {
            return res.status(500).json({
                message: 'El reporte no tiene estado asociado'
            });
        }

        // 3. Normalizar nuevo estado
        const nuevoEstado = normalizarEstado(nuevo_estado);

        console.log('Nuevo estado normalizado:', nuevoEstado);

        // 4. Validar transición
        const transicionesPorRol = TRANSICIONES[estadoActual];

        if (!transicionesPorRol) {
            return res.status(400).json({
                message: `No se permiten cambios desde '${estadoActual}'`
            });
        }

        const rolUsuario = normalizarEstado(req.user.rol);

        console.log('Rol usuario:', rolUsuario);

        const estadosPermitidos =
            transicionesPorRol[rolUsuario] || [];

        console.log('Estados permitidos:', estadosPermitidos);

        if (!estadosPermitidos.includes(nuevoEstado)) {
            return res.status(400).json({
                message: `No puedes pasar de '${estadoActual}' a '${nuevoEstado}' con tu rol`
            });
        }

        // 5. Buscar estado en BD de forma flexible
        const estados = await ReportStatus.findAll();

        console.log(
            'Estados BD:',
            estados.map(e => ({
                original: e.nombre_estado,
                normalizado: normalizarEstado(e.nombre_estado)
            }))
        );

        const estadoDestino = estados.find(e =>
            normalizarEstado(e.nombre_estado) === nuevoEstado
        );

        if (!estadoDestino) {
            return res.status(400).json({
                message: 'El estado especificado no existe'
            });
        }

        console.log('Estado encontrado:', estadoDestino.nombre_estado);

        // 6. Construir actualización
        const updateData = {
            id_estado: estadoDestino.id_estado
        };

        // Asignar operador automáticamente
        if (
            estadoActual === 'PENDIENTE' &&
            nuevoEstado === 'EN_PROCESO'
        ) {
            updateData.operador_id =
                req.user.id_usuario || req.user.id;
        }

        // 7. Actualizar reporte
        await Report.update(updateData, {
            where: { id_reporte: id }
        });

        res.json({
            message: 'Estado actualizado correctamente',
            estado: estadoDestino.nombre_estado
        });

    } catch (error) {
        console.error('Error al cambiar estado:', error);

        res.status(500).json({
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

module.exports = {
    createReport,
    getReports,
    getReportById,
    getReportsByUser,
    updateReport,
    deleteReport,
    changeStatus   // ← NUEVA EXPORTACIÓN
};
