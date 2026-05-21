const express = require('express');
const cors = require('cors');
const path = require('path');

require('dotenv').config();

const sequelize = require('./config/database');

const preguntarGemini = require('./services/gemini');

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
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());

/*
|--------------------------------------------------------------------------
| RESPUESTAS LOCALES CHATBOT
|--------------------------------------------------------------------------
*/

function respuestaLocal(mensaje) {

    const texto = mensaje.toLowerCase();

    if (
        texto.includes('robo') ||
        texto.includes('hurto') ||
        texto.includes('atraco')
    ) {

        return 'Si estás en una emergencia comunícate inmediatamente con la Policía Nacional al 123.';
    }

    if (
        texto.includes('incendio') ||
        texto.includes('fuego')
    ) {

        return 'Comunícate inmediatamente con bomberos y al número de emergencias 123.';
    }

    if (
        texto.includes('violencia')
    ) {

        return 'Si existe peligro inmediato comunícate con las autoridades lo antes posible.';
    }

    if (
        texto.includes('hola') ||
        texto.includes('buenas')
    ) {

        return 'Hola, soy el asistente virtual de YoReporto. ¿En qué puedo ayudarte?';
    }

    if (
        texto.includes('reporte')
    ) {

        return 'Puedes crear un reporte desde la sección principal seleccionando la categoría del incidente.';
    }

    return null;
}

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

/*
|--------------------------------------------------------------------------
| CHATBOT
|--------------------------------------------------------------------------
*/

app.post('/api/chat', async (req, res) => {

    try {

        const { mensaje } = req.body;

        if (!mensaje) {

            return res.status(400).json({
                error: 'El mensaje es obligatorio'
            });

        }

        /*
        |--------------------------------------------------------------------------
        | RESPUESTA LOCAL
        |--------------------------------------------------------------------------
        */

        const local = respuestaLocal(mensaje);

        if (local) {

            return res.json({
                respuesta: local,
                tipo: 'local'
            });

        }

        /*
        |--------------------------------------------------------------------------
        | GEMINI
        |--------------------------------------------------------------------------
        */

        const respuesta = await preguntarGemini(mensaje);

        return res.json({
            respuesta,
            tipo: 'gemini'
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            error: 'Error procesando mensaje'
        });

    }

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
| 404
|--------------------------------------------------------------------------
*/

app.use((req, res) => {

    res.status(404).json({
        error: 'Ruta no encontrada'
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

            console.log(
                `Servidor corriendo en puerto ${PORT}`
            );

        });

    } catch (error) {

        console.error('Error iniciando servidor');
        console.error(error);

    }

}

startServer();
