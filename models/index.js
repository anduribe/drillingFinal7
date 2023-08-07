const { Sequelize } = require('sequelize');
const sequelize = require('../config/db.config');
const User = require('./user.model')(sequelize);
const Bootcamp = require('./bootcamp.model')(sequelize);

User.belongsToMany(Bootcamp, { through: 'UserBootcamp' });
Bootcamp.belongsToMany(User, { through: 'UserBootcamp' });

module.exports = {
  sequelize,
  User,
  Bootcamp
};
