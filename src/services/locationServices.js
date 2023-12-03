const db = require("../models")

const handleCreateLocationService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.address || !data.latitude || !data.longitude) {
        resolve({
          status: false,
          mes: "Missing params",
        })
      }

      const response = await db.Location.create(data)
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

const handleGetAllLocationServiceDemo = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Location.findAll()

      resolve({
        status: true,
        mes: "Get locations successfully",
        data: response,
      })
    } catch (e) {
      reject(e)
    }
  })
}

const handleGetAllLocationService = (page, limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      let offset = (page - 1) * limit
      const { count, rows } = await db.Location.findAndCountAll({
        offset: offset,
        limit: limit,
      })
      let totalPage = Math.ceil(count / limit)
      let data = {
        totalRows: count,
        totalPage: totalPage,
        location: rows,
      }

      resolve({
        status: true,
        mes: "Get locations successfully",
        data: data,
      })
    } catch (e) {
      reject(e)
    }
  })
}

const handleDeleteLocationService = (locationId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const location = await db.Location.findOne({
        where: {
          id: locationId,
        },
        raw: false,
      })

      if (location) {
        location.deleted = true

        await location.save()

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

const handleUpdateLocationService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const location = await db.Location.findOne({
        where: {
          id: data.id,
        },
        raw: false,
      })

      if (location) {
        location.name = data.name
        location.latitude = data.latitude
        location.longitude = data.longitude

        await location.save()

        resolve({
          status: true,
          mes: "Update location success",
        })
      } else {
        resolve({
          status: false,
          mes: "Location's not found",
        })
      }
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = {
  handleCreateLocationService,
  handleGetAllLocationService,
  handleDeleteLocationService,
  handleUpdateLocationService,
  handleGetAllLocationServiceDemo,
}
