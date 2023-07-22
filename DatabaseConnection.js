const { Sequelize, DataTypes } = require('sequelize');
const mysql = require('mysql2');

const dotenv = require('dotenv');
dotenv.config('.env');

const sequelize = new Sequelize('sequelizePractical', 'het', 'hetsimform', {
  logging: false,
  host: 'localhost',
  dialect: 'mysql'
});

(async function () {
  try {
    await sequelize.authenticate();
    console.log('Database Authoized');
  } catch (err) {
    console.log('Database not connected: ', err);
  }
})();

module.exports = { sequelize, DataTypes };
