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
        type: DataTypes.DECIMAL(10, 8),
        allowNull: false
    },

    longitud: {
        type: DataTypes.DECIMAL(11, 8),
        allowNull: false
    },

    direccion: {
        type: DataTypes.STRING
    },

    prioridad: {
    type: DataTypes.ENUM(
        'BAJA',
        'MEDIA',
        'ALTA'
        ),
        defaultValue: 'MEDIA'
    },

    anonimo: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
    },

    operador_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

    funcionario_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

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

Report.belongsTo(User, { foreignKey: 'operador_id', as: 'operador' });
Report.belongsTo(User, { foreignKey: 'funcionario_id', as: 'funcionario' });
Report.belongsTo(ReportStatus, { foreignKey: 'id_estado', as: 'estado' });
