const Report = require('../models/Report');

const Category = require('../models/Category');

const ReportStatus = require('../models/ReportStatus');

const Municipality = require('../models/Municipality');

const getMapReports = async (req, res) => {

    try {

        const reports = await Report.findAll({

            attributes: [

                'id_reporte',
                'titulo',
                'descripcion',
                'latitud',
                'longitud',
                'prioridad',
                'fecha_reporte'

            ],

            include: [

                {
                    model: Category
                },

                {
                    model: ReportStatus
                },

                {
                    model: Municipality
                }

            ]

        });

        res.json(reports);

    } catch (error) {

        console.error(error);

        res.status(500).json({

            message: 'Error obteniendo reportes mapa'

        });

    }

};

module.exports = {

    getMapReports

};