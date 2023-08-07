// creamos conexion con base de datos

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('db_bootcamp', 'anduribe', 'yoda2950', {
  host: 'localhost',
  dialect: 'postgres',
  schema: 'public'
});

module.exports = sequelize;