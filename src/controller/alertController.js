const alertServices = require("../services/alertServices")

const handleCreateAlert = async (req, res) => {
  try {
    const response = await alertServices.handleCreateAlertService(req.body)
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

const handleGetAllAlert = async (req, res) => {
  try {
    let response = null
    if (req.query.page && req.query.limit) {
      let page = req.query.page
      let limit = req.query.limit
      response = await alertServices.handleGetAllAlertService(+page, +limit)
    } else {
      response = await alertServices.handleGetAllAlertServiceDemo()
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

const handleDeleteAlert = async (req, res) => {
  try {
    const { _id } = req.params
    const response = await alertServices.handleDeleteAlertService(_id)
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

const handleUpdateAlert = async (req, res) => {
  try {
    const response = await alertServices.handleUpdateAlertService(req.body)
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
  handleCreateAlert,
  handleGetAllAlert,
  handleDeleteAlert,
  handleUpdateAlert,
}
