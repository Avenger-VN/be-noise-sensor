"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  Location.init(
    {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      latitude: DataTypes.INTEGER,
      longitude: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Location",
    },
  )
  return Location
}
