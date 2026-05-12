const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Municipality = sequelize.define('municipios', {

    id_municipio: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, {
    timestamps: false
});

module.exports = Municipality;