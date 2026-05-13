const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Role = require('./Role');

const User = sequelize.define('usuarios', {

    id_usuario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },

    apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },

    correo: {
        type: DataTypes.STRING,
        allowNull: false
    },

    contraseña: {
        type: DataTypes.STRING,
        allowNull: false
    },

    telefono: {
        type: DataTypes.STRING
    },

    direccion: {
        type: DataTypes.STRING
    },

    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }

});

Role.hasMany(User, {
    foreignKey: 'id_rol'
});

User.belongsTo(Role, {
    foreignKey: 'id_rol'
});

module.exports = User;