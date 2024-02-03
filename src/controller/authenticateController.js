const userServices = require("../services/userServices")
const { createJWT } = require("../middleware/createJWT")
const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")

const checkPassword = asyncHandler(async (password, passUser) => {
  return await bcrypt.compare(password, passUser)
})

const login = async (req, res) => {
  try {
    const { username, password } = req.body
    if (!username || !password) {
      return res.status(400).json({
        status: false,
        mes: "Missing params",
      })
    } else {
      const user = await userServices.handleGetUserByEmail(username)
      if (user) {
        const passwordChecked = await checkPassword(password, user.password)
        if (passwordChecked) {
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
        }
      }
      return res.status(404).json({
        status: false,
        mes: "User not found",
      })
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      mes: "Error from server",
    })
  }
}

module.exports = {
  login,
}
