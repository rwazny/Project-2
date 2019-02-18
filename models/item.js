module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define("Item", {
    item_name: DataTypes.STRING,
    attack: DataTypes.INTEGER,
    imgLoc: DataTypes.STRING
  });
  return Item;
};
