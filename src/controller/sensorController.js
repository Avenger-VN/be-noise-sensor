const sensorServices = require("../services/sensorServices")

const handleCreateSensor = async (req, res) => {
  try {
    if (req.body?.name && req.body?.description) {
      const response = await sensorServices.handleCreateSensorService(req.body)
      return res.status(200).json({
        status: response.status,
        mes: response.mes,
      })
    }
  } catch (e) {
    console.log(e)
    return res.status(500).json({
      status: false,
      mes: "Error from server",
    })
  }
}

const handleGetAllSensor = async (req, res) => {
  try {
    let response = null
    if (req.query.page && req.query.limit) {
      let page = req.query.page
      let limit = req.query.limit
      response = await sensorServices.handleGetAllSensorService(+page, +limit)
    } else {
      response = await sensorServices.handleGetAllSensorServiceDemo()
    }
    return res.status(200).json({
      status: response?.status,
      mes: response?.mes,
      data: response?.data,
    })
  } catch (e) {
    console.log(e)
    return res.status(500).json({
      status: false,
      mes: "Error from server",
    })
  }
}

const handleDeleteSensor = async (req, res) => {
  try {
    const { _id } = req.params
    const response = await sensorServices.handleDeleteSensorService(_id)
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

const handleGetSensorById = async (req, res) => {
  try {
    const { _id } = req.params
    const response = await sensorServices.handleGetSensorByIdService(_id)
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

const handleUpdateSensor = async (req, res) => {
  try {
    const response = await sensorServices.handleUpdateSensorService(req.body)
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

const handleGetAllSensorCronJob = async () => {
  try {
    let response = null
    response = await sensorServices.handleGetAllSensorServiceDemo()
    return {
      status: response?.status,
      mes: response?.mes,
      data: response?.data,
    }
  } catch (e) {
    return {
      status: false,
      mes: "Error from server",
    }
  }
}

module.exports = {
  handleCreateSensor,
  handleGetAllSensor,
  handleDeleteSensor,
  handleUpdateSensor,
  handleGetSensorById,
  handleGetAllSensorCronJob,
}
