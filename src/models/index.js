"use strict"

const fs = require("fs")
const path = require("path")
const Sequelize = require("sequelize")
const dotenv = require("dotenv")
const basename = path.basename(__filename)
const db = {}
dotenv.config()

const DATABASE_URI = process.env.DATABASE_URI

if (!DATABASE_URI) {
  throw new Error("DATABASE_URI needs to be set")
}
const sequelize = new Sequelize(DATABASE_URI, {
  dialect: "postgres",
  logging: true,
})

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    )
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes,
    )
    db[model.name] = model
    sequelize.sync() // sync table, wil create new if it dont existed
  })

// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db)
//   }
// })

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
