const { Sequelize } = require('sequelize');

require('dotenv').config();

const sequelize = new Sequelize(

    process.env.MYSQLDATABASE,
    process.env.MYSQLUSER,
    process.env.MYSQLPASSWORD,

    {

        host: 'yamabiko.proxy.rlwy.net',

        port: 19701,

        dialect: 'mysql',

        dialectOptions: {

            ssl: {
                rejectUnauthorized: false
            }

        },

        logging: false

    }

);

module.exports = sequelize;