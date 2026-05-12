const { DataTypes } = require('sequelize');

const sequelize = require('../config/database');

const User = require('./User');
const Category = require('./Category');
const ReportStatus = require('./ReportStatus');
const Municipality = require('./Municipality');

const Report = sequelize.define('reportes', {

    id_reporte: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },

    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    fecha_reporte: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },

    latitud: {
        type: DataTypes.DECIMAL(10, 8)
    },

    longitud: {
        type: DataTypes.DECIMAL(11, 8)
    },

    direccion: {
        type: DataTypes.STRING
    },

    prioridad: {
        type: DataTypes.ENUM('BAJA', 'MEDIA', 'ALTA')
    },

    anonimo: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }

});

User.hasMany(Report, {
    foreignKey: 'id_usuario'
});

Report.belongsTo(User, {
    foreignKey: 'id_usuario'
});

Category.hasMany(Report, {
    foreignKey: 'id_categoria'
});

Report.belongsTo(Category, {
    foreignKey: 'id_categoria'
});

ReportStatus.hasMany(Report, {
    foreignKey: 'id_estado'
});

Report.belongsTo(ReportStatus, {
    foreignKey: 'id_estado'
});

Municipality.hasMany(Report, {
    foreignKey: 'id_municipio'
});

Report.belongsTo(Municipality, {
    foreignKey: 'id_municipio'
});

module.exports = Report;