"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class SensorData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
      //SensorData.hasOne(models.Sensor, { foreignKey: "id" })
    }
  }
  SensorData.init(
    {
      sensorID: DataTypes.INTEGER,
      locationID: DataTypes.INTEGER,
      value: DataTypes.INTEGER,
      time: DataTypes.STRING,
      deleted: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "SensorData",
    },
  )
  return SensorData
}
