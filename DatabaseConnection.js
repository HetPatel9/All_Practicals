const { Sequelize, DataTypes } = require("sequelize");
const mysql = require("mysql2");

const dotenv = require("dotenv");
dotenv.config(".env");

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USERNAME,
  process.env.PASSWORD,
  {
    logging: false,
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT
  }
);

(async function () {
  try {
    await sequelize.authenticate();
    console.log("Database Authoized");
  } catch (err) {
    console.log("Database not connected: ", err);
  }
})();

module.exports = { sequelize, DataTypes };
