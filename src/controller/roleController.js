const roleServices = require("../services/roleServices")

const handleCreateRole = async (req, res) => {
  try {
    const response = await roleServices.handleCreateRoleService(req.body)
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

const handleGetAllRole = async (req, res) => {
  try {
    const response = await roleServices.handleGetAllRoleService()
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

const handleDeleteRole = async (req, res) => {
  try {
    const _id = req.params
    const response = await roleServices.handleDeleteRoleService(_id)
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

const handleUpdateRole = async (req, res) => {
  try {
    const response = await roleServices.handleUpdateRoleService(req.body)
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
  handleCreateRole,
  handleGetAllRole,
  handleDeleteRole,
  handleUpdateRole,
}
