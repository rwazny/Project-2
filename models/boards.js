module.exports = function(sequelize, DataTypes) {
  var GameLogic = sequelize.define("Board", {
    turnOrder: DataTypes.STRING,
    currentTurn: DataTypes.INTEGER,
    boardSpots: DataTypes.TEXT,
    imagePaths: DataTypes.TEXT,
    movesRemaining: DataTypes.INTEGER,
    playerValues: DataTypes.TEXT,
    playerPoints: DataTypes.TEXT,
    round: DataTypes.INTEGER
  });
  return GameLogic;
};
