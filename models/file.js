'use strict';
module.exports = (sequelize, DataTypes) => {
  const File = sequelize.define('File', {
    filename: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    location: DataTypes.STRING
  }, {});
  File.associate = function(models) {
    File.belongsTo(models.User, {
      foreignKey: "userId"
    });
  };
  return File;
};