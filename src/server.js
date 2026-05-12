require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const sequelize = require('./config/database');

require('./models/User');

const authRoutes = require('./routes/auth.routes');

const app = express();

app.use(express.json());

app.use(cors());

app.use(helmet());

app.use(morgan('dev'));

app.get('/', (req, res) => {

    res.json({
        message: 'API Seguridad Ciudadana funcionando'
    });

});

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;

async function startServer() {

    try {

        await sequelize.authenticate();

        console.log('Base de datos conectada');

        await sequelize.sync();

        console.log('Tablas sincronizadas');

        app.listen(PORT, () => {

            console.log(`Servidor corriendo en puerto ${PORT}`);

        });

    } catch (error) {

        console.error(error);

    }

}

startServer();