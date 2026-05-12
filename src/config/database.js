//funcionamiento local
const { Sequelize } = require('sequelize');

require('dotenv').config();

const sequelize = new Sequelize(

    process.env.MYSQLDATABASE,
    process.env.MYSQLUSER,
    process.env.MYSQLPASSWORD,

    {

        host: process.env.MYSQLHOST,

        port: process.env.MYSQLPORT,

        dialect: 'mysql',

        logging: false

    }

);

module.exports = sequelize;

/*funcionamiento en web

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

module.exports = sequelize; */