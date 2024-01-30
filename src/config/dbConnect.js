const { Sequelize } = require("sequelize")
const dotenv = require("dotenv")
const pg = require("pg")
const { updateSensorData } = require("../cron")

dotenv.config()

const DATABASE_URI = process.env.DATABASE_URI

if (!DATABASE_URI) {
  throw new Error("DATABASE_URI needs to be set")
}

const sequelize = new Sequelize(DATABASE_URI, {
  dialect: "postgres",
  dialectModule: pg, //
  logging: true,
})

let connectDB = async () => {
  try {
    await sequelize.authenticate()
    console.log("Connection has been established successfully.")
    updateSensorData.start()
    console.log("Start cron job")
  } catch (error) {
    console.error("Unable to connect to the database:", error)
  }
}

module.exports = connectDB
