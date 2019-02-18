module.exports = function(sequelize, DataTypes) {
  var Character = sequelize.define("Character", {
    character_name: DataTypes.STRING,
    hp: DataTypes.INTEGER,
    attack: DataTypes.INTEGER,
    activeFlag: DataTypes.STRING,
    charSelected: DataTypes.BOOLEAN,
    imgLoc: DataTypes.STRING
  });

  return Character;
};
