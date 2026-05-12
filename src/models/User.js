const { DataTypes } = require('sequelize');

const sequelize = require('../config/database');

const User = sequelize.define('usuarios', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },

    correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    rol: {
        type: DataTypes.ENUM(
            'CIUDADANO',
            'OPERADOR',
            'ADMIN',
            'ALCALDIA'
        ),
        defaultValue: 'CIUDADANO'
    }

});

module.exports = User;