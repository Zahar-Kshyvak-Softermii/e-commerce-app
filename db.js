const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  "e_commerce_app",
  "postgres",
  process.env.DB_PASS,
  {
    host: "localhost",
    dialect: "postgres",
    port: 5432,
    logging: false,
  }
);

module.exports = sequelize;
