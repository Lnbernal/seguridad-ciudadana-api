const express = require('express');
const cors = require('cors');
const path = require('path');

require('dotenv').config();

const sequelize = require('./config/database');

/*
|--------------------------------------------------------------------------
| MODELOS
|--------------------------------------------------------------------------
*/

require('./models/Role');
require('./models/User');
require('./models/Municipality');
require('./models/Category');
require('./models/ReportStatus');
require('./models/Report');
require('./models/Evidence');
require('./models/Comment');

/*
|--------------------------------------------------------------------------
| RUTAS
|--------------------------------------------------------------------------
*/

const authRoutes = require('./routes/auth.routes');
const reportRoutes = require('./routes/report.routes');
const evidenceRoutes = require('./routes/evidence.routes');
const mapRoutes = require('./routes/map.routes');

/*
|--------------------------------------------------------------------------
| SEEDERS
|--------------------------------------------------------------------------
*/

const roleSeeder = require('./seeders/roleSeeder');
const municipalitySeeder = require('./seeders/municipalitySeeder');
const categorySeeder = require('./seeders/categorySeeder');
const statusSeeder = require('./seeders/statusSeeder');

/*
|--------------------------------------------------------------------------
| APP
|--------------------------------------------------------------------------
*/

const app = express();

/*
|--------------------------------------------------------------------------
| MIDDLEWARES
|--------------------------------------------------------------------------
*/

app.use(cors());

app.use(express.json());

/*
|--------------------------------------------------------------------------
| ARCHIVOS ESTÁTICOS
|--------------------------------------------------------------------------
*/

app.use(
    '/uploads',
    express.static(
        path.join(__dirname, '../uploads')
    )
);

/*
|--------------------------------------------------------------------------
| ENDPOINTS
|--------------------------------------------------------------------------
*/

app.use('/api/auth', authRoutes);

app.use('/api/reports', reportRoutes);

app.use('/api/map', mapRoutes);

app.use('/api/evidences', evidenceRoutes);

app.get('/', (req, res) => {

    res.json({

        message: 'API Seguridad Ciudadana funcionando'

    });

});

/*
|--------------------------------------------------------------------------
| SERVER
|--------------------------------------------------------------------------
*/

const PORT = process.env.PORT || 8080;

async function startServer() {

    try {

        /*
        |--------------------------------------------------------------------------
        | CONEXIÓN BD
        |--------------------------------------------------------------------------
        */

        await sequelize.authenticate();

        console.log('Base de datos conectada');

        /*
        |--------------------------------------------------------------------------
        | SINCRONIZAR TABLAS
        |--------------------------------------------------------------------------
        */

        await sequelize.sync({ alter: true });

        console.log('Tablas sincronizadas');

        /*
        |--------------------------------------------------------------------------
        | SEEDERS
        |--------------------------------------------------------------------------
        */

        await roleSeeder();

        await municipalitySeeder();

        await categorySeeder();

        await statusSeeder();

        /*
        |--------------------------------------------------------------------------
        | LEVANTAR SERVIDOR
        |--------------------------------------------------------------------------
        */

        app.listen(PORT, () => {

            console.log(`Servidor corriendo en puerto ${PORT}`);

        });

    } catch (error) {

        console.error('Error iniciando servidor');

        console.error(error);

    }

}

startServer();