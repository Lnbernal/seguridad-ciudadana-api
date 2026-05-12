const { Sequelize } = require('sequelize');

require('dotenv').config();

const sequelize = new Sequelize(

    process.env.MYSQL_PUBLIC_URL,

    {

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