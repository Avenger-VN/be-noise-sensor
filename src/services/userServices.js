const db = require("../models")
const bcrypt = require("bcryptjs")
const salt = bcrypt.genSaltSync(10)

let checkUserMail = (userMail) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userMail },
      })

      if (user) {
        resolve(true)
      } else {
        resolve(false)
      }
    } catch (e) {
      reject(e)
    }
  })
}

let hashUserPassword = (password) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt)
      resolve(hashPassword)
    } catch (e) {
      reject(e)
    }
  })
}

const handleCreateUserService = (data) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.email ||
        !data.password ||
        !data.firstName ||
        !data.lastName ||
        !data.roleID ||
        !data.phone
      ) {
        resolve({
          status: false,
          mes: "Missing params",
        })
      }
      let check = await checkUserMail(data.email)
      if (check === true) {
        resolve({
          status: false,
          mes: "Your is email already used. Please try another email!",
        })
      } else {
        let hashPasswordFromBcrypt = await hashUserPassword(data.password)
        const dataInput = {
          ...data,
          password: hashPasswordFromBcrypt,
        }
        console.log("Check user: ", dataInput)
        await db.User.create(dataInput)
        resolve({
          status: true,
          mes: "OK",
        })
      }
    } catch (e) {
      reject(e)
    }
  })
}

const handleGetAllUserService = () => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const users = await db.User.findAll({
        attributes: {
          exclude: ["password"],
        },
      })
      resolve({
        status: true,
        mes: "Get users successfully",
        data: users,
      })
    } catch (e) {
      reject(e)
    }
  })
}

const handleDeleteUserService = (userId) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: {
          id: userId,
        },
        raw: false,
      })
      if (!user) {
        resolve({
          status: false,
          mes: "The user isn't exist!",
        })
      }

      user.destroy().then(function () {
        resolve({
          status: true,
          mes: "OK",
        })
      })
    } catch (e) {
      reject(e)
    }
  })
}

const handleUpdateUserService = (data) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: {
          id: data.id,
        },
        raw: false,
      })

      if (user) {
        user.firstName = data.firstName
        user.lastName = data.lastName
        user.address = data.address
        user.phone = data.phone
        user.email = data.email

        await user.save()

        resolve({
          status: true,
          mes: "OK",
        })
      } else {
        resolve({
          status: false,
          mes: "User's not found",
        })
      }
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = {
  handleCreateUserService,
  handleGetAllUserService,
  handleDeleteUserService,
  handleUpdateUserService,
}
