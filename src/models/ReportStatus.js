const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ReportStatus = sequelize.define('estados_reporte', {

    id_estado: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    nombre_estado: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, {
    timestamps: false
});

module.exports = ReportStatus;