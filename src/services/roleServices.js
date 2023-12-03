const db = require("../models")

const handleCreateRoleService = (data) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.name || !data.description) {
        resolve({
          status: false,
          mes: "Missing params",
        })
      }

      const response = await db.Role.create(data)
      resolve({
        status: true,
        mes: "OK",
        data: response,
      })
    } catch (e) {
      reject(e)
    }
  })
}

const handleGetAllRoleServiceDemo = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Role.findAll()

      resolve({
        status: true,
        mes: "Get roles successfully",
        data: response,
      })
    } catch (e) {
      reject(e)
    }
  })
}

const handleGetAllRoleService = (page, limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      let offset = (page - 1) * limit
      const { count, rows } = await db.Role.findAndCountAll({
        offset: offset,
        limit: limit,
      })
      let totalPage = Math.ceil(count / limit)
      let data = {
        totalRows: count,
        totalPage: totalPage,
        role: rows,
      }

      resolve({
        status: true,
        mes: "Get roles successfully",
        data: data,
      })
    } catch (e) {
      reject(e)
    }
  })
}

const handleDeleteRoleService = (roleId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const role = await db.Role.findOne({
        where: {
          id: roleId,
        },
        raw: false,
      })

      if (role) {
        role.deleted = true

        await role.save()

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

const handleUpdateRoleService = (data) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const role = await db.Role.findOne({
        where: {
          id: data.id,
        },
        raw: false,
      })

      if (role) {
        role.name = data.name
        role.description = data.description

        await role.save()

        resolve({
          status: true,
          mes: "Update role success",
        })
      } else {
        resolve({
          status: false,
          mes: "Role's not found",
        })
      }
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = {
  handleCreateRoleService,
  handleGetAllRoleService,
  handleDeleteRoleService,
  handleUpdateRoleService,
  handleGetAllRoleServiceDemo,
}
