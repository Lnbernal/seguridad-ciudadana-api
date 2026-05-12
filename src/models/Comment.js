const { DataTypes } = require('sequelize');

const sequelize = require('../config/database');

const User = require('./User');
const Report = require('./Report');

const Comment = sequelize.define('comentarios', {

    id_comentario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    comentario: {
        type: DataTypes.TEXT,
        allowNull: false
    }

});

User.hasMany(Comment, {
    foreignKey: 'id_usuario'
});

Comment.belongsTo(User, {
    foreignKey: 'id_usuario'
});

Report.hasMany(Comment, {
    foreignKey: 'id_reporte'
});

Comment.belongsTo(Report, {
    foreignKey: 'id_reporte'
});

module.exports = Comment;