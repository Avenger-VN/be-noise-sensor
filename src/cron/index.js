const cron = require("node-cron")
const { getRndInteger } = require("../utils/random-number")
const { handleGetAllSensorCronJob } = require("../controller/sensorController")

const updateSensorData = cron.schedule(
  "*/10 * * * * *",
  async () => {
    try {
      const value = getRndInteger(40, 90)
      const response = await handleGetAllSensorCronJob()
      if (response.status) {
        response.data.forEach((sensor) => {
          console.log(sensor.id, value)
          // const body = {
          //   sensorID: sensor.id,
          //   time: "13343893444",
          //   type: "type",
          //   serialNo: 2,
          //   locationID: 1,
          // }
          // handleCreateSensorData()
        })
      }
    } catch (err) {
      console.log(er)
    }
  },
  {
    scheduled: false,
  },
)

module.exports = {
  updateSensorData,
}
