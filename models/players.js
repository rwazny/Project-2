module.exports = function(sequelize, DataTypes) {
  var Players = sequelize.define("Player", {
    name: DataTypes.STRING,
    playerId: DataTypes.TEXT,
    position: DataTypes.INTEGER
  });
  return Players;
};
