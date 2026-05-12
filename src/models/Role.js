const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Role = sequelize.define('roles', {

    id_rol: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    nombre_rol: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, {
    timestamps: false
});

module.exports = Role;