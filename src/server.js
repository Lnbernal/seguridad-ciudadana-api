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
const userRoutes = require('./routes/user.routes');
const roleRoutes = require('./routes/role.routes');
const categoryRoutes = require('./routes/category.routes');
const municipalityRoutes = require('./routes/municipality.routes');
const statusRoutes = require('./routes/status.routes');
const reportRoutes = require('./routes/report.routes');
const evidenceRoutes = require('./routes/evidence.routes');
const commentRoutes = require('./routes/comment.routes');
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
const AdminSeeder = require('./seeders/adminSeeder');

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
app.use(cors({
  origin: [
    'http://localhost:4200',
    'https://seguridad-ciudadana-web.vercel.app',
    'https://seguridad-ciudadana-hr0kbzulq-lnbernals-projects.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.options('*', cors());
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

// Ruta principal
app.get('/', (req, res) => {
    res.json({
        message: 'API Seguridad Ciudadana funcionando'
    });
});

// Autenticación
app.use('/api/auth', authRoutes);

// Usuarios
app.use('/api/users', userRoutes);

// Roles
app.use('/api/roles', roleRoutes);

// Categorías
app.use('/api/categories', categoryRoutes);

// Municipios
app.use('/api/municipalities', municipalityRoutes);

// Estados de reportes
app.use('/api/statuses', statusRoutes);

// Reportes
app.use('/api/reports', reportRoutes);

// Evidencias
app.use('/api/evidences', evidenceRoutes);

// Comentarios
app.use('/api/comments', commentRoutes);

// Mapa
app.use('/api/map', mapRoutes);

/*
|--------------------------------------------------------------------------
| SERVER
|--------------------------------------------------------------------------
*/

const PORT = process.env.PORT || 8080;

async function startServer() {
    try {
        // Conectar a la base de datos
        await sequelize.authenticate();
        console.log('Base de datos conectada');

        // Sincronizar tablas
        await sequelize.sync({ alter: true });
        console.log('Tablas sincronizadas');

        // Ejecutar seeders
        await roleSeeder();
        console.log('Roles cargados');

        await municipalitySeeder();
        console.log('Municipios cargados');

        await categorySeeder();
        console.log('Categorías cargadas');

        await statusSeeder();
        console.log('Estados cargados');

        await AdminSeeder();
        console.log('Administrador cargado');
        // Iniciar servidor
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en puerto ${PORT}`);
        });

    } catch (error) {
        console.error('Error iniciando servidor');
        console.error(error);
    }
}

startServer();