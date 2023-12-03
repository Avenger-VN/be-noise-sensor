const locationServices = require("../services/locationServices")

const handleCreateLocation = async (req, res) => {
  try {
    const response = await locationServices.handleCreateLocationService(
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

const handleGetAllLocation = async (req, res) => {
  try {
    let response = null
    if (req.query.page && req.query.limit) {
      let page = req.query.page
      let limit = req.query.limit
      response = await locationServices.handleGetAllLocationService(
        +page,
        +limit,
      )
    } else {
      response = await locationServices.handleGetAllLocationServiceDemo()
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

const handleDeleteLocation = async (req, res) => {
  try {
    const { _id } = req.params
    const response = await locationServices.handleDeleteLocationService(_id)
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

const handleUpdateLocation = async (req, res) => {
  try {
    const response = await locationServices.handleUpdateLocationService(
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
  handleCreateLocation,
  handleGetAllLocation,
  handleDeleteLocation,
  handleUpdateLocation,
}
