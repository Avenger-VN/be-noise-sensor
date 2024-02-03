const userServices = require("../services/userServices")

const handleCreateUser = async (req, res) => {
  try {
    const response = await userServices.handleCreateUserService(req.body)
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

const handleGetAllUser = async (req, res) => {
  try {
    let response = null
    if (req.query.page && req.query.limit) {
      let page = req.query.page
      let limit = req.query.limit
      response = await userServices.handleGetAllUserService(+page, +limit)
    } else {
      response = await userServices.handleGetAllUserServiceDemo()
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

const handleDeleteUser = async (req, res) => {
  try {
    const { _id } = req.params
    const response = await userServices.handleDeleteUserService(_id)
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

const handleGetUserById = async (req, res) => {
  try {
    const { _id } = req.params
    const response = await userServices.handleGetUserByIdService(_id)
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

const handleUpdateUser = async (req, res) => {
  try {
    const response = await userServices.handleUpdateUserService(req.body)
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

module.exports = {
  handleCreateUser,
  handleGetAllUser,
  handleDeleteUser,
  handleUpdateUser,
  handleGetUserById,
}
