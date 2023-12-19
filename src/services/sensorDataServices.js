const db = require("../models")

const handleCreateSensorDataService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.sensorID ||
        !data.time ||
        !data.serialNo ||
        !data.type ||
        !data.locationID
      ) {
        resolve({
          status: false,
          mes: "Missing params",
        })
      }
      const response = await db.SensorData.create(data)
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

const handleGetAllSensorDataServiceDemo = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.SensorData.findAll()

      resolve({
        status: true,
        mes: "Get sensor data successfully",
        data: response,
      })
    } catch (e) {
      reject(e)
    }
  })
}

const handleGetAllSensorDataService = (page, limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      let offset = (page - 1) * limit
      const { count, rows } = await db.SensorData.findAndCountAll({
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
        sensorData: rows,
      }

      resolve({
        status: true,
        mes: "Get sensor data successfully",
        data: data,
      })
    } catch (e) {
      reject(e)
    }
  })
}

const handleDeleteSensorDataService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.SensorData.findOne({
        where: {
          id: id,
        },
        raw: false,
      })

      if (data) {
        data.deleted = true

        await data.save()

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

const handleGetSensorDataByIdService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.SensorData.findOne({
        where: {
          id: id,
        },
        raw: false,
      })

      if (data) {
        resolve({
          status: true,
          mes: "OK",
          data: data,
        })
      }
    } catch (e) {
      reject(e)
    }
  })
}

const handleUpdateSensorDataService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sensor = await db.SensorData.findOne({
        where: {
          id: data.id,
        },
        raw: false,
      })

      if (sensor) {
        sensor.sensorID = data.sensorID
        sensor.time = data.time
        sensor.type = data.type
        sensor.serialNo = data.serialNo
        sensor.locationID = data.locationID
        sensor.field = data.type

        await sensor.save()

        resolve({
          status: true,
          mes: "Update sensor data success",
        })
      } else {
        resolve({
          status: false,
          mes: "Sensor data not found",
        })
      }
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = {
  handleCreateSensorDataService,
  handleGetAllSensorDataService,
  handleDeleteSensorDataService,
  handleUpdateSensorDataService,
  handleGetAllSensorDataServiceDemo,
  handleGetSensorDataByIdService,
}
