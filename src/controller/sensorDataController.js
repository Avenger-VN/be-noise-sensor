const sensorDataServices = require("../services/sensorDataServices")

const handleCreateSensorData = async (req, res) => {
  try {
    const response = await sensorDataServices.handleCreateSensorDataService(
      req.body,
    )
    return res.status(200).json({
      status: response.status,
      mes: response.mes,
    })
  } catch (e) {
    console.log(e)
    return res.status(500).json({
      status: false,
      mes: "Error from server",
    })
  }
}

const handleGetAllSensorData = async (req, res) => {
  try {
    const response = await sensorDataServices.handleGetAllSensorDataService()
    return res.status(200).json({
      status: response.status,
      mes: response.mes,
      data: response.data,
    })
  } catch (e) {
    console.log(e)
    return res.status(500).json({
      status: false,
      mes: "Error from server",
    })
  }
}

const handleDeleteSensorData = async (req, res) => {
  try {
    const { _id } = req.params
    const response = await sensorDataServices.handleDeleteSensorDataService(_id)
    return res.status(200).json({
      status: response.status,
      mes: response.mes,
    })
  } catch (e) {
    console.log(e)
    return res.status(500).json({
      status: false,
      mes: "Error from server",
    })
  }
}

const handleUpdateSensorData = async (req, res) => {
  try {
    const response = await sensorDataServices.handleUpdateSensorDataService(
      req.body,
    )
    return res.status(200).json({
      status: response.status,
      mes: response.mes,
    })
  } catch (e) {
    console.log(e)
    return res.status(500).json({
      status: false,
      mes: "Error from server",
    })
  }
}

module.exports = {
  handleCreateSensorData,
  handleGetAllSensorData,
  handleDeleteSensorData,
  handleUpdateSensorData,
}
