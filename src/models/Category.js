const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Category = sequelize.define('categorias', {

    id_categoria: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    nombre_categoria: {
        type: DataTypes.STRING,
        allowNull: false
    },

    descripcion: {
        type: DataTypes.TEXT
    }

}, {
    timestamps: false
});

module.exports = Category;