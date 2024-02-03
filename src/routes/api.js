const express = require("express")
const userController = require("../controller/userController")
const alertController = require("../controller/alertController")
const locationController = require("../controller/locationController")
const roleController = require("../controller/roleController")
const sensorController = require("../controller/sensorController")
const sensorDataController = require("../controller/sensorDataController")
const authenticateController = require("../controller/authenticateController")

let router = express.Router()

let initWebRoutes = (app) => {
  // authenticate
  router.post("/login", authenticateController.login)

  //users
  router.post("/create-user", userController.handleCreateUser)
  router.get("/get-all-user", userController.handleGetAllUser)
  router.put("/update-user", userController.handleUpdateUser)
  router.delete("/delete-user/:_id", userController.handleDeleteUser)
  router.get("/get-user/:_id", userController.handleGetUserById)

  //alerts
  router.post("/create-alert", alertController.handleCreateAlert)
  router.get("/get-all-alert", alertController.handleGetAllAlert)
  router.put("/update-alert", alertController.handleUpdateAlert)
  router.delete("/delete-alert/:_id", alertController.handleDeleteAlert)
  router.get("/get-alert/:_id", alertController.handleGetAlertById)

  //locations
  router.post("/create-location", locationController.handleCreateLocation)
  router.get("/get-all-location", locationController.handleGetAllLocation)
  router.put("/update-location", locationController.handleUpdateLocation)
  router.delete(
    "/delete-location/:_id",
    locationController.handleDeleteLocation,
  )
  router.get("/get-location/:_id", locationController.handleGetLocationById)

  //roles
  router.post("/create-role", roleController.handleCreateRole)
  router.get("/get-all-role", roleController.handleGetAllRole)
  router.put("/update-role", roleController.handleUpdateRole)
  router.delete("/delete-role/:_id", roleController.handleDeleteRole)
  router.get("/get-role/:_id", roleController.handleGetRoleById)

  //sensors
  router.post("/create-sensor", sensorController.handleCreateSensor)
  router.get("/get-all-sensor", sensorController.handleGetAllSensor)
  router.put("/update-sensor", sensorController.handleUpdateSensor)
  router.delete("/delete-sensor/:_id", sensorController.handleDeleteSensor)
  router.get("/get-sensor/:_id", sensorController.handleGetSensorById)

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
  router.delete(
    "/delete-sensor-data/:_id",
    sensorDataController.handleDeleteSensorData,
  )
  router.get(
    "/get-sensor-data/:_id",
    sensorDataController.handleGetSensorDataById,
  )

  return app.use("/api/v1", router)
}

module.exports = initWebRoutes
