const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Bootcamp = sequelize.define('Bootcamp', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cue: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    timestamps: true,
  });

  Bootcamp.associate = (models) => {
    Bootcamp.belongsToMany(models.User, { through: 'UserBootcamp' });
  };

  return Bootcamp;
};
