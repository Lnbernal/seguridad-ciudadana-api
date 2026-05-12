const Evidence = require('../models/Evidence');
const Report = require('../models/Report');

/*
|--------------------------------------------------------------------------
| SUBIR ARCHIVO
|--------------------------------------------------------------------------
*/
const uploadEvidence = async (req, res) => {
    try {
        const { id_reporte } = req.body;

        if (!req.file) {
            return res.status(400).json({
                message: 'No se subió archivo'
            });
        }

        const evidence = await Evidence.create({
            archivo_url: req.file.filename,
            tipo_archivo: req.file.mimetype,
            id_reporte
        });

        res.status(201).json({
            message: 'Evidencia subida correctamente',
            evidence
        });
    } catch (error) {
        console.error('Error subiendo evidencia:', error);

        res.status(500).json({
            message: 'Error subiendo evidencia'
        });
    }
};

/*
|--------------------------------------------------------------------------
| OBTENER TODAS LAS EVIDENCIAS
|--------------------------------------------------------------------------
*/
const getEvidences = async (req, res) => {
    try {
        const evidences = await Evidence.findAll({
            include: [
                {
                    model: Report,
                    attributes: ['id_reporte', 'titulo']
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        res.json(evidences);
    } catch (error) {
        console.error('Error obteniendo evidencias:', error);

        res.status(500).json({
            message: 'Error obteniendo evidencias'
        });
    }
};

/*
|--------------------------------------------------------------------------
| OBTENER EVIDENCIA POR ID
|--------------------------------------------------------------------------
*/
const getEvidenceById = async (req, res) => {
    try {
        const { id } = req.params;

        const evidence = await Evidence.findByPk(id, {
            include: [
                {
                    model: Report,
                    attributes: ['id_reporte', 'titulo']
                }
            ]
        });

        if (!evidence) {
            return res.status(404).json({
                message: 'Evidencia no encontrada'
            });
        }

        res.json(evidence);
    } catch (error) {
        console.error('Error obteniendo evidencia:', error);

        res.status(500).json({
            message: 'Error obteniendo evidencia'
        });
    }
};

/*
|--------------------------------------------------------------------------
| OBTENER EVIDENCIAS POR REPORTE
|--------------------------------------------------------------------------
*/
const getEvidencesByReport = async (req, res) => {
    try {
        const { id_reporte } = req.params;

        const evidences = await Evidence.findAll({
            where: { id_reporte },
            order: [['createdAt', 'DESC']]
        });

        res.json(evidences);
    } catch (error) {
        console.error('Error obteniendo evidencias del reporte:', error);

        res.status(500).json({
            message: 'Error obteniendo evidencias del reporte'
        });
    }
};

/*
|--------------------------------------------------------------------------
| ELIMINAR EVIDENCIA
|--------------------------------------------------------------------------
*/
const deleteEvidence = async (req, res) => {
    try {
        const { id } = req.params;

        const evidence = await Evidence.findByPk(id);

        if (!evidence) {
            return res.status(404).json({
                message: 'Evidencia no encontrada'
            });
        }

        await evidence.destroy();

        res.json({
            message: 'Evidencia eliminada correctamente'
        });
    } catch (error) {
        console.error('Error eliminando evidencia:', error);

        res.status(500).json({
            message: 'Error eliminando evidencia'
        });
    }
};

module.exports = {
    uploadEvidence,
    getEvidences,
    getEvidenceById,
    getEvidencesByReport,
    deleteEvidence
};