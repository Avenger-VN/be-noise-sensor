const db = require("../models")

const handleCreateAlertService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.sensorID || !data.description || !data.time || !data.name) {
        resolve({
          status: false,
          mes: "Missing params",
        })
      }

      const response = await db.Alert.create(data)
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

const handleGetAllAlertServiceDemo = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Alert.findAll()

      resolve({
        status: true,
        mes: "Get alerts successfully",
        data: response,
      })
    } catch (e) {
      reject(e)
    }
  })
}

const handleGetAllAlertService = (page, limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      let offset = (page - 1) * limit
      const { count, rows } = await db.Alert.findAndCountAll({
        where: {
          deleted: false,
        },
        offset: offset,
        limit: limit,
      })
      let totalPage = Math.ceil(count / limit)
      let data = {
        totalRows: count,
        totalPage: totalPage,
        alert: rows,
      }

      resolve({
        status: true,
        mes: "Get alerts successfully",
        data: data,
      })
    } catch (e) {
      reject(e)
    }
  })
}

const handleDeleteAlertService = (alertId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const alert = await db.Alert.findOne({
        where: {
          id: alertId,
        },
        raw: false,
      })

      if (alert) {
        alert.deleted = STATUS.DELETED

        await alert.save()

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

const handleGetAlertServiceById = (alertId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const alert = await db.Alert.findOne({
        where: {
          id: alertId,
        },
        raw: false,
      })

      if (alert) {
        resolve({
          status: true,
          mes: "OK",
          data: alert,
        })
      }
    } catch (e) {
      reject(e)
    }
  })
}

const handleUpdateAlertService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const alert = await db.Alert.findOne({
        where: {
          id: data.id,
        },
        raw: false,
      })

      if (alert) {
        alert.sensorID = data.sensorID
        alert.description = data.description
        alert.time = data.time
        alert.name = data.name

        await alert.save()

        resolve({
          status: true,
          mes: "Update alert success",
        })
      } else {
        resolve({
          status: false,
          mes: "Alert's not found",
        })
      }
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = {
  handleCreateAlertService,
  handleGetAllAlertService,
  handleDeleteAlertService,
  handleUpdateAlertService,
  handleGetAllAlertServiceDemo,
  handleGetAlertServiceById,
}
