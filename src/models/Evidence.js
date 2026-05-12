const { DataTypes } = require('sequelize');

const sequelize = require('../config/database');

const Report = require('./Report');

const Evidence = sequelize.define('evidencias', {

    id_evidencia: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    archivo_url: {
        type: DataTypes.STRING,
        allowNull: false
    },

    tipo_archivo: {
        type: DataTypes.STRING
    }

});

Report.hasMany(Evidence, {
    foreignKey: 'id_reporte'
});

Evidence.belongsTo(Report, {
    foreignKey: 'id_reporte'
});

module.exports = Evidence;