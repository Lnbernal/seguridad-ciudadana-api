const Category = require('../models/Category');

/*
|--------------------------------------------------------------------------
| CREATE
|--------------------------------------------------------------------------
*/
const createCategory = async (req, res) => {
    try {
        const { nombre_categoria, descripcion } = req.body;

        const category = await Category.create({
            nombre_categoria,
            descripcion
        });

        res.status(201).json({
            message: 'Categoría creada correctamente',
            category
        });
    } catch (error) {
        console.error('Error creando categoría:', error);

        res.status(500).json({
            message: 'Error creando categoría'
        });
    }
};

/*
|--------------------------------------------------------------------------
| READ ALL
|--------------------------------------------------------------------------
*/
const getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll({
            order: [['nombre_categoria', 'ASC']]
        });

        res.json(categories);
    } catch (error) {
        console.error('Error obteniendo categorías:', error);

        res.status(500).json({
            message: 'Error obteniendo categorías'
        });
    }
};

/*
|--------------------------------------------------------------------------
| READ BY ID
|--------------------------------------------------------------------------
*/
const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findByPk(id);

        if (!category) {
            return res.status(404).json({
                message: 'Categoría no encontrada'
            });
        }

        res.json(category);
    } catch (error) {
        console.error('Error obteniendo categoría:', error);

        res.status(500).json({
            message: 'Error obteniendo categoría'
        });
    }
};

/*
|--------------------------------------------------------------------------
| UPDATE
|--------------------------------------------------------------------------
*/
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_categoria, descripcion } = req.body;

        const category = await Category.findByPk(id);

        if (!category) {
            return res.status(404).json({
                message: 'Categoría no encontrada'
            });
        }

        await category.update({
            nombre_categoria,
            descripcion
        });

        res.json({
            message: 'Categoría actualizada correctamente',
            category
        });
    } catch (error) {
        console.error('Error actualizando categoría:', error);

        res.status(500).json({
            message: 'Error actualizando categoría'
        });
    }
};

/*
|--------------------------------------------------------------------------
| DELETE
|--------------------------------------------------------------------------
*/
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findByPk(id);

        if (!category) {
            return res.status(404).json({
                message: 'Categoría no encontrada'
            });
        }

        await category.destroy();

        res.json({
            message: 'Categoría eliminada correctamente'
        });
    } catch (error) {
        console.error('Error eliminando categoría:', error);

        res.status(500).json({
            message: 'Error eliminando categoría'
        });
    }
};

module.exports = {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};