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
        const { nuevo_estado, funcionario_id } = req.body;

        // 1. Obtener reporte actual con estado y funcionario asignado
        const reporte = await Report.findByPk(id, {
            include: [
                { model: ReportStatus, attributes: ['nombre_estado'] },
                { model: User, as: 'funcionario', attributes: ['id_usuario'] }
            ]
        });

        if (!reporte) {
            return res.status(404).json({ message: 'Reporte no encontrado' });
        }

        const estadoActual = reporte.ReportStatus?.nombre_estado;
        if (!estadoActual) {
            return res.status(500).json({ message: 'El reporte no tiene estado asociado' });
        }

        // 2. Verificar permisos según transiciones
        const transicionesPorRol = TRANSICIONES[estadoActual];
        if (!transicionesPorRol) {
            return res.status(400).json({ message: `No se permiten cambios desde '${estadoActual}'` });
        }

        const rolesPermitidos = Object.keys(transicionesPorRol);
        const rolUsuario = req.user.rol;

        if (!rolesPermitidos.includes(rolUsuario)) {
            return res.status(403).json({ message: 'No tienes permiso para cambiar este reporte' });
        }

        const estadosPermitidos = transicionesPorRol[rolUsuario];
        if (!estadosPermitidos.includes(nuevo_estado)) {
            return res.status(400).json({
                message: `No puedes pasar de '${estadoActual}' a '${nuevo_estado}' con tu rol`
            });
        }

        // 3. Buscar ID del nuevo estado
        const estadoDestino = await ReportStatus.findOne({
            where: { nombre_estado: nuevo_estado }
        });
        if (!estadoDestino) {
            return res.status(400).json({ message: 'El estado especificado no existe' });
        }

        // 4. Construir objeto de actualización
        const updateData = { id_estado: estadoDestino.id_estado };

        if (nuevo_estado === 'VISUALIZADO') {
            updateData.operador_id = req.user.id_usuario || req.user.id; // Ajusta según tu payload JWT
        }

        if (nuevo_estado === 'ASIGNADO') {
            if (!funcionario_id) {
                return res.status(400).json({ message: 'Se requiere funcionario_id para asignar' });
            }
            const funcionario = await User.findOne({
                where: { id_usuario: funcionario_id, rol: 'FUNCIONARIO' }
            });
            if (!funcionario) {
                return res.status(400).json({ message: 'El usuario no es un funcionario válido' });
            }
            updateData.funcionario_id = funcionario_id;
        }

        if (nuevo_estado === 'EN_PROCESO' && estadoActual === 'ASIGNADO') {
            const idUsuario = req.user.id_usuario || req.user.id;
            if (idUsuario !== reporte.funcionario_id && rolUsuario !== 'ALCALDIA') {
                return res.status(403).json({ message: 'Solo el funcionario asignado puede iniciar el proceso' });
            }
        }

        await Report.update(updateData, { where: { id_reporte: id } });

        res.json({ message: 'Estado actualizado correctamente', estado: nuevo_estado });
    } catch (error) {
        console.error('Error al cambiar estado:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
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