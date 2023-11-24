const express = require("express")
const userController = require("../controller/userController")
const alertController = require("../controller/alertController")
const locationController = require("../controller/locationController")
const roleController = require("../controller/roleController")
const sensorController = require("../controller/sensorController")
const sensorDataController = require("../controller/sensorDataController")

let router = express.Router()

let initWebRoutes = (app) => {
  //users
  router.post("/create-user", userController.handleCreateUser)
  router.get("/get-all-user", userController.handleGetAllUser)
  router.put("/update-user", userController.handleUpdateUser)
  router.get("/delete-user/:_id", userController.handleDeleteUser)

  //alerts
  router.post("/create-alert", alertController.handleCreateAlert)
  router.get("/get-all-alert", alertController.handleGetAllAlert)
  router.put("/update-alert", alertController.handleUpdateAlert)
  router.get("/delete-alert/:_id", alertController.handleDeleteAlert)

  //locations
  router.post("/create-location", locationController.handleCreateLocation)
  router.get("/get-all-location", locationController.handleGetAllLocation)
  router.put("/update-location", locationController.handleUpdateLocation)
  router.get("/delete-location/:_id", locationController.handleDeleteLocation)

  //roles
  router.post("/create-role", roleController.handleCreateRole)
  router.get("/get-all-role", roleController.handleGetAllRole)
  router.put("/update-role", roleController.handleUpdateRole)
  router.get("/delete-role/:_id", roleController.handleDeleteRole)

  //sensors
  router.post("/create-sensor", sensorController.handleCreateSensor)
  router.get("/get-all-sensor", sensorController.handleGetAllSensor)
  router.put("/update-sensor", sensorController.handleUpdateSensor)
  router.get("/delete-sensor/:_id", sensorController.handleDeleteSensor)

  //sensors data
  router.post(
    "/create-sensor-data",
    sensorDataController.handleCreateSensorData,
  )
  router.get(
    "/get-all-sensor-data",
    sensorDataController.handleGetAllSensorData,
  )
  router.put("/update-sensor-data", sensorDataController.handleUpdateSensorData)
  router.get(
    "/delete-sensor-data/:_id",
    sensorDataController.handleDeleteSensorData,
  )

  return app.use("/api/v1", router)
}

module.exports = initWebRoutes
