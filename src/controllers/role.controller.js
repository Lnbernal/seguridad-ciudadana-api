const Role = require('../models/Role');

/*
|--------------------------------------------------------------------------
| CREATE
|--------------------------------------------------------------------------
*/
const createRole = async (req, res) => {
    try {
        const { nombre_rol, descripcion } = req.body;

        const role = await Role.create({
            nombre_rol,
            descripcion
        });

        res.status(201).json({
            message: 'Rol creado correctamente',
            role
        });
    } catch (error) {
        console.error('Error creando rol:', error);

        res.status(500).json({
            message: 'Error creando rol'
        });
    }
};

/*
|--------------------------------------------------------------------------
| READ ALL
|--------------------------------------------------------------------------
*/
const getRoles = async (req, res) => {
    try {
        const roles = await Role.findAll({
            order: [['id_rol', 'ASC']]
        });

        res.json(roles);
    } catch (error) {
        console.error('Error obteniendo roles:', error);

        res.status(500).json({
            message: 'Error obteniendo roles'
        });
    }
};

/*
|--------------------------------------------------------------------------
| READ BY ID
|--------------------------------------------------------------------------
*/
const getRoleById = async (req, res) => {
    try {
        const { id } = req.params;

        const role = await Role.findByPk(id);

        if (!role) {
            return res.status(404).json({
                message: 'Rol no encontrado'
            });
        }

        res.json(role);
    } catch (error) {
        console.error('Error obteniendo rol:', error);

        res.status(500).json({
            message: 'Error obteniendo rol'
        });
    }
};

/*
|--------------------------------------------------------------------------
| UPDATE
|--------------------------------------------------------------------------
*/
const updateRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_rol, descripcion } = req.body;

        const role = await Role.findByPk(id);

        if (!role) {
            return res.status(404).json({
                message: 'Rol no encontrado'
            });
        }

        await role.update({
            nombre_rol,
            descripcion
        });

        res.json({
            message: 'Rol actualizado correctamente',
            role
        });
    } catch (error) {
        console.error('Error actualizando rol:', error);

        res.status(500).json({
            message: 'Error actualizando rol'
        });
    }
};

/*
|--------------------------------------------------------------------------
| DELETE
|--------------------------------------------------------------------------
*/
const deleteRole = async (req, res) => {
    try {
        const { id } = req.params;

        const role = await Role.findByPk(id);

        if (!role) {
            return res.status(404).json({
                message: 'Rol no encontrado'
            });
        }

        await role.destroy();

        res.json({
            message: 'Rol eliminado correctamente'
        });
    } catch (error) {
        console.error('Error eliminando rol:', error);

        res.status(500).json({
            message: 'Error eliminando rol'
        });
    }
};

module.exports = {
    createRole,
    getRoles,
    getRoleById,
    updateRole,
    deleteRole
};