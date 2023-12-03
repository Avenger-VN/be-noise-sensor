"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Alert extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  Alert.init(
    {
      sensorID: DataTypes.INTEGER,
      description: DataTypes.STRING,
      time: DataTypes.STRING,
      name: DataTypes.STRING,
      deleted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Alert",
    },
  )
  return Alert
}
