const express = require("express")
const userController = require("../controller/userController")

let router = express.Router()

let initWebRoutes = (app) => {
  router.post("/create-user", userController.handleCreateUser)
  router.get("/get-all-user", userController.handleGetAllUser)
  router.put("/update-user", userController.handleUpdateUser)
  router.get("/delete-user/:_id", userController.handleDeleteUser)

  return app.use("/api/v1", router)
}

module.exports = initWebRoutes
