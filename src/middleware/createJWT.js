const jwt = require("jsonwebtoken")

const key = process.env.KEY || "nguyenminhchienit"

const createJWT = (payload) => {
  try {
    const token = jwt.sign(payload, key, {
      expiresIn: "1d",
    })
    return token
  } catch (error) {
    console.log(error)
  }
}

const createRefreshToken = (payload) => {
  try {
    const token = jwt.sign(payload, key, {
      expiresIn: "2d",
    })
    return token
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  createJWT,
  createRefreshToken,
}