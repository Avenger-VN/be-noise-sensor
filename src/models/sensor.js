"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Sensor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
      //Sensor.belongsTo(models.SensorData, { foreignKey: "id" })
    }
  }
  Sensor.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      type: DataTypes.STRING,
      deleted: DataTypes.INTEGER, // 1: deleted, 2: do not
    },
    {
      sequelize,
      modelName: "Sensor",
    },
  )
  return Sensor
}
