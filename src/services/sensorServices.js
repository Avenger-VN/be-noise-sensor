const { STATUS } = require("../constants/status")
const db = require("../models")

const handleCreateSensorService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.name || !data.description) {
        resolve({
          status: false,
          mes: "Missing params",
        })
      }
      if (!data.deleted) {
        data.deleted = STATUS.DELETED
      }
      const response = await db.Sensor.create(data)
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

const handleGetAllSensorServiceForCron = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Sensor.findAll({
        where: {
          deleted: STATUS.DELETED,
        },
      })

      resolve({
        status: true,
        mes: "Get sensors successfully",
        data: response,
      })
    } catch (e) {
      reject(e)
    }
  })
}

const handleGetAllSensorService = (page, limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      let offset = (page - 1) * limit
      const { count, rows } = await db.Sensor.findAndCountAll({
        where: {
          deleted: STATUS.DELETED,
        },
        offset: offset,
        limit: limit,
      })
      let totalPage = Math.ceil(count / limit)
      let data = {
        totalRows: count,
        totalPage: totalPage,
        sensor: rows,
      }

      resolve({
        status: true,
        mes: "Get sensors successfully",
        data: data,
      })
    } catch (e) {
      reject(e)
    }
  })
}

const handleDeleteSensorService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sensor = await db.Sensor.findOne({
        where: {
          id: id,
        },
        raw: false,
      })

      if (sensor) {
        sensor.deleted = STATUS.DELETED

        await sensor.save()

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

const handleGetSensorByIdService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sensor = await db.Sensor.findOne({
        where: {
          id: id,
        },
        raw: false,
      })

      if (sensor) {
        resolve({
          status: true,
          mes: "OK",
          data: sensor,
        })
      }
    } catch (e) {
      reject(e)
    }
  })
}

const handleUpdateSensorService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sensor = await db.sensor.findOne({
        where: {
          id: data.id,
        },
        raw: false,
      })

      if (sensor) {
        sensor.name = data.name
        sensor.description = data.description
        sensor.type = data.type

        await sensor.save()

        resolve({
          status: true,
          mes: "Update sensor success",
        })
      } else {
        resolve({
          status: false,
          mes: "Sensor's not found",
        })
      }
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = {
  handleCreateSensorService,
  handleGetAllSensorService,
  handleDeleteSensorService,
  handleUpdateSensorService,
  handleGetAllSensorServiceForCron,
  handleGetSensorByIdService,
}
