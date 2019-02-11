module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define("Item", {
    item_name: DataTypes.STRING,
    attack: DataTypes.INTEGER
  });

  Item.associate = function(models) {
    Item.hasOne(models.Character, {
      onDelete: "cascade"
    });
  };
  return Item;
};
