const Comment = require('../models/Comment');
const User = require('../models/User');
const Report = require('../models/Report');

/*
|--------------------------------------------------------------------------
| CREATE
|--------------------------------------------------------------------------
*/
const createComment = async (req, res) => {
    try {
        const {
            comentario,
            id_usuario,
            id_reporte
        } = req.body;

        const comment = await Comment.create({
            comentario,
            id_usuario,
            id_reporte
        });

        res.status(201).json({
            message: 'Comentario creado correctamente',
            comment
        });
    } catch (error) {
        console.error('Error creando comentario:', error);

        res.status(500).json({
            message: 'Error creando comentario'
        });
    }
};

/*
|--------------------------------------------------------------------------
| READ ALL
|--------------------------------------------------------------------------
*/
const getComments = async (req, res) => {
    try {
        const comments = await Comment.findAll({
            include: [
                {
                    model: User,
                    attributes: [
                        'id_usuario',
                        'nombre',
                        'apellido'
                    ]
                },
                {
                    model: Report,
                    attributes: [
                        'id_reporte',
                        'titulo'
                    ]
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        res.json(comments);
    } catch (error) {
        console.error('Error obteniendo comentarios:', error);

        res.status(500).json({
            message: 'Error obteniendo comentarios'
        });
    }
};

/*
|--------------------------------------------------------------------------
| READ BY ID
|--------------------------------------------------------------------------
*/
const getCommentById = async (req, res) => {
    try {
        const { id } = req.params;

        const comment = await Comment.findByPk(id, {
            include: [
                {
                    model: User,
                    attributes: [
                        'id_usuario',
                        'nombre',
                        'apellido'
                    ]
                },
                {
                    model: Report,
                    attributes: [
                        'id_reporte',
                        'titulo'
                    ]
                }
            ]
        });

        if (!comment) {
            return res.status(404).json({
                message: 'Comentario no encontrado'
            });
        }

        res.json(comment);
    } catch (error) {
        console.error('Error obteniendo comentario:', error);

        res.status(500).json({
            message: 'Error obteniendo comentario'
        });
    }
};

/*
|--------------------------------------------------------------------------
| UPDATE
|--------------------------------------------------------------------------
*/
const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { comentario } = req.body;

        const comment = await Comment.findByPk(id);

        if (!comment) {
            return res.status(404).json({
                message: 'Comentario no encontrado'
            });
        }

        await comment.update({
            comentario
        });

        res.json({
            message: 'Comentario actualizado correctamente',
            comment
        });
    } catch (error) {
        console.error('Error actualizando comentario:', error);

        res.status(500).json({
            message: 'Error actualizando comentario'
        });
    }
};

/*
|--------------------------------------------------------------------------
| DELETE
|--------------------------------------------------------------------------
*/
const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;

        const comment = await Comment.findByPk(id);

        if (!comment) {
            return res.status(404).json({
                message: 'Comentario no encontrado'
            });
        }

        await comment.destroy();

        res.json({
            message: 'Comentario eliminado correctamente'
        });
    } catch (error) {
        console.error('Error eliminando comentario:', error);

        res.status(500).json({
            message: 'Error eliminando comentario'
        });
    }
};

module.exports = {
    createComment,
    getComments,
    getCommentById,
    updateComment,
    deleteComment
};