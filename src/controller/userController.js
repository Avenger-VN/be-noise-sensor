const userServices = require("../services/userServices")
const bcrypt = require("bcryptjs")
const asyncHandler = require("express-async-handler")
const db = require("../models")
const { createJWT } = require("../middleware/createJWT")

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

const handleLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      mes: "Missing params",
    })
  }
  const user = await db.User.findOne({
    where: { email: email },
    raw: true,
  })

  if (user && (await checkPassword(password, user.password))) {
    const { password, role, ...userData } = user

    const payload = {
      _id: user._id,
      role: role,
      password,
    }
    //Tao access token
    const token = createJWT(payload)

    return res.status(200).json({
      success: true,
      mes: "Login successfully",
      access_token: token,
      data: userData,
    })
  } else {
    throw new Error("Invalid credentials")
  }
})

const checkPassword = asyncHandler(async (password, passUser) => {
  return await bcrypt.compare(password, passUser)
})

module.exports = {
  handleCreateUser,
  handleGetAllUser,
  handleDeleteUser,
  handleUpdateUser,
  handleLogin,
  handleGetUserById,
}
