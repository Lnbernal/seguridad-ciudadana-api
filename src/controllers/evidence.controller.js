const Evidence = require('../models/Evidence');

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

        console.error(error);

        res.status(500).json({
            message: 'Error subiendo evidencia'
        });

    }

};

module.exports = {

    uploadEvidence

};